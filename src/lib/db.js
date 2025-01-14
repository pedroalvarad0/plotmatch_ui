import pg from 'pg';
import { env } from '$env/dynamic/private';
const { Pool } = pg;

export const pool = new Pool({
    user: env.PRIVATE_POSTGRES_USER,
    host: env.PRIVATE_POSTGRES_HOST,
    database: env.PRIVATE_POSTGRES_DB,
    password: env.PRIVATE_POSTGRES_PASSWORD,
    port: env.PRIVATE_POSTGRES_PORT,
    ssl: {
        rejectUnauthorized: false
    }
});