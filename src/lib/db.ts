import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://postgres@127.0.0.1:5433/creed_tech_db",
});

export default pool;

export async function query(text: string, params?: any[]) {
  return pool.query(text, params);
}
