import { ArrowDownRight } from '@phosphor-icons/react/dist/csr/ArrowDownRight'
import { Page, TextLink } from '../ui/Page'
import { PageHero } from '../ui/PageHero'
import { CtaBand } from '../ui/CtaBand'
import { ImageBand } from '../ui/ImageBand'
import { CTA, contactFor, methods, sectors, services } from '../shared/content'

export default function Servicos() {
  return (
    <Page current="servicos">
      <PageHero
        word="Serviços"
        title="Serviços da ALLORA"
        lead="Soluções para empresas e instituições que pretendem crescer de forma sustentável, com um único parceiro."
        img="/media/equipa.webp"
        alt="Equipa da ALLORA e parceiros num stand da FILDA 2026"
      />

      <nav className="sec svc-index" aria-label="Serviços nesta página">
        <ol>
          {services.map((s) => (
            <li key={s.slug} data-reveal>
              <a href={`#${s.slug}`}>
                <span className="svc-index-title">{s.title}</span>
                <span className="svc-index-text">{s.short}</span>
                <ArrowDownRight className="svc-index-arrow" size={28} weight="light" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="svc-list">
        {services.map((s) => (
          <section key={s.slug} id={s.slug} className="svc" aria-labelledby={`${s.slug}-t`}>
            <div className="svc-head">
              <h2 id={`${s.slug}-t`} className="svc-title">{s.title}</h2>
              <figure className="svc-img"><img src={s.img} alt={s.alt} loading="lazy" decoding="async" /></figure>
            </div>
            <div className="svc-body">
              <p className="body-lg" data-reveal>{s.text}</p>
              <ul className="svc-includes" data-reveal>
                {s.includes.map((it) => <li key={it}>{it}</li>)}
              </ul>
              <div className="svc-actions" data-reveal>
                <a className="btn" href={contactFor(s.topic)}>{CTA}</a>
                {s.link && <TextLink href={s.link.href}>{s.link.label}</TextLink>}
              </div>
            </div>
          </section>
        ))}
      </div>

      <ImageBand src="/media/verde/eolicas.webp" alt="Turbinas eólicas num campo ao pôr do sol" />

      <section className="sec sectors" aria-labelledby="sectores">
        <h2 id="sectores" className="h-xl" data-reveal>Sectores onde actuamos</h2>
        <ul className="sectors-list">
          {sectors.map((s, i) => <li key={s} data-reveal data-delay={i * 0.05}>{s}</li>)}
        </ul>
        <div className="sectors-methods" data-reveal>
          <p>Trabalhamos com metodologias internacionais, adaptadas à realidade do mercado angolano.</p>
          <ul className="methods" aria-label="Metodologias de referência">
            {methods.map((m) => <li key={m}>{m}</li>)}
          </ul>
        </div>
      </section>

      <CtaBand title="Não sabe por onde começar?" text="Conte-nos o desafio da sua organização. Indicamos o serviço certo e preparamos um orçamento." topic="outro" />
    </Page>
  )
}
