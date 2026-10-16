// Conteúdo derivado de material público da ALLORA (allora.ao, @allorasulda).
// Copy de serviços é proposta: confirmar com o cliente.

export const contact = {
  email: 'geral@allora.co.ao',
  phones: ['+244 923 268 817', '+244 929 358 401'],
  instagram: 'https://www.instagram.com/allorasulda/',
  city: 'Luanda, Angola',
}

export const nav = [
  { label: 'Abordagem', href: '#abordagem' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Carbonómetro', href: '#carbonometro' },
  { label: 'Fórum', href: '#forum' },
  { label: 'Contacto', href: '#contacto' },
]

export const CTA = 'Fale connosco'
export const mailto = `mailto:${contact.email}?subject=${encodeURIComponent('Contacto via website ALLORA')}`

export const method = [
  {
    verb: 'Medir',
    text: 'Observamos o terreno, os processos e as práticas. O diagnóstico vem antes de qualquer solução.',
  },
  {
    verb: 'Reduzir',
    text: 'Transformamos o diagnóstico num plano estratégico de sustentabilidade e ESG, com metas que se podem verificar.',
  },
  {
    verb: 'Compensar',
    text: 'O que não se consegue evitar é neutralizado com créditos de carbono certificados, cancelados em nome do cliente.',
  },
]

export type Service = { title: string; text: string; group: 'Carbono' | 'ESG' }

export const services: Service[] = [
  { group: 'Carbono', title: 'Gestão de carbono', text: 'Medição, redução e compensação da pegada carbónica de organizações, com o Carbonómetro.' },
  { group: 'Carbono', title: 'Eventos carbono neutro', text: 'Medimos as emissões de eventos e stands e compensamo-las integralmente, com selo de verificação.' },
  { group: 'Carbono', title: 'Diagnóstico de sustentabilidade', text: 'Levantamento do inventário de práticas, processos e iniciativas de cada organização.' },
  { group: 'ESG', title: 'Estratégia ESG', text: 'Planos estratégicos de sustentabilidade e ESG para empresas e instituições, do sector mineiro à banca.' },
  { group: 'ESG', title: 'Impacto social', text: 'Projectos que ligam ambiente e pessoas, como o Papel Semente, distinguido pela Forbes.' },
  { group: 'ESG', title: 'Formação e sensibilização', text: 'Programas que preparam equipas e públicos para agir, dentro e fora da organização.' },
]

export const forum = {
  name: 'Fórum Nacional de Negócios Sustentáveis',
  short: 'FNNS',
  edition: '2.ª edição',
  date: '10 de Março de 2026',
  venue: 'Hotel InterContinental, Luanda',
  facts: [
    { value: '+500', label: 'participantes' },
    { value: '47 t', label: 'CO₂ medidas e compensadas' },
    { value: 'B2B · B2G', label: 'reuniões estratégicas' },
  ],
  text: 'Um espaço de convergência entre o sector público, o sector privado, a academia, startups e a juventude. Pela primeira vez num evento desta natureza em Angola, a pegada de carbono foi medida e compensada na totalidade.',
}

export const partners = [
  { name: 'Banco Millennium Atlântico', src: '/logos/atlantico.png' },
  { name: 'Porto de Luanda', src: '/logos/porto-luanda.webp' },
  { name: 'Refriango', src: '/logos/refriango.webp' },
  { name: 'INAPEM', src: '/logos/inapem.webp' },
  { name: 'SISTEC', src: '/logos/sistec.webp' },
  { name: 'PGP', src: '/logos/pgp.jpeg' },
  { name: 'KIO Transitário', src: '/logos/kio.webp' },
  { name: 'Reasol', src: '/logos/reasol.webp' },
]
