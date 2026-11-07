import { Page, TextLink } from '../ui/Page'
import { pages } from '../shared/content'

export default function NaoEncontrada() {
  return (
    <Page>
      <section className="nf">
        <h1 className="nf-title"><span className="nf-num" aria-hidden="true">404</span><span className="nf-text">Esta página não existe.</span></h1>
        <p className="body-lg">O endereço pode ter mudado. Escolha um destes caminhos:</p>
        <ul className="nf-links">
          <li><TextLink href="/">Página inicial</TextLink></li>
          {pages.map((p) => <li key={p.key}><TextLink href={p.href}>{p.label}</TextLink></li>)}
          <li><TextLink href="/contactos/">Contactos</TextLink></li>
        </ul>
      </section>
    </Page>
  )
}
