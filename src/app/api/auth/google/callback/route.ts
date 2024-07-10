import { getAccountByGoogleId } from '@/db/repositories/userAccounts.repository';
import { googleAuth } from '@/lib/auth';
import { constants } from '@/lib/config';
import { setSession } from '@/lib/session';
import { createGoogleUser } from '@/services/user.service';
import { GoogleUser } from '@/types';
import { OAuth2RequestError } from 'arctic';
import { cookies } from 'next/headers';

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const storedState = cookies().get('google_oauth_state')?.value ?? null;
  const codeVerifier = cookies().get('google_code_verifier')?.value ?? null;

  if (
    !code ||
    !state ||
    !storedState ||
    state !== storedState ||
    !codeVerifier
  ) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await googleAuth.validateAuthorizationCode(
      code,
      codeVerifier
    );
    const response = await fetch(
      'https://openidconnect.googleapis.com/v1/userinfo',
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );
    const googleUser: GoogleUser = await response.json();

    const existingAccount = await getAccountByGoogleId(googleUser.sub);
    if (existingAccount) {
      await setSession(existingAccount.userId);
      return new Response(null, {
        status: 302,
        headers: {
          Location: constants.APP_ROOT_PAGE,
        },
      });
    }

    const userId = await createGoogleUser(googleUser);
    await setSession(userId!);
    return new Response(null, {
      status: 302,
      headers: {
        Location: constants.APP_ROOT_PAGE,
      },
    });
  } catch (e) {
    if (e instanceof OAuth2RequestError) {
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
}
