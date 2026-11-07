import type { ReactNode } from 'react'
import { LensRing } from './LensRing'

/**
 * Abertura das páginas internas: a palavra da página de ponta a ponta (como os capítulos
 * do Túnel), a fotografia vista através do anel, e uma frase de entrada.
 */
export function PageHero({ word, title, lead, img, alt, children }: {
  word: string
  title: string
  lead: string
  img: string
  alt: string
  children?: ReactNode
}) {
  return (
    <section className="ph">
      <div className="ph-lead">
        <p>{lead}</p>
        {children}
      </div>
      <LensRing src={img} alt={alt} className="ph-ring" />
      <h1 className="ph-word" style={{ ['--n' as string]: word.length }}>
        <span className="ph-ln" aria-hidden="true"><span>{word}</span></span>
        <span className="sr-only">{title}</span>
      </h1>
    </section>
  )
}
