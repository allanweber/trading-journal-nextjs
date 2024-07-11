import { useLocale } from 'next-intl';
import { redirect, usePathname, useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

export function useSetLocale() {
  const currentLocale = useLocale();
  const [locale, setLocale] = useState(currentLocale);
  const pathname = usePathname();
  const router = useRouter();

  return useMemo(() => {
    if (locale !== currentLocale) {
      if (!pathname) router.push('/');
      const segments = pathname.split('/');
      segments[1] = locale;
      const newRoute = segments.join('/');
      redirect(newRoute);
    }

    return { locale, setLocale };
  }, [currentLocale, locale, pathname, router]);
}
