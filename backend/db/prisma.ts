import { PrismaClient } from "@prisma/client";

/**
 * PrismaClient singleton for Next.js
 *
 * In development, hot module replacement (HMR) causes the module to be
 * re-evaluated on every code change, which would create a new PrismaClient
 * instance each time and exhaust the database connection pool.
 *
 * This pattern stores the client on the global object to prevent that.
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
