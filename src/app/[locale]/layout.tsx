import LocaleSelect from '@/components/LocaleSelect';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter } from 'next/font/google';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Trading Journal',
  description: 'Trading Journal App',
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body
        className={`${inter.className} flex flex-col items-center mt-10 gap-4`}
      >
        <NextIntlClientProvider messages={messages}>
          <header>
            <nav>
              <LocaleSelect />
            </nav>
          </header>
          <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}