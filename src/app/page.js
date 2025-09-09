"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [productos, setProductos] = useState([]);
  const [ventas, setVentas] = useState(0);

  useEffect(() => {
    fetch("/api/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data));

    fetch("/api/ventas")
      .then((res) => res.json())
      .then((data) => setVentas(data.total));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          📊 Dashboard de Ventas
        </h1>

        {/* Tarjeta de total de ventas */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8 text-center">
          <h2 className="text-xl font-semibold text-gray-600">
            Total de ventas
          </h2>
          <p className="text-2xl font-bold text-green-600 mt-2">
            ${ventas}
          </p>
        </div>

        {/* Lista de productos */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            🛒 Productos
          </h3>
          <table className="min-w-full border border-gray-200">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border">ID</th>
                <th className="py-2 px-4 border">Nombre</th>
                <th className="py-2 px-4 border">Precio</th>
                <th className="py-2 px-4 border">Stock</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.id} className="text-center">
                  <td className="py-2 px-4 border">{p.id}</td>
                  <td className="py-2 px-4 border">{p.nombre}</td>
                  <td className="py-2 px-4 border text-green-700 font-medium">
                    ${p.precio}
                  </td>
                  <td
                    className={`py-2 px-4 border ${
                      p.stock > 5
                        ? "text-green-600"
                        : p.stock > 0
                        ? "text-yellow-600"
                        : "text-red-600 font-bold"
                    }`}
                  >
                    {p.stock}
                  </td>
                </tr>
              ))}
              {productos.length === 0 && (
                <tr>
                  <td colSpan="4" className="py-4 text-gray-500">
                    No hay productos registrados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
