import { Hono } from "hono";
import type { Env } from "../env";
import { verifyMetaSignature } from "../modules/whatsapp/signature";

export const webhookRouter = new Hono<{ Bindings: Env }>();

webhookRouter.get("/whatsapp", (c) => {
	const mode = c.req.query("hub.mode");
	const token = c.req.query("hub.verify_token");
	const challenge = c.req.query("hub.challenge");

	if (mode === "subscribe" && token === c.env.META_VERIFY_TOKEN) {
		console.log("Webhook verified");
		return c.text(challenge ?? "", 200);
	}

	return c.text("Forbidden", 403);
});

webhookRouter.post("/whatsapp", async (c) => {
	const signature = c.req.header("x-hub-signature-256");
	const bodyBuffer = await c.req.arrayBuffer();
	const isValid = await verifyMetaSignature(
		bodyBuffer,
		signature,
		c.env.META_APP_SECRET,
	);

	if (!isValid) {
		return c.text("Unauthorized", 401);
	}

	let payload: unknown;
	try {
		payload = JSON.parse(new TextDecoder().decode(bodyBuffer));
	} catch {
		return c.text("Invalid JSON", 400);
	}

	void payload;
	// TODO: Module 1 - parse message, load conversation state, call AI, respond.
	return c.json({ status: "received" }, 200);
});
