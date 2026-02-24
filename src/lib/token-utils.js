import prisma from '@/lib/prisma';

export const PLAN_LIMITS = {
    FREE: 10,  // Reduced for testing, as requested "very low tokens"
    PLUS: 500,
    PRO: 2000,
};

/**
 * Checks if the user's token reset date was yesterday or earlier.
 * Resets tokens to their plan limit if so.
 * Deducts 1 token if available.
 * @param {string} userId - The ID of the authenticated user
 * @returns {object} { allowed: boolean, remaining: number, error: string }
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

        // Check if the reset date is from a previous day
        // A simple way is to compare toDateString() OR calculate 24h diff.
        // We will use 24h diff for a rolling 24 hour reset, or calendar day reset.
        // Request: "after 1day meand if the token is complete now so next day this time the token will be generate"
        // This implies rolling 24 hours.
        const msIn24Hours = 24 * 60 * 60 * 1000;
        const timeSinceLastReset = now.getTime() - lastReset.getTime();

        let currentTokens = user.tokens;
        let newResetDate = lastReset;
        let requiresReset = false;

        if (timeSinceLastReset >= msIn24Hours) {
            // 24 hours have passed, reset tokens to max
            const plan = user.plan || 'FREE';
            currentTokens = PLAN_LIMITS[plan] || PLAN_LIMITS.FREE;
            newResetDate = now; // update reset time to now
            requiresReset = true;
        }

        if (currentTokens <= 0 && !requiresReset) {
            // Not enough tokens and not eligible for reset yet
            return {
                allowed: false,
                error: 'Token limit reached. Please upgrade your plan or wait 24 hours.',
                remaining: 0,
                resetTime: new Date(lastReset.getTime() + msIn24Hours)
            };
        }

        // Deduct 1 token
        const newTokens = currentTokens - 1;

        // Save to database
        await prisma.user.update({
            where: { id: userId },
            data: {
                tokens: newTokens,
                ...(requiresReset && { tokenResetDate: newResetDate })
            }
        });

        return { allowed: true, remaining: newTokens };

    } catch (error) {
        console.error('Error checking tokens:', error);
        return { allowed: false, error: 'Internal token error' };
    }
}
