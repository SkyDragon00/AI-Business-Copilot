import { Hono } from "hono";
import type { Env } from "../env";

export const healthRouter = new Hono<{ Bindings: Env }>();

healthRouter.get("/", (c) => {
  return c.json({
    name: "AI Business Copilot",
    version: "0.1.0",
    status: "ok",
    environment: c.env.ENVIRONMENT,
  });
});
