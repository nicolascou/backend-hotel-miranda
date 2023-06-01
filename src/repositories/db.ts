import mysql from 'mysql2';
import 'dotenv/config';

export const db = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  database: 'miranda',
  password: process.env.DB_PASSWORD
});
