import env from '@/env';
import { stripe } from '@/lib/stripe';
import { Feature, Price, subscriptionPlans } from '@/lib/subscriptions-tables';
import Stripe from 'stripe';

const product_ids = [
  env.STRIPE_ESSENTIALS_PRODUCT_ID,
  env.STRIPE_PREMIUM_PRODUCT_ID,
];

export type Plan = {
  id: string;
  productId?: string;
  name: string;
  description: string;
  features: Feature[];
  prices: Price[];
  featured?: boolean;
};

export async function retrievePlans(locale: string): Promise<Plan[]> {
  const prices = await stripe.prices.list({
    expand: ['data.product'],
  });
  const plans = prices.data
    .filter((price) =>
      product_ids.includes((price.product as Stripe.Product).id)
    )
    .map((price) => {
      const product = price.product as Stripe.Product;
      return {
        name: product.name,
        productId: product.id,
        priceId: price.id,
        currency: price.currency,
        unitAmount: price.unit_amount,
        interval: price.recurring?.interval as 'month' | 'year',
      };
    })
    .reduce((acc: any, price) => {
      const price_data = {
        priceId: price.priceId,
        currency: price.currency,
        unitAmount: price.unitAmount,
        interval: price.interval,
      };

      const index = acc.findIndex((p: any) => p.id === price.name);
      if (index === -1) {
        acc.push({
          id: price.name,
          productId: price.productId,
          prices: [price_data],
        });
      } else {
        acc[index].prices.push(price_data);
      }
      return acc;
    }, [])
    .map((plan: any) => {
      const subscriptionPlan = subscriptionPlans.find(
        (p) => p.stripeProductId === plan.productId
      );
      if (subscriptionPlan) {
        plan = {
          ...plan,
          id: plan.id.toLowerCase(),
          name: subscriptionPlan.name,
          description: subscriptionPlan.description,
          features: subscriptionPlan.features,
        };
      }
      return plan;
    })
    .sort((a: any, b: any) => (a.id > b.id ? 1 : -1))
    .map((plan: any) => {
      const prices = plan.prices?.filter(
        (price: Price) => price.currency === (locale === 'en' ? 'eur' : 'brl')
      );
      return {
        ...plan,
        prices,
      };
    });

  const freePlan = subscriptionPlans.find((p) => p.id === 'free');

  return [
    {
      id: 'free',
      productId: undefined,
      prices: [],
      name: freePlan?.name,
      description: freePlan?.description,
      features: freePlan?.features,
    },
    ...plans,
  ];
}
