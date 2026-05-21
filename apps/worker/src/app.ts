import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import type { Env } from "./env";
import { healthRouter } from "./routes/health";
import { webhookRouter } from "./routes/webhook";
import { appointmentsRouter } from "./routes/appointments";
import { transactionsRouter } from "./routes/transactions";

export function createApp() {
  const app = new Hono<{ Bindings: Env }>();

  app.use("*", logger());
  app.use("/api/*", cors());

  app.route("/", healthRouter);
  app.route("/webhook", webhookRouter);
  app.route("/api", appointmentsRouter);
  app.route("/api", transactionsRouter);

  app.notFound((c) => {
    return c.json(
      {
        error: {
          code: "not_found",
          message: "Route not found",
        },
      },
      404,
    );
  });

  app.onError((err, c) => {
    console.error("Unhandled error", err);
    return c.json(
      {
        error: {
          code: "internal_error",
          message: "Unexpected error",
        },
      },
      500,
    );
  });

  return app;
}
