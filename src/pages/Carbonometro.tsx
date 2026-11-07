import { useLayoutEffect, useRef } from 'react'
import { Page, TextLink } from '../ui/Page'
import { PageHero } from '../ui/PageHero'
import { CtaBand } from '../ui/CtaBand'
import { ImageBand } from '../ui/ImageBand'
import { SYMBOL } from '../ui/brand'
import { carbon, methods } from '../shared/content'
import { ScrollTrigger, reduceMotion } from '../shared/motion'

/**
 * Medir, reduzir, compensar: o anel fica fixo enquanto os três passos passam,
 * e os traços acendem de vermelho (emitido) para osso (compensado).
 */
function Steps() {
  const root = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    const el = root.current!
    const dashes = Array.from(el.querySelectorAll<SVGLineElement>('.steps-ring line'))
    const steps = Array.from(el.querySelectorAll<HTMLElement>('.step'))
    if (reduceMotion()) { dashes.forEach((d) => d.classList.add('on')); return }
    let lit = -1
    const st = ScrollTrigger.create({
      trigger: el.querySelector('.steps-track'),
      start: 'top 60%',
      end: 'bottom 70%',
      onUpdate: (s) => {
        const n = Math.round(s.progress * dashes.length)
        if (n !== lit) { lit = n; dashes.forEach((d, i) => d.classList.toggle('on', i < n)) }
        const active = Math.min(steps.length - 1, Math.floor(s.progress * steps.length))
        steps.forEach((x, i) => x.classList.toggle('is-active', i === active))
      },
    })
    return () => st.kill()
  }, [])
  return (
    <section ref={root} className="steps" aria-labelledby="como">
      <h2 id="como" className="sr-only">Como funciona o Carbonómetro</h2>
      <div className="steps-stage" aria-hidden="true">
        <svg className="steps-ring" viewBox="-104 -104 208 208" focusable="false">
          <g strokeLinecap="round" fill="none">
            {SYMBOL.map(([x1, y1, x2, y2, w], i) => <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={w} />)}
          </g>
        </svg>
      </div>
      <ol className="steps-track">
        {carbon.steps.map((s) => (
          <li key={s.word} className="step">
            <h3 className="step-word">{s.word}</h3>
            <p className="step-text">{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default function Carbonometro() {
  return (
    <Page current="carbonometro">
      <PageHero
        word="Carbonómetro"
        title="Carbonómetro, a gestão de carbono da ALLORA"
        lead={carbon.lead}
        img="/media/carbonometro-tablet.webp"
        alt="Visitante a medir a sua pegada carbónica num tablet, stand do BFA na FILDA 2026"
      />

      <Steps />

      <ImageBand src="/media/verde/floresta-densa.webp" alt="Copas de árvores de uma floresta densa, vistas de cima" />

      <section className="sec filda" aria-labelledby="filda">
        <div className="filda-copy">
          <h2 id="filda" className="h-xl" data-reveal>FILDA 2026</h2>
          <p className="body-lg" data-reveal>{carbon.filda}</p>
        </div>
        <div className="filda-shots">
          <figure className="shot shot-a" data-reveal><img src="/media/carbonometro-opaia.webp" alt="Visitantes no stand da OPAIA, FILDA 2026" loading="lazy" /><figcaption className="mono">Stand da OPAIA</figcaption></figure>
          <figure className="shot shot-b" data-reveal data-delay="0.06"><img src="/media/carbonometro-bcs.webp" alt="Visitante a medir a pegada no stand do BCS, FILDA 2026" loading="lazy" /><figcaption className="mono">Stand do BCS</figcaption></figure>
          <figure className="shot shot-c" data-reveal data-delay="0.12"><img src="/media/emissoes.webp" alt="Chaminé industrial a libertar fumo ao fim do dia" loading="lazy" /><figcaption className="mono">O que se mede</figcaption></figure>
        </div>
      </section>

      <section className="sec ton" aria-labelledby="ton">
        <p className="ton-num" aria-hidden="true"><span>47</span><small>t CO₂</small></p>
        <div className="ton-copy">
          <h2 id="ton" className="h-md" data-reveal>47 toneladas de CO₂ compensadas no 2.º Fórum</h2>
          <p data-reveal>{carbon.forum}</p>
          <TextLink href="/forum/">Ver o Fórum</TextLink>
        </div>
      </section>

      <section className="sec methods-sec" aria-labelledby="metodologias">
        <h2 id="metodologias" className="statement" data-reveal>Números que se podem verificar, com as normas que o mercado exige.</h2>
        <ul className="methods methods-lg" aria-label="Metodologias de referência" data-reveal>
          {methods.map((m) => <li key={m}>{m}</li>)}
        </ul>
      </section>

      <CtaBand title="Quer conhecer a pegada da sua empresa ou do seu evento?" text="Medimos, reduzimos e compensamos. Peça uma proposta para o Carbonómetro." topic="carbonometro" />
    </Page>
  )
}
