// Conteúdo da ALLORA.
// Fonte principal: Apresentação Institucional ALLORA (PDF partilhado pelo cliente, 2026).
// Complementado com material público (allora.ao, @allorasulda) onde o PDF é omisso.
// Escrita: português de Angola. Sem travessões.

export const contact = {
  email: 'geral@allora.ao',
  phones: ['+244 929 358 401', '+244 923 268 817'],
  whatsapp: '244929358401',
  address: ['Condomínio Bengo, 9.º andar, porta D', 'Vila Alice, Luanda, Angola'],
  instagram: 'https://www.instagram.com/allorasulda/',
  maps: 'https://www.google.com/maps/search/?api=1&query=Condom%C3%ADnio+Bengo+Vila+Alice+Luanda',
}

export const CTA = 'Fale connosco'
export const CONTACT_PAGE = '/contactos/'
export const mailto = `mailto:${contact.email}?subject=${encodeURIComponent('Contacto via website ALLORA')}`
export const tel = (p: string) => `tel:${p.replace(/\s/g, '')}`

export type PageKey = 'inicio' | 'sobre' | 'servicos' | 'carbonometro' | 'projectos' | 'forum' | 'academia' | 'contactos'

/** Páginas do site, pela ordem do menu. */
export const pages: { key: PageKey; label: string; href: string }[] = [
  { key: 'sobre', label: 'Sobre', href: '/sobre/' },
  { key: 'servicos', label: 'Serviços', href: '/servicos/' },
  { key: 'carbonometro', label: 'Carbonómetro', href: '/carbonometro/' },
  { key: 'projectos', label: 'Projectos', href: '/projectos/' },
  { key: 'forum', label: 'Fórum', href: '/forum/' },
  { key: 'academia', label: 'Academia', href: '/academia/' },
]

/** Liga à página de contactos com o assunto já escolhido no formulário. */
export const contactFor = (topic: TopicKey) => `${CONTACT_PAGE}?assunto=${topic}#formulario`

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

