// Teléfono y WhatsApp de Diego S. Cruz (confirmado). El sitio viejo mostraba por error 6058220 en el pie.
export const BOOKING_PHONE_DISPLAY = "+54 9 387 605-3220";
export const BOOKING_PHONE_TEL = "+5493876053220";
export const BOOKING_EMAIL = "contrataciones@canto4.com";
export const BOOKING_CONTACT_NAME = "Diego S. Cruz";

const WHATSAPP_TEXT = `Hola ${BOOKING_CONTACT_NAME.split(" ")[0]}! Te escribo desde canto4.com para consultar por una contratación de Canto 4.`;
export const BOOKING_WHATSAPP = `https://wa.me/${BOOKING_PHONE_TEL.replace(/\D/g, "")}?text=${encodeURIComponent(WHATSAPP_TEXT)}`;

export const SITE_URL = "https://canto4.com";

export const SOCIAL = {
  instagram: "https://www.instagram.com/canto4oficial/",
  facebook: "https://www.facebook.com/canto4oficial",
  youtube: "https://www.youtube.com/@canto4oficial",
  spotify: "https://open.spotify.com/artist/2pm42ahOwMBST1vbdGqRAq",
  tiktok: "https://www.tiktok.com/@canto4oficial",
  x: "https://x.com/canto4oficial",
} as const;

export const YOUTUBE_VIDEO_ID = "tYkvpTuUSUs";
export const YOUTUBE_VIDEO_TITLE = "La vida es un festival (Canciones en el camino)";
export const SPOTIFY_RELEASES = "https://open.spotify.com/artist/2pm42ahOwMBST1vbdGqRAq/discography/all";

// `preview`: adelanto de 30 s tomado desde Argentina. Spotify no se lo entrega a los servidores de Vercel
// (EE.UU.) para algunos temas, así que se usa de respaldo.
const PREVIEW = "https://p.scdn.co/mp3-preview/";
export const FEATURED_SONGS = [
  { title: "Sombra Herida", spotify: "https://open.spotify.com/track/4khBCBq5X8It0kWSlO8Yr4", youtube: "https://www.youtube.com/watch?v=DX63z05kOpA", preview: `${PREVIEW}99d0eb064962ed5267b4e6fab8b430fc0220f9eb` },
  { title: "La Trampa", spotify: "https://open.spotify.com/track/05wXUfoMltpdArT3Pd24jE", youtube: "https://www.youtube.com/watch?v=Yax1uGZEMNY", preview: `${PREVIEW}fcaf9b1162a3200fa4c0478ed34a429d8f3dd1e6` },
  { title: "Todos A Bailar", spotify: "https://open.spotify.com/track/5rxDQkUuMTYkTU582ISPDR", youtube: "https://www.youtube.com/watch?v=xE9nBAcTrdA", preview: `${PREVIEW}341efcefe71e48910916c5f8abfa3c1a150d2a6a` },
  { title: "El Yin y el Yang", spotify: "https://open.spotify.com/track/1TQR9jqbNWFJLp32n6hWgp", youtube: "https://www.youtube.com/watch?v=KfvzUuJBopE", preview: `${PREVIEW}addb30f9a4e9b10aabf3d9c6f08da079fadf5560` },
  { title: "Al Bailar", spotify: "https://open.spotify.com/track/10HWGAa8WAZlIpuYeaShw4", youtube: "https://www.youtube.com/watch?v=1ZM-V_5pAsM", preview: `${PREVIEW}c724de6ff008f1778404f24089d332f31e384b41` },
  { title: "Tu Recuerdo", spotify: "https://open.spotify.com/track/4hU19l7p1tKfZ2BHwe0eBT", youtube: "https://www.youtube.com/watch?v=jncY1iJUv_8", preview: `${PREVIEW}8de1f6dac5fadfa96b0fa762d8e0a970a02671ad` },
] as const;

export const AWARDS = [
  "Consagración en la Serenata a Cafayate",
  "Consagración en Jesús María",
  "Consagración en Cosquín",
  "Consagración en el Festival de Baradero",
  "Gaviota de Plata en el Festival de Viña del Mar",
] as const;
