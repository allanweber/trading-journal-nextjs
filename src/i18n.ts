import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['en', 'pt-Br'];

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  const messages = {
    ...(await import(`@/messages/${locale}.json`)).default,
    ...(await import(`@/messages/${locale}-client.json`)).default,
  };

  return {
    messages,
  };
});
