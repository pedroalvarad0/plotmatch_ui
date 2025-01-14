import pg from 'pg';
import { env } from '$env/dynamic/private';
const { Pool } = pg;

export const pool = new Pool({
    connectionString: env.PRIVATE_DATABASE_URL,
    ssl: {
        require: true,
        rejectUnauthorized: false
    }
});