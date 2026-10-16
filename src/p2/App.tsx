import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowUpRight } from '@phosphor-icons/react/dist/csr/ArrowUpRight'
import { ArrowDown } from '@phosphor-icons/react/dist/csr/ArrowDown'
import { InstagramLogo } from '@phosphor-icons/react/dist/csr/InstagramLogo'
import { Rings, RingIndex } from './Rings'
import { CTA, contact, forum, mailto, nav, partners, services } from '../shared/content'
import { gsap, ScrollTrigger, revealOnScroll, reduceMotion, startSmoothScroll, EASE_OUT } from '../shared/motion'

function Header() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const st = ScrollTrigger.create({ start: 80, onUpdate: (s) => ref.current?.classList.toggle('is-solid', s.scroll() > 80) })
    return () => st.kill()
  }, [])
  return (
    <header ref={ref} className="hdr">
      <a href="#topo" className="brand" aria-label="ALLORA, início">ALLORA</a>
      <nav aria-label="Principal" className="hdr-nav">
        {nav.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
      </nav>
      <a className="btn btn-red btn-sm" href={mailto}>{CTA}</a>
    </header>
  )
}

function Hero() {
  const root = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!reduceMotion()) {
        gsap.from('.h2-line > span', { yPercent: 110, duration: 1.6, ease: EASE_OUT, stagger: 0.1, delay: 0.5 })
        gsap.from('.hero-foot > *', { y: 16, opacity: 0, duration: 1.2, ease: EASE_OUT, stagger: 0.08, delay: 1 })
        gsap.to('.rings', { scale: 1.18, opacity: 0.35, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } })
      }
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <section ref={root} id="topo" className="hero">
      <Rings className="rings" />
      <div className="hero-veil" aria-hidden="true" />
      <h1 className="hero-title">
        <span className="h2-line"><span>Cuidamos do</span></span>
        <span className="h2-line"><span><em>amanhã</em>, hoje.</span></span>
      </h1>
      <div className="hero-foot">
        <div className="hero-foot-l">
          <p>Consultoria em sustentabilidade e ESG para empresas e instituições em Angola.</p>
          <a className="btn btn-red" href={mailto}>{CTA}<ArrowUpRight size={16} weight="bold" /></a>
        </div>
        <a className="hero-forum" href="#forum">Fórum Nacional de Negócios Sustentáveis<ArrowDown size={16} /></a>
      </div>
    </section>
  )
}

const manifesto =
  'Um embondeiro guarda o tempo em anéis. Cada ano de cuidado fica gravado na madeira. Trabalhamos da mesma forma: medimos o ponto de partida, construímos o plano e compensamos o que não se consegue evitar. O que uma organização faz hoje é o anel que o amanhã vai ler.'

function Manifesto() {
  const root = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    if (reduceMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.mf-w', { opacity: 0.16 }, {
        opacity: 1, stagger: 0.05, ease: 'none',
        scrollTrigger: { trigger: '.manifesto-text', start: 'top 80%', end: 'bottom 45%', scrub: true },
      })
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <section ref={root} id="abordagem" className="section manifesto">
      <p className="manifesto-text">
        {manifesto.split(' ').map((w, i) => <span key={i} className="mf-w">{w} </span>)}
      </p>
    </section>
  )
}

