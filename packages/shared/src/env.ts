const REQUIRED_VARS = [
  "NODE_ENV",
  "PORT",
  "DATABASE_URL",
] as const;

export function getEnvConfig() {
  const missing = REQUIRED_VARS.filter((key) => !process.env[key]);

  if (missing.length) {
    throw new Error(
      `Missing environment variables:\n${missing.join("\n")}`
    );
  }

  return {
    nodeEnv: process.env.NODE_ENV!,
    port: Number(process.env.PORT),
    databaseUrl: process.env.DATABASE_URL!,
  };
}