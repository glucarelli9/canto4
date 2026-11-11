"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Music, Pause, Play } from "lucide-react";
import { siSpotify, siYoutube } from "simple-icons";
import { BrandIcon } from "./social-links";

export type Song = { title: string; spotify: string; youtube: string; audio: string | null; cover: string | null };

export function SongList({ songs }: { songs: Song[] }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [broken, setBroken] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "none";
    audioRef.current = audio;
    const onTime = () => setProgress(audio.duration ? audio.currentTime / audio.duration : 0);
    const onEnd = () => {
      setPlaying(null);
      setProgress(0);
    };
    // Si un adelanto deja de existir, se saca el play de ese tema y queda el link a Spotify.
    const onError = () => {
      const failed = audio.src;
      setBroken((prev) => new Set(prev).add(failed));
      onEnd();
    };
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnd);
    audio.addEventListener("error", onError);
    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnd);
      audio.removeEventListener("error", onError);
    };
  }, []);

  function toggle(i: number) {
    const audio = audioRef.current;
    const src = songs[i].audio;
    if (!audio || !src || broken.has(src)) return;
    if (playing === i) {
      audio.pause();
      setPlaying(null);
      return;
    }
    audio.src = src;
    setProgress(0);
    setPlaying(i);
    audio.play().catch(() => setPlaying(null));
  }

  return (
    <ol className="space-y-1 px-2 py-2">
      {songs.map((song, i) => {
        const active = playing === i;
        const canPlay = !!song.audio && !broken.has(song.audio);
        return (
          <li
            key={song.title}
            className={`flex items-center gap-3 rounded-2xl px-2 py-2 transition-colors ${active ? "bg-white/10" : "hover:bg-white/5"}`}
          >
            <button
              type="button"
              onClick={() => toggle(i)}
              disabled={!canPlay}
              aria-pressed={active}
              aria-label={active ? `Pausar ${song.title}` : `Escuchar un adelanto de ${song.title}`}
              className="group/play relative size-12 shrink-0 overflow-hidden rounded-xl bg-white/10 disabled:cursor-default"
            >
              {song.cover ? (
                <Image src={song.cover} alt="" fill sizes="48px" className="object-cover" />
              ) : (
                <Music className="absolute inset-0 m-auto size-5 text-white/50" aria-hidden />
              )}
              {canPlay && (
                <span
                  className={`absolute inset-0 flex items-center justify-center bg-black/45 transition-opacity duration-300 ${
                    active ? "opacity-100" : "opacity-100 sm:opacity-0 sm:group-hover/play:opacity-100 sm:group-focus-visible/play:opacity-100"
                  }`}
                >
                  <span className="flex size-8 items-center justify-center rounded-full bg-[#1ed760] text-black shadow-lg transition-transform duration-300 group-hover/play:scale-110 group-active/play:scale-95">
                    {active ? <Pause className="size-4 fill-current" aria-hidden /> : <Play className="size-4 translate-x-px fill-current" aria-hidden />}
                  </span>
                </span>
              )}
            </button>

            <div className="min-w-0 flex-1">
              <p className={`flex items-center gap-2 truncate font-semibold ${active ? "text-[#1ed760]" : ""}`}>
                {active && (
                  <span aria-hidden className="eq h-3.5 items-end gap-[2px]">
                    <span />
                    <span />
                    <span />
                  </span>
                )}
                <span className="truncate">{song.title}</span>
              </p>
              {active ? (
                <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/15" role="progressbar" aria-label="Avance del adelanto" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)}>
                  <div className="h-full rounded-full bg-[#1ed760] transition-[width] duration-200 ease-linear" style={{ width: `${progress * 100}%` }} />
                </div>
              ) : (
                <p className="text-xs text-white/50">{canPlay ? "Adelanto de 30 s" : "Escuchalo en Spotify"}</p>
              )}
            </div>

            <a
              href={song.spotify}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Escuchar ${song.title} completo en Spotify`}
              className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#1ed760] transition-[transform,background-color] duration-300 hover:scale-110 hover:bg-[#1ed760] hover:text-black active:scale-95"
            >
              <BrandIcon icon={siSpotify} className="size-5" />
            </a>
            <a
              href={song.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ver ${song.title} en YouTube`}
              className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-[transform,background-color] duration-300 hover:scale-110 hover:bg-white hover:text-[#ff0000] active:scale-95"
            >
              <BrandIcon icon={siYoutube} className="size-5" />
            </a>
          </li>
        );
      })}
    </ol>
  );
}
