import { verifyRequestOrigin } from 'lucia';
import createMiddleware from 'next-intl/middleware';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'pt-Br'];
const publicPages = [
  '/site',
  '/signin',
  '/signup',
  '/forgot-password',
  '/reset-password',
  '/verify-email',
];

const intlMiddleware = createMiddleware({
  locales: locales,
  defaultLocale: 'en',
  localePrefix: 'always',
});

const authMiddleware = (request: NextRequest) => {
  const session = cookies().get('auth_session')?.value ?? null;
  if (!session) {
    return NextResponse.redirect(new URL('/signin', request.nextUrl));
  }

  if (request.method === 'GET') {
    return intlMiddleware(request);
  }

  const originHeader = request.headers.get('Origin');
  const hostHeader = request.headers.get('Host');
  if (
    !originHeader ||
    !hostHeader ||
    !verifyRequestOrigin(originHeader, [hostHeader])
  ) {
    return new NextResponse(null, {
      status: 403,
    });
  }
  return intlMiddleware(request);
};

export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${publicPages.join('|')})?/?$`,
    'i'
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    return (authMiddleware as any)(req);
  }
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
