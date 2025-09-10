"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [usuario, setUsuario] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("usuario");
    if (!user) {
      router.push("/login"); // Si no hay sesión -> Login
    } else {
      setUsuario(JSON.parse(user));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("usuario");
    router.push("/login");
  };

  if (!usuario) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">📊 Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          🚪 Cerrar sesión
        </button>
      </div>

      <p className="mb-6">
        Bienvenido <strong>{usuario.email}</strong> 👋 (Rol: {usuario.rol})
      </p>

      <div className="grid grid-cols-2 gap-4">
        <a
          href="/clientes"
          className="bg-blue-500 text-white p-6 rounded-lg shadow-md hover:bg-blue-600 text-center"
        >
          👤 Clientes
        </a>
        <a
          href="/productos"
          className="bg-green-500 text-white p-6 rounded-lg shadow-md hover:bg-green-600 text-center"
        >
          🛒 Productos
        </a>
        <a
          href="/pedidos"
          className="bg-yellow-500 text-white p-6 rounded-lg shadow-md hover:bg-yellow-600 text-center"
        >
          📦 Pedidos
        </a>
        <a
          href="/ventas"
          className="bg-purple-500 text-white p-6 rounded-lg shadow-md hover:bg-purple-600 text-center"
        >
          💰 Ventas
        </a>
      </div>
    </div>
  );
}
