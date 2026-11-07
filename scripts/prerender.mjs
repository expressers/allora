// Insere o HTML de cada página em dist/, para que o conteúdo apareça antes do JavaScript
// (melhor para o Google, para a partilha e para ligações lentas). O React hidrata por cima.
import { readFileSync, rmSync, writeFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

const ssr = resolve('.ssr/entry-server.js')
const { routes, render } = await import(pathToFileURL(ssr).href)

for (const [file, [, Component]] of Object.entries(routes)) {
  const path = resolve('dist', file)
  const html = readFileSync(path, 'utf8')
  const marker = '<div id="root"></div>'
  if (!html.includes(marker)) throw new Error(`Sem <div id="root"> vazio em ${file}`)
  writeFileSync(path, html.replace(marker, `<div id="root">${render(Component)}</div>`))
  console.log(`pré-renderizado: ${file}`)
}
rmSync('.ssr', { recursive: true, force: true })
