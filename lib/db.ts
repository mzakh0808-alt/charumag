import "server-only";

import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import postgres from "postgres";
import demoData from "@/data/demo.json";
import type { Database, Inventory, Product, Store } from "@/lib/types";

const dataDirectory = path.join(process.cwd(), "data");
const localDataPath = path.join(dataDirectory, "db.local.json");
const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
let writeQueue: Promise<unknown> = Promise.resolve();
let postgresClient: ReturnType<typeof postgres> | undefined;
let postgresReady: Promise<void> | undefined;

function seedDatabase() {
  return structuredClone(demoData) as Database;
}

function parseStoredDatabase(data: unknown): Database {
  if (typeof data === "string") return JSON.parse(data) as Database;
  return data as Database;
}

function assertStorageConfigured() {
  if (process.env.VERCEL && !connectionString) {
    throw new Error("DATABASE_URL is required on Vercel. Connect a PostgreSQL database to the project.");
  }
}

async function getPostgresClient() {
  if (!connectionString) throw new Error("DATABASE_URL is not configured");
  if (!postgresClient) {
    const isLocal = /(?:localhost|127\.0\.0\.1)/.test(connectionString);
    postgresClient = postgres(connectionString, {
      ssl: isLocal ? undefined : "require",
      prepare: false,
      max: 5,
    });
  }
  if (!postgresReady) {
    postgresReady = (async () => {
      const sql = postgresClient!;
      await sql`
        CREATE TABLE IF NOT EXISTS more_chaya_state (
          id SMALLINT PRIMARY KEY,
          data JSONB NOT NULL,
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;
      await sql`
        INSERT INTO more_chaya_state (id, data)
        VALUES (1, ${JSON.stringify(seedDatabase())}::jsonb)
        ON CONFLICT (id) DO NOTHING
      `;
    })().catch((error) => {
      postgresReady = undefined;
      throw error;
    });
  }
  await postgresReady;
  return postgresClient;
}

async function getLocalDb(): Promise<Database> {
  try {
    const content = await fs.readFile(localDataPath, "utf8");
    return JSON.parse(content) as Database;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    return seedDatabase();
  }
}

export async function getDb(): Promise<Database> {
  assertStorageConfigured();
  if (connectionString) {
    const sql = await getPostgresClient();
    const rows = await sql<{ data: unknown }[]>`SELECT data FROM more_chaya_state WHERE id = 1`;
    if (!rows[0]) throw new Error("Demo state is missing from PostgreSQL");
    return parseStoredDatabase(rows[0].data);
  }
  return getLocalDb();
}

async function updatePostgres<T>(update: (database: Database) => T | Promise<T>): Promise<T> {
  const sql = await getPostgresClient();
  return sql.begin(async (transaction) => {
    const rows = await transaction<{ data: unknown }[]>`
      SELECT data FROM more_chaya_state WHERE id = 1 FOR UPDATE
    `;
    if (!rows[0]) throw new Error("Demo state is missing from PostgreSQL");
    const database = parseStoredDatabase(rows[0].data);
    const result = await update(database);
    await transaction`
      UPDATE more_chaya_state
      SET data = ${JSON.stringify(database)}::jsonb, updated_at = NOW()
      WHERE id = 1
    `;
    return result;
  });
}

function updateLocal<T>(update: (database: Database) => T | Promise<T>): Promise<T> {
  const operation = writeQueue.then(async () => {
    const database = await getLocalDb();
    const result = await update(database);
    await fs.mkdir(dataDirectory, { recursive: true });
    const temporaryPath = path.join(dataDirectory, `${randomUUID()}.tmp`);
    await fs.writeFile(temporaryPath, `${JSON.stringify(database, null, 2)}\n`, "utf8");
    await fs.rename(temporaryPath, localDataPath);
    return result;
  });
  writeQueue = operation.catch(() => undefined);
  return operation as Promise<T>;
}

export async function updateDb<T>(update: (database: Database) => T | Promise<T>): Promise<T> {
  assertStorageConfigured();
  if (connectionString) return updatePostgres(update);
  return updateLocal(update);
}

export function getProductStock(inventory: Inventory[], productId: string, storeId?: string) {
  return inventory
    .filter((item) => item.productId === productId && (!storeId || item.storeId === storeId))
    .reduce((sum, item) => sum + item.quantity, 0);
}

export function getActiveStores(database: Database, pickupOnly = false): Store[] {
  return database.stores.filter(
    (store) => store.isActive && store.kind === "retail" && (!pickupOnly || store.isPickupAvailable),
  );
}

export type ProductWithStock = Product & { stock: number };

export function withStock(database: Database, product: Product): ProductWithStock {
  return { ...product, stock: getProductStock(database.inventory, product.id) };
}
