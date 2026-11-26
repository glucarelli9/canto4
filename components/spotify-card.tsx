import Image from "next/image";
import { siSpotify } from "simple-icons";
import { FEATURED_SONGS, SOCIAL } from "@/lib/site";
import { getTrackPreview } from "@/lib/spotify";
import { BrandIcon } from "./social-links";
import { SongList } from "./song-list";
import { ButtonLink } from "./ui/button";

// Reemplaza al embed de Spotify: sin sesión iniciada, Spotify tapa su reproductor con publicidad.
// Acá los adelantos de 30 s suenan con un reproductor propio.
export async function SpotifyCard() {
  const songs = await Promise.all(
    FEATURED_SONGS.map(async ({ preview, ...s }: (typeof FEATURED_SONGS)[number] & { preview?: string }) => {
      const live = await getTrackPreview(s.spotify);
      return { ...s, audio: live.audio ?? preview ?? null, cover: live.cover };
    }),
  );

  return (
    <div className="overflow-hidden rounded-3xl bg-ink text-white shadow-[0_30px_60px_-20px_rgb(0_0_0/0.6)] ring-1 ring-white/15">
      <div className="flex items-center gap-4 bg-gradient-to-br from-[#2a2a2a] to-ink p-5">
        <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-[#6e1020] shadow-lg">
          <Image src="/img/Foto_canto_4_2025.png" alt="" fill sizes="80px" className="scale-125 object-cover object-[50%_15%]" />
        </div>
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#1ed760]">
            <BrandIcon icon={siSpotify} className="size-3.5" /> Spotify
          </p>
          <p className="mt-1 text-2xl font-bold leading-tight">Canto 4</p>
          <p className="text-sm text-white/60">Tocá play para escuchar un adelanto</p>
        </div>
      </div>

      <SongList songs={songs} />

      <div className="border-t border-white/10 p-4">
        <ButtonLink href={SOCIAL.spotify} variant="spotify" className="w-full" icon={<BrandIcon icon={siSpotify} />}>
          Seguir a Canto 4 en Spotify
        </ButtonLink>
      </div>
    </div>
  );
}
