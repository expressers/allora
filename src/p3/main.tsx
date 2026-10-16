import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/anybody/standard.css'
import '@fontsource-variable/jetbrains-mono'
import './p3.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
