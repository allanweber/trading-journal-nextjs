import { validateRequest } from '@/lib/auth';
import { constants } from '@/lib/config';
import { stripe } from '@/lib/stripe';
import { absoluteUrl } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';

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

  const plan = request.nextUrl.searchParams.get('plan');
  const locale = request.nextUrl.searchParams.get('locale') ?? 'en';

  if (!plan) {
    return NextResponse.json({ error: 'Plan not found' }, { status: 400 });
  }

  const prices = await stripe.prices.list({
    lookup_keys: [`${plan}-monthly-${locale}`],
    expand: ['data.product'],
  });

  if (prices.data.length === 0) {
    return NextResponse.json({ error: 'Price not found' }, { status: 400 });
  }

  const successUrl = absoluteUrl('/trading/settings/subscription?success=true');
  const cancelUrl = absoluteUrl('/trading/settings/subscription?canceled=true');

  const session = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    payment_method_types: ['card'],
    mode: 'subscription',
    billing_address_collection: 'auto',
    customer_email: user.email,
    line_items: [
      {
        price: prices.data[0].id,
        quantity: 1,
      },
    ],
    metadata: {
      userId: user.id,
    },
  });

  return Response.redirect(session.url!);
}
