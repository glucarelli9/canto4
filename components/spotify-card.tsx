import Image from "next/image";
import { siSpotify, siYoutube } from "simple-icons";
import { FEATURED_SONGS, SOCIAL } from "@/lib/site";
import { BrandIcon } from "./social-links";
import { ButtonLink } from "./ui/button";

// Reemplaza al embed de Spotify: sin sesión iniciada, Spotify limita a 30 s y tapa el reproductor con publicidad.
export function SpotifyCard() {
  return (
    <div className="overflow-hidden rounded-3xl bg-ink text-white shadow-[0_30px_60px_-20px_rgb(0_0_0/0.6)] ring-1 ring-white/15">
      <div className="flex items-center gap-4 bg-gradient-to-br from-[#2a2a2a] to-ink p-5">
        <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-[#6e1020] shadow-lg">
          <Image
            src="/img/Foto_canto_4_2025.png"
            alt=""
            fill
            sizes="80px"
            className="object-cover object-[50%_15%] scale-125"
          />
        </div>
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#1ed760]">
            <BrandIcon icon={siSpotify} className="size-3.5" /> Spotify
          </p>
          <p className="mt-1 text-2xl font-bold leading-tight">Canto 4</p>
          <p className="text-sm text-white/60">Temas destacados</p>
        </div>
      </div>

      <ol className="divide-y divide-white/5 px-2 py-2">
        {FEATURED_SONGS.map((song, i) => (
          <li key={song.title} className="group/song flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-white/5">
            <span className="relative flex w-6 shrink-0 justify-center text-sm tabular-nums text-white/40">
              <span className="group-hover/song:invisible">{i + 1}</span>
              <span aria-hidden className="eq invisible absolute inset-0 items-end justify-center gap-[2px] group-hover/song:visible">
                <span />
                <span />
                <span />
              </span>
            </span>
            <span className="min-w-0 flex-1 truncate font-semibold">{song.title}</span>
            <a
              href={song.spotify}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Escuchar ${song.title} en Spotify`}
              className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#1db954] text-black transition-transform duration-300 hover:scale-110 active:scale-95"
            >
              <BrandIcon icon={siSpotify} className="size-5" />
            </a>
            <a
              href={song.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ver ${song.title} en YouTube`}
              className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-[#ff0000] transition-transform duration-300 hover:scale-110 active:scale-95"
            >
              <BrandIcon icon={siYoutube} className="size-5" />
            </a>
          </li>
        ))}
      </ol>

      <div className="border-t border-white/10 p-4">
        <ButtonLink
          href={SOCIAL.spotify}
          variant="spotify"
          className="w-full"
          icon={<BrandIcon icon={siSpotify} />}
        >
          Seguir a Canto 4 en Spotify
        </ButtonLink>
      </div>
    </div>
  );
}
