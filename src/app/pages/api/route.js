import { query } from "@/lib/db";

export async function GET() {
  try {
    const result = await query("SELECT id, nombre, precio, stock FROM productos ORDER BY id;");
    return Response.json(result.rows);
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Error al obtener productos" }, { status: 500 });
  }
}
