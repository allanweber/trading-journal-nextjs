import * as schema from '@/db/schema';
import env from '@/env';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

export const client = createClient({
  url: env.DATABASE_URL!,
  authToken: env.DATABASE_AUTH_TOKEN!,
});

export const db = drizzle(client, { schema, logger: true });

export type db = typeof db;

export default db;

export async function createTransaction<T extends typeof db>(
  cb: (trx: T) => void
) {
  await db.transaction(cb as any);
}
