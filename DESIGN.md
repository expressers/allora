# ALLORA: design system (three proposals)

`/` is a chooser page linking to `/proposta-1/`, `/proposta-2/` and `/proposta-3/`. Every proposal carries a small fixed switcher (bottom-left) to move between them.

Both proposals share content (`src/shared/content.ts`), motion setup (`src/shared/motion.ts`, GSAP + ScrollTrigger + Lenis, reduced-motion aware) and the brand's core sign: the radial ring of dashes from the ALLORA logo, graded red to deep red to carbon.

## Proposta 1, "O Inventário" (`/proposta-1/`)

The site is a living carbon inventory. The logo ring becomes a measuring instrument (the Carbonómetro).

- Theme: light only. Paper `#f2f3f1`, paper-2 `#e7e9e5`, ink `#141414`, ink-2 `#4a4d4b`, rule `rgba(20,20,20,.14)`.
- Red is semantic, never decorative: `#d9221a` = measured, not yet compensated; `#8e1513` = transition; ink = compensated. Hover on the ink CTA turns deep red.
- Type: Geist Variable (display 600, tracking -0.04em to -0.055em), Geist Mono Variable for every quantity (tabular).
- Shape: sharp corners everywhere (radius 0), 1px rules, no cards except the single ink panel in the Carbonómetro bento.
- Signature: hero canvas ring, 132 dashes ignite red on load, scroll compensates them to carbon (readout Medido / A compensar / Compensado), dashes near the pointer reach outward with spring physics. Echoes: tick ruler in "Abordagem", fully compensated ring at the close.
- Motion: expo-out reveals with a short blur, clip-path reveal on the Fórum photo, one marquee (partners).

## Proposta 2, "Anéis do Embondeiro" (`/proposta-2/`)

Time made visible: a baobab cross-section drawn with ALLORA's dash.

- Theme: dark only. Heartwood `#170908`, bg-2 `#211110`, bone `#eee7df`, muted `#b8a8a1`, rule `rgba(238,231,223,.16)`, red `#e1251b`.
- Ring semantics: inner rings = past (deep red), one bright red ring = today, outer faint bone rings = tomorrow.
- Type: Bodoni Moda Variable (display, italic for emphasis in red), Onest Variable for body.
- Shape: pill buttons, 14px logo chips, images unrounded.
- Signature: full-viewport canvas rings with pointer ripples; pinned ring index where each service lights its ring; Fórum logo dissolves into the event photo growing inside a circle; 47 t counter.

## Proposta 3, "O Túnel" (`/proposta-3/`)

Cinematic. References: Station Six (Behance, red translucent disc over B&W photography, edge-to-edge type), Immersive Garden "Space Sustainability" and Active Theory "Sustainable Horizons" (Awwwards).

- Theme: black `#000`, bone `#f1ebe3`, muted `#a39b94`, red `#ff2a1f`.
- Type: Anybody Variable at wide widths (wdth 130 to 150, weight 800 to 900) for titles, JetBrains Mono for metadata.
- Signature: Three.js tunnel of 44 dash rings (InstancedMesh + bloom). Ring 0 is the logo; scroll dives through chapters Medir / Reduzir / Compensar; rings turn from red (emitted) to bone (compensated) at the 47 t climax; the tunnel returns fully compensated behind the closing ALLORA wordmark.
- Red lens: B&W FILDA photos with a red duotone circle that follows the pointer and grows with scroll; frames cut by vertical wipe.
- Fórum: pinned horizontal reel (B&W, colour on hover), quote, facts. Services set as end credits. Film grain and letterbox on the hero.

## Assets

Photos come from ALLORA's public Instagram (@allorasulda) and allora.ao, cropped to remove UI overlays. They are ~1080px social exports: ask the client for originals before launch. Partner logos are from the current Fórum site. The header mark is a code-drawn approximation of the logo: replace with the official vector.
