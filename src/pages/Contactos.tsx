import { useEffect, useRef, useState, type FormEvent } from 'react'
import { ArrowUpRight } from '@phosphor-icons/react/dist/csr/ArrowUpRight'
import { EnvelopeSimple } from '@phosphor-icons/react/dist/csr/EnvelopeSimple'
import { WhatsappLogo } from '@phosphor-icons/react/dist/csr/WhatsappLogo'
import { InstagramLogo } from '@phosphor-icons/react/dist/csr/InstagramLogo'
import { MapPin } from '@phosphor-icons/react/dist/csr/MapPin'
import { Page } from '../ui/Page'
import { LensRing } from '../ui/LensRing'
import { contact, tel, topics, type TopicKey } from '../shared/content'

type Fields = { nome: string; empresa: string; email: string; telefone: string; assunto: TopicKey; mensagem: string }
type Errors = Partial<Record<keyof Fields, string>>
type Channel = 'email' | 'whatsapp'

const EMPTY: Fields = { nome: '', empresa: '', email: '', telefone: '', assunto: 'outro', mensagem: '' }

function validate(f: Fields, channel: Channel): Errors {
  const e: Errors = {}
  if (!f.nome.trim()) e.nome = 'Indique o seu nome.'
  if (channel === 'email' && f.email && !/^\S+@\S+\.\S+$/.test(f.email)) e.email = 'Este email não parece completo. Confirme, por exemplo: nome@empresa.ao'
  if (!f.email.trim() && !f.telefone.trim()) e.email = 'Deixe um email ou um telefone para lhe respondermos.'
  if (f.mensagem.trim().length < 10) e.mensagem = 'Conte-nos um pouco mais, em pelo menos uma frase.'
  return e
}

function compose(f: Fields) {
  const topic = topics.find((t) => t.key === f.assunto)?.label ?? 'Outro assunto'
  const lines = [
    f.mensagem.trim(),
    '',
    `Nome: ${f.nome.trim()}`,
    f.empresa.trim() && `Empresa ou instituição: ${f.empresa.trim()}`,
    f.email.trim() && `Email: ${f.email.trim()}`,
    f.telefone.trim() && `Telefone: ${f.telefone.trim()}`,
    `Assunto: ${topic}`,
  ].filter((l) => l !== '')
  return { topic, body: lines.join('\n') }
}

