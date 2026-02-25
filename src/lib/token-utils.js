import prisma from '@/lib/prisma';

export const PLAN_LIMITS = {
    FREE: 10,  // Reduced for testing
    PLUS: 500,
    PRO: 2000,
};

// Token reset window: 4 hours from the moment tokens are depleted
const TOKEN_RESET_MS = 4 * 60 * 60 * 1000; // 4 hours in milliseconds

/**
 * Checks if 4 hours have elapsed since the user's tokenResetDate.
 * Resets tokens to their plan limit if so.
 * When tokens first hit 0 it stamps tokenResetDate so the 4-hour window starts
 * from the exact depletion moment.
 * Deducts 1 token if available.
 * @param {string} userId - The ID of the authenticated user
 * @returns {object} { allowed: boolean, remaining: number, error: string, resetTime: Date }
 */
export async function checkAndDeductTokens(userId) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, plan: true, tokens: true, tokenResetDate: true }
        });

        if (!user) {
            return { allowed: false, error: 'User not found' };
        }

        const now = new Date();
        const lastReset = user.tokenResetDate || now;
        const timeSinceLastReset = now.getTime() - lastReset.getTime();

        let currentTokens = user.tokens;
        let newResetDate = lastReset;
        let requiresReset = false;

        if (timeSinceLastReset >= TOKEN_RESET_MS) {
            // 4 hours have passed since the last reset — refill tokens
            const plan = user.plan || 'FREE';
            currentTokens = PLAN_LIMITS[plan] || PLAN_LIMITS.FREE;
            newResetDate = now; // next reset window starts now
            requiresReset = true;
        }

        if (currentTokens <= 0 && !requiresReset) {
            // Tokens are depleted — return the exact time they will reset
            const resetTime = new Date(lastReset.getTime() + TOKEN_RESET_MS);
            return {
                allowed: false,
                error: 'Token limit reached.',
                remaining: 0,
                resetTime: resetTime.toISOString(),
            };
        }

        // Deduct 1 token
        const newTokens = currentTokens - 1;

        // When tokens just hit 0 for the first time, stamp the depletion time
        // so the 4-hour countdown starts from this moment.
        const justDepleted = newTokens === 0;

        await prisma.user.update({
            where: { id: userId },
            data: {
                tokens: newTokens,
                // Update resetDate on: reset OR first depletion
                ...((requiresReset || justDepleted) && { tokenResetDate: now })
            }
        });

        return { allowed: true, remaining: newTokens };

    } catch (error) {
        console.error('Error checking tokens:', error);
        return { allowed: false, error: 'Internal token error' };
    }
}
