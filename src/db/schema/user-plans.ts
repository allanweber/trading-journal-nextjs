import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import user from './user';

const userPlans = sqliteTable('user_plans', {
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  isFree: integer('is_free', { mode: 'boolean' }),
  expiresAt: integer('expires_at', { mode: 'timestamp' }),
  stripeSubscriptionId: text('stripe_subscription_id').unique(),
  stripeCustomerId: text('stripe_customer_id').unique(),
  stripePriceId: text('stripe_price_id').unique(),
});

export const userPlansRelations = relations(userPlans, ({ one }) => ({
  user: one(user, {
    fields: [userPlans.userId],
    references: [user.id],
  }),
}));

export default userPlans;
