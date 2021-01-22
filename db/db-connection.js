import { Pool } from 'pg';
import config from './config';

// Coloca aquí tus credenciales
const pool = new Pool({
  user: config.USER,
  host: config.HOST,
  database: config.DB,
  password: config.PASSWORD,
});

export default pool;