import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/bodoni-moda'
import '@fontsource-variable/bodoni-moda/wght-italic.css'
import '@fontsource-variable/onest'
import './p2.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
