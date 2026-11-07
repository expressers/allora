# ALLORA: design system

The site is the approved Proposta 3 ("O Túnel") extended into a multi-page institutional website. Proposals 1 ("O Inventário") and 2 ("Anéis do Embondeiro") were retired after client approval; they remain in git history (commit 4bf7310).

Content lives in `src/shared/content.ts` (source: the client's Apresentação Institucional 2026), motion setup in `src/shared/motion.ts` (GSAP + ScrollTrigger + Lenis, reduced-motion aware). Shared UI is in `src/ui/`, the home page in `src/site/`, the inner pages in `src/pages/`.

## Architecture

- Vite multi-page build: one HTML per page (own title, description, Open Graph), one entry per page. Routes use trailing slashes (`/sobre/`), enforced by `vercel.json`.
- Pages: `/` (O Túnel), `/sobre/`, `/servicos/` (five services as anchored sections), `/carbonometro/`, `/projectos/`, `/forum/`, `/academia/`, `/contactos/`, and `404.html`.
- Pre-rendering: `bun run build` renders every page to static HTML (`src/entry-server.tsx` + `scripts/prerender.mjs`), then React hydrates. Components must not touch `window` during render.
- Three.js (the tunnel) is lazy-loaded and only exists on the home page.
- Cross-document view transitions (`@view-transition`) keep the header still between pages.

## World: "O Túnel"

Cinematic. References: Station Six (Behance, red translucent disc over B&W photography, edge-to-edge type), Immersive Garden "Space Sustainability" and Active Theory "Sustainable Horizons" (Awwwards).

- Theme: black `#000`, raised `#0d0b0a`, bone `#f1ebe3`, muted `#a39b94`, red `#ff2a1f`; official deep red `#a11111` under the red texture. One theme for every page.
- Type: Anybody Variable at wide widths (wdth 110 to 150, weight 600 to 900) for titles and body; JetBrains Mono only for metadata, labels and form labels.
- Shape: sharp corners everywhere (radius 0), 1px rules (`--rule`), inset 1px outlines instead of borders on controls and tags.
- Photography: ALLORA's own photos stay B&W, or B&W turned red (`.duo`, multiply), with colour on hover (`.duo-hover`). Environmental stock photography runs in full colour, so the planet reads green against the black and red.
- Motion: custom ease-out `cubic-bezier(0.23, 1, 0.32, 1)`; buttons scale to 0.97 on press; hovers gated behind `(hover: hover) and (pointer: fine)`; everything collapses under `prefers-reduced-motion`.

## Signatures

- Home: Three.js tunnel of 44 dash rings. Ring 0 is the logo; scroll dives through Medir / Reduzir / Compensar; rings turn from red (emitted) to bone (compensated) at the 47 t climax.
- Reading ring (inner pages): the 28 dashes of the header logo turn from red to bone as the page is read. Same story as the tunnel, as a progress indicator.
- Lens ring (inner page openers): the page's photo, B&W turned red, seen through the official 28-dash symbol; dashes draw in on load, the ring turns with scroll. The page word (SOBRE, SERVIÇOS…) runs edge to edge below it in `mix-blend-mode: difference`.
- Carbonómetro: the symbol pinned beside Medir / Reduzir / Compensar; its dashes light from red to bone as the three steps pass.
- Red band before every footer: the red forest texture from the cover of the client's presentation, with one "Fale connosco" action that pre-selects the right subject on the contact form (`/contactos/?assunto=...`).

## Rules kept

No eyebrows above headings, no section numbers, one accent (red), one CTA label ("Fale connosco") for the contact intent, zero em-dashes in copy, Portuguese of Angola (projectos, actividade, sector, contacto). The header carries a black scrim so the nav stays legible over scrolling copy; below 1100px the nav becomes a full-screen menu.

## Assets

- Photos from ALLORA's public Instagram (@allorasulda) and allora.ao, cropped to remove UI overlays (~1080px social exports).
- From the institutional PDF (each slide is a flattened 1920×1080 image, so crops are small and upscaled 2×): `fnns-grupo`, `fnns-podio`, `papel-semente-cracha`, `maos-planta`, `emissoes`, `academia`, `textura-vermelha`. Ask the client for the originals before launch.
- Colour photography (environment), in `public/media/verde/`, shown in full colour to balance the black and red world: free stock under the Unsplash License (images.unsplash.com ids below) and the Pexels License. Re-encoded to WebP (q60, max 1920px). Used as full-bleed bands (`ImageBand`, parallax, faded into black top and bottom), one photo per service, and on the initiatives.
  - angola-costa `photo-1613908853317-8606178b3e81` (Angola), angola-campos `photo-1602516818688-715dfc1b77d5` (Angola), miradouro-da-lua `photo-1518521901256-c90d4db6f85c` (Angola)
  - floresta-estrada `photo-1594502245633-864a6be8fc79`, floresta-topo `photo-1501856054482-8b7fbff7b3fe`, floresta-densa `photo-1528543413928-5447744645a0`
  - parque-solar `photo-1497435334941-8c899ee9e8e9`, eolicas `photo-1466611653911-95081537e5b7`
  - maos-planta-verde `photo-1542601906990-b4d3fb778b09`, mudas `photo-1523348837708-15d4a09cfac2`, plantar `photo-1779085031158-a2519daf9747`, horta `photo-1621460248083-6271cc4437a8`
  - saco-rede `photo-1792736945298-a480710126cb`, formacao `photo-1758270704587-43339a801396`, academia-aula `photo-1758270704925-fa59d93119c1`
  - agua: Pexels 1446504 (Dii Nyau, Mwanza, Tanzânia)
- Partner logos in `public/logos/parceiros/`: cut from the PDF's partners slide and converted to white with alpha; the wall gives each logo the same optical area.

## Logótipo

Ficheiros oficiais vectorizados em `public/brand/` (a partir dos JPG do cliente, guardados em `.material/logo/`, fora do git):

- `allora-logo.svg` (horizontal, cores oficiais: anel do vermelho ao preto, nome em gradiente escuro) para fundos claros.
- `allora-logo-white.svg` (horizontal, branco) para fundos escuros ou vermelhos.
- `allora-simbolo.svg` / `allora-simbolo-white.svg` (só o anel de 28 traços).
- `favicon.svg` e `apple-touch-icon.png`: anel branco sobre o gradiente vermelho oficial (`#f90101` a `#a11111`).

No site, a mesma geometria vive em `src/ui/brand.ts` (traços ordenados no sentido dos ponteiros do relógio a partir do topo): `Logo.tsx` no cabeçalho e no rodapé, `LensRing.tsx` nas aberturas das páginas.
