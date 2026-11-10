// Clave "anon" pública: solo permite lo que habilitan las políticas RLS de la tabla `shows`.
// Las escrituras exigen el header x-admin-password, que valida Supabase.
export const SUPABASE_URL = "https://joyradntxpinrsacqslr.supabase.co";
export const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpveXJhZG50eHBpbnJzYWNxc2xyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYyMzgzNTUsImV4cCI6MjA4MTgxNDM1NX0.3WTNgV8Mww2AmTmiNYr6hdkqHlx7uzmxs4L03d06JZg";

export function supabaseHeaders(adminPassword?: string): Record<string, string> {
  return {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    "Content-Type": "application/json",
    ...(adminPassword ? { "x-admin-password": adminPassword } : {}),
  };
}
