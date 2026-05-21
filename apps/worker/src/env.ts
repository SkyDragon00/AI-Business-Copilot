export type Env = {
  CONVERSATIONS_KV: KVNamespace;
  DATABASE_URL: string;
  GEMINI_API_KEY: string;
  META_VERIFY_TOKEN: string;
  META_ACCESS_TOKEN: string;
  META_APP_SECRET: string;
  GOOGLE_SPEECH_KEY: string;
  SRI_RUC: string;
  SRI_CERT: string;
  ENVIRONMENT: string;
};

const REQUIRED_STRING_KEYS: Array<keyof Env> = [
  "DATABASE_URL",
  "GEMINI_API_KEY",
  "META_VERIFY_TOKEN",
  "META_ACCESS_TOKEN",
  "META_APP_SECRET",
  "GOOGLE_SPEECH_KEY",
  "SRI_RUC",
  "SRI_CERT",
  "ENVIRONMENT",
];

export function assertEnv(env: Env) {
  const missing: string[] = REQUIRED_STRING_KEYS.filter((key) => !env[key]);
  if (!env.CONVERSATIONS_KV) {
    missing.push("CONVERSATIONS_KV");
  }

  if (missing.length > 0) {
    throw new Error(`Missing environment bindings: ${missing.join(", ")}`);
  }
}
