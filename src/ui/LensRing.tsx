import { useLayoutEffect, useRef } from 'react'
import { SYMBOL } from './brand'
import { gsap, reduceMotion } from '../shared/motion'

/**
 * O anel do logótipo como lente: uma fotografia a preto e branco, virada a vermelho,
 * vista através do anel de 28 traços. O anel roda com o scroll.
 */
export function LensRing({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  const root = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    if (reduceMotion()) return
    const el = root.current!
    const ctx = gsap.context(() => {
      const st = { trigger: el, start: 'top top', end: 'bottom top', scrub: true }
      gsap.to(el.querySelector('svg'), { rotate: 48, ease: 'none', scrollTrigger: st })
      gsap.fromTo(el.querySelector('img'), { scale: 1.16 }, { scale: 1, ease: 'none', scrollTrigger: { ...st, start: 'top bottom' } })
    }, el)
    return () => ctx.revert()
  }, [])
  return (
    <div ref={root} className={`lensring ${className}`}>
      <div className="lensring-photo duo">
        <img src={src} alt={alt} fetchPriority="high" />
      </div>
      <svg viewBox="-104 -104 208 208" aria-hidden="true" focusable="false">
        <g strokeLinecap="round" fill="none">
          {SYMBOL.map(([x1, y1, x2, y2, w], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={w} style={{ ['--i' as string]: i }} />
          ))}
        </g>
      </svg>
    </div>
  )
}
