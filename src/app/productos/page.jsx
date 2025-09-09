"use client";
import { useEffect, useState } from "react";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({ nombre: "", precio: "", stock: "" });

  useEffect(() => {
    setProductos([
      { id: 1, nombre: "Laptop", precio: 2500, stock: 10 },
      { id: 2, nombre: "Mouse Gamer", precio: 150, stock: 25 },
      { id: 3, nombre: "Teclado Mecánico", precio: 350, stock: 8 },
    ]);
  }, []);

  const handleAddProducto = (e) => {
    e.preventDefault();
    if (!nuevoProducto.nombre || !nuevoProducto.precio || !nuevoProducto.stock) return;

    const nuevo = { id: productos.length + 1, ...nuevoProducto, precio: parseFloat(nuevoProducto.precio), stock: parseInt(nuevoProducto.stock) };
    setProductos([...productos, nuevo]);
    setNuevoProducto({ nombre: "", precio: "", stock: "" });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-600 p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-black">🛒 Gestión de Productos</h1>

        <button
          onClick={() => setShowForm(!showForm)}
          className="mb-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
        >
          ➕ Nuevo Producto
        </button>

        {showForm && (
          <form onSubmit={handleAddProducto} className="mb-4 p-4 bg-gray-50 border rounded-lg shadow-inner">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <input
                type="text"
                placeholder="Nombre"
                value={nuevoProducto.nombre}
                onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
                className="border p-2 rounded text-black"
              />
              <input
                type="number"
                placeholder="Precio"
                value={nuevoProducto.precio}
                onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: e.target.value })}
                className="border p-2 rounded text-black"
              />
              <input
                type="number"
                placeholder="Stock"
                value={nuevoProducto.stock}
                onChange={(e) => setNuevoProducto({ ...nuevoProducto, stock: e.target.value })}
                className="border p-2 rounded text-black"
              />
            </div>
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              ✅ Guardar
            </button>
          </form>
        )}

        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Nombre</th>
              <th className="px-4 py-2 border">Precio</th>
              <th className="px-4 py-2 border">Stock</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id} className="text-center text-black">
                <td className="border px-4 py-2">{p.id}</td>
                <td className="border px-4 py-2">{p.nombre}</td>
                <td className="border px-4 py-2">${p.precio}</td>
                <td className="border px-4 py-2">{p.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
