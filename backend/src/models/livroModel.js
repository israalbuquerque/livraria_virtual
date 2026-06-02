import pool from '../database/database.js'
 
class LivrosModel{
    async showLivros(){
        const [row] = await pool.execute("SELECT * FROM livros;");
        return row;
    }
 
    async getlivrosBytitle(titulo){
        const [row] = await pool.execute(
            "SELECT * FROM livros WHERE titulo =?;",
            [titulo]
        );
        return row;
 
    }
 
    async createLivro(livrosData){
        const {titulo, autor, ano_publicacao, preco, id_editora, id_categoria} = livrosData;
        const [row] = await pool.execute(
            "INSERT INTO livros (titulo, autor, ano_publicacao, preco, id_editora, id_categoria) VALUES (?,?,?,?,?,?);",
            [titulo, autor, ano_publicacao, preco,id_editora, id_categoria]
        );
        return row;
    }
 
    async updateLivro(id, livrosData){
        const {titulo, autor, ano_publicacao, preco} = livrosData;
        const [row] = await pool.execute(
            `
            UPDATE livros SET
            titulo = ?,
            autor = ?,
            ano_publicacao = ?,
            preco = ?
            WHERE id_livro = ?;`,
            [titulo, autor, ano_publicacao, preco, id]
        );
        return row
    }
 
    async deleteLivro(id){
        const [row] = await pool.execute(
            "DELETE FROM livros WHERE id_livro = ?;",
            [id]
        )
        return row;
    }
}
 
export default new LivrosModel();