function ContactForm() {
  const [f, setF] = useState<Fields>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState<Channel | null>(null)
  const channel = useRef<Channel>('email')
  const form = useRef<HTMLFormElement>(null)

  // ?assunto=carbonometro (vindo dos botões das outras páginas) escolhe o assunto.
  useEffect(() => {
    const a = new URLSearchParams(location.search).get('assunto') as TopicKey | null
    if (a && topics.some((t) => t.key === a)) setF((x) => ({ ...x, assunto: a }))
  }, [])

  const set = (k: keyof Fields) => (e: { target: { value: string } }) => {
    setF((x) => ({ ...x, [k]: e.target.value }))
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }))
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const err = validate(f, channel.current)
    setErrors(err)
    const first = Object.keys(err)[0]
    if (first) { form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus(); return }
    const { topic, body } = compose(f)
    const url = channel.current === 'email'
      ? `mailto:${contact.email}?subject=${encodeURIComponent(`${topic}: contacto via website`)}&body=${encodeURIComponent(body)}`
      : `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(body)}`
    setSent(channel.current)
    if (channel.current === 'whatsapp') window.open(url, '_blank', 'noopener')
    else window.location.href = url
  }

  const field = (k: keyof Fields, label: string, props: Record<string, unknown> = {}, help?: string) => (
    <div className={`field${errors[k] ? ' has-error' : ''}`}>
      <label htmlFor={`f-${k}`}>{label}</label>
      <input id={`f-${k}`} name={k} value={f[k]} onChange={set(k)} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `e-${k}` : help ? `h-${k}` : undefined} {...props} />
      {help && !errors[k] && <p id={`h-${k}`} className="field-help">{help}</p>}
      {errors[k] && <p id={`e-${k}`} className="field-error">{errors[k]}</p>}
    </div>
  )

  return (
    <form ref={form} id="formulario" className="cform" onSubmit={submit} noValidate aria-labelledby="form-title">
      <h2 id="form-title" className="h-md">Escreva-nos</h2>
      <p className="cform-intro">Preencha os campos e escolha como prefere enviar. Abrimos o seu email ou o WhatsApp com a mensagem já escrita.</p>
      <div className="cform-grid">
        {field('nome', 'Nome', { autoComplete: 'name', required: true })}
        {field('empresa', 'Empresa ou instituição', { autoComplete: 'organization' }, 'Opcional.')}
        {field('email', 'Email', { type: 'email', autoComplete: 'email', inputMode: 'email' })}
        {field('telefone', 'Telefone', { type: 'tel', autoComplete: 'tel', inputMode: 'tel' }, 'Opcional, se deixar o email.')}
        <div className="field field-wide">
          <label htmlFor="f-assunto">Assunto</label>
          <div className="select">
            <select id="f-assunto" name="assunto" value={f.assunto} onChange={set('assunto')}>
              {topics.map((t) => <option key={t.key} value={t.key}>{t.label}</option>)}
            </select>
          </div>
        </div>
        <div className={`field field-wide${errors.mensagem ? ' has-error' : ''}`}>
          <label htmlFor="f-mensagem">Mensagem</label>
          <textarea id="f-mensagem" name="mensagem" rows={6} value={f.mensagem} onChange={set('mensagem')} aria-invalid={!!errors.mensagem} aria-describedby={errors.mensagem ? 'e-mensagem' : undefined} />
          {errors.mensagem && <p id="e-mensagem" className="field-error">{errors.mensagem}</p>}
        </div>
      </div>
      <div className="cform-actions">
        <button type="submit" className="btn btn-lg" onClick={() => { channel.current = 'email' }}><EnvelopeSimple size={18} weight="bold" aria-hidden="true" />Enviar por email</button>
        <button type="submit" className="btn btn-lg btn-ghost" onClick={() => { channel.current = 'whatsapp' }}><WhatsappLogo size={18} weight="bold" aria-hidden="true" />Enviar por WhatsApp</button>
      </div>
      <p className="cform-status" role="status" aria-live="polite">
        {sent === 'email' && <>Abrimos o seu programa de email com a mensagem preenchida. Se nada abriu, escreva directamente para <a href={`mailto:${contact.email}`}>{contact.email}</a>.</>}
        {sent === 'whatsapp' && <>Abrimos o WhatsApp numa nova janela com a mensagem preenchida. Se não abriu, ligue para <a href={tel(contact.phones[0])}>{contact.phones[0]}</a>.</>}
      </p>
    </form>
  )
}

export default function Contactos() {
  return (
    <Page current="contactos">
      <section className="ct-hero">
        <div className="ct-head">
          <h1 className="ct-word" style={{ ['--n' as string]: 9 }}>
            <span className="ph-ln" aria-hidden="true"><span>Contactos</span></span>
            <span className="sr-only">Contactos da ALLORA</span>
          </h1>
          <p className="ct-lead">Para orçamentos e sugestões, estamos disponíveis 24 horas por dia, todos os dias.</p>
        </div>
        <LensRing src="/media/carbonometro-bcs.webp" alt="Conversa no stand do BCS, FILDA 2026" className="ct-ring" />
      </section>

      <section className="sec ct-body" aria-label="Formas de contacto">
        <ul className="ct-list">
          <li>
            <a className="ct-mail" href={`mailto:${contact.email}`}><EnvelopeSimple size={22} aria-hidden="true" />{contact.email}<ArrowUpRight size={20} aria-hidden="true" /></a>
          </li>
          {contact.phones.map((p) => (
            <li key={p} className="ct-phone">
              <a href={tel(p)}>{p}</a>
              <a className="ct-wa mono" href={`https://wa.me/${p.replace(/\D/g, '')}`} target="_blank" rel="noreferrer"><WhatsappLogo size={15} aria-hidden="true" />WhatsApp</a>
            </li>
          ))}
          <li>
            <a className="ct-addr" href={contact.maps} target="_blank" rel="noreferrer">
              <MapPin size={20} aria-hidden="true" />
              <address>{contact.address[0]}<br />{contact.address[1]}</address>
              <span className="mono">Ver no mapa</span>
            </a>
          </li>
          <li>
            <a className="ct-ig" href={contact.instagram} target="_blank" rel="noreferrer"><InstagramLogo size={20} aria-hidden="true" />@allorasulda</a>
          </li>
        </ul>
        <ContactForm />
      </section>
    </Page>
  )
}
