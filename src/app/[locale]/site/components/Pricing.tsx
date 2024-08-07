import Plans from '@/components/plans/Plans';
import { retrievePlans } from '@/services/subscription-plans.service';
import { getLocale, getTranslations } from 'next-intl/server';

export default async function Pricing() {
  const t = await getTranslations('site');
  const locale = await getLocale();

  const plans = (await retrievePlans(locale)).map((plan: any) => {
    if (plan.id === 'essentials') {
      return {
        ...plan,
        featured: true,
      };
    }
    return plan;
  });

  return (
    <section id="pricing" className="container py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        {t.rich('pricing-title', {
          unlimited: (chunks) => (
            <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
              {chunks}
            </span>
          ),
        })}
      </h2>
      <h3 className="text-xl text-center text-muted-foreground pt-4 pb-8">
        {t('pricing-description')}
      </h3>
      <Plans plans={plans} />
    </section>
  );
}
