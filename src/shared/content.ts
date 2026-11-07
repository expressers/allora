// Conteúdo da ALLORA.
// Fonte principal: Apresentação Institucional ALLORA (PDF partilhado pelo cliente, 2026).
// Complementado com material público (allora.ao, @allorasulda) onde o PDF é omisso.

export const contact = {
  email: 'geral@allora.ao',
  phones: ['+244 929 358 401', '+244 923 268 817'],
  address: ['Condomínio Bengo, 9.º andar, porta D', 'Vila Alice, Luanda, Angola'],
  instagram: 'https://www.instagram.com/allorasulda/',
}

export const CTA = 'Fale connosco'
export const mailto = `mailto:${contact.email}?subject=${encodeURIComponent('Contacto via website ALLORA')}`

export const nav = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Carbonómetro', href: '#carbonometro' },
  { label: 'Fórum', href: '#forum' },
]

export const chapters = [
  { id: 'medir', word: 'Medir', text: 'Observamos o terreno, os processos e as práticas. Medimos a pegada carbónica com o GHG Protocol e a ISO 14064.' },
  { id: 'reduzir', word: 'Reduzir', text: 'O diagnóstico vira plano de sustentabilidade e ESG, alinhado com o Acordo de Paris e o ODS 13.' },
  { id: 'compensar', word: 'Compensar', text: 'O que não se evita é neutralizado com créditos de carbono certificados.' },
]

export const about = {
  statement: 'Desde 2016, uma casa de ideias onde empresas, comunidades e parceiros encontram soluções para um futuro mais responsável.',
  body: 'A ALLORA é uma empresa angolana especializada em sustentabilidade corporativa, ESG, gestão de carbono e inovação de impacto. Tornou-se uma referência nacional em estratégias ESG, licenciamento ambiental, gestão de carbono e projectos de transformação social.',
  belief: 'Crescimento económico, responsabilidade social e preservação ambiental não são objectivos concorrentes. São pilares do mesmo desenvolvimento.',
  pillars: [
    { label: 'Missão', text: 'Capacitar organizações a crescerem de forma responsável e competitiva, com soluções ESG de excelência.' },
    { label: 'Visão', text: 'Ser a empresa de referência em sustentabilidade empresarial e consultoria ESG em Angola e na África Austral.' },
    { label: 'Valores', text: 'Ética, transparência e responsabilidade em todas as relações. A inovação para resolver desafios complexos e a excelência técnica como garantia.' },
  ],
}

export const numbers = [
  { value: 8, suffix: '+', label: 'anos de sustentabilidade e ESG em Angola' },
  { value: 20, suffix: '+', label: 'projectos ambientais e ESG executados' },
  { value: 30, suffix: '+', label: 'empresas licenciadas' },
  { value: 15, suffix: '+', label: 'clientes activos' },
  { value: 800, suffix: '+', label: 'profissionais formados pela Academia ALLORA' },
  { value: 1000, suffix: '+', label: 'lavatórios comunitários implementados' },
]

export type Service = { title: string; text: string }

export const services: Service[] = [
  {
    title: 'Sustentabilidade corporativa e ESG',
    text: 'Integramos os princípios ESG na estratégia da empresa, em linha com o que exigem investidores, reguladores e mercados internacionais.',
  },
  {
    title: 'Gestão de carbono e descarbonização',
    text: 'Medição, redução e compensação das emissões de gases com efeito de estufa, com o Carbonómetro e metodologias internacionais.',
  },
  {
    title: 'Licenciamento e gestão ambiental',
    text: 'Estudos de Impacte Ambiental (EIA), PGA e PGR, para garantir conformidade legal e reduzir o risco ambiental de cada projecto.',
  },
  {
    title: 'Formação e capacitação profissional',
    text: 'A Academia ALLORA prepara líderes, gestores e equipas técnicas com programas, workshops, seminários e cursos especializados.',
  },
  {
    title: 'Eventos sustentáveis e impacto social',
    text: 'Eventos e stands carbono neutro, e projectos que ligam ambiente, economia circular e comunidades.',
  },
]

export const sectors = ['Petróleo e gás', 'Construção', 'Indústria', 'Serviços', 'Comércio']

export const forum = {
  name: 'Fórum Nacional de Negócios Sustentáveis',
  edition: '2.ª edição',
  date: '10 de Março de 2026',
  venue: 'Hotel InterContinental, Luanda',
  facts: [
    { value: '2', label: 'edições realizadas' },
    { value: '+500', label: 'participantes' },
    { value: '47 t', label: 'CO₂ medidas e compensadas' },
    { value: 'B2B · B2G', label: 'reuniões estratégicas' },
  ],
  text: 'Reúne líderes empresariais, governo, especialistas, academia, investidores e parceiros nacionais e internacionais para debater os desafios e as oportunidades do desenvolvimento sustentável em Angola.',
}

export const initiatives = [
  {
    name: 'EcoBag Angola',
    text: 'Sacos ecológicos reutilizáveis, para reduzir o plástico descartável e levar a economia circular ao dia-a-dia.',
  },
  {
    name: 'Hortas Comunitárias',
    text: 'Hortas sustentáveis que promovem a segurança alimentar, a educação ambiental e a produção local.',
  },
]

export const partnerCounts = [
  { value: 6, label: 'entidades governamentais' },
  { value: 11, label: 'parceiros estratégicos' },
  { value: 14, label: 'patrocinadores corporativos' },
]

export const partners = [
  'Governo de Angola',
  'Ministério do Ambiente',
  'Ministério do Comércio',
  'INAPEM',
  'Porto de Luanda',
  'Sonangol',
  'Refriango',
  'BFA',
  'Banco Millennium Atlântico',
  'SISTEC',
  'KIO Transitário',
  'Reasol',
  'KIWA',
  'PetroNauka',
  'Visão Profissional',
  'Compensei',
  'Green Intelligence',
  'Petro Women Talk',
  'Soniuve',
  'Aipex Angola',
  'Launchpad Angola',
  'Acácias',
  'ticket.ao',
  'Semana da Sustentabilidade MPME',
]

export const presence = ['Angola', 'Nigéria', 'Brasil', 'África do Sul']
