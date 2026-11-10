# canto4.com

Sitio oficial de Canto 4 (Next.js 16 + Tailwind 4). Los shows se leen de Supabase (tabla `shows`) y se cargan desde `/admin`.

## Desarrollo

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Deploy

Vercel (proyecto `canto4`) deploya solo:

- `main` → producción (canto4.com, cantocuatro.com)
- cualquier otra rama (por ejemplo `test`) → URL de preview

## Dónde se edita cada cosa

- Teléfono, email, redes, video, temas y premios: `lib/site.ts`
- Textos de la bio: `app/bio/page.tsx`
- Orden y filtro de fechas: `lib/shows-core.ts` (la columna `fecha` es texto, ej. "20 y 21 Noviembre 2026")
