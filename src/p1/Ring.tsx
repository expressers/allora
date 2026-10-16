import { useEffect, useRef } from 'react'
import { reduceMotion } from '../shared/motion'

/**
 * The ALLORA ring as a measuring instrument.
 * Each dash is a unit. Red = measured / not yet compensated, carbon = compensated.
 * `progress` (0..1) is written from outside (scroll) into progressRef.
 */
type Props = {
  dashes?: number
  progressRef: React.MutableRefObject<number>
  className?: string
}

const RED: [number, number, number] = [217, 34, 26]
const DEEP: [number, number, number] = [120, 18, 16]
const CARBON: [number, number, number] = [20, 20, 20]

const mix = (a: number[], b: number[], t: number) => a.map((v, i) => Math.round(v + (b[i] - v) * t))

export function Ring({ dashes = 132, progressRef, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const reduce = reduceMotion()
    let w = 0, h = 0, dpr = 1
    let raf = 0
    let visible = true
    const start = performance.now()
    const pointer = { a: 0, inside: 0, target: 0 }
    const ext = new Float32Array(dashes) // spring extension per dash
    const vel = new Float32Array(dashes)

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = r.width; h = r.height
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr)
    }
    resize()
    const ro = new ResizeObserver(resize); ro.observe(canvas)

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      const x = e.clientX - r.left - r.width / 2
      const y = e.clientY - r.top - r.height / 2
      const d = Math.hypot(x, y) / (Math.min(r.width, r.height) / 2)
      pointer.a = Math.atan2(y, x)
      pointer.target = d > 0.35 && d < 1.25 ? 1 : 0
    }
    const onLeave = () => { pointer.target = 0 }
    if (!reduce) {
      window.addEventListener('pointermove', onMove, { passive: true })
      document.addEventListener('pointerleave', onLeave)
    }

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible && !raf) raf = requestAnimationFrame(draw)
    })
    io.observe(canvas)

    function draw(now: number) {
      raf = 0
      const t = (now - start) / 1000
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      const cx = w / 2, cy = h / 2
      const R = Math.min(w, h) / 2
      const rOut = R * 0.96
      const len = R * 0.11
      const lw = Math.max(1.6, R * 0.0145)
      const p = progressRef.current
      pointer.inside += (pointer.target - pointer.inside) * 0.08

      for (let i = 0; i < dashes; i++) {
        const f = i / dashes
        // Logo orientation: the sequence starts at ~10 o'clock and runs clockwise.
        const a = -Math.PI * 0.72 + f * Math.PI * 2
        // ignite on load, one by one (measuring)
        const ignite = reduce ? 1 : Math.min(1, Math.max(0, (t - 0.25 - f * 1.5) / 0.35))
        if (ignite <= 0) continue
        // pointer reading: dashes near the pointer angle reach outward
        let da = Math.abs(Math.atan2(Math.sin(a - pointer.a), Math.cos(a - pointer.a)))
        const target = pointer.inside * Math.max(0, 1 - da / 0.5) ** 2
        vel[i] = (vel[i] + (target - ext[i]) * 0.12) * 0.78
        ext[i] += vel[i]
        // compensation front: dashes behind the front settle to carbon,
        // a short ramp through deep red echoes the logo gradient.
        const front = p * 1.08
        const k = Math.min(1, Math.max(0, (front - f) / 0.08))
        const col = k < 0.5 ? mix(RED, DEEP, k * 2) : mix(DEEP, CARBON, (k - 0.5) * 2)
        const major = i % 6 === 0 ? 1.45 : 1
        const l = len * major * (0.55 + 0.45 * ignite) * (1 + ext[i] * 0.7)
        const r1 = rOut - len + (len - l) * 0.15
        ctx.strokeStyle = `rgba(${col[0]},${col[1]},${col[2]},${ignite})`
        ctx.lineWidth = lw
        ctx.lineCap = 'round'
        ctx.beginPath()
        const ca = Math.cos(a), sa = Math.sin(a)
        ctx.moveTo(cx + ca * r1, cy + sa * r1)
        ctx.lineTo(cx + ca * (r1 + l), cy + sa * (r1 + l))
        ctx.stroke()
      }
      // inner scale: fine ticks, the instrument's ruler
      ctx.strokeStyle = 'rgba(20,20,20,0.22)'
      ctx.lineWidth = 1
      const rIn = R * 0.7
      for (let i = 0; i < 240; i++) {
        const a = (i / 240) * Math.PI * 2
        const major = i % 20 === 0
        const tl = major ? R * 0.035 : R * 0.014
        ctx.beginPath()
        ctx.moveTo(cx + Math.cos(a) * rIn, cy + Math.sin(a) * rIn)
        ctx.lineTo(cx + Math.cos(a) * (rIn - tl), cy + Math.sin(a) * (rIn - tl))
        ctx.stroke()
      }
      if (visible && !(reduce && t > 0.1)) raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    // when reduced motion, still redraw on scroll-driven progress changes
    const iv = reduce ? window.setInterval(() => { if (!raf) raf = requestAnimationFrame(draw) }, 120) : 0

    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); window.clearInterval(iv)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [dashes, progressRef])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
