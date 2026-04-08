import { PrismaClient } from "@prisma/client"

if (!process.env.DATABASE_URL) {
  console.error("CRITICAL ERROR: DATABASE_URL environment variable is missing!");
}

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
