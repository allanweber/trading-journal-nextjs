import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Badge } from '@/components/ui/badge';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import image3 from '../assets/ai.svg';
import image1 from '../assets/chart.svg';
import image2 from '../assets/dashboard.svg';

interface FeatureProps {
  key: string;
  image?: any;
}

const features: FeatureProps[] = [
  {
    key: 'charts',
    image: image1,
  },
  {
    key: 'portfolio',
    image: image2,
  },
  {
    key: 'ai',
    image: image3,
  },
];

const featuresListKeys = [
  'multi',
  'unlimited',
  'performance',
  'stock',
  'futures',
  'forex',
  'cryptocurrency',
  'dividends',
  'multi-currency',
  'image-storage',
];

export default function Features() {
  const t = useTranslations('site');
  const featuresCards = useTranslations('site.features-cards');
  const featuresListT = useTranslations('site.features-list');

  return (
    <section id="features" className="container py-24 sm:py-32 space-y-8">
      <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
        {t.rich('features-title', {
          great: (chunks) => (
            <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
              {chunks}
            </span>
          ),
        })}
      </h2>

      <div className="flex flex-wrap md:justify-center gap-4">
        {featuresListKeys.map((feature: string) => (
          <div key={feature}>
            <Badge variant="secondary" className="text-sm">
              {featuresListT(feature)}
            </Badge>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(({ key, image }: FeatureProps) => (
          <Card key={key}>
            <CardHeader>
              <CardTitle>{featuresCards(`${key}.title`)}</CardTitle>
            </CardHeader>

            <CardContent>{featuresCards(`${key}.description`)}</CardContent>
            <Image
              src={image}
              alt="About feature"
              className="w-[200px] lg:w-[300px] mx-auto mt-8"
              width={300}
              height={300}
            />
            <CardFooter></CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
