// ─── API config ───────────────────────────────────────────────
const API_REQUIRED_VARS = [
  "NODE_ENV",
  "PORT",
  "WRITE_DATABASE_URL",
  "READ_DATABASE_URL",
  "ADMIN_KEY",
] as const;

export function getApiConfig() {
  const missing = API_REQUIRED_VARS.filter((key) => !process.env[key]);
  if (missing.length) {
    throw new Error(`Missing API env vars:\n${missing.join("\n")}`);
  }
  return {
    nodeEnv: process.env.NODE_ENV!,
    port: Number(process.env.PORT),
    writeDatabaseUrl: process.env.WRITE_DATABASE_URL!,
    readDatabaseUrl: process.env.READ_DATABASE_URL!,
    adminKey: process.env.ADMIN_KEY!,
  };
}

// ─── Web (customer) config ────────────────────────────────────
const WEB_REQUIRED_VARS = [
  "NEXT_PUBLIC_API_URL",
] as const;

export function getWebConfig() {
  const missing = WEB_REQUIRED_VARS.filter((key) => !process.env[key]);
  if (missing.length) {
    throw new Error(`Missing Web env vars:\n${missing.join("\n")}`);
  }
  return {
    apiUrl: process.env.NEXT_PUBLIC_API_URL!,
  };
}

// ─── Admin config ─────────────────────────────────────────────
const ADMIN_REQUIRED_VARS = [
  "NEXT_PUBLIC_API_URL",
  "NEXT_PUBLIC_ADMIN_KEY",
] as const;

export function getAdminConfig() {
  const missing = ADMIN_REQUIRED_VARS.filter((key) => !process.env[key]);
  if (missing.length) {
    throw new Error(`Missing Admin env vars:\n${missing.join("\n")}`);
  }
  return {
    apiUrl: process.env.NEXT_PUBLIC_API_URL!,
    adminKey: process.env.NEXT_PUBLIC_ADMIN_KEY!,
  };
}