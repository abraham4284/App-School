import { createPool } from "mysql2/promise";
import dotenv from 'dotenv';

dotenv.config();

export const pool = createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

pool.getConnection()
    .then((connection) => {
        console.log('Conectada correctamente', connection.threadId);
        connection.release();  // Asegúrate de liberar la conexión después de usarla
    })
    .catch((error) => {
        console.error('Error al conectar a la base de datos:', error.message);
    });
