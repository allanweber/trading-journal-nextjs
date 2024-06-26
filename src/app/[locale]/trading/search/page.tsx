import { Card } from '@/components/ui/card';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { search } from './action';

export default async function Page({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const t = await getTranslations('search');
  const [data] = await search({ query: searchParams.q });

  return (
    <div className="space-y-3">
      <h1 className="text-2xl">{t('search')}</h1>
      {data?.map((result) => (
        <Card className="p-4" key={result.url}>
          <div>
            <Link
              href="#"
              className="text-lg font-semibold hover:text-blue-500"
              prefetch={false}
            >
              {result.title}
            </Link>
            <p className="text-sm text-gray-500 mt-1">{result.url}</p>
          </div>
          <p className="text-base text-gray-600 mt-2">{result.description}</p>
        </Card>
      ))}
    </div>
  );
}
