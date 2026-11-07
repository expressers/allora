import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from '@phosphor-icons/react/dist/csr/ArrowUpRight'
import { InstagramLogo } from '@phosphor-icons/react/dist/csr/InstagramLogo'
import { Logo } from './Logo'
import { CONTACT_PAGE, CTA, contact, pages, tel, type PageKey } from '../shared/content'
import { ScrollTrigger, getLenis } from '../shared/motion'

/**
 * Cabeçalho comum. Em `progress`, os 28 traços do anel do logótipo passam de vermelho
 * (emitido) a osso (compensado) à medida que se lê a página: o mesmo percurso do Túnel.
 */
export function Header({ current, progress = false }: { current?: PageKey; progress?: boolean }) {
  const [open, setOpen] = useState(false)
  const logo = useRef<SVGSVGElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)
  const menu = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!progress) return
    const dashes = Array.from(logo.current!.querySelectorAll<SVGLineElement>('.d'))
    let lit = -1
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (s) => {
        const n = Math.round(s.progress * dashes.length)
        if (n === lit) return
        lit = n
        dashes.forEach((d, i) => d.classList.toggle('on', i < n))
      },
    })
    return () => st.kill()
  }, [progress])

  useEffect(() => {
    const html = document.documentElement
    if (!open) return
    html.classList.add('menu-open')
    getLenis()?.stop()
    menu.current?.querySelector<HTMLAnchorElement>('a')?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => {
      html.classList.remove('menu-open')
      getLenis()?.start()
      window.removeEventListener('keydown', onKey)
      toggle.current?.focus()
    }
  }, [open])

  return (
    <header className="hdr">
      <a href="/" className={`brand${progress ? ' progress' : ''}`} aria-label="ALLORA, página inicial">
        <Logo ref={logo} />
      </a>
      <nav className="hdr-nav" aria-label="Principal">
        {pages.map((p) => (
          <a key={p.key} href={p.href} aria-current={p.key === current ? 'page' : undefined}>{p.label}</a>
        ))}
      </nav>
      <a className="btn btn-sm hdr-cta" href={current === 'contactos' ? '#formulario' : CONTACT_PAGE}>{CTA}</a>
      <button
        ref={toggle}
        type="button"
        className="hdr-toggle"
        aria-expanded={open}
        aria-controls="menu"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? 'Fechar' : 'Menu'}
      </button>

      <div id="menu" ref={menu} className="menu" data-open={open} inert={!open}>
        <nav aria-label="Menu">
          <ol className="menu-list">
            {[{ key: 'inicio' as PageKey, label: 'Início', href: '/' }, ...pages, { key: 'contactos' as PageKey, label: 'Contactos', href: CONTACT_PAGE }].map((p, i) => (
              <li key={p.key} style={{ ['--i' as string]: i }}>
                <a href={p.href} aria-current={p.key === current ? 'page' : undefined} onClick={() => setOpen(false)}>{p.label}</a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="menu-foot mono">
          <a href={`mailto:${contact.email}`}>{contact.email} <ArrowUpRight size={14} /></a>
          {contact.phones.map((p) => <a key={p} href={tel(p)}>{p}</a>)}
          <a href={contact.instagram} target="_blank" rel="noreferrer"><InstagramLogo size={14} /> @allorasulda</a>
        </div>
      </div>
    </header>
  )
}
