import { query } from "@/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { cliente_id, usuario_id, items } = body;

    await query(
      "CALL registrar_pedido($1, $2, $3::jsonb, NULL);",
      [cliente_id, usuario_id, JSON.stringify(items)]
    );

    return Response.json({ message: "Pedido registrado con éxito" });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Error al registrar pedido" }, { status: 500 });
  }
}
