import pool from "../database/database.js";

class UserModel{
    async selectAllUsers() {
        const query = `select * from users;`;
        const [rows] = await pool.execute(query);
        return rows;
    }

    async selectUserById(id){
        const query = `select * from users where user_id = ?;`;
        const [rows] = await pool.execute(query, [id]);
        return  rows;
    }

    async selectUserByEmail(email, id = 0){
        const query = `select * from users where user_email = ? and user_id != ?;`;
        const [row] = await  pool.execute(query, [email, id]);
        return row;
    }

    async insertUser(user){
        const{user_name, user_email, user_password, user_phone, role_id ,user_status} = user;
        const query = `insert into users
            (user_name, user_email, user_password, user_phone, role_id, user_status)
            values
            (?,?,?,?,?,?)`;
        const [result] = await pool.execute(query, [
            user_name, user_email, user_password, user_phone, role_id ,user_status,
        ]);

        return result;
    }

    async updateUser(id, user){
        const{user_name, user_email, user_password, user_phone, role_id ,user_status} = user;
        const query = `update users set 
            user_name = ?,
            user_email = ?,
            user_password = ?,
            user_phone = ? ,
            role_id = ?,
            user_status =?
            where user_id = ?`

            const [result] = await pool.execute(query, [
                user_name, user_email, user_password, user_phone, role_id ,user_status, id
            ])

            return result
    };
    async deleteUser(id){
        const query = `delete from users where user_id = ? ; `;
        const [result] = await pool.execute(query, [id]);
        return result;
    }

} 

export default new UserModel();