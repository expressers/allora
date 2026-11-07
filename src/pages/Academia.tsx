import { Page } from '../ui/Page'
import { PageHero } from '../ui/PageHero'
import { CtaBand } from '../ui/CtaBand'
import { academy } from '../shared/content'

export default function Academia() {
  return (
    <Page current="academia">
      <PageHero
        word="Academia"
        title="Academia ALLORA, formação em sustentabilidade e ESG"
        lead={academy.lead}
        img="/media/academia.webp"
        alt="Mãos a segurar um globo terrestre entre folhas verdes"
      />

      <section className="sec acad" aria-labelledby="proposito">
        <h2 id="proposito" className="statement" data-reveal>{academy.statement}</h2>
        <div className="acad-row">
          <p className="body-lg" data-reveal>{academy.text}</p>
          <div className="acad-num" data-reveal data-delay="0.06">
            <p className="acad-big"><span data-to="800">800</span><span className="plus">+</span></p>
            <p>profissionais formados em sustentabilidade, ESG, ambiente e economia circular.</p>
          </div>
        </div>
      </section>

      <section className="sec formats" aria-labelledby="formatos">
        <h2 id="formatos" className="h-xl" data-reveal>Como formamos</h2>
        <ul className="formats-list">
          {academy.formats.map((f, i) => <li key={f} data-reveal data-delay={i * 0.05}>{f}</li>)}
        </ul>
      </section>

      <section className="themes" aria-labelledby="temas">
        <h2 id="temas" className="sr-only">Temas</h2>
        <ul className="themes-list">
          {academy.themes.map((t, i) => <li key={t} data-reveal data-delay={i * 0.04}>{t}</li>)}
        </ul>
      </section>

      <section className="sec audience" aria-labelledby="publico">
        <h2 id="publico" className="h-md" data-reveal>Para quem</h2>
        <p className="audience-line" data-reveal>
          {academy.audience.map((a, i) => (i ? a.toLowerCase() : a)).slice(0, -1).join(', ')} e {academy.audience[academy.audience.length - 1].toLowerCase()}. Profissionais, empresas e instituições que precisam de responder aos desafios de um mercado cada vez mais orientado para a sustentabilidade.
        </p>
      </section>

      <CtaBand title="Quer formar a sua equipa?" text="Desenhamos programas, workshops e cursos à medida da sua organização." topic="academia" />
    </Page>
  )
}
