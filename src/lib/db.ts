import { Pool } from "pg";
import { execSync } from "child_process";

const PG_BIN_READY = "/usr/lib/postgresql/18/bin/pg_isready";
const PG_BIN_CTL = "/usr/lib/postgresql/18/bin/pg_ctl";
const PG_DATA_DIR = "/home/tariq/.gemini/antigravity/scratch/pgdata";
const PG_PORT = "5433";

function tryAutoStartDb(): void {
  try {
    try {
      execSync(`${PG_BIN_READY} -p ${PG_PORT} -h ${PG_DATA_DIR}`, { stdio: "ignore" });
    } catch {
      console.log("[db.ts] Auto-starting local PostgreSQL database...");
      execSync(`${PG_BIN_CTL} -D ${PG_DATA_DIR} -l ${PG_DATA_DIR}/pg.log -o "-p ${PG_PORT} -k ${PG_DATA_DIR}" -w start`, { stdio: "ignore" });
    }
  } catch {}
}

const globalForDb = globalThis as unknown as {
  pool?: Pool;
  dbUnavailableUntil?: number;
};

function getConnectionString(): string {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL environment variable is not set");
  }
  // Replace localhost with 127.0.0.1 to avoid Node IPv4/IPv6 dual-stack AggregateError on Windows
  return url.replace("@localhost:", "@127.0.0.1:");
}

function createPool(): Pool {
  tryAutoStartDb();
  const p = new Pool({
    connectionString: getConnectionString(),
    connectionTimeoutMillis: 2500,
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

  // If DB was recently found unreachable, attempt quick recovery
  if (globalForDb.dbUnavailableUntil && now < globalForDb.dbUnavailableUntil) {
    tryAutoStartDb();
    globalForDb.dbUnavailableUntil = 0;
  }

  try {
    const result = await pool.query(text, params);
    // Successful query - clear any unavailable flag
    globalForDb.dbUnavailableUntil = 0;
    return result;
  } catch (err: any) {
    const errMsg = err?.message || "Connection error";

    // Auto-resurrect database if offline and retry query once
    if (errMsg.includes("Connection") || errMsg.includes("refused") || errMsg.includes("timeout")) {
      tryAutoStartDb();
      try {
        const retryResult = await pool.query(text, params);
        globalForDb.dbUnavailableUntil = 0;
        return retryResult;
      } catch {}
    }

    // Mark DB unavailable for the next 15 seconds to keep page renders instant
    globalForDb.dbUnavailableUntil = Date.now() + 15000;

    console.warn(`[Database Notice]: DB offline or query failed (${errMsg}). Using fallback.`);

    if (isSelect) {
      return { rows: [], rowCount: 0, command: "SELECT", oid: 0, fields: [] } as any;
    }
    throw new Error(errMsg);
  }
}
