import "server-only";
import { cacheLife } from "next/cache";

export type TrackPreview = { audio: string | null; cover: string | null };

// La API pública de Spotify ya no entrega los adelantos de 30 s; la página del reproductor embebible sí.
// Si Spotify cambia ese HTML, el tema queda sin play y sigue funcionando el link a Spotify.
export async function getTrackPreview(spotifyUrl: string): Promise<TrackPreview> {
  "use cache";
  cacheLife("days");

  const id = new URL(spotifyUrl).pathname.split("/").pop();
  try {
    const res = await fetch(`https://open.spotify.com/embed/track/${id}`, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    if (!res.ok) throw new Error(`Spotify ${res.status}`);
    const html = await res.text();
    return {
      audio: html.match(/"audioPreview":\{"url":"(https:\/\/p\.scdn\.co\/[^"]+)"/)?.[1] ?? null,
      cover: html.match(/"visualIdentity":\{.*?"image":\[\{"url":"(https:\/\/[^"]+)"/)?.[1] ?? null,
    };
  } catch (e) {
    console.error("No se pudo leer el adelanto de Spotify", id, e);
    return { audio: null, cover: null };
  }
}
