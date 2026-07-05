import { createPrismaClient } from "./createClient.js";

export const readDB = createPrismaClient(
  "read",
  process.env.READ_DATABASE_URL!
);