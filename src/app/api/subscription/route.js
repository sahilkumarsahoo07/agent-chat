import prisma from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';
import { success, error } from '@/lib/api-helpers';
import { PLAN_LIMITS } from '@/lib/token-utils';

export const dynamic = 'force-dynamic';

export async function POST(request) {
    try {
        const auth = getAuthUser(request);
        if (!auth) {
            return error('Unauthorized', 401);
        }

        const body = await request.json();
        const { plan } = body;

        // Validate plan
        if (!plan || !PLAN_LIMITS[plan]) {
            return error('Invalid plan selected', 400);
        }

        // Apply new limit immediately 
        const newTokens = PLAN_LIMITS[plan];

        // Mock payment verification delay
        // In a real app, this is where you'd verify a Stripe/Razorpay webhook or session
        // await new Promise(resolve => setTimeout(resolve, 500)); 

        const updatedUser = await prisma.user.update({
            where: { id: auth.userId },
            data: {
                plan: plan,
                tokens: newTokens,
                tokenResetDate: new Date(), // Reset the 24h timer upon upgrade
            },
            select: {
                id: true,
                plan: true,
                tokens: true,
                tokenResetDate: true
            }
        });

        return success({
            message: `Successfully upgraded to ${plan} plan`,
            user: updatedUser
        });

    } catch (err) {
        console.error('Subscription upgrade error:', err);
        return error('Internal server error', 500);
    }
}
