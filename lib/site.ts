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

export const YOUTUBE_VIDEO_ID = "TO_YyAYRqiw";
export const YOUTUBE_VIDEO_TITLE = "A Todo o Nada";
export const SPOTIFY_RELEASES = "https://open.spotify.com/artist/2pm42ahOwMBST1vbdGqRAq/discography/all";

// `preview`: adelanto de 30 s tomado desde Argentina. Spotify no se lo entrega a los servidores de Vercel
// (EE.UU.) para algunos temas, así que se usa de respaldo.
const PREVIEW = "https://p.scdn.co/mp3-preview/";
export const FEATURED_SONGS = [
  { title: "Sombra Herida", spotify: "https://open.spotify.com/track/1ZNtcU1sRU5qjhG5crJ5xr", youtube: "https://youtu.be/NafCorFMGXw?t=1775" },
  { title: "La Soñé", spotify: "https://open.spotify.com/track/0aZvzlCBzQqscbWTD9Ps51", youtube: "https://youtu.be/NafCorFMGXw?t=1570" },
  { title: "A Todo o Nada", spotify: "https://open.spotify.com/track/1TkeCwav0EEcRiDFh3u1G7", youtube: "https://youtu.be/TO_YyAYRqiw" },
  { title: "Madre", spotify: "https://open.spotify.com/track/1Tb2QZv8vQQQe0pw2KIbIp", youtube: "https://youtu.be/8PyL-UbTiCo" },
  { title: "El Escondido", spotify: "https://open.spotify.com/track/1CbE6iaXyJ7TWPoINuq3Dl", youtube: "https://youtu.be/wya3ojpj9zQ" },
  { title: "La Marrupeña", spotify: "https://open.spotify.com/track/4KQToftB1dAUGpqSpEz4G5", youtube: "https://youtu.be/qkX2twCw_ho" },
] as const;

export const AWARDS = [
  "Consagración en la Serenata a Cafayate",
  "Consagración en Jesús María",
  "Consagración en Cosquín",
  "Consagración en el Festival de Baradero",
  "Gaviota de Plata en el Festival de Viña del Mar",
] as const;
