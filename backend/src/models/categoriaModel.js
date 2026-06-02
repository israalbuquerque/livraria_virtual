import pool from '../database/database.js'
 
class CategoriasModel{
    async showCategorias(){
        const [rows] = await pool.execute("SELECT * FROM categorias;");
        return rows;
    }
 
    async getCategoriasByName(categoria){
        const [row] = await pool.execute(
            "SELECT * FROM categorias WHERE categoria = ?",
            [categoria]
        );
        return row
    }
 
    async createCategorias(categoriaData){
        const {categoria} = categoriaData;
        const [row] = await pool.execute(
            "INSERT INTO categorias (categoria) VALUES (?);",
            [categoria]
        );
        return row;
    }
 
    async updateCategoria(id, categoriaData){
        const {categoria} = categoriaData;
        const [row] = await pool.execute(
            `UPDATE categorias SET
            categoria = ?
            WHERE id_categoria = ?;`
            ,
            [categoria, id]
        );
        return row
    }
 
    async deleteCategoria(id){
        const [row] = await pool.execute(
            "DELETE FROM categorias WHERE id_categoria = ?;",
            [id]
        );
        return row;
 
    }
 
}
 
export default new CategoriasModel()