import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getAuthUser } from '@/lib/auth';
import prisma from '@/lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
});

export const dynamic = 'force-dynamic';

// Price IDs provided by user
const PLAN_PRICE_IDS = {
    PLUS: 'price_1T4hU5QGvnEX2f56a0AdmG6r',
    PRO: 'price_1T4hUPQGvnEX2f56xXwLNls8'
};

export async function POST(req) {
    try {
        const auth = getAuthUser(req);
        if (!auth) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }
        const user = { id: auth.userId, email: auth.email };

        const { plan } = await req.json();

        if (!plan || !PLAN_PRICE_IDS[plan]) {
            return NextResponse.json({ success: false, error: 'Invalid plan selected' }, { status: 400 });
        }

        // Fetch user from DB to check if they already have a Stripe customer ID
        const dbUser = await prisma.user.findUnique({
            where: { id: user.id }
        });

        let customerId = dbUser?.stripeCustomerId;

        // Create a new Stripe customer if they don't have one
        if (!customerId) {
            const customer = await stripe.customers.create({
                email: user.email,
                metadata: {
                    userId: user.id,
                },
            });
            customerId = customer.id;

            // Save the customer ID to the database
            await prisma.user.update({
                where: { id: user.id },
                data: { stripeCustomerId: customerId }
            });
        }

        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

        // Create Checkout Session
        const session = await stripe.checkout.sessions.create({
            customer: customerId,
            payment_method_types: ['card'],
            line_items: [
                {
                    price: PLAN_PRICE_IDS[plan],
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${appUrl}?upgrade_success=true&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${appUrl}?upgrade_cancelled=true`,
            client_reference_id: user.id,
            metadata: {
                userId: user.id,
                plan: plan
            },
            subscription_data: {
                metadata: {
                    userId: user.id,
                    plan: plan
                }
            }
        });

        return NextResponse.json({ success: true, url: session.url });
    } catch (error) {
        console.error('Stripe Checkout Error:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Error creating checkout session' },
            { status: 500 }
        );
    }
}
