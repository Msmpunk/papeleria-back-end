import { Pool } from 'pg';

// Coloca aquí tus credenciales
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'test',
  password: '123456',
});

export default pool;