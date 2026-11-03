# ALLORA: design system

The site has a single page at `/`: "O Túnel", the visual approved by the client. Code lives in `src/p3/`.

Shared modules: content (`src/shared/content.ts`) and motion setup (`src/shared/motion.ts`, GSAP + ScrollTrigger + Lenis, reduced-motion aware). The brand's core sign is the radial ring of dashes from the ALLORA logo, graded red to deep red to carbon.

## O Túnel (`/`)

Cinematic. References: Station Six (Behance, red translucent disc over B&W photography, edge-to-edge type), Immersive Garden "Space Sustainability" and Active Theory "Sustainable Horizons" (Awwwards).

- Theme: black `#000`, bone `#f1ebe3`, muted `#a39b94`, red `#ff2a1f`.
- Type: Anybody Variable at wide widths (wdth 130 to 150, weight 800 to 900) for titles, JetBrains Mono for metadata.
- Signature: Three.js tunnel of 44 dash rings (InstancedMesh + bloom). Ring 0 is the logo; scroll dives through chapters Medir / Reduzir / Compensar; rings turn from red (emitted) to bone (compensated) at the 47 t climax; the tunnel returns fully compensated behind the closing ALLORA wordmark.
- Red lens: B&W FILDA photos with a red duotone circle that follows the pointer and grows with scroll; frames cut by vertical wipe.
- Fórum: pinned horizontal reel (B&W, colour on hover), quote, facts. Services set as end credits. Film grain and letterbox on the hero.

## Assets

Photos come from ALLORA's public Instagram (@allorasulda) and allora.ao, cropped to remove UI overlays. They are ~1080px social exports: ask the client for originals before launch. Partner logos are from the current Fórum site. The header mark is a code-drawn approximation of the logo: replace with the official vector.
