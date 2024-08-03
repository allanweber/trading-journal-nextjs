import env from '@/env';
import { stripe } from '@/lib/stripe';
import {
  PlanUpdate,
  updateUserPlan,
} from '@/services/user-subscription.service';
import { headers } from 'next/headers';
import Stripe from 'stripe';

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get('Stripe-Signature') ?? '';

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(err);
    return new Response(
      `Webhook Error: ${err instanceof Error ? err.message : 'Unknown Error'}`,
      { status: 400 }
    );
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (!session?.metadata?.userId && session.customer == null) {
    return new Response(null, {
      status: 200,
    });
  }

  if (event.type === 'checkout.session.completed') {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    const planUpdate: PlanUpdate = {
      userId: session?.metadata?.userId,
      stripeCustomerId: session.customer as string,
      stripeSubscriptionId: subscription.id,
      stripePriceId: subscription.items.data[0].price.id,
      stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
    };

    await updateUserPlan(planUpdate);
  }

  if (event.type === 'invoice.payment_succeeded') {
    const invoice = event.data.object as Stripe.Invoice;
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    const planUpdate: PlanUpdate = {
      stripeCustomerId: invoice.customer as string,
      stripePriceId: subscription.items.data[0].price.id,
      stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
    };
    await updateUserPlan(planUpdate);
  }

  if (event.type === 'customer.subscription.updated') {
    const subscription = event.data.object as Stripe.Subscription;

    console.log('subscription updated', subscription);
  }

  return new Response(null, { status: 200 });
}
