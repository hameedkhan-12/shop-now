import { createPrismaClient } from "./createClient.js";

export const writeDB = createPrismaClient(
  "write",
  process.env.WRITE_DATABASE_URL!
);