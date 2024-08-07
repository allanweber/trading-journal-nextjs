import { eq } from 'drizzle-orm';
import db from '..';
import { userPlans } from '../schema';

export const addFreePlan = async (userId: string, trans = db) => {
  const [plan] = await trans
    .insert(userPlans)
    .values({
      userId,
      isFree: true,
    })
    .returning();
  return plan;
};

export const findUserPlanByUserId = async (userId: string, trans = db) => {
  return await trans.query.userPlans.findFirst({
    where: eq(userPlans.userId, userId),
  });
};

export const findUserPlanByStripeCustomerId = async (
  stripeCustomerId: string,
  trans = db
) => {
  return await trans.query.userPlans.findFirst({
    where: eq(userPlans.stripeCustomerId, stripeCustomerId),
  });
};

export const removePlan = async (userId: string, trans = db) => {
  return await trans.delete(userPlans).where(eq(userPlans.userId, userId));
};

export const addPaidPlan = async (
  userId: string,
  stripeCustomerId: string,
  stripeSubscriptionId: string,
  stripePriceId: string,
  expiresAt: Date,
  trans = db
) => {
  const [plan] = await trans
    .insert(userPlans)
    .values({
      userId,
      isFree: false,
      stripeCustomerId,
      stripeSubscriptionId,
      stripePriceId,
      expiresAt,
    })
    .returning();
  return plan;
};

export const updatePaidPlan = async (
  userId: string,
  stripePriceId: string,
  expiresAt: Date,
  trans = db
) => {
  return await trans
    .update(userPlans)
    .set({
      stripePriceId,
      expiresAt,
    })
    .where(eq(userPlans.userId, userId));
};
