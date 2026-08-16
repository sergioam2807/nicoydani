# Web de matrimonio

Next.js 16 + Tailwind CSS v4 + TypeScript.

## Empezar

```bash
npm install
cp .env.example .env.local   # y completa tus datos
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Qué tocar para personalizar

Todo el contenido y el look de la web está centralizado en **dos archivos**,
así que no hace falta tocar los componentes para personalizar la boda:

| Qué quieres cambiar | Archivo |
| --- | --- |
| Nombres, fecha, dirección, código de acceso, WhatsApp, fotos de la galería | `src/config/site.ts` |
| Colores, tipografías, radios de borde | `src/app/theme.css` |

### `src/app/theme.css` — tema centralizado

Usa Tailwind v4 (`@theme`), así que cada variable `--color-*` genera
automáticamente clases utilitarias en toda la app: cambia `--color-brand-600`
aquí y **todos** los `bg-brand-600` / `text-brand-600` de la web cambian con
un solo edit. No hay que tocar `tailwind.config` (Tailwind v4 no lo requiere).

### `src/config/site.ts` — contenido del sitio

Nombres de los novios, fecha/hora del matrimonio, dirección del lugar,
número de WhatsApp para el RSVP, código de acceso y las fotos de la galería.

### Patrón de estilos usado

- **Componentización por sección** (`src/components/sections/*`): cada
  bloque de la página vive en su propio archivo con sus propias clases
  Tailwind — el aislamiento viene de que nadie más toca esas clases.
- **`cva` (class-variance-authority)** en `src/components/ui/button.tsx`:
  define variantes de botón una sola vez (`variant="accent" | "outline" | ...`)
  — es lo más parecido a una "hoja de estilos Tailwind" reutilizable.
- **`cn()`** (`src/lib/cn.ts`, clsx + tailwind-merge): combina clases sin
  colisiones al extender componentes desde fuera.

## Funcionalidades

- **Música de fondo** con play/mute (`src/components/music`,
  `src/components/providers/music-provider.tsx`). Coloca tu pista en
  `public/audio/background-music.mp3` (o cambia la ruta en `site.ts`).
- **Portada + código de acceso** (`src/components/access/access-gate.tsx`):
  gate simple en el cliente (código fijo, guardado en `localStorage` tras
  ingresar). No requiere backend.
- **Confirmación de asistencia por WhatsApp** (`src/components/sections/rsvp.tsx`):
  arma el mensaje y abre `wa.me` con el texto ya escrito.
- **Cuenta regresiva** a la fecha del matrimonio + **botón "Agregar al
  calendario"** (Google Calendar y descarga `.ics` para Apple/Outlook).
- **Ubicación** con botones a Google Maps / Waze + mapa embebido.
- **Slider de fotos** (Embla Carousel) con crédito de fotografía.
- **Compartir fotos** (`src/components/sections/photo-share.tsx`): los
  invitados suben fotos/videos desde un botón simple (como un mini Drive).
  El almacenamiento está **componentizado** detrás de una interfaz
  (`src/lib/storage/types.ts`) con 3 implementaciones intercambiables vía
  `STORAGE_PROVIDER`:
  - `local` (default): guarda en `public/uploads`, sin configuración —
    ideal para probar, pero el disco es efímero en la mayoría de hosts.
  - `s3`: sube a un bucket de AWS S3 (ya implementado, solo configura
    variables de entorno).
  - `gcs`: adapter de Google Cloud Storage listo para completar (ver
    comentarios en `src/lib/storage/gcs-adapter.ts`).

  Para cambiar de proveedor no se toca el componente ni la ruta API —
  solo `STORAGE_PROVIDER` en `.env.local`.

## Pendiente antes de publicar

- Reemplaza las fotos placeholder en `public/gallery/*.svg` por las fotos reales.
- Agrega tu pista de audio en `public/audio/background-music.mp3`.
- Completa `src/config/site.ts` con los datos reales de la pareja, lugar y WhatsApp.
- Define `NEXT_PUBLIC_ACCESS_CODE` y `NEXT_PUBLIC_WHATSAPP_NUMBER` en `.env.local`.
- Si usarás S3 o GCS para las fotos, configura las variables correspondientes.
# nicoydani