/** Página Sobre: textos completos da apresentação (páginas 2 a 4 e 12). */
export const house = {
  lead: 'Fundada em 2016, a ALLORA é uma empresa angolana de sustentabilidade corporativa, ESG, gestão de carbono e inovação de impacto.',
  statement: 'Mais do que uma consultora em sustentabilidade, uma casa de ideias, inovação e transformação.',
  story: [
    'Ao longo da sua trajectória, a ALLORA tornou-se uma referência nacional no desenvolvimento de estratégias ESG, licenciamento ambiental, gestão de carbono e projectos de transformação social.',
    'Apoiamos empresas, organizações e eventos na medição, redução e compensação da pegada carbónica, com metodologias internacionais como o GHG Protocol, a ISO 14064, o Acordo de Paris e o ODS 13. As nossas soluções ajudam a fortalecer a estratégia ESG, obter certificações, atrair investimento sustentável e ganhar competitividade nos mercados nacionais e internacionais.',
  ],
  belief: 'Acreditamos que crescimento económico, responsabilidade social e preservação ambiental não são objectivos concorrentes. São pilares complementares de um desenvolvimento sustentável.',
  pillars: [
    { label: 'Missão', text: 'Apoiar organizações públicas e privadas na construção de modelos de negócio mais sustentáveis, competitivos e preparados para os desafios do futuro, através de soluções integradas em ESG, gestão ambiental, carbono e economia circular.' },
    { label: 'Visão', text: 'Ser a empresa de referência em sustentabilidade empresarial e consultoria ESG em Angola e na África Austral, reconhecida pela excelência técnica, pela capacidade de inovação e pelo impacto positivo junto de empresas, comunidades e parceiros.' },
    { label: 'Valores', text: 'O crescimento sustentável só é possível quando assente em princípios sólidos. Actuamos com ética, transparência e responsabilidade em todas as relações, usamos a inovação para resolver desafios complexos e temos a excelência técnica como garantia da qualidade do nosso trabalho.' },
  ],
  reasons: [
    { title: 'Experiência e credibilidade', text: 'Mais de 8 anos a desenvolver soluções de sustentabilidade e ESG em Angola.' },
    { title: 'Soluções integradas', text: 'ESG, carbono, ambiente, formação e economia circular num único parceiro.' },
    { title: 'Rigor e inovação', text: 'Metodologias internacionais adaptadas à realidade do mercado angolano.' },
    { title: 'Impacto comprovado', text: 'Projectos que geram valor económico, social e ambiental para empresas e comunidades.' },
    { title: 'Compromisso com a excelência', text: 'Uma equipa multidisciplinar dedicada a criar soluções sustentáveis com resultados mensuráveis.' },
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

export type TopicKey = 'esg' | 'carbono' | 'licenciamento' | 'formacao' | 'eventos' | 'carbonometro' | 'forum' | 'academia' | 'outro'

export type Service = {
  slug: string
  topic: TopicKey
  title: string
  short: string
  text: string
  includes: string[]
  img: string
  alt: string
  link?: { label: string; href: string }
}

export const services: Service[] = [
  {
    slug: 'sustentabilidade-esg',
    topic: 'esg',
    title: 'Sustentabilidade corporativa e ESG',
    img: '/media/verde/parque-solar.webp',
    alt: 'Parque solar visto de cima, entre campos verdes',
    short: 'Integramos os princípios ESG na estratégia da empresa, em linha com o que exigem investidores, reguladores e mercados internacionais.',
    text: 'Apoiamos organizações na integração dos princípios ambientais, sociais e de governação na estratégia empresarial, garantindo alinhamento com as exigências de investidores, reguladores e mercados internacionais.',
    includes: [
      'Diagnóstico e estratégia ESG',
      'Alinhamento com investidores, reguladores e mercados internacionais',
      'Apoio na obtenção de certificações',
      'Preparação para atrair investimento sustentável',
    ],
  },
  {
    slug: 'gestao-de-carbono',
    topic: 'carbono',
    title: 'Gestão de carbono e descarbonização',
    img: '/media/verde/floresta-estrada.webp',
    alt: 'Floresta densa vista de cima, atravessada por uma estrada',
    short: 'Medição, redução e compensação das emissões de gases com efeito de estufa, com o Carbonómetro e metodologias internacionais.',
    text: 'A transição para uma economia de baixo carbono é um dos maiores desafios e oportunidades da actualidade. Disponibilizamos soluções completas para medir, reduzir e compensar as emissões de gases com efeito de estufa.',
    includes: [
      'Medição da pegada carbónica com o GHG Protocol e a ISO 14064',
      'Planos de redução alinhados com o Acordo de Paris e o ODS 13',
      'Compensação com créditos de carbono certificados',
      'Eventos e stands carbono neutro',
    ],
    link: { label: 'Conhecer o Carbonómetro', href: '/carbonometro/' },
  },
  {
    slug: 'licenciamento-ambiental',
    topic: 'licenciamento',
    title: 'Licenciamento e gestão ambiental',
    img: '/media/verde/miradouro-da-lua.webp',
    alt: 'Miradouro da Lua, a sul de Luanda: falésias de terra esculpidas pela erosão',
    short: 'Estudos de Impacte Ambiental (EIA), PGA e PGR, para garantir conformidade legal e reduzir o risco ambiental de cada projecto.',
    text: 'Os estudos ambientais são a base do desenvolvimento responsável de qualquer projecto. Realizamos avaliações técnicas completas para garantir a conformidade legal e minimizar os riscos ambientais.',
    includes: [
      'Estudos de Impacte Ambiental (EIA)',
      'Elaboração de PGA e PGR',
      'Acompanhamento do processo de licenciamento',
      'Gestão ambiental para petróleo e gás, construção, indústria, serviços e comércio',
    ],
    link: { label: 'Ver projectos', href: '/projectos/' },
  },
  {
    slug: 'formacao',
    topic: 'formacao',
    title: 'Formação e capacitação profissional',
    img: '/media/verde/formacao.webp',
    alt: 'Formador a dar uma aula a um grupo de adultos',
    short: 'A Academia ALLORA prepara líderes, gestores e equipas técnicas com programas, workshops, seminários e cursos especializados.',
    text: 'A transformação sustentável começa pelas pessoas. Através da Academia ALLORA, desenvolvemos programas de formação corporativa para capacitar líderes, gestores e equipas técnicas.',
    includes: [
      'Programas de formação corporativa',
      'Workshops e seminários',
      'Cursos especializados',
      'Sustentabilidade, ESG, ambiente, economia circular e gestão de carbono',
    ],
    link: { label: 'Conhecer a Academia', href: '/academia/' },
  },
  {
    slug: 'eventos-sustentaveis',
    topic: 'eventos',
    title: 'Eventos sustentáveis e impacto social',
    img: '/media/carbonometro-opaia.webp',
    alt: 'Visitantes a medir a pegada no stand da OPAIA, FILDA 2026',
    short: 'Eventos e stands carbono neutro, e projectos que ligam ambiente, economia circular e comunidades.',
    text: 'Desenhamos eventos com a pegada medida e compensada, e projectos de impacto social que levam a sustentabilidade para fora das empresas, até às comunidades.',
    includes: [
      'Eventos e stands com certificação Carbono Neutro',
      'Lembranças e materiais de economia circular, como o Papel Semente',
      'Projectos comunitários de segurança alimentar e saneamento',
      'Organização do Fórum Nacional de Negócios Sustentáveis',
    ],
    link: { label: 'Ver o Fórum', href: '/forum/' },
  },
]

export const topics: { key: TopicKey; label: string }[] = [
  ...services.map((s) => ({ key: s.topic, label: s.title })),
  { key: 'carbonometro', label: 'Carbonómetro' },
  { key: 'forum', label: 'Fórum Nacional de Negócios Sustentáveis' },
  { key: 'academia', label: 'Academia ALLORA' },
  { key: 'outro', label: 'Outro assunto' },
]

export const sectors = ['Petróleo e gás', 'Construção', 'Indústria', 'Serviços', 'Comércio']
export const methods = ['GHG Protocol', 'ISO 14064', 'Acordo de Paris', 'ODS 13']

export const carbon = {
  lead: 'A solução da ALLORA para medir, reduzir e compensar a pegada carbónica de empresas e eventos.',
  steps: [
    { word: 'Medir', text: 'Levantamos as emissões de gases com efeito de estufa da operação ou do evento, com o GHG Protocol e a ISO 14064. Cada participante pode conhecer o seu próprio número.' },
    { word: 'Reduzir', text: 'O diagnóstico vira um plano de redução, alinhado com o Acordo de Paris e o ODS 13, com metas que a empresa consegue acompanhar.' },
    { word: 'Compensar', text: 'O que não se evita é neutralizado com créditos de carbono certificados. O resultado pode ser comunicado com certificação Carbono Neutro.' },
  ],
  filda: 'Na FILDA 2026 levámos ao recinto o primeiro stand com certificação Carbono Neutro em Angola. Nos stands do BFA, do BCS e da OPAIA, cada visitante saiu a conhecer a sua pegada.',
  forum: 'Emissões do 2.º Fórum Nacional de Negócios Sustentáveis. Medidas e compensadas na totalidade com 47 créditos de carbono cancelados.',
}

export const forum = {
  name: 'Fórum Nacional de Negócios Sustentáveis',
  short: 'FNNS',
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
  lead: 'Uma iniciativa da ALLORA que junta empresas, governo e academia para pôr a sustentabilidade na agenda de Angola.',
  story: [
    'O Fórum Nacional de Negócios Sustentáveis realizou com sucesso as suas duas primeiras edições e consolidou-se como uma das principais plataformas de promoção da sustentabilidade, da inovação e da responsabilidade empresarial em Angola.',
    'Cada edição reuniu representantes do sector público e privado, especialistas, empreendedores, instituições académicas e parceiros nacionais e internacionais. Tornou-se um espaço privilegiado para o diálogo entre empresas, investidores e decisores.',
  ],
  quote: { text: 'A sustentabilidade deixa de ser discurso e passa a ser matemática.', who: 'Adriano Sebastião, no 2.º Fórum' },
}

export const academy = {
  lead: 'A unidade de formação e capacitação da ALLORA, para profissionais, empresas e instituições.',
  statement: 'Preparar pessoas para um mercado cada vez mais orientado para a sustentabilidade e a inovação.',
  text: 'A Academia ALLORA desenvolve competências em sustentabilidade, ESG, ambiente, economia circular e gestão de carbono. Promove a partilha de conhecimento técnico e prático e contribui para fortalecer as capacidades individuais e organizacionais.',
  formats: ['Programas de formação', 'Workshops', 'Seminários', 'Cursos especializados'],
  themes: ['Sustentabilidade', 'ESG', 'Ambiente', 'Economia circular', 'Gestão de carbono'],
  audience: ['Líderes', 'Gestores', 'Equipas técnicas'],
}

export const initiatives = [
  {
    name: 'EcoBag Angola',
    img: '/media/verde/saco-rede.webp',
    alt: 'Saco reutilizável de rede com legumes e fruta frescos',
    text: 'Sacos ecológicos reutilizáveis, para reduzir o plástico descartável e levar a economia circular ao dia-a-dia.',
    long: 'Iniciativa dedicada à produção e promoção de sacos ecológicos reutilizáveis, concebidos para reduzir o consumo de plásticos descartáveis e incentivar práticas de consumo mais sustentáveis. Contribui para a protecção do ambiente e para a economia circular.',
  },
  {
    name: 'Hortas Comunitárias',
    img: '/media/verde/plantar.webp',
    alt: 'Mãos a plantar uma muda em terra escura',
    text: 'Hortas sustentáveis que promovem a segurança alimentar, a educação ambiental e a produção local.',
    long: 'Projecto de impacto social que promove a segurança alimentar, a educação ambiental e o desenvolvimento comunitário através da criação de hortas sustentáveis, incentivando a produção local e o uso responsável dos recursos naturais.',
  },
]

export const seedPaper = {
  name: 'Papel Semente',
  award: 'Prémios Forbes Responsabilidade Social, 24 de Abril de 2026',
  text: 'O Papel Semente Angola transforma materiais biodegradáveis em papel ecológico com sementes incorporadas. Depois de usado, é plantado e dá origem a flores, ervas aromáticas ou espécies nativas. Inovação, economia circular e responsabilidade ambiental no mesmo gesto.',
}

export const cases = [
  { name: 'Fórum Nacional de Negócios Sustentáveis', text: 'A principal plataforma nacional dedicada à sustentabilidade, com conhecimento, inovação e parcerias estratégicas.', href: '/forum/', img: '/media/fnns-grupo.webp', alt: 'Participantes do 2.º Fórum Nacional de Negócios Sustentáveis' },
  { name: 'FILDA 2026', text: 'O primeiro stand em Angola com certificação Carbono Neutro, um marco para os eventos sustentáveis.', href: '/carbonometro/', img: '/media/carbonometro-opaia.webp', alt: 'Visitantes a medir a pegada no stand da OPAIA, FILDA 2026' },
  { name: 'Academia ESG', text: 'Mais de 800 profissionais formados em sustentabilidade, ESG, ambiente e economia circular.', href: '/academia/', img: '/media/forum-oradoras.webp', alt: 'Oradoras do 2.º Fórum Nacional de Negócios Sustentáveis' },
  { name: 'Licenciamento ambiental', text: 'Licenciamento e gestão ambiental para petróleo e gás, construção, indústria, serviços e comércio.', href: '/servicos/#licenciamento-ambiental', img: '/media/terreno.webp', alt: 'Equipa da ALLORA em trabalho de campo' },
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

/** Logótipos dos parceiros, recortados da apresentação e convertidos a branco: [ficheiro, nome, largura, altura]. */
export const partnerLogos: [string, string, number, number][] = [
  ['governo-de-angola', 'Governo de Angola', 335, 120], ['minamb', 'Ministério do Ambiente', 371, 96],
  ['minco', 'Ministério do Comércio', 452, 97], ['inapem', 'INAPEM', 358, 95],
  ['porto-de-luanda', 'Porto de Luanda', 226, 198], ['sonangol', 'Sonangol', 455, 108],
  ['refriango', 'Refriango', 285, 227], ['bfa', 'BFA', 309, 122],
  ['atlantico', 'Banco Millennium Atlântico', 429, 112], ['sistec', 'SISTEC', 511, 130],
  ['kio', 'KIO Transitário', 319, 118], ['reasol', 'Reasol', 440, 128],
  ['kiwa', 'KIWA', 336, 120], ['petronauka', 'PetroNauka', 423, 94],
  ['visao-profissional', 'Visão Profissional', 479, 148], ['compensei', 'Compensei', 736, 162],
  ['green-intelligence', 'Green Intelligence', 466, 146], ['sdc', 'SDC', 363, 124],
  ['petro-women-talk', 'Petro Women Talk', 273, 246], ['soniuve', 'Soniuve', 347, 90],
  ['aipex', 'Aipex Angola', 240, 178], ['launchpad', 'Launchpad Angola', 275, 133],
  ['acacias', 'Acácias', 308, 262], ['aased', 'AASED', 268, 124],
  ['ticket-ao', 'ticket.ao', 356, 156], ['semana-sustentabilidade', 'Semana da Sustentabilidade MPME', 240, 252],
]

export const presence = ['Angola', 'Nigéria', 'Brasil', 'África do Sul']
