import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

// ─── Tipos del entorno de Cloudflare Workers ────────────────────
export type Env = {
  // KV Namespaces
  CONVERSATIONS_KV: KVNamespace;

  // Secrets (definidos en .dev.vars / wrangler secret)
  DATABASE_URL: string;
  GEMINI_API_KEY: string;
  META_VERIFY_TOKEN: string;
  META_ACCESS_TOKEN: string;
  META_APP_SECRET: string;
  GOOGLE_SPEECH_KEY: string;
  SRI_RUC: string;
  SRI_CERT: string;

  // Variables
  ENVIRONMENT: string;
};

// ─── App Hono ───────────────────────────────────────────────────
const app = new Hono<{ Bindings: Env }>();

// ─── Middleware global ──────────────────────────────────────────
app.use("*", logger());
app.use("/api/*", cors());

// ─── Health check ───────────────────────────────────────────────
app.get("/", (c) => {
  return c.json({
    name: "AI Business Copilot",
    version: "0.1.0",
    status: "ok",
    environment: c.env.ENVIRONMENT,
  });
});

// ─── Webhook WhatsApp (verificación GET) ────────────────────────
app.get("/webhook/whatsapp", (c) => {
  const mode = c.req.query("hub.mode");
  const token = c.req.query("hub.verify_token");
  const challenge = c.req.query("hub.challenge");

  if (mode === "subscribe" && token === c.env.META_VERIFY_TOKEN) {
    console.log("✅ Webhook verificado correctamente");
    return c.text(challenge ?? "", 200);
  }

  return c.text("Forbidden", 403);
});

// ─── Webhook WhatsApp (mensajes entrantes POST) ─────────────────
app.post("/webhook/whatsapp", async (c) => {
  // TODO: Módulo 1 — verificar firma, procesar mensaje, responder
  return c.json({ status: "received" }, 200);
});

// ─── Rutas API (stubs) ─────────────────────────────────────────
app.get("/api/appointments", async (c) => {
  // TODO: Módulo 2
  return c.json({ message: "appointments endpoint" });
});

app.get("/api/availability", async (c) => {
  // TODO: Módulo 2
  return c.json({ message: "availability endpoint" });
});

// ─── Cron handler ───────────────────────────────────────────────
export default {
  fetch: app.fetch,
  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext) {
    const hour = new Date(event.scheduledTime).getUTCHours();

    if (hour === 3) {
      // 03:00 UTC = 22:00 Ecuador → Cierre de caja
      console.log("🧾 Ejecutando cierre de caja diario...");
      // TODO: Módulo 5
    } else {
      // Cada hora → Recordatorios de citas
      console.log("⏰ Verificando recordatorios de citas...");
      // TODO: Módulo 3
    }
  },
};
