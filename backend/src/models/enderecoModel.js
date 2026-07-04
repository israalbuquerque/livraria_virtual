import pool from "../database/database.js";

class EnderecoModel {
    
    async createEndereco(endereco){
        const{
            id_cliente,
            logradouro,
            numero,
            complemento,
            bairro,
            cidade,
            estado,
            cep,
        } = endereco;
        
        const query = `insert into endereco (
            id_cliente,
            logradouro,
            numero,
            complemento,
            bairro,
            cidade,
            estado,
            cep)
            values (?,?,?,?,?,?,?,?)`;
            
            const [result] = await pool.query(query, [
                id_cliente,
                logradouro,
                numero,
                complemento,
                bairro,
                cidade,
                estado,
                cep,
            ]);

            return result;
    }

    async selectEnderecoByCep(cep){
        const query = `select * from endereco where cep = ?;`;

        const [result] = await pool.execute(query, [cep]);

        return result;
    }
}

export default new EnderecoModel();