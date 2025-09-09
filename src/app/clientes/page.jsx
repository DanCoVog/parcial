"use client";
import { useEffect, useState } from "react";

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [nuevoCliente, setNuevoCliente] = useState({ nombre: "", email: "", telefono: "" });

  useEffect(() => {
    // Datos iniciales de ejemplo
    setClientes([
      { id: 1, nombre: "Juan Pérez", email: "juan@example.com", telefono: "123456789" },
      { id: 2, nombre: "María López", email: "maria@example.com", telefono: "987654321" },
      { id: 3, nombre: "Carlos Ruiz", email: "carlos@example.com", telefono: "555666777" },
    ]);
  }, []);

  const handleAddCliente = (e) => {
    e.preventDefault();
    if (!nuevoCliente.nombre || !nuevoCliente.email || !nuevoCliente.telefono) return;

    const nuevo = { id: clientes.length + 1, ...nuevoCliente };
    setClientes([...clientes, nuevo]); // agrega al listado
    setNuevoCliente({ nombre: "", email: "", telefono: "" }); // limpia formulario
    setShowForm(false); // cierra formulario
  };

  return (
    <div className="min-h-screen bg-gray-600 p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl text-black font-bold mb-4">👤 Gestión de Clientes</h1>

        {/* Botón para mostrar formulario */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="mb-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
        >
          ➕ Nuevo Cliente
        </button>

        {/* Formulario de nuevo cliente */}
        {showForm && (
          <form
            onSubmit={handleAddCliente}
            className="mb-4 p-4 bg-gray-50 border rounded-lg shadow-inner"
          >
            <div className="grid grid-cols-3 gap-4 mb-4">
              <input
                type="text"
                placeholder="Nombre"
                value={nuevoCliente.nombre}
                onChange={(e) => setNuevoCliente({ ...nuevoCliente, nombre: e.target.value })}
                className="border p-2 rounded text-black"
              />
              <input
                type="email"
                placeholder="Email"
                value={nuevoCliente.email}
                onChange={(e) => setNuevoCliente({ ...nuevoCliente, email: e.target.value })}
                className="border p-2 rounded text-black"
              />
              <input
                type="text"
                placeholder="Teléfono"
                value={nuevoCliente.telefono}
                onChange={(e) => setNuevoCliente({ ...nuevoCliente, telefono: e.target.value })}
                className="border p-2 rounded text-black"
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              ✅ Guardar
            </button>
          </form>
        )}

        {/* Tabla de clientes */}
        <table className="min-w-full border border-gray-900">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Nombre</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((c) => (
              <tr key={c.id} className="text-center text-black">
                <td className="border px-4 py-2">{c.id}</td>
                <td className="border px-4 py-2">{c.nombre}</td>
                <td className="border px-4 py-2">{c.email}</td>
                <td className="border px-4 py-2">{c.telefono}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
