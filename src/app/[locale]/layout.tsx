import LocaleSelect from '@/components/LocaleSelect';
import { ModeToggle } from '@/components/ModeToggle';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/providers/theme';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter as FontSans } from 'next/font/google';
import '../globals.css';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

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
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          'bg-background font-sans antialiased flex flex-col items-center mt-10 gap-4',
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <header className="flex flex-col items-center gap-4">
              <div>
                <ModeToggle />
              </div>
              <nav>
                <LocaleSelect />
              </nav>
            </header>
            <main>{children}</main>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
