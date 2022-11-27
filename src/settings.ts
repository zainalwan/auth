import * as dotenv from 'dotenv';

dotenv.config({ override: false });

export const POSTGRES_HOST = process.env.POSTGRES_HOST;
export const POSTGRES_PORT = Number(process.env.POSTGRES_PORT);
export const POSTGRES_DB = process.env.POSTGRES_DB;
export const POSTGRES_USER = process.env.POSTGRES_USER;
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
