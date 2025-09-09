"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-600 p-6">
      <h1 className="text-3xl font-bold mb-8 text-black ">📊 Dashboard de Gestión</h1>

      <div className="grid grid-cols-2 gap-6 w-full max-w-md">
        <Link href="/clientes">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg shadow-md text-lg font-semibold">
            👤 Clientes
          </button>
        </Link>

        <Link href="/productos">
          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg shadow-md text-lg font-semibold">
            🛒 Productos
          </button>
        </Link>

        <Link href="/pedidos">
          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-lg shadow-md text-lg font-semibold">
            📦 Pedidos
          </button>
        </Link>

        <Link href="/ventas">
          <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-lg shadow-md text-lg font-semibold">
            💰 Ventas
          </button>
        </Link>
      </div>
    </div>
  );
}
