import mysql, { RowDataPacket } from 'mysql2/promise';
import * as dotenv from 'dotenv';

dotenv.config({ path: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.prod' })

console.log(process.env.DB_HOST);


const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: 3306,
    database: process.env.DB_NAME
});

export async function execute<T>(query: string, params?: any[]) {
    return pool.execute<T & RowDataPacket[]>(query, params);
}