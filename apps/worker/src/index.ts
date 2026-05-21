import { createApp } from "./app";
import { assertEnv } from "./env";
import type { Env } from "./env";
import { handleCron } from "./cron";

const app = createApp();

export default {
  fetch: (request: Request, env: Env, ctx: ExecutionContext) => {
    assertEnv(env);
    return app.fetch(request, env, ctx);
  },
  scheduled: (event: ScheduledEvent, env: Env, ctx: ExecutionContext) => {
    assertEnv(env);
    return handleCron(event, env, ctx);
  },
};