function ServicesRings() {
  const [active, setActive] = useState(0)
  const root = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.sr-item').forEach((el, i) => {
        ScrollTrigger.create({ trigger: el, start: 'top 55%', end: 'bottom 55%', onToggle: (s) => s.isActive && setActive(i) })
      })
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <section ref={root} id="servicos" className="section sr">
      <div className="sr-sticky">
        <div className="sr-ring">
          <RingIndex count={services.length} active={active} />
          <p className="sr-count"><span>{String(active + 1)}</span> de {services.length}</p>
        </div>
      </div>
      <div className="sr-list">
        <h2 className="display">Anel a anel,<br /><em>o que fazemos.</em></h2>
        {services.map((s, i) => (
          <article key={s.title} className={`sr-item${i === active ? ' is-active' : ''}`}>
            <p className="sr-group">{s.group}</p>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function Carbon() {
  const root = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    if (reduceMotion()) return
    const ctx = gsap.context(() => {
      const obj = { v: 0 }
      gsap.to(obj, {
        v: 47, duration: 2.2, ease: 'power3.out',
        scrollTrigger: { trigger: '.big-num', start: 'top 80%', once: true },
        onUpdate: () => { const el = document.querySelector('.big-num-v'); if (el) el.textContent = String(Math.round(obj.v)) },
      })
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <section ref={root} id="carbonometro" className="section carbon">
      <div className="carbon-top">
        <p className="big-num" aria-label="47 toneladas"><span className="big-num-v">47</span><span className="big-num-u">t</span></p>
        <div className="carbon-copy" data-reveal>
          <h2 className="display-s">de CO₂ do 2.º Fórum, medidas e <em>compensadas</em> na totalidade.</h2>
          <p>Com o Carbonómetro, a ALLORA mede, reduz e compensa a pegada carbónica de eventos e organizações. Na FILDA 2026, esteve nos stands do BFA, do BCS e da OPAIA.</p>
        </div>
      </div>
      <div className="carbon-strip">
        {[
          ['/media/carbonometro-opaia.webp', 'Stand da OPAIA, FILDA 2026'],
          ['/media/carbonometro-tablet.webp', 'Medição em tempo real'],
          ['/media/carbonometro-bcs.webp', 'Stand do BCS, FILDA 2026'],
        ].map(([src, cap], i) => (
          <figure key={src} className={`cs cs-${i}`} data-reveal data-delay={i * 0.08}>
            <img src={src} alt={cap} loading="lazy" />
            <figcaption>{cap}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

function Forum() {
  const root = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    if (reduceMotion()) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: '.f-stage', start: 'top top', end: '+=140%', scrub: true, pin: true } })
      tl.fromTo('.f-over', { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.86, ease: 'none', duration: 0.35 }, 0)
        .fromTo('.f-circle', { clipPath: 'circle(0% at 50% 50%)' }, { clipPath: 'circle(71% at 50% 50%)', ease: 'none', duration: 0.65 }, 0.3)
        .fromTo('.f-circle img', { scale: 1.2 }, { scale: 1, ease: 'none', duration: 0.7 }, 0.3)
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <section ref={root} id="forum" className="forum">
      <div className="f-stage">
        <div className="f-circle"><img src="/media/forum-oradoras.webp" alt="Oradoras no 2.º Fórum Nacional de Negócios Sustentáveis" /></div>
        <div className="f-over">
          <img className="f-logo" src="/media/fnns-logo.png" alt="Logótipo do 2.º Fórum Nacional de Negócios Sustentáveis" />
        </div>
      </div>
      <div className="section f-body">
        <h2 className="display" data-reveal>Fórum Nacional de<br /><em>Negócios Sustentáveis.</em></h2>
        <div className="f-cols">
          <p className="lead" data-reveal>{forum.text}</p>
          <dl className="f-facts">
            {forum.facts.map((f) => (
              <div key={f.label} data-reveal><dt>{f.value}</dt><dd>{f.label}</dd></div>
            ))}
            <div data-reveal><dt className="f-date">10.03</dt><dd>{forum.venue}</dd></div>
          </dl>
        </div>
      </div>
    </section>
  )
}

function Recognition() {
  return (
    <section id="impacto" className="section recog">
      <figure className="recog-img" data-reveal><img src="/media/papel-semente.webp" alt="Papel Semente da ALLORA" loading="lazy" /></figure>
      <div className="recog-text">
        <article data-reveal>
          <h3><em>Forbes</em> Responsabilidade Social</h3>
          <p>Vencedora da 4.ª edição, categoria Agricultura, Transporte e Logística, com o Papel Semente: lembranças de evento que, plantadas, fazem crescer algo novo.</p>
        </article>
        <article data-reveal data-delay="0.08">
          <h3>47 créditos de carbono <em>cancelados</em></h3>
          <p>Certificado de cancelamento voluntário, no quadro do Mecanismo de Desenvolvimento Limpo do Protocolo de Quioto, para neutralizar o 2.º Fórum.</p>
        </article>
        <figure className="recog-img-s" data-reveal data-delay="0.12"><img src="/media/terreno.webp" alt="Diagnóstico no terreno, Sociedade Mineira do Kaixepa" loading="lazy" /><figcaption>Diagnóstico no terreno, Sociedade Mineira do Kaixepa</figcaption></figure>
      </div>
    </section>
  )
}

function Partners() {
  const row = [...partners, ...partners]
  return (
    <section className="partners" aria-label="Parceiros do Fórum">
      <h2 className="partners-title">Parceiros do Fórum</h2>
      <div className="marquee"><div className="marquee-track">
        {row.map((p, i) => <span key={i} className="logo-chip" aria-hidden={i >= partners.length}><img src={p.src} alt={i < partners.length ? p.name : ''} loading="lazy" /></span>)}
      </div></div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contacto" className="section contact">
      <h2 className="contact-title" data-reveal>O próximo anel<br /><em>começa hoje.</em></h2>
      <div className="contact-grid">
        <a className="contact-mail" href={mailto} data-reveal>{contact.email}<ArrowUpRight size={26} weight="light" /></a>
        <div className="contact-meta" data-reveal data-delay="0.08">
          {contact.phones.map((p) => <a key={p} href={`tel:${p.replace(/\s/g, '')}`}>{p}</a>)}
          <span>{contact.city}</span>
          <a href={contact.instagram} target="_blank" rel="noreferrer"><InstagramLogo size={16} /> @allorasulda</a>
        </div>
        <a className="btn btn-red btn-lg" href={mailto} data-reveal data-delay="0.12">{CTA}<ArrowUpRight size={18} weight="bold" /></a>
      </div>
      <footer className="ftr"><span>© 2026 ALLORA SU, LDA</span><span>Cuidamos do Amanhã Hoje</span></footer>
    </section>
  )
}

export default function App() {
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => { startSmoothScroll(); return revealOnScroll(root.current!) }, [])
  return (
    <div ref={root}>
      <Header />
      <main>
        <Hero />
        <Manifesto />
        <ServicesRings />
        <Carbon />
        <Forum />
        <Recognition />
        <Partners />
        <Contact />
      </main>
    </div>
  )
}
