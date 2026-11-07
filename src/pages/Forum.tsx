import { Page, TextLink } from '../ui/Page'
import { PageHero } from '../ui/PageHero'
import { CtaBand } from '../ui/CtaBand'
import { forum } from '../shared/content'

export default function Forum() {
  return (
    <Page current="forum">
      <PageHero
        word="Fórum"
        title={forum.name}
        lead={forum.lead}
        img="/media/forum-palco.webp"
        alt="Oradora no palco do 2.º Fórum Nacional de Negócios Sustentáveis"
      />

      <section className="sec fnns" aria-labelledby="fnns">
        <h2 id="fnns" className="statement" data-reveal>{forum.name}.</h2>
        <div className="fnns-cols">
          {forum.story.map((p, i) => <p key={i} className="body-lg" data-reveal data-delay={i * 0.06}>{p}</p>)}
        </div>
        <dl className="fnns-facts">
          {forum.facts.map((f, i) => (
            <div key={f.label} data-reveal data-delay={i * 0.05}><dt>{f.value}</dt><dd className="mono">{f.label}</dd></div>
          ))}
        </dl>
      </section>

      <section className="edition" aria-labelledby="edicao">
        <div className="edition-head">
          <h2 id="edicao" className="h-xl" data-reveal>{forum.edition}</h2>
          <p className="mono" data-reveal>{forum.date}. {forum.venue}.</p>
        </div>
        <div className="edition-grid">
          <figure className="ed-wide duo-hover" data-reveal><img src="/media/fnns-grupo.webp" alt="Fotografia de grupo dos participantes do 2.º Fórum Nacional de Negócios Sustentáveis" loading="lazy" /></figure>
          <figure className="ed-tall duo-hover" data-reveal data-delay="0.06"><img src="/media/fnns-podio.webp" alt="Oradora no púlpito do 2.º Fórum, aplaudida pelos participantes" loading="lazy" /></figure>
          <figure className="ed-sq duo-hover" data-reveal><img src="/media/forum-oradoras.webp" alt="Oradoras do 2.º Fórum Nacional de Negócios Sustentáveis" loading="lazy" /></figure>
          <blockquote className="ed-quote" data-reveal data-delay="0.06">
            <p>“{forum.quote.text}”</p>
            <cite className="mono">{forum.quote.who}</cite>
          </blockquote>
        </div>
      </section>

      <section className="sec neutral" aria-labelledby="neutro">
        <p className="ton-num" aria-hidden="true"><span>47</span><small>t CO₂</small></p>
        <div className="ton-copy">
          <h2 id="neutro" className="h-md" data-reveal>Um fórum carbono neutro</h2>
          <p data-reveal>As emissões do 2.º Fórum foram medidas com o Carbonómetro e compensadas na totalidade, com 47 créditos de carbono cancelados.</p>
          <TextLink href="/carbonometro/">Conhecer o Carbonómetro</TextLink>
        </div>
      </section>

      <CtaBand title="Quer participar ou patrocinar a próxima edição?" text="Fale com a equipa do Fórum sobre participação, parcerias e patrocínio." topic="forum" />
    </Page>
  )
}
