import Plans from '@/components/plans/Plans';
import { Button } from '@/components/ui/button';
import { validateRequest } from '@/lib/auth';
import { Feature } from '@/lib/subscriptions-tables';
import { retrievePlans } from '@/services/subscription-plans.service';
import { retrieveSubscription } from '@/services/user-subscription.service';
import { ArrowRightIcon, CheckIcon } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Page() {
  const t = await getTranslations('subscription');
  const tPlans = await getTranslations('subscription-plans');
  const locale = await getLocale();
  const { user } = await validateRequest();

  if (!user) {
    return redirect(`/auth/sign-in`);
  }

  const subscription = await retrieveSubscription(user.id);
  const plans = (await retrievePlans(locale)).filter((plan) => {
    return plan.id !== 'free';
  });

  if (subscription.free) {
    return (
      <div className="space-y-6">
        <div className="px-4 md:px-6 lg:px-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold">{t('free-call')}</h1>
            <p className="text-muted-foreground text-lg md:text-xl">
              {t('free-action')}
            </p>
          </div>
          <div>
            <Button asChild variant="outline">
              <Link
                href={{
                  pathname: '/api/stripe/checkout',
                  query: { locale, plan: 'essential' },
                }}
              >
                Checkout
              </Link>
            </Button>
          </div>
          <Plans user={user} plans={plans} />
        </div>
      </div>
    );
  }

  const currencySymbol = subscription.currency === 'eur' ? '€' : 'R$';
  const price = subscription.price / 100;
  const priceLabel = `${currencySymbol}${price}`;

  return (
    <div className="space-y-6">
      <div className="px-4">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">{t('title')}</h1>
          <p className="text-muted-foreground text-lg">
            {t('description', { plan: t(subscription.plan.id) })}
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 mt-10">
          <div className="space-y-6">
            <div className="grid gap-4">
              {subscription.plan.features.map((feature: Feature) => (
                <div key={feature.title} className="flex items-center gap-4">
                  <CheckIcon className="w-6 h-6 text-primary" />
                  <div>
                    <h3 className="font-medium">{tPlans(feature.title)}</h3>
                    <p className="text-muted-foreground text-xs">
                      {tPlans(feature.description)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-muted rounded-lg p-6 md:p-8 lg:p-10 space-y-6">
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold">{priceLabel}</div>
              <p className="text-muted-foreground text-sm">
                {subscription.plan.interval === 'year' ? t('year') : t('month')}
              </p>
            </div>
            <div className="space-y-4">
              <Button className="w-full" asChild>
                <Link
                  href={{
                    pathname: '/api/stripe/manage',
                  }}
                >
                  {t('manage')}
                </Link>
              </Button>
              <Link
                href="#"
                className="inline-flex items-center justify-center gap-2 text-sm font-medium text-primary hover:underline"
                prefetch={false}
              >
                {t('upgrade', { plan: t('premium') })}
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
