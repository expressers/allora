import { useEffect, useLayoutEffect, useRef } from 'react'
import { ArrowUpRight } from '@phosphor-icons/react/dist/csr/ArrowUpRight'
import { ArrowDown } from '@phosphor-icons/react/dist/csr/ArrowDown'
import { InstagramLogo } from '@phosphor-icons/react/dist/csr/InstagramLogo'
import { Ring } from './Ring'
import { Switch } from '../shared/Switch'
import { CTA, contact, forum, mailto, method, nav, partners, services } from '../shared/content'
import { gsap, ScrollTrigger, revealOnScroll, reduceMotion, startSmoothScroll, EASE_OUT } from '../shared/motion'

function Mark({ size = 28, settled = false }: { size?: number; settled?: boolean }) {
  // Compact version of the ALLORA ring for the header.
  const n = settled ? 60 : 24
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      {Array.from({ length: n }, (_, i) => {
        const a = -Math.PI * 0.72 + (i / n) * Math.PI * 2
        const k = i / (n - 1)
        const c = settled ? '#141414' : k < 0.45 ? '#d9221a' : k < 0.7 ? '#8e1513' : '#141414'
        return (
          <line key={i} x1={20 + Math.cos(a) * 12.5} y1={20 + Math.sin(a) * 12.5} x2={20 + Math.cos(a) * 18} y2={20 + Math.sin(a) * 18}
            stroke={c} strokeWidth={settled ? 1.3 : 2.4} strokeLinecap="round" />
        )
      })}
    </svg>
  )
}

function Header() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 80,
      onUpdate: (s) => ref.current?.classList.toggle('is-solid', s.scroll() > 80),
    })
    return () => st.kill()
  }, [])
  return (
    <header ref={ref} className="hdr">
      <a href="#topo" className="brand" aria-label="ALLORA, início">
        <Mark />
        <span className="wordmark">ALLORA</span>
      </a>
      <nav aria-label="Principal" className="hdr-nav">
        {nav.map((n) => (
          <a key={n.href} href={n.href}>{n.label}</a>
        ))}
      </nav>
      <a className="btn btn-ink btn-sm" href={mailto}>{CTA}</a>
    </header>
  )
}

function Hero() {
  const progress = useRef(0)
  const root = useRef<HTMLElement>(null)
  const label = useRef<HTMLSpanElement>(null)
  const pct = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: root.current,
        start: 'top top',
        end: 'bottom 35%',
        scrub: true,
        onUpdate: (s) => {
          progress.current = s.progress
          const v = Math.round(s.progress * 100)
          if (pct.current) pct.current.textContent = `${v}%`
          if (label.current) label.current.textContent = v >= 100 ? 'Compensado' : v > 0 ? 'A compensar' : 'Medido'
        },
      })
      if (!reduceMotion()) {
        gsap.from('.hero-line > span', { yPercent: 105, duration: 1.4, ease: EASE_OUT, stagger: 0.09, delay: 0.15 })
        gsap.from('.hero-sub, .hero-ctas', { y: 18, opacity: 0, duration: 1.2, ease: EASE_OUT, stagger: 0.08, delay: 0.55 })
        gsap.from('.readout', { opacity: 0, duration: 1, delay: 1.6 })
      }
      return () => st.kill()
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} id="topo" className="hero">
      <div className="hero-copy">
        <h1 className="hero-title">
          <span className="hero-line"><span>Medimos hoje</span></span>
          <span className="hero-line"><span>o que pesa amanhã.</span></span>
        </h1>
        <p className="hero-sub">
          Consultoria em sustentabilidade e ESG para empresas e instituições em Angola. Medir, reduzir e compensar, com rigor.
        </p>
        <div className="hero-ctas">
          <a className="btn btn-ink" href={mailto}>{CTA}<ArrowUpRight size={16} weight="bold" /></a>
          <a className="btn btn-line" href="#forum">Conhecer o Fórum<ArrowDown size={16} weight="bold" /></a>
        </div>
      </div>
      <div className="hero-instrument">
        <Ring progressRef={progress} className="ring" />
        <div className="readout" aria-live="off">
          <span className="readout-word">ALLORA</span>
          <span className="readout-value">47<small> t CO₂</small></span>
          <span className="readout-state"><span ref={label}>Medido</span> <span ref={pct} className="tnum">0%</span></span>
        </div>
        <p className="instrument-caption">
          Leitura real: emissões do 2.º Fórum Nacional de Negócios Sustentáveis, medidas e compensadas na totalidade.
        </p>
      </div>
    </section>
  )
}

