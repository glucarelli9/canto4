"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";

// Muestra la portada y carga el reproductor recién al tocar: evita ~1 MB de YouTube en la carga inicial.
export function LiteYouTube({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  if (playing)
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="size-full"
      />
    );

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group/yt relative block size-full cursor-pointer overflow-hidden"
    >
      <Image
        src={`https://i.ytimg.com/vi/${id}/sddefault.jpg`}
        alt=""
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover transition-transform duration-700 ease-out group-hover/yt:scale-105"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="relative flex size-20 items-center justify-center rounded-full bg-primary text-white shadow-2xl transition-transform duration-300 group-hover/yt:scale-110">
          <span className="absolute inset-0 animate-ping rounded-full bg-primary/50 motion-reduce:hidden" />
          <Play className="relative size-8 translate-x-0.5 fill-current" aria-hidden />
        </span>
      </span>
      <span className="absolute inset-x-0 bottom-0 p-4 text-left text-sm font-semibold text-white sm:p-5 sm:text-base">
        {title}
      </span>
      <span className="sr-only">Reproducir video</span>
    </button>
  );
}
