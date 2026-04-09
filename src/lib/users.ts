import type { OnboardingData } from "@/lib/store";
import { getSql } from "@/lib/db";

export interface DbUser {
  id: string;
  phone: string;
  pin_hash: string;
  name: string;
  level: "O-Level" | "A-Level";
  premium: boolean;
  xp: number;
  streak: number;
  last_active_date: string | null;
  onboarding: OnboardingData | null;
  created_at: Date;
}

export async function findUserByPhone(phone: string): Promise<DbUser | null> {
  const sql = getSql();
  const rows = await sql<DbUser[]>`
    SELECT id, phone, pin_hash, name, level, premium, xp, streak,
           last_active_date::text AS last_active_date,
           onboarding, created_at
    FROM users WHERE phone = ${phone} LIMIT 1
  `;
  return rows[0] ?? null;
}

export async function findUserById(id: string): Promise<DbUser | null> {
  const sql = getSql();
  const rows = await sql<DbUser[]>`
    SELECT id, phone, pin_hash, name, level, premium, xp, streak,
           last_active_date::text AS last_active_date,
           onboarding, created_at
    FROM users WHERE id = ${id}::uuid LIMIT 1
  `;
  return rows[0] ?? null;
}

export async function createUser(
  phone: string,
  pinHash: string
): Promise<DbUser> {
  const sql = getSql();
  const rows = await sql<DbUser[]>`
    INSERT INTO users (phone, pin_hash)
    VALUES (${phone}, ${pinHash})
    RETURNING id, phone, pin_hash, name, level, premium, xp, streak,
              last_active_date::text AS last_active_date,
              onboarding, created_at
  `;
  const u = rows[0];
  if (!u) throw new Error("Failed to create user");
  return u;
}

export async function updateOnboarding(
  userId: string,
  data: OnboardingData
): Promise<void> {
  const sql = getSql();
  const onboardingJson = JSON.parse(JSON.stringify(data)) as Parameters<
    typeof sql.json
  >[0];
  await sql`
    UPDATE users
    SET onboarding = ${sql.json(onboardingJson)},
        name = ${data.name},
        level = ${data.level},
        updated_at = now()
    WHERE id = ${userId}::uuid
  `;
}

export async function setPremium(userId: string, premium: boolean) {
  const sql = getSql();
  await sql`
    UPDATE users SET premium = ${premium}, updated_at = now()
    WHERE id = ${userId}::uuid
  `;
}

export async function touchActivity(
  userId: string,
  streak: number,
  lastActiveDate: string
) {
  const sql = getSql();
  await sql`
    UPDATE users
    SET streak = ${streak},
        last_active_date = ${lastActiveDate}::date,
        updated_at = now()
    WHERE id = ${userId}::uuid
  `;
}
