import { useLayoutEffect, useRef } from 'react'
import { ArrowUpRight } from '@phosphor-icons/react/dist/csr/ArrowUpRight'
import { Page } from '../ui/Page'
import { PageHero } from '../ui/PageHero'
import { CtaBand } from '../ui/CtaBand'
import { cases, initiatives, seedPaper } from '../shared/content'
import { gsap, reduceMotion } from '../shared/motion'

function SeedPaper() {
  const root = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    if (reduceMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.seed-line .w', { opacity: 0.14 }, {
        opacity: 1, stagger: 0.06, ease: 'none',
        scrollTrigger: { trigger: '.seed-line', start: 'top 82%', end: 'bottom 45%', scrub: true },
      })
    }, root)
    return () => ctx.revert()
  }, [])
  const words = 'O Papel Semente venceu. Um papel que, depois de usado, se planta e dá flores.'.split(' ')
  return (
    <section ref={root} className="sec seed" aria-labelledby="papel-semente">
      <h2 id="papel-semente" className="seed-line">{words.map((w, i) => <span key={i} className="w">{w} </span>)}</h2>
      <p className="mono">{seedPaper.award}</p>
      <div className="seed-grid">
        <figure className="seed-a duo-hover" data-reveal><img src="/media/papel-semente.webp" alt="Lembranças em Papel Semente para o Fórum Fertimulher" loading="lazy" /></figure>
        <figure className="seed-b duo-hover" data-reveal data-delay="0.06"><img src="/media/papel-semente-cracha.webp" alt="Crachá de participante em Papel Semente, 2.º Fórum Nacional de Negócios Sustentáveis" loading="lazy" /></figure>
        <p className="body-lg seed-text" data-reveal>{seedPaper.text}</p>
      </div>
    </section>
  )
}

export default function Projectos() {
  return (
    <Page current="projectos">
      <PageHero
        word="Projectos"
        title="Projectos e iniciativas da ALLORA"
        lead="Projectos que geram valor económico, social e ambiental, para empresas e para as comunidades onde trabalham."
        img="/media/papel-semente.webp"
        alt="Lembranças de evento em Papel Semente, que se plantam depois de usadas"
      />

      <section className="sec cases" aria-labelledby="casos">
        <h2 id="casos" className="h-xl" data-reveal>Casos de sucesso</h2>
        <ul className="cases-grid">
          {cases.map((c, i) => (
            <li key={c.name} className={`case case-${i}`} data-reveal data-delay={(i % 2) * 0.06}>
              <a href={c.href}>
                <figure className="case-img"><img src={c.img} alt={c.alt} loading="lazy" /></figure>
                <div className="case-copy">
                  <h3>{c.name}<ArrowUpRight size={22} weight="bold" aria-hidden="true" /></h3>
                  <p>{c.text}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <SeedPaper />

      <section className="sec inits-sec" aria-labelledby="iniciativas">
        <h2 id="iniciativas" className="h-xl" data-reveal>Sustentabilidade que transforma</h2>
        <div className="inits2">
          {initiatives.map((it, i) => (
            <article key={it.name} className="init2" data-reveal data-delay={i * 0.06}>
              <h3>{it.name}</h3>
              <p>{it.long}</p>
            </article>
          ))}
          <article className="init2 init2-num" data-reveal data-delay="0.12">
            <p className="init2-big"><span data-to="1000">1.000</span><span className="plus">+</span></p>
            <h3>Lavatórios comunitários</h3>
            <p>Mais de mil lavatórios implementados junto das comunidades, um dos números de impacto social da ALLORA.</p>
          </article>
        </div>
      </section>

      <CtaBand title="Tem um projecto com impacto em mente?" text="Desenhamos e executamos projectos de sustentabilidade com empresas, instituições e comunidades." topic="eventos" />
    </Page>
  )
}