function Method() {
  const root = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    if (reduceMotion()) return
    const ctx = gsap.context(() => {
      const ticks = gsap.utils.toArray<HTMLElement>('.ruler i')
      gsap.fromTo(ticks, { scaleY: 0.25 }, {
        scaleY: 1, stagger: 0.004, ease: 'none',
        scrollTrigger: { trigger: '.ruler', start: 'top 85%', end: 'top 35%', scrub: true },
      })
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <section ref={root} id="abordagem" className="section method">
      <h2 className="display" data-reveal>Nenhuma solução<br />antes do diagnóstico.</h2>
      <div className="ruler" aria-hidden="true">
        {Array.from({ length: 120 }, (_, i) => (
          <i key={i} className={i % 10 === 0 ? 'major' : ''} style={{ ['--k' as string]: i / 119 }} />
        ))}
      </div>
      <div className="method-grid">
        {method.map((m, i) => (
          <article key={m.verb} className="method-step" data-reveal data-delay={i * 0.08}>
            <h3>{m.verb}</h3>
            <p>{m.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function Tick() {
  return <span className="tick" aria-hidden="true" />
}

function Services() {
  const groups = ['Carbono', 'ESG'] as const
  return (
    <section id="servicos" className="section services">
      <h2 className="display" data-reveal>O que fazemos.</h2>
      <div className="services-grid">
        {groups.map((g) => (
          <div key={g} className="svc-group">
            <h3 className="svc-group-title" data-reveal>{g}</h3>
            <ul>
              {services.filter((s) => s.group === g).map((s, i) => (
                <li key={s.title} className="svc" data-reveal data-delay={i * 0.06}>
                  <Tick />
                  <div>
                    <h4>{s.title}</h4>
                    <p>{s.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

function Carbonometro() {
  return (
    <section id="carbonometro" className="section carbon">
      <div className="bento">
        <figure className="b-photo b-main" data-reveal>
          <img src="/media/carbonometro-opaia.webp" alt="Visitantes medem a pegada carbónica com o Carbonómetro no stand da OPAIA, FILDA 2026" loading="lazy" />
        </figure>
        <div className="b-text" data-reveal>
          <h2 className="display-s">O Carbonómetro.</h2>
          <p>
            A solução da ALLORA para medir, reduzir e compensar a pegada carbónica. Na FILDA 2026 esteve nos stands do BFA, do BCS e da OPAIA: cada visitante saiu a conhecer o seu número.
          </p>
          <img className="selo" src="/media/selo-carbono-neutro.png" alt="Selo Evento Carbono Neutro" loading="lazy" />
        </div>
        <figure className="b-photo b-a" data-reveal data-delay="0.08">
          <img src="/media/carbonometro-tablet.webp" alt="Medição da pegada carbónica num tablet, FILDA 2026" loading="lazy" />
        </figure>
        <figure className="b-photo b-b" data-reveal data-delay="0.16">
          <img src="/media/carbonometro-bcs.webp" alt="Equipa ALLORA com visitantes no stand do BCS, FILDA 2026" loading="lazy" />
        </figure>
      </div>
    </section>
  )
}

function Forum() {
  const root = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    if (reduceMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.forum-media', { clipPath: 'inset(18% 22% 18% 22%)' }, {
        clipPath: 'inset(0% 0% 0% 0%)', ease: 'none',
        scrollTrigger: { trigger: '.forum-media', start: 'top 90%', end: 'top 25%', scrub: true },
      })
      gsap.fromTo('.forum-media img', { scale: 1.25 }, {
        scale: 1, ease: 'none',
        scrollTrigger: { trigger: '.forum-media', start: 'top 90%', end: 'bottom top', scrub: true },
      })
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <section ref={root} id="forum" className="section forum">
      <div className="forum-head">
        <h2 className="display" data-reveal>Fórum Nacional de<br />Negócios Sustentáveis.</h2>
        <p className="forum-meta" data-reveal>{forum.edition}<br />{forum.date}<br />{forum.venue}</p>
      </div>
      <figure className="forum-media">
        <img src="/media/forum-palco.webp" alt="Palco do 2.º Fórum Nacional de Negócios Sustentáveis" loading="lazy" />
      </figure>
      <div className="forum-body">
        <p className="lead" data-reveal>{forum.text}</p>
        <dl className="facts">
          {forum.facts.map((f, i) => (
            <div key={f.label} data-reveal data-delay={i * 0.08}>
              <dt className="tnum">{f.value}</dt>
              <dd>{f.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

function Recognition() {
  return (
    <section id="impacto" className="section recog">
      <div className="recog-list">
        <article className="cert" data-reveal>
          <p className="cert-date tnum">24.04.2026</p>
          <h3>Prémio Forbes Responsabilidade Social</h3>
          <p>Vencedora da 4.ª edição, na categoria Agricultura, Transporte e Logística, com o projecto Papel Semente: lembranças de evento que, plantadas, dão origem a algo novo.</p>
        </article>
        <article className="cert" data-reveal data-delay="0.08">
          <p className="cert-date tnum">10.03.2026</p>
          <h3>Cancelamento voluntário de créditos de carbono</h3>
          <p>47 créditos (CERs) cancelados, equivalentes a 47 toneladas de CO₂, para neutralizar integralmente o 2.º Fórum, no quadro do Mecanismo de Desenvolvimento Limpo do Protocolo de Quioto.</p>
        </article>
      </div>
      <div className="recog-media">
        <figure className="rm-1" data-reveal><img src="/media/papel-semente.webp" alt="Papel Semente distribuído na Imersão FertiMulher" loading="lazy" /></figure>
        <figure className="rm-2" data-reveal data-delay="0.12"><img src="/media/forbes.webp" alt="Entrega do Prémio Forbes Responsabilidade Social" loading="lazy" /></figure>
      </div>
    </section>
  )
}

const field = [
  { src: '/media/terreno.webp', cap: 'Diagnóstico no terreno, Sociedade Mineira do Kaixepa' },
  { src: '/media/equipa.webp', cap: 'Preparação da equipa do stand BFA, FILDA 2026' },
  { src: '/media/forum-oradoras.webp', cap: '2.º Fórum Nacional de Negócios Sustentáveis' },
  { src: '/media/fertimulher.webp', cap: 'Imersão FertiMulher by Viva Seguros, 2.ª edição' },
]

function Field() {
  return (
    <section className="section field" aria-label="No terreno">
      <h2 className="display" data-reveal>No terreno,<br />não só no relatório.</h2>
      <div className="rail" tabIndex={0} aria-label="Galeria de projectos">
        {field.map((f) => (
          <figure key={f.src} className="rail-item">
            <img src={f.src} alt={f.cap} loading="lazy" />
            <figcaption>{f.cap}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

function Partners() {
  const row = [...partners, ...partners]
  return (
    <section className="partners" aria-label="Parceiros do Fórum">
      <h2 className="partners-title">Parceiros do Fórum</h2>
      <div className="marquee">
        <div className="marquee-track">
          {row.map((p, i) => (
            <img key={i} src={p.src} alt={i < partners.length ? p.name : ''} aria-hidden={i >= partners.length} loading="lazy" />
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contacto" className="section contact">
      <div className="contact-head">
        <h2 className="contact-title" data-reveal>Cuidamos do<br />amanhã hoje.</h2>
        <div className="contact-ring" data-reveal data-delay="0.1">
          <Mark size={220} settled />
          <p className="tnum">47 t · 100% compensado</p>
        </div>
      </div>
      <div className="contact-grid">
        <a className="contact-mail" href={mailto} data-reveal>{contact.email}<ArrowUpRight size={28} weight="light" /></a>
        <div className="contact-meta" data-reveal data-delay="0.08">
          {contact.phones.map((p) => <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className="tnum">{p}</a>)}
          <span>{contact.city}</span>
          <a href={contact.instagram} target="_blank" rel="noreferrer"><InstagramLogo size={16} /> @allorasulda</a>
        </div>
        <a className="btn btn-ink btn-lg" href={mailto} data-reveal data-delay="0.12">{CTA}<ArrowUpRight size={18} weight="bold" /></a>
      </div>
      <footer className="ftr">
        <span>© 2026 ALLORA SU, LDA</span>
        <span>Consultoria em Sustentabilidade e ESG</span>
      </footer>
    </section>
  )
}

export default function App() {
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    startSmoothScroll()
    return revealOnScroll(root.current!)
  }, [])
  return (
    <div ref={root}>
      <Header />
      <main>
        <Hero />
        <Method />
        <Services />
        <Carbonometro />
        <Forum />
        <Recognition />
        <Field />
        <Partners />
        <Contact />
      </main>
      <Switch current={1} />
    </div>
  )
}
