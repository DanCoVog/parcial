import pool from "@/lib/db";

export default async function handler(req, res) {
  try {
    const result = await pool.query("SELECT * FROM productos");
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Error cargando productos" });
  }
}
