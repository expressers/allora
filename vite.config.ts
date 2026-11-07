import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { resolve } from 'node:path'

const page = (p: string) => resolve(import.meta.dirname, p)

// Site multipágina: cada página tem o seu HTML (título, descrição, partilha) e a sua entrada.
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        inicio: page('index.html'),
        sobre: page('sobre/index.html'),
        servicos: page('servicos/index.html'),
        carbonometro: page('carbonometro/index.html'),
        projectos: page('projectos/index.html'),
        forum: page('forum/index.html'),
        academia: page('academia/index.html'),
        contactos: page('contactos/index.html'),
        naoencontrada: page('404.html'),
      },
    },
  },
  // A pré-renderização corre em Node: empacotar as dependências evita problemas de ESM/CJS (gsap).
  ssr: { noExternal: true },
})
