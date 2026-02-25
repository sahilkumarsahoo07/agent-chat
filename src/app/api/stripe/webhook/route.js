import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import prisma from '@/lib/prisma';
import { headers } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
});

// The endpoint secret to verify the webhook signature
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req) {
    const body = await req.text();
    const headersList = await headers();
    const sig = headersList.get('stripe-signature');

    let event;

    try {
        if (!sig || !endpointSecret) {
            console.error('Webhook signature or secret missing');
            return NextResponse.json({ error: 'Webhook signature or secret missing' }, { status: 400 });
        }

        event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err) {
        console.error(`Webhook Error: ${err.message}`);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    // Handle the event
    try {
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object;

                // Retrieve the user id from client_reference_id or metadata
                const userId = session.client_reference_id || session.metadata?.userId;
                const plan = session.metadata?.plan || 'PRO'; // Default fallback
                const customerId = session.customer;
                const subscriptionId = session.subscription;

                if (userId) {
                    await prisma.user.update({
                        where: { id: userId },
                        data: {
                            plan: plan.toUpperCase(),
                            stripeCustomerId: customerId,
                            stripeSubscriptionId: subscriptionId,
                            // Set high tokens for paid users, or unlimited
                            tokens: plan.toUpperCase() === 'PRO' ? 1000000 : 500,
                            tokenResetDate: new Date()
                        }
                    });
                    console.log(`Successfully upgraded user ${userId} to ${plan}`);
                } else {
                    console.error('UserId missing from checkout session metadata');
                }
                break;
            }
            case 'customer.subscription.updated': {
                const subscription = event.data.object;
                // You can handle subscription updates here (e.g., changes to plans)
                break;
            }
            case 'customer.subscription.deleted': {
                const subscription = event.data.object;
                const customerId = subscription.customer;

                // Handle subscription cancellation
                if (customerId) {
                    await prisma.user.updateMany({
                        where: { stripeCustomerId: customerId },
                        data: {
                            plan: 'FREE',
                            stripeSubscriptionId: null,
                            tokens: 20 // Reset to free tokens
                        }
                    });
                    console.log(`Downgraded customer ${customerId} to FREE due to subscription deletion`);
                }
                break;
            }
            default:
                console.log(`Unhandled event type ${event.type}`);
        }
    } catch (error) {
        console.error('Database update error:', error);
        return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
    }

    return NextResponse.json({ received: true });
}
