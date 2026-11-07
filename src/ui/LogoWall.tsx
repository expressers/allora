import { partnerLogos } from '../shared/content'

/**
 * Parede de logótipos dos parceiros (recortados da apresentação e convertidos a branco).
 * Cada logótipo recebe a mesma área óptica, para que os quadrados não pareçam menores.
 */
export function LogoWall() {
  return (
    <ul className="logowall" aria-label="Parceiros">
      {partnerLogos.map(([file, name, w, h]) => {
        const ratio = w / h
        const height = Math.min(64, Math.max(26, Math.round(44 / Math.sqrt(ratio))))
        return (
          <li key={file}>
            <img src={`/logos/parceiros/${file}.png`} alt={name} loading="lazy" width={Math.round(height * ratio)} height={height} />
          </li>
        )
      })}
    </ul>
  )
}
