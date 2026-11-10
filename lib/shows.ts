import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { SUPABASE_URL, supabaseHeaders } from "./supabase";
import { upcomingShows, type DatedShow, type Show } from "./shows-core";

export const SHOWS_TAG = "shows";

export async function getUpcomingShows(): Promise<DatedShow[] | null> {
  "use cache";
  cacheLife("minutes");
  cacheTag(SHOWS_TAG);

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/shows?select=*&activo=eq.true`, {
      headers: supabaseHeaders(),
    });
    if (!res.ok) throw new Error(`Supabase ${res.status}`);
    return upcomingShows((await res.json()) as Show[]);
  } catch (e) {
    console.error("No se pudieron cargar los shows", e);
    return null;
  }
}
