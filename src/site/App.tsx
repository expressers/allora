import { Suspense, lazy, useEffect, useLayoutEffect, useRef } from 'react'
import { ArrowUpRight } from '@phosphor-icons/react/dist/csr/ArrowUpRight'
import { InstagramLogo } from '@phosphor-icons/react/dist/csr/InstagramLogo'
import type { TunnelState } from './Tunnel'
import {
  CTA, about, chapters, contact, forum, initiatives, mailto, nav, numbers,
  partnerCounts, partners, presence, sectors, services,
} from '../shared/content'
import { gsap, ScrollTrigger, revealOnScroll, reduceMotion, startSmoothScroll, EASE_OUT } from '../shared/motion'

// Three.js is ~700 kB: load it after the hero copy so the first paint is not blocked.
const Tunnel = lazy(() => import('./Tunnel').then((m) => ({ default: m.Tunnel })))

/** 1000 -> "1.000" (Portuguese grouping, also for four-digit numbers). */
const fmt = (n: number) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.')

function Header() {
  return (
    <header className="hdr">
      <a href="#topo" className="brand" aria-label="ALLORA, início">ALLORA</a>
      <nav className="hdr-nav" aria-label="Principal">
        {nav.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
      </nav>
      <a className="btn btn-sm" href={mailto}>{CTA}</a>
    </header>
  )
}

function TunnelAct() {
  return (
    <section id="topo" className="act-tunnel">
      <div className="panel hero">
        <div className="letterbox top" aria-hidden="true" />
        <div className="letterbox bottom" aria-hidden="true" />
        <h1 className="hero-title">
          <span className="ln"><span>Cuidamos do</span></span>
          <span className="ln"><span>amanhã <em>hoje.</em></span></span>
        </h1>
        <div className="hero-side">
          <p>Transformamos sustentabilidade em valor para empresas, comunidades e o futuro de Angola.</p>
          <a className="btn" href={mailto}>{CTA}<ArrowUpRight size={16} weight="bold" /></a>
        </div>
      </div>
      {chapters.map((c) => (
        <div key={c.id} id={c.id} className="panel chapter">
          <h2 className="chapter-word" style={{ ['--n' as string]: c.word.length }}>{c.word}</h2>
          <p className="chapter-text">{c.text}</p>
        </div>
      ))}
      <div className="panel chapter climax">
        <p className="climax-num" aria-label="47 toneladas"><span>47</span><small>t CO₂</small></p>
        <p className="chapter-text">Emissões do 2.º Fórum Nacional de Negócios Sustentáveis. Medidas, e compensadas na totalidade com 47 créditos de carbono cancelados.</p>
      </div>
    </section>
  )
}

function About() {
  const root = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    if (reduceMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-img', { clipPath: 'inset(100% 0 0 0)' }, {
        clipPath: 'inset(0% 0 0 0)', ease: 'none',
        scrollTrigger: { trigger: '.about-img', start: 'top 90%', end: 'top 35%', scrub: true },
      })
      gsap.fromTo('.about-img img', { scale: 1.18 }, {
        scale: 1, ease: 'none',
        scrollTrigger: { trigger: '.about-img', start: 'top bottom', end: 'bottom top', scrub: true },
      })
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <section ref={root} id="sobre" className="about">
      <h2 className="about-statement" data-reveal>{about.statement}</h2>
      <div className="about-grid">
        <figure className="about-img">
          <img src="/media/terreno.webp" alt="Equipa da ALLORA em trabalho de campo" loading="lazy" />
        </figure>
        <div className="about-copy">
          <p className="about-body" data-reveal>{about.body}</p>
          <p className="about-belief" data-reveal>{about.belief}</p>
          <dl className="pillars">
            {about.pillars.map((p, i) => (
              <div key={p.label} className="pillar" data-reveal data-delay={i * 0.06}>
                <dt>{p.label}</dt>
                <dd>{p.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

function Numbers() {
  const root = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    if (reduceMotion()) return
    const ctx = gsap.context(() => {
      // rows use display: contents (shared number column), so the number box is the trigger
      gsap.utils.toArray<HTMLElement>('.tally-row').forEach((row) => {
        const num = row.querySelector<HTMLElement>('.tally-num')!
        const out = row.querySelector<HTMLElement>('.tally-n')!
        const to = Number(out.dataset.to)
        const n = { v: 0 }
        out.textContent = '0'
        gsap.to(n, {
          v: to, duration: 1.6, ease: 'expo.out',
          onUpdate: () => { out.textContent = fmt(n.v) },
          scrollTrigger: { trigger: num, start: 'top 88%', once: true },
        })
        gsap.from(row.querySelector('.tally-label'), {
          opacity: 0, x: -16, filter: 'blur(6px)', duration: 1, ease: EASE_OUT,
          scrollTrigger: { trigger: num, start: 'top 88%', once: true },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <section ref={root} id="impacto" className="tally" aria-labelledby="tally-title">
      <h2 id="tally-title" className="tally-title" data-reveal>Impacto que se conta.</h2>
      <ol className="tally-list">
        {numbers.map((n) => (
          <li key={n.label} className="tally-row">
            <span className="tally-num">
              <span className="tally-n" data-to={n.value}>{fmt(n.value)}</span><span className="tally-plus">{n.suffix}</span>
            </span>
            <span className="tally-label">{n.label}</span>
          </li>
        ))}
      </ol>
    </section>
  )
}

const frames = [
  { src: '/media/carbonometro-opaia.webp', cap: 'Stand da OPAIA, FILDA 2026' },
  { src: '/media/carbonometro-bcs.webp', cap: 'Stand do BCS, FILDA 2026' },
  { src: '/media/carbonometro-tablet.webp', cap: 'Stand do BFA, FILDA 2026' },
]

function Lens() {
  const root = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    const stage = root.current!.querySelector<HTMLElement>('.lens-stage')!
    const reduce = reduceMotion()
    const pos = { x: 0.62, y: 0.48, tx: 0.62, ty: 0.48 }
    let raf = 0
    const onMove = (e: PointerEvent) => {
      const b = stage.getBoundingClientRect()
      pos.tx = (e.clientX - b.left) / b.width
      pos.ty = (e.clientY - b.top) / b.height
    }
    const tick = () => {
      raf = requestAnimationFrame(tick)
      pos.x += (pos.tx - pos.x) * 0.09
      pos.y += (pos.ty - pos.y) * 0.09
      stage.style.setProperty('--lx', `${(pos.x * 100).toFixed(2)}%`)
      stage.style.setProperty('--ly', `${(pos.y * 100).toFixed(2)}%`)
    }
    if (!reduce) { stage.addEventListener('pointermove', onMove); tick() }
    const ctx = gsap.context(() => {
      const shots = gsap.utils.toArray<HTMLElement>('.lens-frame')
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom bottom', scrub: true } })
      tl.fromTo(stage, { '--lr': '0vmin' }, { '--lr': '26vmin', duration: 0.25, ease: 'none' }, 0)
      shots.forEach((s, i) => {
        if (i === 0) return
        tl.fromTo(s, { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 0.18, ease: 'none' }, 0.25 + i * 0.25)
      })
      tl.to({}, { duration: 0.1 })
    }, root)
    return () => { cancelAnimationFrame(raf); stage.removeEventListener('pointermove', onMove); ctx.revert() }
  }, [])
  return (
    <section ref={root} id="carbonometro" className="lens">
      <div className="lens-stage">
        {frames.map((f, i) => (
          <figure key={f.src} className="lens-frame" style={{ zIndex: i + 1 }}>
            <img className="bw" src={f.src} alt={f.cap} />
            <div className="red" aria-hidden="true"><img src={f.src} alt="" /></div>
            <figcaption>{f.cap}</figcaption>
          </figure>
        ))}
        <div className="lens-copy">
          <h2 className="lens-title">Carbonómetro</h2>
          <p>A solução da ALLORA para medir, reduzir e compensar a pegada carbónica. Na FILDA 2026 levámos ao recinto o primeiro stand com certificação Carbono Neutro em Angola, e cada visitante dos stands do BFA, do BCS e da OPAIA saiu a conhecer o seu número.</p>
        </div>
      </div>
    </section>
  )
}

const reel = [
  { kind: 'img', src: '/media/forum-palco.webp', cap: 'Palco do 2.º Fórum' },
  { kind: 'quote' },
  { kind: 'img', src: '/media/forum-oradoras.webp', cap: 'Oradoras, 2.º Fórum' },
  { kind: 'facts' },
  { kind: 'img', src: '/media/equipa.webp', cap: 'Equipa e parceiros, FILDA 2026' },
] as const

function Reel() {
  const wrap = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    if (reduceMotion() || window.matchMedia('(max-width: 760px)').matches) return
    const ctx = gsap.context(() => {
      const distance = () => track.current!.scrollWidth - window.innerWidth
      gsap.to(track.current, {
        x: () => -distance(), ease: 'none',
        scrollTrigger: { trigger: wrap.current, start: 'top top', end: () => `+=${distance()}`, pin: true, scrub: 1, invalidateOnRefresh: true },
      })
    }, wrap)
    return () => ctx.revert()
  }, [])
  return (
    <section ref={wrap} id="forum" className="reel">
      <div ref={track} className="reel-track">
        <div className="reel-intro">
          <h2 className="reel-title">{forum.name}</h2>
          <p className="mono">{forum.edition}, {forum.date}. {forum.venue}.</p>
          <p className="reel-text">{forum.text}</p>
        </div>
        {reel.map((r, i) => {
          if (r.kind === 'img') return (
            <figure key={i} className="reel-shot"><img src={r.src} alt={r.cap} loading="lazy" /><figcaption className="mono">{r.cap}</figcaption></figure>
          )
          if (r.kind === 'quote') return (
            <blockquote key={i} className="reel-quote">
              <p>“A sustentabilidade deixa de ser discurso e passa a ser matemática.”</p>
              <cite className="mono">Adriano Sebastião, no 2.º Fórum</cite>
            </blockquote>
          )
          return (
            <dl key={i} className="reel-facts">
              {forum.facts.map((f) => <div key={f.label}><dt>{f.value}</dt><dd className="mono">{f.label}</dd></div>)}
            </dl>
          )
        })}
      </div>
    </section>
  )
}

function Initiatives() {
  const root = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    if (reduceMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.rc-line .w', { opacity: 0.12 }, {
        opacity: 1, stagger: 0.06, ease: 'none',
        scrollTrigger: { trigger: '.rc-line', start: 'top 82%', end: 'bottom 45%', scrub: true },
      })
    }, root)
    return () => ctx.revert()
  }, [])
  const words = (s: string) => s.split(' ').map((w, i) => <span key={i} className="w">{w} </span>)
  return (
    <section ref={root} id="iniciativas" className="recog">
      <div className="rc">
        <h2 className="rc-line">{words('O Papel Semente venceu. Um papel que, depois de usado, se planta e dá flores.')}</h2>
        <p className="mono">Prémios Forbes Responsabilidade Social, 24 de Abril de 2026</p>
      </div>
      <div className="rc-feature">
        <figure className="rc-img duo"><img src="/media/papel-semente.webp" alt="Papel Semente da ALLORA, lembranças de evento que se plantam" loading="lazy" /></figure>
        <p className="rc-text" data-reveal>O Papel Semente Angola transforma materiais biodegradáveis em papel ecológico com sementes incorporadas. Depois de usado, é plantado e dá origem a flores, ervas aromáticas ou espécies nativas. Inovação, economia circular e responsabilidade ambiental no mesmo gesto.</p>
      </div>
      <div className="inits">
        {initiatives.map((it, i) => (
          <article key={it.name} className="init" data-reveal data-delay={i * 0.06}>
            <h3>{it.name}</h3>
            <p>{it.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function Credits() {
  return (
    <section id="servicos" className="credits">
      <h2 className="credits-title" data-reveal>O que fazemos</h2>
      <dl className="credits-list">
        {services.map((s, i) => (
          <div key={s.title} className="credit" data-reveal data-delay={i * 0.04}>
            <dt>{s.title}</dt>
            <dd>{s.text}</dd>
          </div>
        ))}
      </dl>
      <p className="credits-sectors" data-reveal>
        Para {sectors.slice(0, -1).map((s) => s.toLowerCase()).join(', ')} e {sectors[sectors.length - 1].toLowerCase()}.
      </p>

      <h3 className="credits-sub" data-reveal>Com quem trabalhamos</h3>
      <dl className="credits-counts" data-reveal>
        {partnerCounts.map((c) => <div key={c.label}><dt>{c.value}</dt><dd>{c.label}</dd></div>)}
      </dl>
      <ul className="credits-names" data-reveal aria-label="Parceiros">
        {partners.map((p) => <li key={p}>{p}</li>)}
      </ul>
      <p className="credits-presence" data-reveal>
        Com parceiros em {presence.slice(0, -1).join(', ')} e {presence[presence.length - 1]}.
      </p>
    </section>
  )
}

function Finale() {
  return (
    <section id="contacto" className="finale">
      <div className="finale-top">
        <div className="finale-lead">
          <a className="finale-mail" href={mailto}>{contact.email}<ArrowUpRight size={28} weight="light" /></a>
          <p className="finale-note">Para orçamentos e sugestões, estamos disponíveis 24 horas por dia, todos os dias.</p>
        </div>
        <div className="finale-meta mono">
          {contact.phones.map((p) => <a key={p} href={`tel:${p.replace(/\s/g, '')}`}>{p}</a>)}
          <address>{contact.address[0]}<br />{contact.address[1]}</address>
          <a href={contact.instagram} target="_blank" rel="noreferrer"><InstagramLogo size={14} /> @allorasulda</a>
        </div>
        <a className="btn btn-lg" href={mailto}>{CTA}<ArrowUpRight size={18} weight="bold" /></a>
      </div>
      <p className="finale-word" aria-hidden="true">ALLORA</p>
      <footer className="ftr mono"><span>© 2026 ALLORA SU, LDA</span><span>Cuidamos do Amanhã Hoje</span></footer>
    </section>
  )
}

export default function App() {
  const root = useRef<HTMLDivElement>(null)
  const state = useRef<TunnelState>({ progress: 0, visible: 1 })

  useLayoutEffect(() => {
    const fade = { out: 1, back: 0 }
    const sync = () => { state.current.visible = Math.max(fade.out, fade.back) }
    const ctx = gsap.context(() => {
      ScrollTrigger.create({ trigger: '.act-tunnel', start: 'top top', end: 'bottom bottom', onUpdate: (s) => { state.current.progress = s.progress * 0.86 } })
      ScrollTrigger.create({ trigger: '.about', start: 'top bottom', end: 'top 20%', onUpdate: (s) => { fade.out = 1 - s.progress; sync() } })
      ScrollTrigger.create({
        trigger: '.finale', start: 'top bottom', end: 'top 10%',
        onUpdate: (s) => { fade.back = s.progress; if (s.progress > 0) state.current.progress = 0.86 + s.progress * 0.14; sync() },
      })
      if (!reduceMotion()) {
        gsap.from('.letterbox', { scaleY: 2.6, duration: 2.2, ease: EASE_OUT })
        gsap.to('.letterbox', { autoAlpha: 0, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: '40% top', scrub: true } })
        gsap.from('.hero-title .ln > span', { yPercent: 110, duration: 1.6, ease: EASE_OUT, stagger: 0.12, delay: 1.1 })
        gsap.from('.hero-side > *', { y: 16, opacity: 0, duration: 1.2, ease: EASE_OUT, stagger: 0.1, delay: 1.5 })
        gsap.utils.toArray<HTMLElement>('.chapter').forEach((c) => {
          gsap.fromTo(c.children, { opacity: 0, y: 40, filter: 'blur(14px)' }, {
            opacity: 1, y: 0, filter: 'blur(0px)', stagger: 0.12, ease: 'none',
            scrollTrigger: { trigger: c, start: 'top 75%', end: 'top 30%', scrub: true },
          })
        })
      }
    }, root)
    return () => ctx.revert()
  }, [])

  useEffect(() => { startSmoothScroll(); return revealOnScroll(root.current!) }, [])

  return (
    <div ref={root}>
      <Suspense fallback={null}><Tunnel stateRef={state} /></Suspense>
      <div className="grain" aria-hidden="true" />
      <Header />
      <main>
        <TunnelAct />
        <About />
        <Numbers />
        <Lens />
        <Reel />
        <Initiatives />
        <Credits />
        <Finale />
      </main>
    </div>
  )
}
