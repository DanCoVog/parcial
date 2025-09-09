import { query } from "@/lib/db";

export async function GET() {
  try {
    const result = await query("SELECT ventas_totales();");
    return Response.json({ total: result.rows[0].ventas_totales });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Error al obtener ventas" }, { status: 500 });
  }
}
