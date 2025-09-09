"use client";
import { useEffect, useState } from "react";

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [nuevoPedido, setNuevoPedido] = useState({ cliente: "", producto: "", cantidad: "" });

  useEffect(() => {
    setPedidos([
      { id: 1, cliente: "Juan Pérez", producto: "Laptop", cantidad: 1, fecha: "2025-09-01" },
      { id: 2, cliente: "María López", producto: "Mouse Gamer", cantidad: 2, fecha: "2025-09-02" },
    ]);
  }, []);

  const handleAddPedido = (e) => {
    e.preventDefault();
    if (!nuevoPedido.cliente || !nuevoPedido.producto || !nuevoPedido.cantidad) return;

    const nuevo = {
      id: pedidos.length + 1,
      ...nuevoPedido,
      cantidad: parseInt(nuevoPedido.cantidad),
      fecha: new Date().toISOString().split("T")[0],
    };
    setPedidos([...pedidos, nuevo]);
    setNuevoPedido({ cliente: "", producto: "", cantidad: "" });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-600 p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-black">📦 Gestión de Pedidos</h1>

        <button
          onClick={() => setShowForm(!showForm)}
          className="mb-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
        >
          ➕ Nuevo Pedido
        </button>

        {showForm && (
          <form onSubmit={handleAddPedido} className="mb-4 p-4 bg-gray-50 border rounded-lg shadow-inner">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <input
                type="text"
                placeholder="Cliente"
                value={nuevoPedido.cliente}
                onChange={(e) => setNuevoPedido({ ...nuevoPedido, cliente: e.target.value })}
                className="border p-2 rounded text-black"
              />
              <input
                type="text"
                placeholder="Producto"
                value={nuevoPedido.producto}
                onChange={(e) => setNuevoPedido({ ...nuevoPedido, producto: e.target.value })}
                className="border p-2 rounded text-black"
              />
              <input
                type="number"
                placeholder="Cantidad"
                value={nuevoPedido.cantidad}
                onChange={(e) => setNuevoPedido({ ...nuevoPedido, cantidad: e.target.value })}
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
              <th className="px-4 py-2 border">Cliente</th>
              <th className="px-4 py-2 border">Producto</th>
              <th className="px-4 py-2 border">Cantidad</th>
              <th className="px-4 py-2 border">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((p) => (
              <tr key={p.id} className="text-center text-black">
                <td className="border px-4 py-2">{p.id}</td>
                <td className="border px-4 py-2">{p.cliente}</td>
                <td className="border px-4 py-2">{p.producto}</td>
                <td className="border px-4 py-2">{p.cantidad}</td>
                <td className="border px-4 py-2">{p.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
