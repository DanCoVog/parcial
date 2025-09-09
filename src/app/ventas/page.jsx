"use client";
import { useEffect, useState } from "react";

export default function Ventas() {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    setVentas([
      { id: 1, pedidoId: 1, total: 2500, fecha: "2025-09-01" },
      { id: 2, pedidoId: 2, total: 300, fecha: "2025-09-02" },
    ]);
  }, []);

  const totalVentas = ventas.reduce((acc, v) => acc + v.total, 0);

  return (
    <div className="min-h-screen bg-gray-600 p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-black">💰 Gestión de Ventas</h1>

        {/* Tarjeta de total */}
        <div className="bg-green-100 border border-green-400 text-green-800 px-4 py-3 rounded mb-4">
          <strong>Total de Ventas:</strong> ${totalVentas}
        </div>

        {/* Tabla de ventas */}
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Pedido ID</th>
              <th className="px-4 py-2 border">Total</th>
              <th className="px-4 py-2 border">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map((v) => (
              <tr key={v.id} className="text-center text-black">
                <td className="border px-4 py-2">{v.id}</td>
                <td className="border px-4 py-2">{v.pedidoId}</td>
                <td className="border px-4 py-2">${v.total}</td>
                <td className="border px-4 py-2">{v.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
