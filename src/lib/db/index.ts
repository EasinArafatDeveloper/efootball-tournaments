import { PrismaClient } from "@prisma/client";
import { db as memoryDb } from "./mock-store";

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

// Export database interface that resolves seamlessly
export { memoryDb as db };
