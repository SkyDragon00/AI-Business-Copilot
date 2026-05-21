import { defineConfig } from 'drizzle-kit';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Load variables from .dev.vars if available (simple parser)
let dbUrl = process.env.DATABASE_URL || '';
try {
  const envFile = readFileSync(resolve(process.cwd(), '.dev.vars'), 'utf-8');
  const match = envFile.match(/^DATABASE_URL=(.*)$/m);
  if (match) {
    dbUrl = match[1].trim();
  }
} catch (e) {
  // Ignore error if file doesn't exist
}

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: dbUrl,
  },
});
