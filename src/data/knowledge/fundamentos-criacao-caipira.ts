import { KnowledgeModule } from '@/types';

export const fundamentosCriacaoCaipira: KnowledgeModule = {
  id: 'fundamentos-criacao-caipira',
  title: 'Fundamentos da Criação de Galinhas de Postura Caipira',
  category: 'manejo',
  summary: 'Conheça os conceitos básicos e os princípios fundamentais para iniciar uma criação de galinhas de postura no sistema caipira de forma sustentável e lucrativa.',
  objective: 'Capacitar o produtor para entender o sistema caipira de produção de ovos, suas características, vantagens e os principais fatores que influenciam o desempenho das aves.',
  technicalContent: [
    'O sistema caipira de produção de ovos é caracterizado por permitir que as aves tenham acesso livre a piquetes (áreas externas) durante parte ou todo o dia, complementando a alimentação com o que encontram na natureza (insetos, gramíneas, sementes).',
    'Diferente dos sistemas convencionais de produção intensiva (gaiolas), o sistema caipira prioriza o bem-estar animal, a sustentabilidade e a produção de ovos com características diferenciadas (gema mais amarela, casca mais resistente).',
    'As aves de postura caipira são geralmente raças adaptadas às condições climáticas locais, com boa capacidade de forrageamento (busca de alimento na natureza) e resistência a doenças.',
    'Os principais fatores que influenciam a produção de ovos no sistema caipira são: genética, alimentação, qualidade da água, instalações adequadas, manejo correto, sanidade e bem-estar animal.',
    'O produtor deve acompanhar indicadores básicos como taxa de postura, consumo de ração, mortalidade, peso dos ovos e qualidade da casca para avaliar o desempenho do lote.',
  ],
  importantParameters: [
    {
      name: 'Densidade de alojamento',
      unit: 'aves/m²',
      idealValue: '4 a 6',
      minValue: '4',
      maxValue: '6',
      description: 'Número máximo de aves por metro quadrado no galpão para garantir conforto e higiene.'
    },
    {
      name: 'Área de piquete por ave',
      unit: 'm²/ave',
      idealValue: '3 a 5',
      minValue: '3',
      maxValue: '10',
      description: 'Área mínima de pastagem por ave para forrageamento adequado.'
    },
    {
      name: 'Idade de início da postura',
      unit: 'semanas',
      idealValue: '22 a 24',
      minValue: '20',
      maxValue: '26',
      description: 'Idade ideal para as aves começarem a botar ovos (depende da raça).'
    },
    {
      name: 'Taxa de postura esperada',
      unit: '%',
      idealValue: '70 a 80',
      minValue: '60',
      maxValue: '85',
      description: 'Percentual de aves que botam ovos por dia no pico de postura.'
    },
    {
      name: 'Peso médio do ovo',
      unit: 'g',
      idealValue: '55 a 60',
      minValue: '50',
      maxValue: '65',
      description: 'Peso ideal dos ovos para comercialização (varia por raça).'
    },
    {
      name: 'Consumo diário de ração por ave',
      unit: 'g',
      idealValue: '110 a 130',
      minValue: '100',
      maxValue: '140',
      description: 'Quantidade de ração que cada ave deve consumir por dia.'
    },
    {
      name: 'Consumo diário de água por ave',
      unit: 'mL',
      idealValue: '250 a 300',
      minValue: '200',
      maxValue: '350',
      description: 'Quantidade de água que cada ave deve beber por dia (pode aumentar no calor).'
    },
    {
      name: 'Mortalidade anual máxima',
      unit: '%',
      idealValue: 'até 5',
      minValue: '0',
      maxValue: '10',
      description: 'Percentual máximo de mortalidade aceitável ao longo do ano.'
    }
  ],
  bestPractices: [
    'Escolha raças adaptadas às condições climáticas da sua região.',
    'Proporcione alimentação balanceada e água limpa à vontade.',
    'Mantenha as instalações sempre limpas e secas.',
    'Garanta acesso ao piquete durante o dia para forrageamento.',
    'Realize o manejo sanitário preventivo (vacinções, desinfecção).',
    'Acompanhe regularmente os indicadores de desempenho do lote.',
    'Planeje a reposição de aves para manter a produção contínua.',
    'Priorize o bem-estar animal para melhorar a produtividade.',
    'Armazene a ração em local seco e protegido de pragas.',
    'Mantenha registros organizados de todas as atividades da granja.'
  ],
  commonProblems: [
    {
      problem: 'Baixa taxa de postura',
      possibleCauses: [
        'Alimentação inadequada (falta de proteína ou energia)',
        'Falta de água ou água de má qualidade',
        'Estresse nas aves (mudança de ambiente, predadores)',
        'Iluminação insuficiente no galpão',
        'Doenças ou parasitas',
        'Idade avançada das aves'
      ],
      recommendedSolutions: [
        'Verificar e ajustar a formulação da ração',
        'Garantir água limpa à vontade 24h por dia',
        'Reduzir fontes de estresse (proteger de predadores, manter rotina)',
        'Garantir 14 a 16 horas de luz por dia (natural + artificial)',
        'Consultar um veterinário para diagnóstico e tratamento',
        'Planeje a reposição de aves periodicamente'
      ]
    },
    {
      problem: 'Ovos com casca fraca',
      possibleCauses: [
        'Falta de cálcio na ração',
        'Falta de vitamina D3',
        'Calor excessivo',
        'Idade avançada das aves',
        'Estresse'
      ],
      recommendedSolutions: [
        'Adicionar cálcio suplementar (pedras de cálcio ou concha de ostras)',
        'Garantir vitamina D3 na ração ou exposição solar',
        'Proporcionar sombra e ventilação adequada no calor',
        'Repor aves mais jovens periodicamente',
        'Reduzir fontes de estresse'
      ]
    },
    {
      problem: 'Mortalidade elevada',
      possibleCauses: [
        'Doenças infecciosas',
        'Parasitas internos ou externos',
        'Predadores',
        'Alimentação inadequada',
        'Instalações inadequadas',
        'Calor ou frio excessivo'
      ],
      recommendedSolutions: [
        'Implementar programa de vacinação preventivo',
        'Realizar tratamento antiparasitário regular',
        'Proteger a granja de predadores (cercas, tela, cães de guarda)',
        'Ajustar a alimentação para atender às necessidades das aves',
        'Melhorar as instalações (ventilação, isolamento)',
        'Garantir conforto térmico (sombra no verão, proteção no inverno)'
      ]
    }
  ],
  commonMistakes: [
    'Não planejar a estrutura antes de iniciar a criação',
    'Escolher raças não adaptadas à região',
    'Dar ração inadequada ou insuficiente',
    'Negligenciar a qualidade da água',
    'Não manter limpeza nas instalações',
    'Não realizar vacinações preventivas',
    'Não isolar novas aves antes de introduzir no lote',
    'Não acompanhar os indicadores de desempenho',
    'Alimentar apenas com restos de comida (não é sustentável)',
    'Não considerar o bem-estar animal'
  ],
  managementChecklist: [
    { item: 'Verificar o abastecimento de água', frequency: '2 vezes por dia', responsible: 'Produtor', critical: true },
    { item: 'Fornecer ração fresca', frequency: '1 vez por dia', responsible: 'Produtor', critical: true },
    { item: 'Coletar os ovos', frequency: '2 vezes por dia', responsible: 'Produtor', critical: true },
    { item: 'Limpar bebedouros e comedouros', frequency: '1 vez por semana', responsible: 'Produtor', critical: false },
    { item: 'Limpar o galpão', frequency: '1 vez por semana', responsible: 'Produtor', critical: true },
    { item: 'Trocar a cama do galpão', frequency: 'A cada 2 meses', responsible: 'Produtor', critical: false },
    { item: 'Acompanhar a taxa de postura', frequency: 'Diário', responsible: 'Produtor', critical: true },
    { item: 'Verificar a saúde das aves', frequency: 'Diário', responsible: 'Produtor', critical: true },
    { item: 'Manter registros da granja', frequency: 'Diário', responsible: 'Produtor', critical: false },
    { item: 'Realizar vermifugação', frequency: 'A cada 3 meses', responsible: 'Produtor/Veterinário', critical: true },
    { item: 'Revisar programa de vacinação', frequency: 'A cada 6 meses', responsible: 'Veterinário', critical: true }
  ],
  intelligentRules: [
    {
      rule: 'Se a taxa de postura cair abaixo de 60%, verificar imediatamente alimentação e água',
      condition: 'Taxa de postura < 60%',
      action: '1. Verificar bebedouros\n2. Ajustar ração\n3. Verificar saúde das aves',
      priority: 'alta'
    },
    {
      rule: 'Se o consumo de água aumentar muito no verão, verificar temperatura',
      condition: 'Consumo de água > 350 mL/ave/dia',
      action: '1. Verificar temperatura do galpão\n2. Proporcionar sombra extra\n3. Garantir água fresca constantemente',
      priority: 'alta'
    },
    {
      rule: 'Se houver mortalidade > 1% em uma semana, consultar veterinário urgentemente',
      condition: 'Mortalidade semanal > 1%',
      action: '1. Isolar aves doentes\n2. Consultar veterinário\n3. Verificar biosseguridade',
      priority: 'alta'
    },
    {
      rule: 'Se os ovos estiverem com casca fraca, adicionar cálcio suplementar',
      condition: 'Ovos com casca fraca ou quebrados',
      action: '1. Adicionar concha de ostras ou pedra de cálcio à vontade\n2. Verificar vitamina D3 na ração',
      priority: 'média'
    }
  ],
  technicalSources: [
    'EMBRAPA Suínos e Aves. Sistema de Produção de Ovos Caipira. Circular Técnica nº 56. 2010.',
    'EMBRAPA Meio Norte. Criação de Galinhas Caipiras para Produção de Ovos. 2018.',
    'Manual de Avicultura Caipira. Associação Brasileira de Avicultura (ABA), 2020.',
    'LOPES, D. C. et al. Nutrição de Aves de Postura. Editora UFV, 2019.',
    'MACARI, M.; GONZALEZ, E. M. Fisiologia das Aves Domésticas. Editora FUNEP, 2015.'
  ]
};
