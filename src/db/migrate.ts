import { client, db } from '@/db';
import { migrate } from 'drizzle-orm/libsql/migrator';
import config from '../../drizzle.config';

await migrate(db, { migrationsFolder: config.out! });

await client.close();
