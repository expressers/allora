import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export const reduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const EASE_OUT = 'expo.out'

let lenis: Lenis | null = null

export function startSmoothScroll() {
  if (reduceMotion() || lenis) return lenis
  lenis = new Lenis({ duration: 1.1, smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((t) => lenis?.raf(t * 1000))
  gsap.ticker.lagSmoothing(0)
  // Anchor links go through Lenis so they ease instead of jumping.
  document.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null
    if (!a) return
    const id = a.getAttribute('href')!
    if (id.length < 2) return
    const el = document.querySelector(id)
    if (!el) return
    e.preventDefault()
    lenis?.scrollTo(el as HTMLElement, { offset: -64 })
  })
  return lenis
}

/** Reveal children with [data-reveal] once they enter the viewport. */
export function revealOnScroll(root: HTMLElement) {
  if (reduceMotion()) return () => {}
  const ctx = gsap.context(() => {
    gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
      gsap.from(el, {
        y: 28,
        opacity: 0,
        filter: 'blur(6px)',
        duration: 1.1,
        ease: EASE_OUT,
        delay: Number(el.dataset.delay ?? 0),
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      })
    })
  }, root)
  return () => ctx.revert()
}

export { gsap, ScrollTrigger }
