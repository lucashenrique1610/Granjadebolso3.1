import { KnowledgeModule } from '@/types';

export const classificacaoDeOvos: KnowledgeModule = {
  id: 'classificacao-de-ovos',
  title: 'Classificação e Seleção de Ovos',
  category: 'produção',
  summary: 'A classificação e seleção de ovos são importantes para garantir a qualidade e a comercialização. Este módulo aborda os critérios de classificação (peso, qualidade da casca, albúmen, gema), tipos de ovos e como selecionar ovos para consumo ou incubação.',
  objective: 'Orientar o produtor sobre a classificação e seleção de ovos por peso, qualidade da casca, albúmen e gema, visando melhorar a comercialização e a qualidade do produto para o mercado consumidor ou para incubação.',
  technicalContent: [
    'A classificação e seleção de ovos são essenciais para diferenciar e valorizar o produto, garantindo qualidade e confiança para o consumidor. Os critérios principais são peso, qualidade da casca, albúmen (clara) e gema.',
    '# 1. Classificação por peso: Os ovos são classificados por peso de acordo com normas. As classes comuns são: Extra (≥66g), Grande (60-65g), Média (53-59g), Pequena (46-52g) e Mini (<46g). A classificação por peso pode variar por região ou mercado.',
    '# 2. Qualidade da casca: A casca deve ser intacta (sem trincas ou quebras), limpa (sem sujeira excessiva) e com textura e coloração uniformes. Ovos com trincas, quebras ou sujeira devem ser descartados para consumo fresco.',
    '# 3. Qualidade do albúmen (clara): O albúmen deve ser firme, com consistência e sem manchas ou sangue. A qualidade do albúmen é medida pelo índice de Haugh (um teste que mede a espessura do albúmen em relação ao peso do ovo).',
    '# 4. Qualidade da gema: A gema deve ser centrada, de cor amarela/laranja uniforme (dependendo da ração), sem manchas de sangue ou carne, e firme.',
    '# 5. Classificação por qualidade: Combinando os critérios acima, os ovos são classificados em categorias como "Tipo A" (qualidade superior: casca intacta e limpa, albúmen firme, gema centrada) e outras categorias inferiores, dependendo do mercado.',
    '# 6. Ovos para incubação: Se o objetivo for incubar os ovos (reprodução), os critérios são mais rigorosos: peso ideal para a linhagem (geralmente entre 52 a 65g), casca intacta e de boa qualidade, forma oval normal, sem trincas, e armazenados corretamente (temperatura 12-18°C, ponta arredondada para cima) por até 7 a 10 dias antes da incubação.',
    '# 7. Seleção para consumo: Para consumo, os ovos devem ter casca intacta e limpa, albúmen e gema de boa qualidade, sem manchas ou defeitos.',
    '# 8. Descarte de ovos: Ovos quebrados, muito sujos, com trincas, manchas de sangue ou carne, defeituosos (forma estranha, casca muito fraca) devem ser descartados ou usados para outros fins (não para consumo fresco ou incubação).',
    '# 9. Higiene na classificação: Sempre lave as mãos antes de manipular os ovos. Use equipamentos limpos e adequados para classificar e embalar os ovos.',
    '# 10. Embalagem: Os ovos classificados devem ser embalados em caixas ou embalagens limpas e adequadas, com a ponta arredondada para cima, para manter a qualidade durante o armazenamento e transporte.'
  ],
  importantParameters: [
    {
      name: 'Peso ovo Extra',
      unit: 'g',
      idealValue: '≥66',
      minValue: '66',
      maxValue: '90+',
      description: 'Peso mínimo para classe Extra (varia por mercado).'
    },
    {
      name: 'Peso ovo Grande',
      unit: 'g',
      idealValue: '60 a 65',
      minValue: '60',
      maxValue: '65',
      description: 'Faixa de peso para classe Grande.'
    },
    {
      name: 'Peso ovo Média',
      unit: 'g',
      idealValue: '53 a 59',
      minValue: '53',
      maxValue: '59',
      description: 'Faixa de peso para classe Média.'
    },
    {
      name: 'Peso ideal para incubação',
      unit: 'g',
      idealValue: '52 a 65',
      minValue: '50',
      maxValue: '68',
      description: 'Faixa de peso ideal para ovos de incubação (varia por linhagem).'
    },
    {
      name: 'Período máximo de armazenamento para incubação',
      unit: 'dias',
      idealValue: '≤7',
      minValue: '1',
      maxValue: '10',
      description: 'Período máximo recomendado para armazenar ovos antes da incubação.'
    }
  ],
  bestPractices: [
    'Lavar as mãos antes de manipular os ovos.',
    'Classificar os ovos logo após a coleta.',
    'Usar equipamentos limpos para classificação.',
    'Classificar por peso e qualidade da casca, albúmen e gema.',
    'Descartar ovos quebrados, trincados, muito sujos ou defeituosos.',
    'Para incubação, selecionar ovos de peso e forma adequados.',
    'Armazenar ovos classificados com ponta arredondada para cima.',
    'Manter embalagens e equipamentos limpos.',
    'Registrar a classificação para controle de qualidade.',
    'Ajustar a classificação conforme o mercado alvo.'
  ],
  commonProblems: [
    {
      problem: 'Muitos ovos com casca suja',
      possibleCauses: [
        'Ninhos sujos',
        'Cama suja',
        'Coleta infrequente',
        'Ovos postos no chão'
      ],
      recommendedSolutions: [
        'Limpar ninhos regularmente',
        'Trocar cama periodicamente',
        'Coletar ovos mais vezes por dia',
        'Garantir ninhos adequados'
      ]
    },
    {
      problem: 'Muitos ovos quebrados ou trincados',
      possibleCauses: [
        'Ninhos inadequados ou em número insuficiente',
        'Coleta infrequente',
        'Cama ou chão duro',
        'Manuseio inadequado'
      ],
      recommendedSolutions: [
        'Melhorar ninhos (número e qualidade)',
        'Aumentar frequência de coleta',
        'Melhorar cama ou chão',
        'Manusear ovos com cuidado'
      ]
    },
    {
      problem: 'Ovos com manchas de sangue ou carne',
      possibleCauses: [
        'Genética',
        'Estresse nas aves',
        'Nutrição inadequada',
        'Idade avançada'
      ],
      recommendedSolutions: [
        'Selecionar linhagens com menor incidência',
        'Reduzir estresse',
        'Verificar nutrição',
        'Descartar aves com problema frequente'
      ]
    },
    {
      problem: 'Ovos muito variáveis no peso',
      possibleCauses: [
        'Lote com aves de idades diferentes',
        'Nutrição inadequada',
        'Sanidade inadequada'
      ],
      recommendedSolutions: [
        'Manter lotes uniformes na idade',
        'Melhorar nutrição',
        'Verificar sanidade'
      ]
    }
  ],
  commonMistakes: [
    'Manipular ovos sem lavar as mãos.',
    'Classificar ovos com sujeira ou trincas como aptos para consumo.',
    'Não classificar por peso.',
    'Armazenar ovos com ponta pontuda para cima.',
    'Usar equipamentos sujos para classificação.',
    'Manusear ovos com cuidado insuficiente.',
    'Não selecionar ovos adequados para incubação.',
    'Não manter registros de classificação.'
  ],
  managementChecklist: [
    { item: 'Lavar as mãos antes de manipular os ovos', frequency: 'Antes da coleta/classificação', responsible: 'Produtor', critical: true },
    { item: 'Selecionar/separar ovos quebrados, trincados e muito sujos', frequency: 'Após cada coleta', responsible: 'Produtor', critical: true },
    { item: 'Classificar os ovos por peso', frequency: 'Diário', responsible: 'Produtor', critical: false },
    { item: 'Armazenar ovos com ponta arredondada para cima', frequency: 'Após classificação', responsible: 'Produtor', critical: true },
    { item: 'Verificar qualidade do albúmen e gema (amostragem)', frequency: 'Semanal', responsible: 'Produtor', critical: false }
  ],
  intelligentRules: [
    {
      rule: 'Se proporção de ovos quebrados ou trincados for >10%, verificar ninhos, coleta e manuseio',
      condition: 'Muitos ovos quebrados',
      action: '1. Verificar ninhos (número e qualidade)\n2. Aumentar frequência de coleta\n3. Verificar manejo e manuseio',
      priority: 'alta'
    },
    {
      rule: 'Se for incubar, só usar ovos de 52 a 65g e <7 dias de armazenamento',
      condition: 'Incubação',
      action: '1. Selecionar ovos de peso ideal\n2. Verificar período de armazenamento\n3. Garantir armazenamento adequado',
      priority: 'alta'
    }
  ],
  technicalSources: [
    'Embrapa Suínos e Aves — Qualidade e Classificação de Ovos. Circular Técnica, 2018.',
    'Instituto Brasileiro de Geografia e Estatística (IBGE) — Normas de Classificação de Ovos (quando aplicável).',
    'Associação Brasileira de Avicultura (ABA) — Manual de Qualidade de Ovos, 2020.',
    'LOPES, D. C. et al. Nutrição e Manejo de Aves de Postura. Editora UFV, 2019.',
    'MACIEL, R. P. et al. Produção Alternativa de Aves. Editora UFV, 2020.'
  ]
};
