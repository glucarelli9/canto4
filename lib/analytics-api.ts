import { SUPABASE_URL, supabaseHeaders } from "./supabase";

const BASE = `${SUPABASE_URL}/rest/v1/page_views`;

export type PageViewRow = { id: number; path: string; referrer: string | null; created_at: string };

export async function trackPageView(path: string, referrer: string | null) {
  await fetch(BASE, {
    method: "POST",
    headers: { ...supabaseHeaders(), Prefer: "return=minimal" },
    body: JSON.stringify({ path, referrer: referrer || null }),
  }).catch(() => {});
}

export type AnalyticsStats = {
  today: number;
  week: number;
  month: number;
  topPages: { path: string; count: number }[];
};

export async function getAnalytics(password: string): Promise<AnalyticsStats> {
  const now = new Date();
  const tz = "America/Argentina/Buenos_Aires";
  const fmt = (d: Date) => new Intl.DateTimeFormat("en-CA", { timeZone: tz }).format(d);

  const todayStr = fmt(now);
  const weekAgo = new Date(now);
  weekAgo.setDate(weekAgo.getDate() - 7);
  const monthAgo = new Date(now);
  monthAgo.setDate(monthAgo.getDate() - 30);

  const headers = supabaseHeaders(password);

  const [todayRes, weekRes, monthRes, topRes] = await Promise.all([
    fetch(`${BASE}?select=id&created_at=gte.${todayStr}T00:00:00`, {
      headers: { ...headers, Prefer: "count=exact" },
      method: "HEAD",
    }),
    fetch(`${BASE}?select=id&created_at=gte.${fmt(weekAgo)}T00:00:00`, {
      headers: { ...headers, Prefer: "count=exact" },
      method: "HEAD",
    }),
    fetch(`${BASE}?select=id&created_at=gte.${fmt(monthAgo)}T00:00:00`, {
      headers: { ...headers, Prefer: "count=exact" },
      method: "HEAD",
    }),
    fetch(`${SUPABASE_URL}/rest/v1/rpc/top_pages`, {
      method: "POST",
      headers,
      body: JSON.stringify({ since: `${fmt(monthAgo)}T00:00:00` }),
    }),
  ]);

  const count = (r: Response) => Number(r.headers.get("content-range")?.split("/")[1] ?? "0");

  let topPages: { path: string; count: number }[] = [];
  try {
    topPages = await topRes.json();
  } catch {}

  return {
    today: count(todayRes),
    week: count(weekRes),
    month: count(monthRes),
    topPages,
  };
}
