import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import user from './user';

export const plansEnum = ['free', 'essential', 'premium'] as const;

const userPlans = sqliteTable('user-plans', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  plan: text('role', { enum: plansEnum }).notNull(),
  paidAt: integer('paid_at', { mode: 'timestamp' }),
  expiresAt: integer('expires_at', { mode: 'timestamp' }),
});

export const userPlansRelations = relations(userPlans, ({ one }) => ({
  user: one(user, {
    fields: [userPlans.userId],
    references: [user.id],
  }),
}));

export default userPlans;
