import env from '@/env';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

export const client = createClient({
  url: env.DATABASE_URL,
  authToken: env.DATABASE_URL,
});

export const db = drizzle(client);

export type db = typeof db;

export default db;
