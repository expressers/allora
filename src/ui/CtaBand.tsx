import { ArrowUpRight } from '@phosphor-icons/react/dist/csr/ArrowUpRight'
import { CTA, contactFor, type TopicKey } from '../shared/content'

/** Faixa vermelha antes do rodapé. A textura é a da capa da apresentação da ALLORA. */
export function CtaBand({ title = 'Deseja solicitar um orçamento?', text = 'Estamos disponíveis 24 horas por dia, todos os dias, para orçamentos e sugestões.', topic = 'outro' }: { title?: string; text?: string; topic?: TopicKey }) {
  return (
    <section className="cta-band" aria-labelledby="cta-title">
      <div className="cta-inner">
        <h2 id="cta-title" className="cta-title" data-reveal>{title}</h2>
        <div className="cta-side" data-reveal data-delay="0.08">
          <p>{text}</p>
          <a className="btn btn-dark btn-lg" href={contactFor(topic)}>{CTA}<ArrowUpRight size={18} weight="bold" /></a>
        </div>
      </div>
    </section>
  )
}
