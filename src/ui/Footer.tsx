import { ArrowUpRight } from '@phosphor-icons/react/dist/csr/ArrowUpRight'
import { InstagramLogo } from '@phosphor-icons/react/dist/csr/InstagramLogo'
import { Logo } from './Logo'
import { CONTACT_PAGE, contact, pages, services, tel } from '../shared/content'

/** Mapa do site e contactos, no fim de todas as páginas internas. */
export function Footer() {
  return (
    <footer className="ftr-site">
      <div className="ftr-grid">
        <div className="ftr-brand">
          <a href="/" aria-label="ALLORA, página inicial"><Logo className="ftr-logo" /></a>
          <p>Cuidamos do Amanhã Hoje.</p>
        </div>
        <nav className="ftr-col" aria-label="Páginas">
          <h2 className="ftr-h">Páginas</h2>
          <ul>
            <li><a href="/">Início</a></li>
            {pages.map((p) => <li key={p.key}><a href={p.href}>{p.label}</a></li>)}
            <li><a href={CONTACT_PAGE}>Contactos</a></li>
          </ul>
        </nav>
        <nav className="ftr-col" aria-label="Serviços">
          <h2 className="ftr-h">Serviços</h2>
          <ul>
            {services.map((s) => <li key={s.slug}><a href={`/servicos/#${s.slug}`}>{s.title}</a></li>)}
          </ul>
        </nav>
        <div className="ftr-col">
          <h2 className="ftr-h">Contactos</h2>
          <ul>
            <li><a className="ftr-mail" href={`mailto:${contact.email}`}>{contact.email}<ArrowUpRight size={14} /></a></li>
            {contact.phones.map((p) => <li key={p}><a href={tel(p)}>{p}</a></li>)}
            <li><a href={contact.maps} target="_blank" rel="noreferrer"><address>{contact.address[0]}<br />{contact.address[1]}</address></a></li>
            <li><a href={contact.instagram} target="_blank" rel="noreferrer"><InstagramLogo size={15} /> @allorasulda</a></li>
          </ul>
        </div>
      </div>
      <div className="ftr-legal mono">
        <span>© 2026 ALLORA SU, LDA</span>
        <span>Luanda, Angola</span>
      </div>
    </footer>
  )
}
