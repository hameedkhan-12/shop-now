import { Pool } from "pg";
import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as {
  prismaClients?: Record<string, PrismaClient>;
};

export function createPrismaClient(
  name: string,
  connectionString: string
) {
  if (!globalForPrisma.prismaClients) {
    globalForPrisma.prismaClients = {};
  }

  if (
    process.env.NODE_ENV !== "production" &&
    globalForPrisma.prismaClients[name]
  ) {
    return globalForPrisma.prismaClients[name];
  }

  const pool = new Pool({
    connectionString,
  });

  const adapter = new PrismaPg(pool);

  const client = new PrismaClient({
    adapter,
  });

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prismaClients[name] = client;
  }

  return client;
}