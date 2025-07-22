import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const pool = createPool({
  host: process.env.DB_HOST || 'mysql-container',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'your_mysql_password',
  database: process.env.DB_NAME || 'blogs_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 30000,
  keepAliveInitialDelay: 10000,
  enableKeepAlive: true,
});