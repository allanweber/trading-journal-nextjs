import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

const user = sqliteTable('user', {
  id: text('id').notNull().primaryKey(),
  email: text('email').notNull().unique(),
  password_hash: text('password_hash').notNull(),
  email_verified: integer('email_verified', { mode: 'boolean' })
    .notNull()
    .default(false),
});

export default user;
