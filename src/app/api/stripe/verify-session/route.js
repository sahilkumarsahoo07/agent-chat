import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getAuthUser } from '@/lib/auth';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(req) {
    try {
        const auth = getAuthUser(req);
        if (!auth) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const { sessionId } = await req.json();
        if (!sessionId) {
            return NextResponse.json({ success: false, error: 'Session ID is required' }, { status: 400 });
        }

        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status === 'paid') {
            const plan = session.metadata?.plan || 'PRO';

            // Check if user is already updated to avoid redundant DB writes (e.g., if webhook already fired)
            const user = await prisma.user.findUnique({ where: { id: auth.userId } });

            if (user.plan !== plan.toUpperCase()) {
                await prisma.user.update({
                    where: { id: auth.userId },
                    data: {
                        plan: plan.toUpperCase(),
                        stripeCustomerId: session.customer,
                        stripeSubscriptionId: session.subscription,
                        tokens: plan.toUpperCase() === 'PRO' ? 2000 : 500,
                        tokenResetDate: new Date()
                    }
                });
            }
            return NextResponse.json({ success: true, plan: plan.toUpperCase() });
        }

        return NextResponse.json({ success: false, status: session.payment_status });
    } catch (error) {
        console.error('Verify session error:', error);
        return NextResponse.json({ success: false, error: 'Verification failed' }, { status: 500 });
    }
}
