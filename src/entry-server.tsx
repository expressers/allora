import type { ComponentType } from 'react'
import { renderToString } from 'react-dom/server'
import App from './site/App'
import Sobre from './pages/Sobre'
import Servicos from './pages/Servicos'
import Carbonometro from './pages/Carbonometro'
import Projectos from './pages/Projectos'
import Forum from './pages/Forum'
import Academia from './pages/Academia'
import Contactos from './pages/Contactos'
import NaoEncontrada from './pages/NaoEncontrada'

/** Página -> ficheiro em dist/ onde o HTML pré-renderizado é inserido. */
export const routes: Record<string, [string, ComponentType]> = {
  'index.html': ['inicio', App],
  'sobre/index.html': ['sobre', Sobre],
  'servicos/index.html': ['servicos', Servicos],
  'carbonometro/index.html': ['carbonometro', Carbonometro],
  'projectos/index.html': ['projectos', Projectos],
  'forum/index.html': ['forum', Forum],
  'academia/index.html': ['academia', Academia],
  'contactos/index.html': ['contactos', Contactos],
  '404.html': ['naoencontrada', NaoEncontrada],
}

export const render = (C: ComponentType) => renderToString(<C />)
