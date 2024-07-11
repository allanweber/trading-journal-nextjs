import { GoogleUser } from '@/types';
import { eq } from 'drizzle-orm';
import db from '..';
import { userProfile } from '../schema';

export const createStartProfile = async (
  userId: string,
  displayName: string,
  trans = db
) => {
  return createProfile(
    userId,
    displayName,
    undefined,
    undefined,
    undefined,
    undefined,
    trans
  );
};

export const createProfile = async (
  userId: string,
  displayName: string,
  firstName?: string,
  lastName?: string,
  image?: string,
  locale?: string,
  trans = db
) => {
  const [profile] = await trans
    .insert(userProfile)
    .values({
      userId,
      displayName,
      firstName,
      lastName,
      image,
      locale,
    })
    .returning();
  return profile;
};

export const updateWithGoogle = async (
  userId: string,
  googleUser: GoogleUser,
  trans = db
) => {
  const profile = await trans.query.userProfile.findFirst({
    where: eq(userProfile.userId, userId),
  });

  if (!profile) {
    return await createProfile(
      userId,
      googleUser.name,
      googleUser.given_name,
      googleUser.family_name,
      googleUser.picture,
      googleUser.locale,
      trans
    );
  } else {
    return trans
      .update(userProfile)
      .set({
        displayName: profile.displayName || googleUser.name,
        firstName: profile.firstName || googleUser.given_name,
        lastName: profile.lastName || googleUser.family_name,
        image: profile.image || googleUser.picture,
        locale: profile.locale || googleUser.locale,
      })
      .where(eq(userProfile.userId, userId));
  }
};

export const updateProfile = async (
  userId: string,
  displayName: string,
  firstName?: string,
  lastName?: string,
  bio?: string,
  trans = db
) => {
  return await trans
    .update(userProfile)
    .set({
      displayName,
      firstName: firstName || null,
      lastName: lastName || null,
      bio: bio || undefined,
    })
    .where(eq(userProfile.userId, userId));
};

export const updateProfileAppearance = async (
  userId: string,
  theme: string,
  locale: string,
  trans = db
) => {
  return await trans
    .update(userProfile)
    .set({ theme, locale })
    .where(eq(userProfile.userId, userId));
};

export const getByUserId = async (userId: string, trans = db) => {
  return await trans.query.userProfile.findFirst({
    where: eq(userProfile.userId, userId),
  });
};
