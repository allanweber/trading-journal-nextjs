import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  BadgeCent,
  Check,
  PieChart,
  Proportions,
  Smartphone,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

const essentialsKey = [
  'portfolios',
  'storage',
  'dashboards',
  'trades',
  'support',
];

export default function HeroCards() {
  const t = useTranslations('site');
  const essentialsT = useTranslations('site.essential');

  return (
    <div className="hidden lg:flex flex-row flex-wrap gap-8 relative w-[700px] h-[500px]">
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

      <Card className="absolute top-[150px] left-[50px] w-72 drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader>
          <CardTitle className="flex item-center justify-between">
            {essentialsT('title')}
            <Badge variant="secondary" className="text-sm text-primary">
              {essentialsT('most-popular')}
            </Badge>
          </CardTitle>
          <div>
            <span className="text-3xl font-bold">$10</span>
            <span className="text-muted-foreground"> /month</span>
          </div>

          <CardDescription>{essentialsT('description')}</CardDescription>
        </CardHeader>

        <CardContent>
          <Button className="w-full">{t('start-free-trial')}</Button>
        </CardContent>

        <hr className="w-4/5 m-auto mb-4" />

        <CardFooter className="flex">
          <div className="space-y-4">
            {essentialsKey.map((benefit: string) => (
              <span key={benefit} className="flex">
                <Check className="text-green-500" />{' '}
                <h3 className="ml-2">{essentialsT(benefit)}</h3>
              </span>
            ))}
          </div>
        </CardFooter>
      </Card>

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
