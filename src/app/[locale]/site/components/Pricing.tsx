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
import { Check } from 'lucide-react';
import { useTranslations } from 'next-intl';

enum PopularPlanType {
  NO = 0,
  YES = 1,
}

interface PricingProps {
  title: string;
  popular: PopularPlanType;
  price: number;
  description: string;
  buttonText: string;
  benefitList: string[];
}

const pricingList: PricingProps[] = [
  {
    title: 'Free',
    popular: 0,
    price: 0,
    description:
      'Our free plan includes basic features and is perfect for a beginner.',
    buttonText: 'Get Started',
    benefitList: [
      '1 Portfolio',
      '500 MB Image Storage',
      'As many Trades as you want',
      'Community support',
    ],
  },
  {
    title: 'Essential',
    popular: 1,
    price: 10,
    description: 'You are ready to take your trading to the next level.',
    buttonText: 'Start Free Trial',
    benefitList: [
      '5 portfolios',
      '5 GB Image Storage',
      'Custom Dashboards',
      'As many Trades as you want',
      'Priority support',
    ],
  },
  {
    title: 'Premium',
    popular: 0,
    price: 40,
    description:
      'You are a professional trader and need the best tools to help you succeed.',
    buttonText: 'Contact US',
    benefitList: [
      'All Essential Features',
      'Unlimited Portfolios',
      'Unlimited Image Storage',
      'AI Predictions',
    ],
  },
];

const freeKeys = ['portfolios', 'storage', 'trades', 'support'];
const essentialKeys = [
  'portfolios',
  'storage',
  'dashboards',
  'trades',
  'support',
];

const premiumKeys = ['all', 'portfolios', 'storage', 'ai'];

export default function Pricing() {
  const t = useTranslations('site');
  const freeT = useTranslations('site.free');
  const essentialT = useTranslations('site.essential');
  const premiumT = useTranslations('site.premium');

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
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex item-center justify-between">
              {freeT('title')}
            </CardTitle>
            <div>
              {freeT.rich('price', {
                price: (price) => (
                  <span className="text-3xl font-bold">{price}</span>
                ),
                month: (month) => (
                  <span className="text-muted-foreground"> /{month}</span>
                ),
              })}
            </div>

            <CardDescription>{freeT('description')}</CardDescription>
          </CardHeader>

          <CardContent>
            <Button className="w-full">{freeT('button')}</Button>
          </CardContent>

          <hr className="w-4/5 m-auto mb-4" />

          <CardFooter className="flex">
            <div className="space-y-4">
              {freeKeys.map((benefit: string) => (
                <span key={benefit} className="flex">
                  <Check className="text-green-500" />{' '}
                  <h3 className="ml-2">{freeT(benefit)}</h3>
                </span>
              ))}
            </div>
          </CardFooter>
        </Card>

        <Card className="drop-shadow-xl shadow-black/10 dark:shadow-white/10">
          <CardHeader>
            <CardTitle className="flex item-center justify-between">
              {essentialT('title')}
              <Badge variant="secondary" className="text-sm text-primary">
                {essentialT('most-popular')}
              </Badge>
            </CardTitle>
            <div>
              {essentialT.rich('price', {
                price: (price) => (
                  <span className="text-3xl font-bold">{price}</span>
                ),
                month: (month) => (
                  <span className="text-muted-foreground"> /{month}</span>
                ),
              })}
            </div>

            <CardDescription>{essentialT('description')}</CardDescription>
          </CardHeader>

          <CardContent>
            <Button className="w-full">{essentialT('button')}</Button>
          </CardContent>

          <hr className="w-4/5 m-auto mb-4" />

          <CardFooter className="flex">
            <div className="space-y-4">
              {essentialKeys.map((benefit: string) => (
                <span key={benefit} className="flex">
                  <Check className="text-green-500" />{' '}
                  <h3 className="ml-2">{essentialT(benefit)}</h3>
                </span>
              ))}
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex item-center justify-between">
              {premiumT('title')}
            </CardTitle>
            <div>
              {premiumT.rich('price', {
                price: (price) => (
                  <span className="text-3xl font-bold">{price}</span>
                ),
                month: (month) => (
                  <span className="text-muted-foreground"> /{month}</span>
                ),
              })}
            </div>
            <CardDescription>{premiumT('description')}</CardDescription>
          </CardHeader>

          <CardContent>
            <Button className="w-full">{premiumT('button')}</Button>
          </CardContent>

          <hr className="w-4/5 m-auto mb-4" />

          <CardFooter className="flex">
            <div className="space-y-4">
              {premiumKeys.map((benefit: string) => (
                <span key={benefit} className="flex">
                  <Check className="text-green-500" />{' '}
                  <h3 className="ml-2">{premiumT(benefit)}</h3>
                </span>
              ))}
            </div>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
