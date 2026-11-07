import { useLayoutEffect, useRef } from 'react'
import { gsap, reduceMotion } from '../shared/motion'

/**
 * Faixa de fotografia a toda a largura, a cores. Funde-se com o preto em cima e em baixo
 * e desliza devagar com o scroll, para dar respiração visual entre secções de texto.
 */
export function ImageBand({ src, alt, caption, position = '50% 50%' }: { src: string; alt: string; caption?: string; position?: string }) {
  const root = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    if (reduceMotion()) return
    const el = root.current!
    const ctx = gsap.context(() => {
      gsap.fromTo(el.querySelector('img'), { yPercent: -7 }, {
        yPercent: 7, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
      })
    }, el)
    return () => ctx.revert()
  }, [])
  return (
    <figure ref={root} className="band">
      <img src={src} alt={alt} loading="lazy" decoding="async" style={{ objectPosition: position }} />
      {caption && <figcaption className="mono">{caption}</figcaption>}
    </figure>
  )
}
