import mysql,{ ConnectionOptions,PoolOptions, ResultSetHeader,RowDataPacket} from 'mysql2/promise';
import "dotenv/config.js";

interface User extends RowDataPacket {
    id: number;
    name: string;
    emailUser: string,
    passUser: string
}
class MySQL {
    private conn
    private credentials: ConnectionOptions;

    constructor(credentials: ConnectionOptions) {
        this.credentials = credentials;
        this.conn = mysql.createConnection(this.credentials);
        console.log('DB ON...')
    }
    async connect() {
        await mysql.createConnection(access);
    }
    async queryRows(sql: string) {
        const conn = await mysql.createConnection(access);
        const [rows] = await conn.query<User[]>(sql);
        return rows;
    }
    async insertRow(sql: string, arr: string[]) : Promise<number> {
        const conn = await mysql.createConnection(access);
        const [inserted] = await conn.execute<ResultSetHeader>(sql,arr);
        return inserted.insertId;
    }
    async queryWithParams(sql: string, params: any[]) {
        const conn = await mysql.createConnection(access);
        try {
          const [rows] = await conn.execute(sql, params);
          return rows;
        } catch (error) {
          console.error('Erro na consulta SQL:', error);
          throw error;
        }
    }
    //aqui retorna o elemento - REFATORAR
    async queryWithParams2(sql: string, params: any[]) {
        const conn = await mysql.createConnection(access);
        try {
            const [rows] = await conn.execute<User[]>(sql, params);
            if (!Array.isArray(rows) || rows.length === 0) {
                return rows
            }
            const user = rows[0];
            return user;
        } catch (error) {
          console.error('Erro na consulta SQL:', error);
          throw error;
        }
    }
}
const access: PoolOptions = {
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
};
const connection = new MySQL(access);
export default connection;
