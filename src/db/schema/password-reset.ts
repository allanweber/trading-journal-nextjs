import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import user from './user';

const passwordReset = sqliteTable('password_reset', {
  tokenHash: text('token_hash').notNull().unique(),
  userId: text('user_id')
    .notNull()
    .unique()
    .references(() => user.id, { onDelete: 'cascade' }),
  email: text('email').notNull(),
  expires_at: integer('expires_at', { mode: 'timestamp' }).notNull(),
});

export const passwordResetRelations = relations(passwordReset, ({ one }) => ({
  user: one(user, {
    fields: [passwordReset.userId],
    references: [user.id],
  }),
}));

export default passwordReset;
