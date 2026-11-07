import { Page, TextLink } from '../ui/Page'
import { PageHero } from '../ui/PageHero'
import { CtaBand } from '../ui/CtaBand'
import { LogoWall } from '../ui/LogoWall'
import { ImageBand } from '../ui/ImageBand'
import { house, methods, numbers, partnerCounts, presence } from '../shared/content'
import { fmt } from '../shared/motion'

export default function Sobre() {
  return (
    <Page current="sobre">
      <PageHero
        word="Sobre"
        title="Sobre a ALLORA"
        lead={house.lead}
        img="/media/terreno.webp"
        alt="Equipa da ALLORA em trabalho de campo, com coletes de segurança"
      />

      <section className="sec house" aria-labelledby="casa">
        <h2 id="casa" className="statement" data-reveal>{house.statement}</h2>
        <div className="house-cols">
          {house.story.map((p, i) => <p key={i} className="body-lg" data-reveal data-delay={i * 0.06}>{p}</p>)}
        </div>
        <ul className="methods" aria-label="Metodologias de referência" data-reveal>
          {methods.map((m) => <li key={m}>{m}</li>)}
        </ul>
      </section>

      <ImageBand src="/media/verde/angola-costa.webp" alt="Vegetação verde junto à costa angolana, com o mar ao fundo" caption="Angola" position="50% 60%" />

      <section className="sec mvv" aria-label="Missão, visão e valores">
        {house.pillars.map((p) => (
          <article key={p.label} className="mvv-row" data-reveal>
            <h2 className="mvv-word">{p.label}</h2>
            <p className="mvv-text">{p.text}</p>
          </article>
        ))}
        <p className="mvv-belief" data-reveal>{house.belief}</p>
      </section>

      <section className="sec figures" aria-labelledby="numeros">
        <h2 id="numeros" className="h-xl" data-reveal>Números que demonstram credibilidade.</h2>
        <dl className="figures-grid">
          {numbers.map((n) => (
            <div key={n.label} className="figure" data-reveal>
              <dt className="figure-num"><span data-to={n.value}>{fmt(n.value)}</span><span className="plus">{n.suffix}</span></dt>
              <dd>{n.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="why" aria-labelledby="porque">
        <figure className="why-img">
          <img src="/media/maos-planta.webp" alt="Mãos a segurar terra e uma planta, dentro do anel da ALLORA" loading="lazy" />
        </figure>
        <div className="why-copy">
          <h2 id="porque" className="h-xl" data-reveal>Porque escolher a ALLORA</h2>
          <dl className="why-list">
            {house.reasons.map((r, i) => (
              <div key={r.title} data-reveal data-delay={i * 0.05}>
                <dt>{r.title}</dt>
                <dd>{r.text}</dd>
              </div>
            ))}
          </dl>
          <TextLink href="/servicos/">Ver os serviços</TextLink>
        </div>
      </section>

      <section className="sec partners" aria-labelledby="parceiros">
        <h2 id="parceiros" className="h-xl" data-reveal>Com quem trabalhamos</h2>
        <dl className="partners-counts" data-reveal>
          {partnerCounts.map((c) => (
            <div key={c.label}><dt><span data-to={c.value}>{c.value}</span></dt><dd>{c.label}</dd></div>
          ))}
        </dl>
        <LogoWall />
        <p className="presence" data-reveal>
          Com parceiros em <strong>{presence[0]}</strong>, {presence.slice(1, -1).join(', ')} e {presence[presence.length - 1]}.
        </p>
      </section>

      <CtaBand title="Vamos construir um negócio mais sustentável?" topic="outro" />
    </Page>
  )
}
