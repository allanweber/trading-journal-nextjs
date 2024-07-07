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
  fistName?: string,
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
      fistName,
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
        fistName: profile.fistName || googleUser.given_name,
        lastName: profile.lastName || googleUser.family_name,
        image: profile.image || googleUser.picture,
        locale: profile.locale || googleUser.locale,
      })
      .where(eq(userProfile.userId, userId));
  }
};

export const getByUserId = async (userId: string, trans = db) => {
  return await trans.query.userProfile.findFirst({
    where: eq(userProfile.userId, userId),
  });
};
