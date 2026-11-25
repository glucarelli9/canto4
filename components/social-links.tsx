import { siFacebook, siInstagram, siSpotify, siTiktok, siX, siYoutube, type SimpleIcon } from "simple-icons";
import { SOCIAL } from "@/lib/site";

const NETWORKS: { label: string; href: string; icon: SimpleIcon }[] = [
  { label: "Instagram", href: SOCIAL.instagram, icon: siInstagram },
  { label: "YouTube", href: SOCIAL.youtube, icon: siYoutube },
  { label: "Facebook", href: SOCIAL.facebook, icon: siFacebook },
  { label: "Spotify", href: SOCIAL.spotify, icon: siSpotify },
  { label: "TikTok", href: SOCIAL.tiktok, icon: siTiktok },
  { label: "X", href: SOCIAL.x, icon: siX },
];

export function BrandIcon({ icon, className = "size-4" }: { icon: SimpleIcon; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d={icon.path} />
    </svg>
  );
}

export function SocialLinks({ className = "", size = "md" }: { className?: string; size?: "sm" | "md" }) {
  const box = size === "sm" ? "size-9" : "size-11";
  return (
    <ul className={`flex flex-wrap items-center justify-center gap-2 ${className}`}>
      {NETWORKS.map((n) => (
        <li key={n.label}>
          <a
            href={n.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Canto 4 en ${n.label}`}
            className={`${box} flex items-center justify-center rounded-full bg-primary/10 text-foreground transition-[transform,background-color,color,box-shadow] duration-300 hover:-translate-y-1 hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/30 active:scale-95`}
          >
            <BrandIcon icon={n.icon} />
          </a>
        </li>
      ))}
    </ul>
  );
}
