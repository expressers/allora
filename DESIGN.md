# ALLORA: design system (two proposals)

Both proposals share content (`src/shared/content.ts`), motion setup (`src/shared/motion.ts`, GSAP + ScrollTrigger + Lenis, reduced-motion aware) and the brand's core sign: the radial ring of dashes from the ALLORA logo, graded red to deep red to carbon.

## Proposta 1, "O Inventário" (`/`)

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

## Assets

Photos come from ALLORA's public Instagram (@allorasulda) and allora.ao, cropped to remove UI overlays. They are ~1080px social exports: ask the client for originals before launch. Partner logos are from the current Fórum site. The header mark is a code-drawn approximation of the logo: replace with the official vector.
