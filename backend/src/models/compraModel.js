import pool from '../database/database.js'
 
class ComprasModel{
    async showcompras(){
        const [rows] = await pool.execute("SELECT * FROM compras");
        return rows;
    }
 
    async getComprasById(id){
        const[row] = await pool.execute(
            "SELECT * FROM compras WHERE id_compra =?",
            [id]
        );
 
        return row;
    }
 
    async createCompra(compraData){
        const {quantidade, valor, desconto, id_livro, id_cliente} = compraData;
 
        const [row] = await pool.execute(
        "INSERT INTO compras (qtde, valor, desconto, id_livro, id_cliente) VALUES (?,?,?,?,?);",
        [quantidade, valor, desconto, id_livro, id_cliente]
        );
 
        return row;
    }
 
    async updateCompras(id, compraData){
        const {quantidade, valor, desconto} = compraData;
        const [row] = await pool.execute(
            `
            UPDATE compras SET
            qtde = ?,
            valor = ?,
            desconto =?
            WHERE id_compra = ?;`,
            [quantidade, valor, desconto, id]
        );
 
        return row;
    }
 
    async deleteCompra(id){
        const [row] = await pool.execute(
            "DELETE FROM compras WHERE id_compra = ?",
            [id]
        );
 
        return row;
    }
}
 
export default new ComprasModel();