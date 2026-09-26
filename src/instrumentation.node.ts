import { execSync } from "child_process";

const PG_BIN_READY = "/usr/lib/postgresql/18/bin/pg_isready";
const PG_BIN_CTL = "/usr/lib/postgresql/18/bin/pg_ctl";
const PG_DATA_DIR = "/home/tariq/.gemini/antigravity/scratch/pgdata";
const PG_PORT = "5433";

/**
 * Ensures the PostgreSQL database cluster is online and accepting connections.
 * Automatically starts the database server if the system was rebooted.
 */
export function ensureDatabaseRunning(): void {
  try {
    execSync(`${PG_BIN_READY} -p ${PG_PORT} -h ${PG_DATA_DIR}`, { stdio: "ignore" });
  } catch {
    try {
      console.log("[Database Service] PostgreSQL on port 5433 is offline. Starting server...");
      const startCmd = `${PG_BIN_CTL} -D ${PG_DATA_DIR} -l ${PG_DATA_DIR}/pg.log -o "-p ${PG_PORT} -k ${PG_DATA_DIR}" -w start`;
      execSync(startCmd, { stdio: "inherit" });
      console.log("[Database Service] PostgreSQL started successfully on port 5433.");
    } catch (err: any) {
      console.warn("[Database Service] Auto-start notice:", err?.message || err);
    }
  }
}

/**
 * Schedules periodic news synchronization in the background.
 */
export async function startNewsScheduler(): Promise<void> {
  const { syncAllNewsFeeds } = await import("@/lib/newsSync");

  // Perform an initial background sync 5 seconds after server startup
  setTimeout(async () => {
    try {
      console.log("[Auto-Scheduler] Starting initial news sync...");
      await syncAllNewsFeeds();
      console.log("[Auto-Scheduler] Initial news sync completed successfully.");
    } catch (err) {
      console.warn("[Auto-Scheduler] Initial news sync warning:", err);
    }
  }, 5000);

  // Schedule background news synchronization every 30 minutes
  const SYNC_INTERVAL_MS = 30 * 60 * 1000;
  setInterval(async () => {
    try {
      console.log("[Auto-Scheduler] Starting scheduled periodic news sync...");
      await syncAllNewsFeeds();
      console.log("[Auto-Scheduler] Scheduled periodic news sync completed.");
    } catch (err) {
      console.warn("[Auto-Scheduler] Scheduled news sync warning:", err);
    }
  }, SYNC_INTERVAL_MS);
}

ensureDatabaseRunning();
startNewsScheduler();
