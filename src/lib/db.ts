import postgres from "postgres";

let sql: ReturnType<typeof postgres> | null = null;

export function getSql() {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) {
    throw new Error("DATABASE_URL is not set");
  }
  if (!sql) {
    sql = postgres(url, {
      max: 10,
      idle_timeout: 30,
      connect_timeout: 10,
    });
  }
  return sql;
}
