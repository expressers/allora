import { useEffect, useRef } from 'react'
import { reduceMotion } from '../shared/motion'

/**
 * A baobab cross-section drawn with ALLORA's dash.
 * Inner rings are the past (carbon), the outer ring is today (brand red).
 * Pointer sends a slow ripple through the wood.
 */
export function Rings({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!
    const reduce = reduceMotion()
    let w = 0, h = 0, dpr = 1, raf = 0, visible = true
    const t0 = performance.now()
    const ripple = { x: 0, y: 0, t: -10 }
    const RINGS = 17
    // per-ring organic irregularity, seeded so it is stable between frames
    const seeds = Array.from({ length: RINGS }, (_, i) => [Math.sin(i * 12.9898) * 43758.5453 % 1, Math.sin(i * 78.233) * 12345.678 % 1])

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = r.width; h = r.height
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr)
    }
    resize()
    const ro = new ResizeObserver(resize); ro.observe(canvas)
    const onDown = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      ripple.x = e.clientX - r.left - r.width / 2
      ripple.y = e.clientY - r.top - r.height / 2
      ripple.t = (performance.now() - t0) / 1000
    }
    let lastMove = 0
    const onMove = (e: PointerEvent) => {
      const now = performance.now()
      if (now - lastMove < 1400) return
      lastMove = now
      onDown(e)
    }
    if (!reduce) {
      window.addEventListener('pointerdown', onDown, { passive: true })
      window.addEventListener('pointermove', onMove, { passive: true })
    }
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !raf) raf = requestAnimationFrame(draw) })
    io.observe(canvas)

    function draw(now: number) {
      raf = 0
      const t = reduce ? 10 : (now - t0) / 1000
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      const cx = w / 2, cy = h / 2
      const R = Math.hypot(w, h) * 0.5
      const step = R / (RINGS + 1.5)
      ctx.lineCap = 'round'
      for (let k = 0; k < RINGS; k++) {
        const grow = Math.min(1, Math.max(0, (t - 0.2 - k * 0.07) / 0.6))
        if (grow <= 0) continue
        const base = step * (k + 1.2)
        const n = Math.max(18, Math.round((Math.PI * 2 * base) / (step * 0.55)))
        const outer = k / (RINGS - 1)
        // colour: past rings sit in deep heartwood, the newest ring is today's red
        const isToday = k === RINGS - 6
        const alpha = isToday ? 1 : 0.16 + 0.5 * (1 - Math.abs(outer - 0.35))
        const col = isToday ? '225,37,27' : k < RINGS - 6 ? '142,21,19' : '238,231,223'
        const lw = Math.max(1.5, step * (isToday ? 0.12 : 0.07))
        const [s1, s2] = seeds[k]
        const rot = t * 0.012 * (k % 2 ? 1 : -1)
        ctx.strokeStyle = `rgba(${col},${(isToday ? 1 : alpha * (k < RINGS - 6 ? 1 : 0.22)) * grow})`
        ctx.lineWidth = lw
        ctx.beginPath()
        for (let i = 0; i < n; i++) {
          const a = (i / n) * Math.PI * 2 + rot
          // wood irregularity: low harmonics so rings stay concentric but not perfect
          let r = base * (1 + 0.035 * Math.sin(a * 2 + s1 * 6) + 0.02 * Math.sin(a * 3 + s2 * 6))
          const x0 = Math.cos(a) * r, y0 = Math.sin(a) * r
          const dt = t - ripple.t
          if (dt > 0 && dt < 6) {
            const d = Math.hypot(x0 - ripple.x, y0 - ripple.y)
            const front = dt * R * 0.45
            const wave = Math.exp(-((d - front) ** 2) / (2 * (step * 1.4) ** 2)) * (1 - dt / 6)
            r += wave * step * 0.45
          }
          const dl = step * (isToday ? 0.28 : 0.2) * grow
          const ca = Math.cos(a), sa = Math.sin(a)
          ctx.moveTo(cx + ca * r, cy + sa * r)
          ctx.lineTo(cx + ca * (r + dl), cy + sa * (r + dl))
        }
        ctx.stroke()
      }
      if (visible && !reduce) raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect()
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return <canvas ref={ref} className={className} aria-hidden="true" />
}

/** Static SVG ring index used by the pinned services section. */
export function RingIndex({ count, active }: { count: number; active: number }) {
  return (
    <svg viewBox="0 0 400 400" className="ring-index" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => {
        const r = 74 + i * 24
        const c = 2 * Math.PI * r
        const dash = c / Math.round(c / 14)
        const state = i < active ? 'past' : i === active ? 'now' : 'future'
        return (
          <circle key={i} cx="200" cy="200" r={r} className={`ri ri-${state}`}
            strokeDasharray={`${dash * 0.42} ${dash * 0.58}`} />
        )
      })}
    </svg>
  )
}
