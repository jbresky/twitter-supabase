import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const sql = postgres("postgres://postgres.kpqgjsmbbxbshtuclmji:ES1Wtun6pzpSdPrE@aws-0-us-east-1.pooler.supabase.com:6543/postgres", {
  max: 1,
});

export const db = drizzle(sql, {
  schema,
});