'use client';

import { Feature } from '@/lib/subscriptions-tables';
import { cn } from '@/lib/utils';
import { Plan } from '@/services/subscription-plans.service';
import { User } from 'lucia';
import { CheckIcon } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import IntervalSwitcher from './IntervalSwitcher';

type PlanProps = {
  user?: User;
  plans?: Plan[];
  showSwitcher?: boolean;
  startInterval?: 'month' | 'year';
};

export default function Plans({
  user = undefined,
  plans = [],
  showSwitcher = true,
  startInterval = 'year',
}: PlanProps) {
  const [interval, setInterval] = useState<'month' | 'year'>(startInterval);
  const [currentPlans, setCurrentPlans] = useState(plans);
  const locale = useLocale();
  const t = useTranslations('subscription-plans');
  const currency = locale === 'en' ? '€' : 'R$';

  useEffect(() => {
    const newPrices = plans.map((plan) => {
      const newPrices = plan.prices.filter(
        (price) => price.interval === interval
      );
      return { ...plan, prices: newPrices };
    });
    setCurrentPlans(newPrices);
  }, [interval]);

  return (
    <div>
      {showSwitcher && (
        <IntervalSwitcher state={interval} onChange={setInterval} />
      )}
      <div
        className={cn(
          plans.length === 1 ? '' : 'grid md:grid-cols-2 lg:grid-cols-2 gap-6',
          plans.length >= 3 ? 'xl:grid-cols-3' : 'xl:grid-cols-2'
        )}
      >
        {currentPlans.map((plan) => (
          <Card
            key={plan.id}
            className={
              plan.featured
                ? 'drop-shadow-xl shadow-black/10 dark:shadow-white/10'
                : ''
            }
          >
            <CardHeader>
              <CardTitle className="flex item-center justify-between">
                {t(plan.name)}
                {plan.featured && (
                  <Badge variant="secondary" className="text-sm text-primary">
                    {t('most-popular')}
                  </Badge>
                )}
              </CardTitle>

              <div>
                <span className="text-3xl font-bold">
                  {plan.prices.length > 0
                    ? `${currency} ${plan.prices[0].unitAmount / 100} `
                    : 'Free'}
                </span>
                <span className="text-muted-foreground"> / {t(interval)}</span>
              </div>
              <CardDescription className="h-[50px]">
                {t(plan.description)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" asChild>
                {user ? (
                  <Link
                    href={{
                      pathname: '/api/stripe/checkout',
                      query: { locale, price: plan.prices[0]?.priceId },
                    }}
                  >
                    {t('subscribe-now')}
                  </Link>
                ) : (
                  <Link href="/auth/sign-up">{t('subscribe-now')}</Link>
                )}
              </Button>
            </CardContent>

            <hr className="w-4/5 m-auto mb-4" />
            <CardFooter className="flex">
              <div className="grid gap-4">
                {plan.features.map((feature: Feature) => (
                  <div key={feature.title} className="flex items-center gap-2">
                    <div>
                      <CheckIcon className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{t(feature.title)}</h3>
                      <p className="text-muted-foreground text-xs">
                        {t(feature.description)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
