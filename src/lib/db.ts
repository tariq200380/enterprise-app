import { Pool } from "pg";

const globalForDb = globalThis as unknown as { pool: Pool };

const pool =
  globalForDb.pool ||
  new Pool({
    connectionString:
      process.env.DATABASE_URL ||
      "postgresql://postgres@localhost:5433/creed_tech_db?host=/home/tariq/.gemini/antigravity/scratch/pgdata",
  });

if (process.env.NODE_ENV !== "production") globalForDb.pool = pool;

export default pool;

export async function query(text: string, params?: any[]) {
  return pool.query(text, params);
}
