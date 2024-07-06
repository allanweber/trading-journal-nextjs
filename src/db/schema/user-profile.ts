import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import user from './user';

const userProfile = sqliteTable('user_profile', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  userId: text('user_id')
    .notNull()
    .unique()
    .references(() => user.id, { onDelete: 'cascade' }),
  displayName: text('display_name'),
  fistName: text('first_name'),
  lastName: text('last_name'),
  dateOfBirth: integer('date_of_birth', { mode: 'timestamp' }),
  imageId: text('image_id'),
  image: text('image'),
  bio: text('bio').notNull().default(''),
  locale: text('locale').notNull().default('en'),
  theme: text('theme').notNull().default('system'),
});

export const profilesRelations = relations(userProfile, ({ one }) => ({
  user: one(user, {
    fields: [userProfile.userId],
    references: [user.id],
  }),
}));

export default userProfile;
