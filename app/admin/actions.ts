"use server";

import { updateTag } from "next/cache";
import { SHOWS_TAG } from "@/lib/shows";

// Solo invalida la caché pública de shows; los datos los protege Supabase con la contraseña.
export async function refreshPublicShows() {
  updateTag(SHOWS_TAG);
}
