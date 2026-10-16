import { useEffect, useLayoutEffect, useRef } from 'react'
import { ArrowUpRight } from '@phosphor-icons/react/dist/csr/ArrowUpRight'
import { InstagramLogo } from '@phosphor-icons/react/dist/csr/InstagramLogo'
import { Tunnel, type TunnelState } from './Tunnel'
import { Switch } from '../shared/Switch'
import { CTA, contact, forum, mailto, partners, services } from '../shared/content'
import { gsap, ScrollTrigger, revealOnScroll, reduceMotion, startSmoothScroll, EASE_OUT } from '../shared/motion'

const navP3 = [
  { label: 'Método', href: '#medir' },
  { label: 'Carbonómetro', href: '#carbonometro' },
  { label: 'Fórum', href: '#forum' },
  { label: 'Serviços', href: '#creditos' },
]

function Header() {
  return (
    <header className="hdr">
      <a href="#topo" className="brand" aria-label="ALLORA, início">ALLORA</a>
      <nav className="hdr-nav" aria-label="Principal">
        {navP3.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
      </nav>
      <a className="btn btn-sm" href={mailto}>{CTA}</a>
    </header>
  )
}

const chapters = [
  { id: 'medir', word: 'Medir', text: 'Observamos o terreno, os processos e as práticas. Nenhuma solução antes do diagnóstico.' },
  { id: 'reduzir', word: 'Reduzir', text: 'O diagnóstico vira plano estratégico de sustentabilidade e ESG, com metas verificáveis.' },
  { id: 'compensar', word: 'Compensar', text: 'O que não se evita é neutralizado com créditos de carbono certificados.' },
]

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
          <p>Consultoria em sustentabilidade e ESG para empresas e instituições em Angola.</p>
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
    const pos = { x: 0.62, y: 0.48, tx: 0.62, ty: 0.48, r: 0 }
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
          <p>A solução da ALLORA para medir, reduzir e compensar a pegada carbónica. Na FILDA 2026, cada visitante dos stands do BFA, do BCS e da OPAIA saiu a conhecer o seu número.</p>
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
          <h2 className="reel-title">Fórum Nacional de Negócios Sustentáveis</h2>
          <p className="mono">{forum.edition}. {forum.date}. {forum.venue}.</p>
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

function Recognition() {
  const root = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    if (reduceMotion()) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.rc-line').forEach((line) => {
        gsap.fromTo(line.querySelectorAll('.w'), { opacity: 0.12 }, {
          opacity: 1, stagger: 0.06, ease: 'none',
          scrollTrigger: { trigger: line, start: 'top 82%', end: 'bottom 50%', scrub: true },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])
  const words = (s: string) => s.split(' ').map((w, i) => <span key={i} className="w">{w} </span>)
  return (
    <section ref={root} id="impacto" className="recog">
      <div className="rc">
        <p className="mono">24.04.2026</p>
        <p className="rc-line">{words('Vencedora dos Prémios Forbes Responsabilidade Social, com o Papel Semente.')}</p>
      </div>
      <figure className="rc-img duo"><img src="/media/papel-semente.webp" alt="Papel Semente da ALLORA, lembranças de evento que se plantam" loading="lazy" /></figure>
      <div className="rc">
        <p className="mono">10.03.2026</p>
        <p className="rc-line">{words('47 créditos de carbono cancelados. Neutralidade integral do 2.º Fórum, no quadro do Protocolo de Quioto.')}</p>
      </div>
    </section>
  )
}

function Credits() {
  return (
    <section id="creditos" className="credits">
      <h2 className="credits-title" data-reveal>O que fazemos</h2>
      <dl className="credits-list">
        {services.map((s, i) => (
          <div key={s.title} className="credit" data-reveal data-delay={i * 0.04}>
            <dt>{s.title}</dt>
            <dd>{s.text}</dd>
          </div>
        ))}
      </dl>
      <h3 className="credits-sub" data-reveal>Com os parceiros do Fórum</h3>
      <div className="credits-logos" data-reveal>
        {partners.map((p) => <img key={p.src} src={p.src} alt={p.name} loading="lazy" />)}
      </div>
    </section>
  )
}

function Finale() {
  return (
    <section id="contacto" className="finale">
      <div className="finale-top">
        <a className="finale-mail" href={mailto}>{contact.email}<ArrowUpRight size={28} weight="light" /></a>
        <div className="finale-meta mono">
          {contact.phones.map((p) => <a key={p} href={`tel:${p.replace(/\s/g, '')}`}>{p}</a>)}
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
      ScrollTrigger.create({ trigger: '.lens', start: 'top bottom', end: 'top 20%', onUpdate: (s) => { fade.out = 1 - s.progress; sync() } })
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
      <Tunnel stateRef={state} />
      <div className="grain" aria-hidden="true" />
      <Header />
      <main>
        <TunnelAct />
        <Lens />
        <Reel />
        <Recognition />
        <Credits />
        <Finale />
      </main>
      <Switch current={3} />
    </div>
  )
}
