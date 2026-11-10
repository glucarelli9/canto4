import { SUPABASE_URL, supabaseHeaders } from "./supabase";
import type { Show, ShowInput } from "./shows-core";

const BASE = `${SUPABASE_URL}/rest/v1/shows`;

// Imagen por defecto que usaba el sitio anterior; se mantiene para que las tarjetas viejas no queden sin imagen.
export const LEGACY_DEFAULT_IMAGE =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20C4%202025-RRLEncebmfzE2Q6Vk1wN3DvvSviUxL.png";

export class AdminError extends Error {}

async function request<T>(path: string, password: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: { ...supabaseHeaders(password), Prefer: "return=representation", ...init.headers },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new AdminError(`Supabase respondió ${res.status}: ${body.slice(0, 200)}`);
  }
  return res.json() as Promise<T>;
}

// Con una contraseña incorrecta Supabase no rechaza la consulta: la RLS simplemente no devuelve filas.
// Por eso cada escritura se verifica contando las filas afectadas.
function expectRows<T>(rows: T[], action: string): T[] {
  if (rows.length === 0) throw new AdminError(`No se pudo ${action}: contraseña incorrecta o sin permisos.`);
  return rows;
}

export async function listAllShows(password: string) {
  return request<Show[]>("?select=*&order=id.desc", password);
}

// Reescribe en una fila el mismo valor que ya tiene: solo prospera si Supabase acepta la contraseña.
export async function verifyPassword(password: string): Promise<boolean> {
  const [row] = await request<Pick<Show, "id" | "activo">[]>("?select=id,activo&order=id.asc&limit=1", password);
  if (!row) return true;
  const rows = await request<Show[]>(`?id=eq.${row.id}`, password, {
    method: "PATCH",
    body: JSON.stringify({ activo: row.activo }),
  });
  return rows.length === 1;
}

export async function createShow(password: string, input: ShowInput) {
  const rows = await request<Show[]>("", password, {
    method: "POST",
    body: JSON.stringify({ ...input, imagen: input.imagen || LEGACY_DEFAULT_IMAGE }),
  });
  return expectRows(rows, "crear el show")[0];
}

export async function updateShow(password: string, id: number, input: Partial<ShowInput>) {
  const body = "imagen" in input ? { ...input, imagen: input.imagen || LEGACY_DEFAULT_IMAGE } : input;
  const rows = await request<Show[]>(`?id=eq.${id}`, password, { method: "PATCH", body: JSON.stringify(body) });
  return expectRows(rows, "guardar los cambios")[0];
}

export async function deleteShow(password: string, id: number) {
  const rows = await request<Show[]>(`?id=eq.${id}`, password, { method: "DELETE" });
  expectRows(rows, "borrar el show");
}
