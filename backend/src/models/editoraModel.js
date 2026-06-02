import pool from '../database/database.js'
 
class EditorasModel{
    async showEditoras(){
        const [rows] = await pool.execute("SELECT * FROM editoras;");
        return rows
    }
 
    async getEditorasByname(name){
        const [row] = await pool.execute(
        "SELECT * FROM editoras WHERE nome = ?;",
        [name]
        );
        return row;
    }
 
    async createEditoras(editorasData){
        const {nome, email, telefone}  = editorasData;
        const [row] = await pool.execute(
            "INSERT INTO editoras(nome, email, telefone) VALUES (?,?,?);",
            [nome, email, telefone]
        );
 
        return row;
    }
 
    async updateeditoras(id, editorasData){
        const {nome, email, telefone} = editorasData;
        const [row] = await pool.execute(
            `
            UPDATE editoras SET
            nome = ?,
            email = ?,
            telefone = ?
            WHERE id_editora = ?;`,
            [nome, email, telefone,id]
        );
        return row;
    }
 
    async deleteEditoras(id){
        const [row] = await pool.execute(
            "DELETE FROM editoras WHERE id_editora = ?; ",
            [id]
        );
        return row;
    }
}
 
export default new EditorasModel();