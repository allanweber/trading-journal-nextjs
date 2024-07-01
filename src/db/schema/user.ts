import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

const user = sqliteTable('user', {
  id: text('id').notNull().primaryKey(),
  username: text('username').notNull().unique(),
  password_hash: text('password_hash').notNull(),
});

export default user;
