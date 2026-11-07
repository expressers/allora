import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '@fontsource-variable/anybody/standard.css'
import '@fontsource-variable/jetbrains-mono'
import '../ui/base.css'
import './site.css'
import App from './App'

const el = document.getElementById('root')!
const app = <StrictMode><App /></StrictMode>
// O HTML vem pré-renderizado no build: hidrata. No desenvolvimento, desenha.
if (el.firstElementChild) hydrateRoot(el, app)
else createRoot(el).render(app)
