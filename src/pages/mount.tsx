import { StrictMode, type ComponentType } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '@fontsource-variable/anybody/standard.css'
import '@fontsource-variable/jetbrains-mono'
import '../ui/base.css'
import './pages.css'

/** Monta a página. Se o HTML já vier pré-renderizado, hidrata em vez de redesenhar. */
export function mount(Component: ComponentType) {
  const el = document.getElementById('root')!
  const app = <StrictMode><Component /></StrictMode>
  if (el.firstElementChild) hydrateRoot(el, app)
  else createRoot(el).render(app)
}
