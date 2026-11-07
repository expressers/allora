import { forwardRef } from 'react'
import { LOGO_RING, LOGO_VIEWBOX, WORDMARK } from './brand'

/**
 * Logótipo oficial ALLORA (anel de 28 traços + nome), em currentColor.
 * Os traços seguem a ordem dos ponteiros do relógio a partir do topo, para que
 * o cabeçalho os possa acender um a um como indicador de leitura.
 */
export const Logo = forwardRef<SVGSVGElement, { className?: string }>(function Logo({ className }, ref) {
  return (
    <svg ref={ref} className={className} viewBox={LOGO_VIEWBOX} aria-hidden="true" focusable="false">
      <g strokeLinecap="round" fill="none" stroke="currentColor">
        {LOGO_RING.map(([x1, y1, x2, y2, w], i) => (
          <line key={i} className="d" x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={w} />
        ))}
      </g>
      <path fill="currentColor" fillRule="evenodd" d={WORDMARK} />
    </svg>
  )
})
