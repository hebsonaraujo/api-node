import connection from "../config/dbConn";
class UserModel {
    constructor(){}
    async getAll() {
        return await connection.queryRows('SELECT * FROM `Users`;');
    }
    async getById(idUser: number) {
        return await connection.queryRows(`SELECT * FROM Users WHERE idUser = ${idUser};`);
    }
    async getByOneField(fieldName: string, value: string) {
        const sql = `SELECT * FROM Users WHERE ${fieldName} = ?;`;
        return await connection.queryWithParams(sql, [value]);
    }
    async getByOneField2(fieldName: string, value: string) {
        const sql = `SELECT * FROM Users WHERE ${fieldName} = ?;`;
        return await connection.queryWithParams2(sql, [value]);
    }
    async insertUser(values : string[]){
        const query = 'INSERT INTO Users (nameUser,emailUser,passUser) VALUES(?,?,?);'
        return await connection.insertRow(query,values);
    }
    async editUser(values:any ) {
        const getUser = await this.getById(values.id);
        if(getUser.length > 0) {
            const sql = 'UPDATE Users SET nameUser=?, emailUser=? WHERE idUser=?;';
            await connection.queryWithParams(sql, [values.name,values.mail,values.id]);
            return getUser;
        }
        else {
            throw new Error('IMpossivel editar - Usuario incorreto ou nao existe')
        }
    }
    async deleteUser(id:number) {
        const getUser = await this.getById(id);
        if(getUser.length > 0) {
            const sql = 'DELETE FROM Users WHERE idUser=?;';
            await connection.queryWithParams(sql, [id]);
            return getUser;
        }
        else {
            throw new Error('IMpossivel Excluir - Usuario incorreto ou nao existe')
        }
    }
}
export default new UserModel();