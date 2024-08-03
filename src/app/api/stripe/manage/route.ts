import { validateRequest } from '@/lib/auth';
import { constants } from '@/lib/config';
import { stripe } from '@/lib/stripe';
import { absoluteUrl } from '@/lib/utils';
import { retrieveSubscription } from '@/services/user-subscription.service';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { user } = await validateRequest();
  if (!user) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: constants.APP_SIGNIN_PAGE,
      },
    });
  }

  const subscription = await retrieveSubscription(user.id);
  const subscriptionUrl = absoluteUrl(
    '/trading/settings/subscription?success=true'
  );

  const session = await stripe.billingPortal.sessions.create({
    customer: subscription.customerId,
    return_url: subscriptionUrl,
  });

  return Response.redirect(session.url!);
}
