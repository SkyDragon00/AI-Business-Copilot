import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

export function getDb(databaseUrl: string) {
  // neon connection configured for serverless edge runtime with no caching
  const sql = neon(databaseUrl, { fullConnectionCaching: false });
  return drizzle(sql, { schema });
}
