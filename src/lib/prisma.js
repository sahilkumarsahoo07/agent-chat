// Prisma Client Singleton with PostgreSQL Adapter (Prisma 7)
// Updated at: 2026-02-18T18:24:00 (Forcing Refresh)
import { PrismaClient } from '../generated/client';

const globalForPrisma = globalThis;

function createPrismaClient() {
    return new PrismaClient({});
}

const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}

export default prisma;
