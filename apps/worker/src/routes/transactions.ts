import { Hono } from "hono";
import type { Env } from "../env";

export const transactionsRouter = new Hono<{ Bindings: Env }>();

transactionsRouter.post("/transactions", async (c) => {
	return c.json({ error: { code: "not_implemented" } }, 501);
});
