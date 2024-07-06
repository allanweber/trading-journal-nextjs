import db from '..';
import { userPlans } from '../schema';

export const addFreePlan = async (userId: string, trans = db) => {
  const [plan] = await trans
    .insert(userPlans)
    .values({
      userId,
      plan: 'free',
    })
    .returning();
  return plan;
};
