import { useEffect, useState } from "react";

export default function Home() {
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const resClientes = await fetch("/api/clientes");
        const resProductos = await fetch("/api/productos");

        const clientesData = await resClientes.json();
        const productosData = await resProductos.json();

        setClientes(clientesData);
        setProductos(productosData);
      } catch (err) {
        console.error("Error cargando datos", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-10">Cargando...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">📦 Gestión de Ventas</h1>

      {/* Clientes */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">👤 Clientes</h2>
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Nombre</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map(c => (
              <tr key={c.id} className="text-center">
                <td className="border px-4 py-2">{c.id}</td>
                <td className="border px-4 py-2">{c.nombre}</td>
                <td className="border px-4 py-2">{c.email}</td>
                <td className="border px-4 py-2">{c.telefono}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Productos */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">🛒 Productos</h2>
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Nombre</th>
              <th className="px-4 py-2 border">Precio</th>
              <th className="px-4 py-2 border">Stock</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(p => (
              <tr key={p.id} className="text-center">
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
