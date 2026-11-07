# ALLORA: design system

The site is the approved Proposta 3. Proposals 1 ("O Inventário") and 2 ("Anéis do Embondeiro") were retired after client approval; they remain in git history (commit 4bf7310).

Content lives in `src/shared/content.ts`, motion setup in `src/shared/motion.ts` (GSAP + ScrollTrigger + Lenis, reduced-motion aware). The site code is in `src/site/`. Three.js (the tunnel) is lazy-loaded so the hero copy paints first.

## Direcção: "O Túnel" (Proposta 3, aprovada pelo cliente)

Cinematic. References: Station Six (Behance, red translucent disc over B&W photography, edge-to-edge type), Immersive Garden "Space Sustainability" and Active Theory "Sustainable Horizons" (Awwwards).

- Theme: black `#000`, bone `#f1ebe3`, muted `#a39b94`, red `#ff2a1f`.
- Type: Anybody Variable at wide widths (wdth 130 to 150, weight 800 to 900) for titles, JetBrains Mono for metadata.
- Signature: Three.js tunnel of 44 dash rings (InstancedMesh + bloom). Ring 0 is the logo; scroll dives through chapters Medir / Reduzir / Compensar; rings turn from red (emitted) to bone (compensated) at the 47 t climax; the tunnel returns fully compensated behind the closing ALLORA wordmark.
- Red lens: B&W FILDA photos with a red duotone circle that follows the pointer and grows with scroll; frames cut by vertical wipe.
- Fórum: pinned horizontal reel (B&W, colour on hover), quote, facts. Services set as end credits. Film grain and letterbox on the hero.

## Page sequence

Tunnel (hero, Medir / Reduzir / Compensar, 47 t climax) > Sobre (statement, field photo with vertical wipe, Missão / Visão / Valores) > Impacto (numbers count up once in view, shared right-aligned number column, red "+") > Carbonómetro (red lens) > Fórum (pinned reel) > Iniciativas (Papel Semente scroll-lit line, EcoBag, Hortas) > Créditos (services, sectors, partner counts and partner names set as film credits) > Finale (contacts over the returning, compensated tunnel).

Rules kept: no eyebrows above headings, one accent (red), sharp corners, one CTA label ("Fale connosco") for the contact intent, zero em-dashes in copy. The header carries a black scrim so the nav stays legible over scrolling copy.

## Assets

Photos come from ALLORA's public Instagram (@allorasulda) and allora.ao, cropped to remove UI overlays. They are ~1080px social exports: ask the client for originals before launch. Partner logos are from the current Fórum site. The header mark is a code-drawn approximation of the logo: replace with the official vector.
