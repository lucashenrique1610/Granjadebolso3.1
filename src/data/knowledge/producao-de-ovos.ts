import { KnowledgeModule } from '@/types';

export const producaoDeOvos: KnowledgeModule = {
  id: 'producao-de-ovos',
  title: 'Produção de Ovos em Galinhas de Postura Caipira',
  category: 'produção',
  summary: 'A produção de ovos é o principal objetivo da granja de postura. Este módulo aborda o manejo da postura, fatores que influenciam a produção, coleta, armazenamento e qualidade dos ovos, visando maximizar a produtividade e a rentabilidade.',
  objective: 'Orientar o produtor sobre o manejo adequado para maximizar a produção de ovos de qualidade, abordando fatores como nutrição, ambiente, manejo do lote, coleta, armazenamento e solução de problemas comuns.',
  technicalContent: [
    'A produção de ovos é o resultado de um bom manejo: nutrição, ambiente, sanidade, genética e manejo diário adequados são fundamentais para atingir e manter boas taxas de postura.',
    '# 1. Fase de pré-postura: É o período de 17 a 22 semanas, quando as aves estão se preparando para começar a postura. Durante esta fase, é importante ajustar a ração para aumento gradual de cálcio, garantir espaço adequado e acostumar as aves ao ambiente final.',
    '# 2. Início da postura: As galinhas de postura caipira geralmente começam a botar entre 20 e 24 semanas de idade (varia por linhagem e manejo). O início da postura deve ser gradual, com aumento da luz natural ou artificial para 14 a 16 horas de luz por dia.',
    '# 3. Pico de postura: O pico de produção geralmente acontece entre 30 e 40 semanas de idade, com taxas de postura ideais entre 70% a 85% (varia por linhagem e sistema). Após o pico, há uma queda gradual de produção (cerca de 1 a 2% por mês).',
    '# 4. Nutrição para postura: A ração de postura deve ter níveis adequados de proteína (16 a 18%), cálcio (3,5 a 4,5%), fósforo, vitaminas e minerais. A água deve ser sempre limpa e à vontade, pois a falta de água reduz rapidamente a produção de ovos.',
    '# 5. Ambiente de criação: O ambiente é crucial: temperatura ideal entre 15 e 25°C (evitar temperaturas acima de 30°C), ventilação adequada (sem correntes de ar), espaço por ave (mínimo 400 a 500 cm² por ave, dependendo do sistema), e iluminação de 14 a 16 horas por dia (com intensidade suficiente).',
    '# 6. Ninhos: Devem ser fornecidos ninhos adequados (um ninho para cada 4 a 5 aves). Os ninhos devem ser limpos, confortáveis, escuros e em local seguro. Isso ajuda a reduzir ovos quebrados e ovos postos no chão.',
    '# 7. Coleta de ovos: A coleta deve ser feita regularmente, no mínimo 2 a 3 vezes por dia. Isso reduz quebras, sujeira e risco de contaminação. Sempre lave as mãos antes de coletar os ovos.',
    '# 8. Seleção e limpeza de ovos: Após a coleta, selecione os ovos (descarte os quebrados, sujos, deformados ou muito pequenos). Se for limpar, use água morna e escova suave, sem produtos químicos (a menos que orientado).',
    '# 9. Armazenamento de ovos: Os ovos devem ser armazenados em local fresco (10 a 15°C), com umidade relativa de 70 a 80%. Coloque os ovos com a ponta arredondada para cima (para manter a qualidade do albúmen e da gema).',
    '# 10. Manejo do lote em postura: Evite mudanças bruscas no ambiente, ração ou manejo, pois o estresse reduz a postura. Monitore o consumo de ração e água, a mortalidade e a produção diariamente.',
    '# 11. Descarte de aves não produtoras: Periodicamente, identifique e descarte aves que não estão botando (aves com crista pálida, abdômen pequeno, cloaca seca). Isso ajuda a reduzir custos com ração e espaço.'
  ],
  importantParameters: [
    {
      name: 'Idade de início da postura',
      unit: 'semanas',
      idealValue: '20 a 24',
      minValue: '18',
      maxValue: '26',
      description: 'Idade ideal para o início da postura (varia por linhagem).'
    },
    {
      name: 'Taxa de postura no pico',
      unit: '%',
      idealValue: '70 a 85',
      minValue: '60',
      maxValue: '90',
      description: 'Taxa de produção ideal no pico de postura (varia por linhagem e sistema).'
    },
    {
      name: 'Horas de luz por dia (postura)',
      unit: 'horas',
      idealValue: '14 a 16',
      minValue: '13',
      maxValue: '17',
      description: 'Duração ideal de iluminação por dia para manter a postura.'
    },
    {
      name: 'Temperatura ideal do galpão',
      unit: '°C',
      idealValue: '15 a 25',
      minValue: '10',
      maxValue: '30',
      description: 'Faixa de temperatura ideal para postura.'
    },
    {
      name: 'Ninhos por ave',
      unit: 'ninhos/ave',
      idealValue: '1/4 a 1/5',
      minValue: '1/6',
      maxValue: '1/3',
      description: 'Número ideal de ninhos por ave (1 ninho para 4-5 aves).'
    },
    {
      name: 'Temperatura de armazenamento de ovos',
      unit: '°C',
      idealValue: '10 a 15',
      minValue: '7',
      maxValue: '18',
      description: 'Temperatura ideal para armazenamento de ovos frescos.'
    }
  ],
  bestPractices: [
    'Garantir ração de postura balanceada e à vontade.',
    'Manter água limpa e disponível 24h/dia.',
    'Fornecer 14 a 16 horas de luz por dia.',
    'Manter temperatura do galpão entre 15 e 25°C.',
    'Ventilar adequadamente (sem correntes de ar).',
    'Fornecer ninhos limpos e adequados.',
    'Coletar ovos 2 a 3 vezes por dia.',
    'Selecionar e limpar ovos corretamente.',
    'Armazenar ovos com ponta arredondada para cima.',
    'Evitar estresse nas aves (mudanças bruscas).',
    'Monitorar produção diariamente.',
    'Descartar aves não produtoras periodicamente.'
  ],
  commonProblems: [
    {
      problem: 'Baixa taxa de postura',
      possibleCauses: [
        'Nutrição inadequada (deficiência de proteína ou cálcio)',
        'Falta de água',
        'Luz insuficiente (<13h/dia)',
        'Estresse',
        'Doença ou sanidade inadequada',
        'Idade avançada das aves',
        'Temperatura excessiva (>30°C)',
        'Deficiência de espaço'
      ],
      recommendedSolutions: [
        'Verificar ração (qualidade e adequação para fase)',
        'Garantir água limpa e à vontade',
        'Aumentar iluminação para 14-16h/dia',
        'Identificar e eliminar fontes de estresse',
        'Verificar sanidade e consultar veterinário',
        'Melhorar ambiente (temperatura, ventilação, espaço)',
        'Descartar aves não produtoras'
      ]
    },
    {
      problem: 'Muitos ovos quebrados',
      possibleCauses: [
        'Ninhos insuficientes ou inadequados',
        'Coleta de ovos insuficiente',
        'Cama dura ou chão duro',
        'Deficiência de cálcio na ração',
        'Aves com acesso inadequado a ninhos'
      ],
      recommendedSolutions: [
        'Aumentar número de ninhos (1 para 4-5 aves)',
        'Coletar ovos mais frequentemente',
        'Melhorar cama ou chão',
        'Verificar nível de cálcio na ração',
        'Garantir acesso fácil aos ninhos'
      ]
    },
    {
      problem: 'Ovos sujos',
      possibleCauses: [
        'Ninhos sujos',
        'Cama suja',
        'Coleta infrequente',
        'Ovos postos no chão',
        'Limpeza inadequada dos ovos'
      ],
      recommendedSolutions: [
        'Limpar ninhos regularmente',
        'Trocar cama quando estiver suja',
        'Coletar ovos mais vezes por dia',
        'Garantir ninhos adequados para reduzir ovos no chão',
        'Limpar ovos corretamente (se necessário)'
      ]
    },
    {
      problem: 'Ovos com casca fraca ou defeituosa',
      possibleCauses: [
        'Deficiência de cálcio ou fósforo na ração',
        'Deficiência de vitamina D3',
        'Temperatura excessiva',
        'Idade avançada das aves',
        'Estresse'
      ],
      recommendedSolutions: [
        'Verificar nível de cálcio e fósforo na ração',
        'Garantir vitamina D3 adequada',
        'Melhorar temperatura do galpão',
        'Descartar aves mais velhas se o problema persistir',
        'Reduzir estresse'
      ]
    }
  ],
  commonMistakes: [
    'Não ajustar ração na fase pré-postura.',
    'Não fornecer luz suficiente (<13h/dia).',
    'Coletar ovos só uma vez por dia.',
    'Ninhos insuficientes ou sujos.',
    'Armazenar ovos com ponta pontuda para cima.',
    'Não monitorar produção diariamente.',
    'Usar ração inadequada para fase de postura.',
    'Negligenciar a qualidade da água.',
    'Deixar aves não produtoras no lote por muito tempo.',
    'Mudar manejo ou ração de forma brusca.'
  ],
  managementChecklist: [
    { item: 'Verificar água e ração à vontade', frequency: 'Diário', responsible: 'Produtor', critical: true },
    { item: 'Coletar ovos (2 a 3 vezes por dia)', frequency: 'Diário', responsible: 'Produtor', critical: true },
    { item: 'Limpar ninhos e trocar cama do ninho', frequency: 'Semanal', responsible: 'Produtor', critical: true },
    { item: 'Monitorar taxa de postura diária', frequency: 'Diário', responsible: 'Produtor', critical: true },
    { item: 'Verificar iluminação (14-16h/dia)', frequency: 'Diário', responsible: 'Produtor', critical: true },
    { item: 'Verificar temperatura e ventilação do galpão', frequency: 'Diário', responsible: 'Produtor', critical: true },
    { item: 'Selecionar e armazenar ovos corretamente', frequency: 'Diário', responsible: 'Produtor', critical: true },
    { item: 'Descartar aves não produtoras', frequency: 'Mensal', responsible: 'Produtor', critical: false }
  ],
  intelligentRules: [
    {
      rule: 'Se taxa de postura diminuir >10% em 1 semana, verificar ração, água, luz e sanidade',
      condition: 'Queda brusca de produção',
      action: '1. Verificar ração (qualidade, consumo)\n2. Verificar água (disponibilidade, limpeza)\n3. Verificar iluminação (horário e intensidade)\n4. Verificar sanidade e consultar veterinário se necessário',
      priority: 'alta'
    },
    {
      rule: 'Se houver muitos ovos quebrados (>5% por dia), verificar ninhos e cálcio na ração',
      condition: 'Muitos ovos quebrados',
      action: '1. Verificar número e qualidade dos ninhos\n2. Verificar nível de cálcio na ração\n3. Aumentar frequência de coleta',
      priority: 'alta'
    },
    {
      rule: 'Se temperatura do galpão for >30°C, tomar medidas para resfriar',
      condition: 'Temperatura excessiva',
      action: '1. Melhorar ventilação\n2. Fornecer sombra e água fresca\n3. Reduzir densidade se necessário',
      priority: 'alta'
    }
  ],
  technicalSources: [
    'Embrapa Suínos e Aves — Produção de Ovos de Galinha. Circular Técnica, 2018.',
    'Embrapa Meio-Norte — Produção de Ovos em Galinhas Caipiras. 2019.',
    'Manual de Produção de Aves de Postura — Associação Brasileira de Avicultura (ABA), 2020.',
    'MACIEL, R. P. et al. Produção Alternativa de Aves. Editora UFV, 2020.',
    'LOPES, D. C. et al. Nutrição e Manejo de Aves de Postura. Editora UFV, 2019.'
  ]
};
