import express from "express";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
 
dotenv.config();
 
const router = express.Router();
 
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306
});
 
/**
 * ROTA: GET /looks/recomendar
 * Retorna imagens ÚNICAS que correspondam ESTRITAMENTE aos 3 filtros enviados
 */
router.get("/recomendar", async (req, res) => {
  try {
    const { f1, f2, f3 } = req.query;
 
    if (!f1 || !f2 || !f3) {
      return res.status(400).json({
        error: "É necessário selecionar os 3 filtros."
      });
    }
 
    // Correção: Adicionado o HAVING COUNT para garantir que a imagem possua
    // os 3 filtros ao mesmo tempo, impedindo que traga todas as imagens do banco.
    const sql = `
      SELECT i.id_imagem, i.caminho_imagem
      FROM Imagens i
      INNER JOIN Imagem_Filtros ifilter ON i.id_imagem = ifilter.id_imagem
      WHERE ifilter.id_filtro IN (?, ?, ?) AND i.status = 'Ativo'
      GROUP BY i.id_imagem
      HAVING COUNT(DISTINCT ifilter.id_filtro) = 3;
    `;
 
    const [rows] = await db.query(sql, [f1, f2, f3]);
 
    if (rows.length === 0) {
      return res.status(404).json({
        message: "Nenhum look encontrado para esta combinação de filtros."
      });
    }
 
    return res.json(rows);
 
  } catch (error) {
    console.error("Erro no motor de busca:", error);
    return res.status(500).json({ error: "Erro interno no servidor." });
  }
});
 
export default router;