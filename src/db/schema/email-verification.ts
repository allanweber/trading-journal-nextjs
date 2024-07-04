import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import user from './user';

const emailVerification = sqliteTable('email_verification', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  code: text('code').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  email: text('email').notNull(),
  expires_at: integer('expires_at', { mode: 'timestamp' }).notNull(),
});

export const emailVerificationRelations = relations(
  emailVerification,
  ({ one }) => ({
    user: one(user, {
      fields: [emailVerification.userId],
      references: [user.id],
    }),
  })
);

export default emailVerification;
