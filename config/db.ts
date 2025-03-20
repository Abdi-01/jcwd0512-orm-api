import { Pool } from "pg";

const db = new Pool({
  user: "postgres.sxijhdpkbcqezsusmfxv",
  host: "aws-0-ap-southeast-2.pooler.supabase.com",
  database: "postgres",
  password: "expense-db!",
  port: 5432,
});

export default db;
