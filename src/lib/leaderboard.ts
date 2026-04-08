/**
 * Leaderboard system with simulated class/school rankings.
 * In production, this would be backed by a server-side database.
 */

export interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  xp: number;
  streak: number;
  school: string;
  rank: number;
  isCurrentUser?: boolean;
}

export type LeagueType = "bronze" | "silver" | "gold" | "diamond";

export interface League {
  type: LeagueType;
  name: string;
  minXP: number;
  color: string;
  icon: string;
}

export const LEAGUES: League[] = [
  { type: "bronze", name: "Bronze", minXP: 0, color: "#cd7f32", icon: "🥉" },
  { type: "silver", name: "Silver", minXP: 1000, color: "#c0c0c0", icon: "🥈" },
  { type: "gold", name: "Gold", minXP: 5000, color: "#ffd700", icon: "🥇" },
  { type: "diamond", name: "Diamond", minXP: 15000, color: "#b9f2ff", icon: "💎" },
];

export function getLeague(xp: number): League {
  for (let i = LEAGUES.length - 1; i >= 0; i--) {
    if (xp >= LEAGUES[i].minXP) return LEAGUES[i];
  }
  return LEAGUES[0];
}

export function getXPToNextLeague(xp: number): { next: League; remaining: number } | null {
  const current = getLeague(xp);
  const idx = LEAGUES.indexOf(current);
  if (idx >= LEAGUES.length - 1) return null;
  const next = LEAGUES[idx + 1];
  return { next, remaining: next.minXP - xp };
}

export function generateMockLeaderboard(currentUserXP: number): LeaderboardEntry[] {
  const names = [
    { name: "Tatenda", school: "Prince Edward" },
    { name: "Rumbidzai", school: "Girls High" },
    { name: "Tinashe", school: "Churchill" },
    { name: "Chiedza", school: "Arundel" },
    { name: "Tafadzwa", school: "St George's" },
    { name: "Nyasha", school: "Ellis Robins" },
    { name: "Kudzai", school: "Harare High" },
    { name: "Rutendo", school: "Dominican Convent" },
    { name: "Farai", school: "Falcon College" },
    { name: "Tendai", school: "Peterhouse" },
    { name: "Ruvimbo", school: "Chisipite Senior" },
    { name: "Takudzwa", school: "St John's" },
    { name: "Munyaradzi", school: "Goromonzi High" },
    { name: "Tariro", school: "Eaglesvale" },
    { name: "Simba", school: "Watershed" },
    { name: "Yeukai", school: "Gateway High" },
    { name: "Kudakwashe", school: "Highlands" },
    { name: "Anesu", school: "Heritage" },
    { name: "Tadiwanashe", school: "Hellenic" },
    { name: "Panashe", school: "Marist Brothers" },
  ];

  const entries: LeaderboardEntry[] = names.map((n, i) => {
    const isUser = i === 0;
    const xp = isUser ? currentUserXP : Math.floor(Math.random() * 6000) + 500;
    return {
      id: `u_${i.toString().padStart(3, "0")}`,
      name: n.name,
      avatar: n.name[0],
      xp,
      streak: Math.floor(Math.random() * 30) + 1,
      school: n.school,
      rank: 0,
      isCurrentUser: isUser,
    };
  });

  entries.sort((a, b) => b.xp - a.xp);
  entries.forEach((e, i) => (e.rank = i + 1));

  return entries;
}

export function getWeeklyXPGain(): number {
  if (typeof localStorage === "undefined") return 0;
  try {
    const raw = localStorage.getItem("nhaka_weekly_xp");
    if (!raw) return 0;
    const data = JSON.parse(raw) as { xp: number; weekStart: string };
    const weekStart = getWeekStart();
    if (data.weekStart === weekStart) return data.xp;
    return 0;
  } catch {
    return 0;
  }
}

export function addWeeklyXP(amount: number): void {
  if (typeof localStorage === "undefined") return;
  const weekStart = getWeekStart();
  const current = getWeeklyXPGain();
  localStorage.setItem(
    "nhaka_weekly_xp",
    JSON.stringify({ xp: current + amount, weekStart })
  );
}

function getWeekStart(): string {
  const d = new Date();
  d.setDate(d.getDate() - d.getDay());
  return d.toISOString().split("T")[0];
}
