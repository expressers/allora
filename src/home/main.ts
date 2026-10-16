import '@fontsource-variable/anybody/standard.css'
import '@fontsource-variable/jetbrains-mono'
import './home.css'

// Each proposal gets its own version of the ALLORA ring, drawn in its palette.
const palettes: Record<string, (k: number) => string> = {
  p1: (k) => (k < 0.5 ? '#d9221a' : k < 0.7 ? '#8e1513' : '#141414'),
  p2: (k) => (k < 0.45 ? '#e1251b' : k < 0.75 ? '#8e1513' : 'rgba(238,231,223,.35)'),
  p3: (k) => (k < 0.55 ? '#ff2a1f' : k < 0.72 ? '#a3201a' : '#f1ebe3'),
}

document.querySelectorAll<HTMLElement>('.prop-ring').forEach((el) => {
  const key = el.dataset.ring!
  const n = 48
  const lines = Array.from({ length: n }, (_, i) => {
    const a = -Math.PI * 0.72 + (i / n) * Math.PI * 2
    const r1 = 34, r2 = i % 6 === 0 ? 48 : 45
    return `<line style="--i:${i}" x1="${50 + Math.cos(a) * r1}" y1="${50 + Math.sin(a) * r1}" x2="${50 + Math.cos(a) * r2}" y2="${50 + Math.sin(a) * r2}" stroke="${palettes[key](i / (n - 1))}"/>`
  }).join('')
  el.innerHTML = `<svg viewBox="0 0 100 100">${lines}</svg>`
})
