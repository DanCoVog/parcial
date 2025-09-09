# 🛍️ Sistema de Gestión de Ventas de Ropa

Este proyecto es un **sistema de gestión de ventas de ropa** que permite administrar clientes, productos, pedidos y devoluciones.  
Fue desarrollado como parte de un proyecto académico utilizando **Next.js**, **PostgreSQL** y **JavaScript**.

---

## 🚀 Tecnologías utilizadas

- [Next.js 15](https://nextjs.org/) - Framework de React para frontend y backend.
- [PostgreSQL](https://www.postgresql.org/) - Base de datos relacional.
- [Tailwind CSS](https://tailwindcss.com/) - Framework de estilos CSS.
- [Node.js](https://nodejs.org/) - Entorno de ejecución para JavaScript.
- [pg (node-postgres)](https://node-postgres.com/) - Cliente de PostgreSQL para Node.js.

---

## ⚙️ Funcionalidades principales

- 👤 **Gestión de clientes**: registro y listado de clientes.  
- 🛒 **Gestión de productos**: registro, actualización de stock y precios.  
- 📦 **Gestión de pedidos**: registrar ventas y calcular el total automáticamente.  
- 🔄 **Devoluciones**: registrar devoluciones de productos.  
- 📊 **Dashboard visual**: mostrar total de ventas y listado de productos.  
- 🔐 **Roles de usuario**:
  - **Administrador**: control total (superusuario).
  - **Empleado**: puede insertar y actualizar, pero no eliminar.  

---

## 🗄️ Base de datos

La base de datos en PostgreSQL contiene las siguientes tablas:

- `usuarios`
- `clientes`
- `productos`
- `pedidos`
- `pedido_items`
- `devoluciones`

Incluye también:

- **Procedures** para registrar pedidos.  
- **Funciones** para calcular ventas totales.  
- **Triggers** para actualizar stock automáticamente.  

---

## 📂 Estructura del proyecto
