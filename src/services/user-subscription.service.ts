import { createTransaction } from '@/db';
import {
  addPaidPlan,
  findUserPlanByStripeCustomerId,
  findUserPlanByUserId,
  removePlan,
  updatePaidPlan,
} from '@/db/repositories/userPlans.repository';
import { stripe } from '@/lib/stripe';
import { subscriptionPlans } from '@/lib/subscriptions-tables';
import { z } from 'zod';

const planUpdateSchema = z.object({
  stripeCustomerId: z.string(),
  userId: z.string().optional(),
  stripeSubscriptionId: z.string().optional(),
  stripePriceId: z.string().optional(),
  stripeCurrentPeriodEnd: z.date(),
});
export type PlanUpdate = z.infer<typeof planUpdateSchema>;

export async function updateUserPlan(plan: PlanUpdate) {
  let currentPlan = undefined;

  await createTransaction(async (trans) => {
    if (plan.userId) {
      currentPlan = await findUserPlanByUserId(plan.userId, trans);
    } else {
      currentPlan = await findUserPlanByStripeCustomerId(
        plan.stripeCustomerId,
        trans
      );
    }

    if (currentPlan) {
      if (currentPlan.isFree) {
        await removePlan(currentPlan.userId, trans);
        return await addPaidPlan(
          currentPlan.userId,
          plan.stripeCustomerId,
          plan.stripeSubscriptionId!,
          plan.stripePriceId!,
          plan.stripeCurrentPeriodEnd,
          trans
        );
      }

      return await updatePaidPlan(
        currentPlan.userId,
        plan.stripePriceId!,
        plan.stripeCurrentPeriodEnd,
        trans
      );
    } else {
      throw new Error('User plan not found');
    }
  });
}

export async function retrieveSubscription(userId: string) {
  const userPlan = await findUserPlanByUserId(userId);

  if (!userPlan) {
    return {
      free: true,
      expired: false,
      canceled: false,
      price: 0,
    };
  }

  let stripeData: any = undefined;
  let subscriptionPlan = undefined;
  if (userPlan.stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(
      userPlan.stripeSubscriptionId
    );

    stripeData = {
      customerId: userPlan.stripeCustomerId,
      canceled: stripePlan.status === 'canceled',
      subscriptionId: stripePlan.id,
      productId: stripePlan.items.data[0].price.product,
      currentPeriodEnd: stripePlan.current_period_end,
      price: stripePlan.items.data[0].price.unit_amount,
      currency: stripePlan.items.data[0].price.currency,
      interval: stripePlan.items.data[0].price.recurring?.interval,
    };

    subscriptionPlan = subscriptionPlans.find(
      (plan) => plan.stripeProductId === stripeData.productId
    );
  }

  return {
    free: userPlan.isFree,
    expired: userPlan.expiresAt
      ? userPlan.expiresAt.getTime() + 86_400_000 < Date.now()
      : false,
    ...stripeData,
    plan: {
      ...subscriptionPlan,
    },
  };
}
