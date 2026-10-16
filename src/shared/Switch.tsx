import './switch.css'

/** Small presentation control to move between the proposals on the same link. */
export function Switch({ current }: { current: 1 | 2 | 3 }) {
  return (
    <nav className="pswitch" aria-label="Propostas">
      <a href="/" className="pswitch-all">Propostas</a>
      {[1, 2, 3].map((n) => (
        <a key={n} href={`/proposta-${n}/`} aria-current={n === current ? 'page' : undefined}>{n}</a>
      ))}
    </nav>
  )
}
