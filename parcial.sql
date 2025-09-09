CREATE DATABASE bd_parcial1;
-- En psql:  \c bd_parcial1

CREATE TABLE usuarios (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL, -- guarda hash, no texto plano
    nombre VARCHAR(100),
    rol VARCHAR(50),
    creado_en TIMESTAMP DEFAULT now()
);

CREATE TABLE clientes (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    email VARCHAR(150),
    telefono VARCHAR(50),
    direccion TEXT,
    creado_en TIMESTAMP DEFAULT now()
);

CREATE TABLE productos (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    descripcion TEXT,
    precio NUMERIC(12,2) NOT NULL DEFAULT 0,
    stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
    creado_en TIMESTAMP DEFAULT now()
);

CREATE TABLE pedidos (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cliente_id INTEGER REFERENCES clientes(id) ON DELETE SET NULL,
    total NUMERIC(12,2) NOT NULL DEFAULT 0,
    creado_en TIMESTAMP DEFAULT now()
);

CREATE TABLE pedido_items (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    pedido_id INTEGER NOT NULL REFERENCES pedidos(id) ON DELETE CASCADE,
    producto_id INTEGER NOT NULL REFERENCES productos(id),
    cantidad INTEGER NOT NULL CHECK (cantidad > 0),
    precio_unitario NUMERIC(12,2) NOT NULL,
    subtotal NUMERIC(12,2) NOT NULL
);

CREATE TABLE devoluciones (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    pedido_item_id INTEGER REFERENCES pedido_items(id) ON DELETE SET NULL,
    motivo TEXT,
    cantidad INTEGER NOT NULL CHECK (cantidad > 0),
    creado_en TIMESTAMP DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_pedido_items_pedido_id ON pedido_items(pedido_id);
CREATE INDEX IF NOT EXISTS idx_pedido_items_producto_id ON pedido_items(producto_id);
CREATE INDEX IF NOT EXISTS idx_productos_nombre ON productos(nombre);

CREATE ROLE rol_admin WITH LOGIN PASSWORD 'admin';
ALTER ROLE rol_admin WITH SUPERUSER;

CREATE ROLE rol_empleado WITH LOGIN PASSWORD 'employee';

GRANT SELECT, INSERT, UPDATE ON usuarios TO rol_empleado;
GRANT SELECT, INSERT, UPDATE ON clientes TO rol_empleado;
GRANT SELECT, INSERT, UPDATE ON productos TO rol_empleado;
GRANT SELECT, INSERT, UPDATE ON pedidos TO rol_empleado;
GRANT SELECT, INSERT, UPDATE ON pedido_items TO rol_empleado;
GRANT SELECT, INSERT, UPDATE ON devoluciones TO rol_empleado;

REVOKE DELETE ON ALL TABLES IN SCHEMA public FROM rol_empleado;

CREATE OR REPLACE PROCEDURE registrar_pedido(p_cliente_id INTEGER, p_items JSONB)
LANGUAGE plpgsql
AS $$
DECLARE
    v_pedido_id INTEGER;
    v_total NUMERIC := 0;
    v_item RECORD;
    v_precio NUMERIC;
    v_subtotal NUMERIC;
BEGIN
    IF p_items IS NULL OR jsonb_typeof(p_items) IS DISTINCT FROM 'array' THEN
        RAISE EXCEPTION 'p_items debe ser un JSON array no nulo';
    END IF;

    INSERT INTO pedidos (cliente_id, total) VALUES (p_cliente_id, 0) RETURNING id INTO v_pedido_id;

    FOR v_item IN
        SELECT * FROM jsonb_to_recordset(p_items) AS (producto_id INT, cantidad INT)
    LOOP
        SELECT precio INTO v_precio FROM productos WHERE id = v_item.producto_id;
        IF NOT FOUND THEN
            RAISE EXCEPTION 'Producto % no encontrado', v_item.producto_id;
        END IF;

        v_subtotal := v_precio * v_item.cantidad;
        INSERT INTO pedido_items (pedido_id, producto_id, cantidad, precio_unitario, subtotal)
        VALUES (v_pedido_id, v_item.producto_id, v_item.cantidad, v_precio, v_subtotal);

         v_total := v_total + v_subtotal;
    END LOOP;

    UPDATE pedidos SET total = v_total WHERE id = v_pedido_id;
END;
$$;

CREATE OR REPLACE FUNCTION ventas_totales()
RETURNS NUMERIC
LANGUAGE sql
AS $$
    SELECT COALESCE(SUM(total), 0) FROM pedidos;
$$;

CREATE OR REPLACE FUNCTION fn_actualizar_stock()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
    diff INTEGER;
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE productos
        SET stock = stock - NEW.cantidad
        WHERE id = NEW.producto_id AND stock >= NEW.cantidad;
        IF NOT FOUND THEN
            RAISE EXCEPTION 'Stock insuficiente para el producto % (pedido_item insert).', NEW.producto_id;
        END IF;
        RETURN NEW;
    END IF;

    IF TG_OP = 'DELETE' THEN
        UPDATE productos
        SET stock = stock + OLD.cantidad
        WHERE id = OLD.producto_id;
         RETURN OLD;
    END IF;

    IF TG_OP = 'UPDATE' THEN
        IF NEW.producto_id IS DISTINCT FROM OLD.producto_id THEN
            UPDATE productos
            SET stock = stock + OLD.cantidad
            WHERE id = OLD.producto_id;

            UPDATE productos
            SET stock = stock - NEW.cantidad
            WHERE id = NEW.producto_id AND stock >= NEW.cantidad;

            IF NOT FOUND THEN
                RAISE EXCEPTION 'Stock insuficiente para el producto % (update change product).', NEW.producto_id;
            END IF;

            RETURN NEW;
        END IF;

        diff := NEW.cantidad - OLD.cantidad;
        IF diff > 0 THEN
            UPDATE productos
            SET stock = stock - diff
            WHERE id = NEW.producto_id AND stock >= diff;
            IF NOT FOUND THEN
                RAISE EXCEPTION 'Stock insuficiente para el producto % (update increase cantidad).', NEW.producto_id;
            END IF;
        ELSIF diff < 0 THEN
            UPDATE productos
            SET stock = stock + (-diff)
            WHERE id = NEW.producto_id;
        END IF;

        RETURN NEW;
    END IF;
	
    RETURN NULL;
END;
$$;

-- Trigger único pedido_items -> actualizar_stock (BEFORE para poder prevenir inserciones si falta stock)
CREATE TRIGGER actualizar_stock
BEFORE INSERT OR UPDATE OR DELETE ON pedido_items
FOR EACH ROW
EXECUTE FUNCTION fn_actualizar_stock();

-- Pruebas
INSERT INTO clientes (nombre, email, telefono, direccion)
VALUES ('Sara', 'sara@gmail.com', '123456789', 'Calle 123');

INSERT INTO productos (nombre, descripcion, precio, stock)
VALUES ('Camisa', 'Camisa talla M', 50000, 10);

SELECT * FROM clientes;
SELECT * FROM productos;

CALL registrar_pedido(1, '[{"producto_id": 1, "cantidad": 2}]'::jsonb);

SELECT * FROM pedidos;
SELECT * FROM pedido_items;
SELECT * FROM productos;

SELECT ventas_totales();