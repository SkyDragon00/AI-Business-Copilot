import { Hono } from "hono";
import type { Env } from "../env";

export const appointmentsRouter = new Hono<{ Bindings: Env }>();

appointmentsRouter.get("/appointments", async (c) => {
	const businessId = c.req.query("business_id");
	const date = c.req.query("date");

	if (!businessId || !date) {
		return c.json(
			{
				error: {
					code: "validation_error",
					message: "business_id and date are required",
				},
			},
			400,
		);
	}

	return c.json({ data: [], status: "not_implemented" }, 501);
});

appointmentsRouter.post("/appointments", async (c) => {
	return c.json({ error: { code: "not_implemented" } }, 501);
});

appointmentsRouter.patch("/appointments/:id", async (c) => {
	const id = c.req.param("id");
	if (!id) {
		return c.json(
			{
				error: {
					code: "validation_error",
					message: "id is required",
				},
			},
			400,
		);
	}

	return c.json({ error: { code: "not_implemented" } }, 501);
});

appointmentsRouter.get("/availability", async (c) => {
	const businessId = c.req.query("business_id");
	const date = c.req.query("date");
	const serviceId = c.req.query("service_id");

	if (!businessId || !date || !serviceId) {
		return c.json(
			{
				error: {
					code: "validation_error",
					message: "business_id, date, and service_id are required",
				},
			},
			400,
		);
	}

	return c.json({ data: [], status: "not_implemented" }, 501);
});
