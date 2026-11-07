import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export const reduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const EASE_OUT = 'expo.out'
export const HEADER_OFFSET = -72

let lenis: Lenis | null = null
export const getLenis = () => lenis

export function startSmoothScroll() {
  if (reduceMotion() || lenis) return lenis
  lenis = new Lenis({ duration: 1.1, smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((t) => lenis?.raf(t * 1000))
  gsap.ticker.lagSmoothing(0)
  // Links para uma secção desta mesma página passam pelo Lenis, para deslizar em vez de saltar.
  document.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement).closest('a[href*="#"]') as HTMLAnchorElement | null
    if (!a || a.target === '_blank') return
    const url = new URL(a.href, location.href)
    if (url.pathname !== location.pathname || url.search !== location.search || url.hash.length < 2) return
    const el = document.getElementById(decodeURIComponent(url.hash.slice(1)))
    if (!el) return
    e.preventDefault()
    history.replaceState(null, '', url.hash)
    lenis?.scrollTo(el, { offset: HEADER_OFFSET })
  })
  // Ao chegar de outra página com um #, o browser já posicionou; corrige pela altura do cabeçalho.
  if (location.hash.length > 1) {
    const el = document.getElementById(decodeURIComponent(location.hash.slice(1)))
    if (el) requestAnimationFrame(() => lenis?.scrollTo(el, { offset: HEADER_OFFSET, immediate: true }))
  }
  return lenis
}

/** Revela os elementos [data-reveal] quando entram no ecrã (uma vez). */
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

/** 1000 -> "1.000" (agrupamento português, também para quatro dígitos). */
export const fmt = (n: number) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.')

/** Conta de 0 até [data-to] quando o número entra no ecrã. O valor final já vem no HTML. */
export function countUp(root: HTMLElement) {
  if (reduceMotion()) return () => {}
  const ctx = gsap.context(() => {
    gsap.utils.toArray<HTMLElement>('[data-to]').forEach((out) => {
      const to = Number(out.dataset.to)
      const n = { v: 0 }
      // Só reinicia a zero o que ainda está abaixo da dobra; o que já se vê fica com o valor final.
      if (out.getBoundingClientRect().top < window.innerHeight * 0.9) return
      out.textContent = '0'
      gsap.to(n, {
        v: to,
        duration: 1.6,
        ease: 'expo.out',
        onUpdate: () => { out.textContent = fmt(n.v) },
        scrollTrigger: { trigger: out, start: 'top 90%', once: true },
      })
    })
  }, root)
  return () => ctx.revert()
}

export { gsap, ScrollTrigger }
