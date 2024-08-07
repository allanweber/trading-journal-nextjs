import { validateRequest } from '@/lib/auth';
import { constants } from '@/lib/config';
import { absoluteUrl } from '@/lib/server-utils';
import { stripe } from '@/lib/stripe';
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

  const priceId = request.nextUrl.searchParams.get('price');
  const locale = request.nextUrl.searchParams.get('locale') ?? 'en';

  if (!priceId) {
    return NextResponse.json({ error: 'priceId not found' }, { status: 400 });
  }

  if (!locale) {
    return NextResponse.json({ error: 'locale not found' }, { status: 400 });
  }

  const prices = await stripe.prices.list({
    expand: ['data.product'],
  });

  if (prices.data.length === 0) {
    return NextResponse.json({ error: 'Price not found' }, { status: 400 });
  }

  const price = prices.data.find((price) => price.id === priceId);
  if (!price) {
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
        price: priceId,
        quantity: 1,
      },
    ],
    metadata: {
      userId: user.id,
    },
  });

  return Response.redirect(session.url!);
}
