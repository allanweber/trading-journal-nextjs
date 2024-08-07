import Plans from '@/components/plans/Plans';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { retrievePlans } from '@/services/subscription-plans.service';
import { BadgeCent, PieChart, Proportions, Smartphone } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';

export default async function HeroCards() {
  const t = await getTranslations('site');
  const locale = await getLocale();

  const plans = (await retrievePlans(locale))
    .filter((plan) => plan.id === 'essentials')
    .map((plan) => {
      const prices = plan.prices.filter((price) => price.interval === 'month');
      return { ...plan, prices };
    });

  plans[0].featured = true;

  return (
    <div className="hidden lg:flex flex-row flex-wrap gap-8 relative w-[700px] h-[600px]">
      <Card className="absolute w-[340px] -top-[15px] drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
          <div className="mt-1 bg-primary/10 p-1 rounded-2xl">
            <Proportions size={34} className="text-primary" />
          </div>
          <div>
            <CardTitle>{t('custom-dashboards')}</CardTitle>
            <CardDescription className="text-md mt-2">
              {t('custom-dashboards-description')}
            </CardDescription>
          </div>
        </CardHeader>
      </Card>

      <Card className="absolute right-[20px] top-2 w-80 flex flex-col justify-center items-center drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
          <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
            <Smartphone size={34} className="text-primary" />
          </div>
          <div>
            <CardTitle>{t('responsive-design')}</CardTitle>
            <CardDescription className="text-md mt-2">
              {t('responsive-design-description')}
            </CardDescription>
          </div>
        </CardHeader>
      </Card>

      <div className="absolute top-[150px] left-[50px] w-72 drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <Plans plans={plans} showSwitcher={false} startInterval="month" />
      </div>

      <Card className="absolute w-[350px] -right-[10px] bottom-[120px]  drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
          <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
            <PieChart size={34} className="text-primary" />
          </div>
          <div>
            <CardTitle>{t('chart-performance')}</CardTitle>
            <CardDescription className="text-md mt-2">
              {t('chart-performance-description')}
            </CardDescription>
          </div>
        </CardHeader>
      </Card>

      <Card className="absolute  -right-[10px] bottom-[-95px] w-72 drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
          <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
            <BadgeCent size={34} className="text-primary" />
          </div>
          <div>
            <CardTitle>{t('any-market')}</CardTitle>
            <CardDescription className="text-md mt-2">
              {t('any-market-description')}
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
