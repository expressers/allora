import { useEffect, useRef, type ReactNode } from 'react'
import { ArrowUpRight } from '@phosphor-icons/react/dist/csr/ArrowUpRight'
import { Header } from './Header'
import { Footer } from './Footer'
import { countUp, revealOnScroll, startSmoothScroll } from '../shared/motion'
import type { PageKey } from '../shared/content'

/** Estrutura comum das páginas internas: grão, cabeçalho com anel de leitura, conteúdo, rodapé. */
export function Page({ current, children }: { current?: PageKey; children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    startSmoothScroll()
    const offReveal = revealOnScroll(root.current!)
    const offCount = countUp(root.current!)
    return () => { offReveal(); offCount() }
  }, [])
  return (
    <div ref={root}>
      <div className="grain" aria-hidden="true" />
      <a className="skip" href="#conteudo">Saltar para o conteúdo</a>
      <Header current={current} progress />
      <main id="conteudo">{children}</main>
      <Footer />
    </div>
  )
}

/** Ligação de texto com seta, para levar de uma secção à página completa. */
export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="tlink" href={href}>
      <span>{children}</span>
      <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
    </a>
  )
}
