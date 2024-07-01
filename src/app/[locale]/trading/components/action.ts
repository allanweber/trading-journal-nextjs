'use server';

import { logout } from '@/lib/user-auth';
import { getLocale } from 'next-intl/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function signOut() {
  const blankCookie = await logout();
  cookies().set(blankCookie.name, blankCookie.value, blankCookie.attributes);

  const locale = await getLocale();
  return redirect(`/${locale}/site`);
}
