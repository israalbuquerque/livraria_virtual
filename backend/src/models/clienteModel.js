import pool from '../database/database.js'

class ClientesModel{

    async showClientes() {
        const [rows] = await pool.execute("SELECT * FROM clientes;");
        return rows;
    }

    async getClientesByEmail(email){
        const [row] = await  pool.execute(
            "SELECT * FROM clientes WHERE email = ?;",
            [email]
        );
        return row;
    }

    async createCliente(clienteData){
        const {nome, email, telefone, cidade, estado} = clienteData;
        const [row] = await pool.execute(
            "INSERT INTO clientes(nome, email, telefone, cidade, estado) VALUES (?,?,?,?,?)",
            [nome, email, telefone, cidade, estado]
        );
        return row
    }

    async updateCliente(id, clienteData){
        const {nome, email, telefone, cidade, estado} = clienteData;
        const [row] = await pool.execute(
            `UPDATE clientes SET
            nome = ?,
            email = ?,
            telefone = ?,
            cidade = ?,
            estado = ?
            WHERE id_cliente = ?;
            `,
            [nome, email, telefone, cidade, estado, id]
        );
        return row;
    }

    async deleteCliente(id){
        const [row] = await pool.execute(
            "DELETE FROM clientes WHERE id_cliente = ?",
            [id]
        );
        return row;
    }

}
export default new ClientesModel()