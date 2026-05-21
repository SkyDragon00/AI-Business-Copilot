import type { Env } from "./env";

export async function handleCron(
	event: ScheduledEvent,
	_env: Env,
	_ctx: ExecutionContext,
) {
	const hour = new Date(event.scheduledTime).getUTCHours();

	if (hour === 3) {
		console.log("Daily close: scheduled job");
		// TODO: Module 5 - daily summary
		return;
	}

	console.log("Reminder sweep: scheduled job");
	// TODO: Module 3 - appointment reminders
}
