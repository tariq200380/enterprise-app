import { Pool } from "pg";

const globalForDb = globalThis as unknown as {
  pool?: Pool;
  dbUnavailableUntil?: number;
};

function getConnectionString(): string {
  const url =
    process.env.DATABASE_URL ||
    "postgresql://postgres:postgres@127.0.0.1:5432/creed_tech_db";
  // Replace localhost with 127.0.0.1 to avoid Node IPv4/IPv6 dual-stack AggregateError on Windows
  return url.replace("@localhost:", "@127.0.0.1:");
}

function createPool(): Pool {
  const p = new Pool({
    connectionString: getConnectionString(),
    connectionTimeoutMillis: 1500,
  });

  p.on("error", (err) => {
    // Prevent unhandled error event on idle/failed clients
    console.warn("[PostgreSQL Pool Error]", err?.message || "Connection error");
  });

  return p;
}

const pool = globalForDb.pool || createPool();

if (process.env.NODE_ENV !== "production") {
  globalForDb.pool = pool;
}

export default pool;

export async function query(text: string, params?: any[]) {
  const now = Date.now();
  const isSelect = text.trim().toUpperCase().startsWith("SELECT");

  // If DB was recently found to be unreachable, fast-fail SELECT queries with fallback
  if (globalForDb.dbUnavailableUntil && now < globalForDb.dbUnavailableUntil) {
    if (isSelect) {
      return { rows: [], rowCount: 0, command: "SELECT", oid: 0, fields: [] } as any;
    }
    throw new Error("Database is currently unavailable");
  }

  try {
    const result = await pool.query(text, params);
    // Successful query - clear any unavailable flag
    globalForDb.dbUnavailableUntil = 0;
    return result;
  } catch (err: any) {
    // Mark DB unavailable for the next 15 seconds to keep page renders instant
    globalForDb.dbUnavailableUntil = Date.now() + 15000;

    const errMsg = err?.message || "Connection error";
    console.warn(`[Database Notice]: DB offline or query failed (${errMsg}). Using fallback.`);

    if (isSelect) {
      return { rows: [], rowCount: 0, command: "SELECT", oid: 0, fields: [] } as any;
    }
    throw new Error(errMsg);
  }
}
