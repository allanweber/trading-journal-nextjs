import env from '@/env';

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  stripeProductId?: string;
  prices?: Array<Price>;
  features: Array<Feature>;
}

export interface Feature {
  title: string;
  description: string;
}

export interface Price {
  priceId: string;
  currency: string;
  unitAmount: number;
  interval: 'month' | 'year';
}

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'free-title',
    description: 'free-description',
    stripeProductId: undefined,
    prices: undefined,
    features: [
      {
        title: 'free-portfolio',
        description: 'free-portfolio-description',
      },
      {
        title: 'free-storage',
        description: 'free-storage-description',
      },
      {
        title: 'many-trades',
        description: 'many-trades-description',
      },
      {
        title: 'email-support',
        description: 'email-support-description',
      },
    ],
  },
  {
    id: 'essentials',
    name: 'essential-title',
    description: 'essential-description',
    stripeProductId: env.STRIPE_ESSENTIALS_PRODUCT_ID,
    features: [
      {
        title: 'essentials-portfolio',
        description: 'essentials-portfolio-description',
      },
      {
        title: 'essentials-storage',
        description: 'essentials-storage-description',
      },
      {
        title: 'custom-dashboards',
        description: 'custom-dashboards-description',
      },
      {
        title: 'many-trades',
        description: 'many-trades-description',
      },
      {
        title: 'priority-support',
        description: 'priority-support-description',
      },
    ],
  },
  {
    id: 'premium',
    name: 'premium-title',
    description: 'premium-description',
    stripeProductId: env.STRIPE_PREMIUM_PRODUCT_ID,
    features: [
      {
        title: 'all-essentials-features',
        description: 'all-essentials-features-description',
      },
      {
        title: 'unlimited-portfolios',
        description: 'unlimited-portfolios-description',
      },
      {
        title: 'premium-storage',
        description: 'premium-storage-description',
      },
      {
        title: 'ai-insights',
        description: 'ai-insights-description',
      },
      {
        title: 'priority-support',
        description: 'priority-support-description',
      },
    ],
  },
];
