import { KnowledgeModule } from '@/types';

export const prePostura: KnowledgeModule = {
  id: 'pre-postura',
  title: 'Pré-Postura de Galinhas de Postura Caipira (17 a 22 semanas)',
  category: 'produção',
  summary: 'A fase de pré-postura é o período de transição entre a recria e o início da produção de ovos. Nesta etapa ocorre a maturação do sistema reprodutivo das aves, aumento das necessidades nutricionais e preparação para o ciclo produtivo. Um manejo adequado garante que as futuras poedeiras iniciem a postura com boa condição corporal e maior potencial produtivo.',
  objective: 'Orientar o produtor sobre os cuidados necessários durante a pré-postura, preparando as aves para o início da produção de ovos através de manejo nutricional, ambiental e sanitário adequado.',
  technicalContent: [
    'A pré-postura ocorre geralmente entre 17 e 22 semanas de idade, podendo variar conforme a genética, alimentação e sistema de criação.',
    'Durante esse período acontecem mudanças importantes: desenvolvimento dos órgãos reprodutivos, crescimento dos ovários, aumento da demanda por minerais, preparação para formação dos primeiros ovos e mudança gradual do comportamento das aves.',
    'O objetivo principal dessa fase é preparar uma ave equilibrada, sem excesso ou falta de peso, capaz de iniciar a produção de forma saudável.',
    'Uma preparação inadequada pode causar: atraso no início da postura, ovos pequenos, problemas de casca, baixa persistência produtiva e maior ocorrência de problemas metabólicos.',
    '# 1. Desenvolvimento da ave na pré-postura: Nesta fase o produtor deve acompanhar: peso corporal, tamanho da ave, uniformidade do lote, desenvolvimento da crista e características de maturidade e comportamento. A ave deve apresentar: bom desenvolvimento corporal, estrutura óssea adequada, boa condição de penas e ausência de sinais de doença.',
    '# 2. Alimentação na pré-postura: A alimentação deve preparar a ave para a produção. Nesta fase ocorre uma mudança gradual das necessidades nutricionais. A dieta deve fornecer: proteína adequada, energia equilibrada, cálcio em níveis apropriados, fósforo, vitaminas e minerais. O cálcio merece atenção porque a ave começará a utilizar grandes quantidades para formação da casca dos ovos. Entretanto, o excesso ou fornecimento inadequado de nutrientes pode prejudicar o desenvolvimento. A mudança de ração deve ser realizada de forma gradual para evitar estresse.',
    '# 3. Preparação para a produção de ovos: Antes do início da postura o produtor deve preparar: ninhos, local de coleta, rotina de manejo, iluminação quando utilizada e registros de produção. A ave deve aprender o ambiente onde realizará a postura.',
    '# 4. Manejo da iluminação: A luz influencia o ciclo reprodutivo das aves. O produtor deve evitar alterações bruscas no programa de iluminação. Mudanças inadequadas podem causar: atraso na postura, queda de produção e estresse. A utilização de iluminação artificial deve seguir orientação técnica conforme o sistema adotado.',
    '# 5. Preparação dos ninhos: Os ninhos devem estar disponíveis antes do início da postura. Características importantes: local tranquilo, protegido, limpo, confortável e com material adequado. Ninhos inadequados podem causar: ovos no chão, ovos sujos e perdas de qualidade.',
    '# 6. Manejo sanitário: A prevenção continua sendo essencial. Nesta fase realizar: acompanhamento do programa de vacinação, observação diária das aves, controle de parasitas e manutenção da higiene. A entrada na postura com problemas sanitários reduz o desempenho do lote.',
    '# 7. Transição para a postura: A transição deve ser planejada. O produtor deve observar: primeiros sinais de produção, aumento do consumo, comportamento das aves e qualidade dos primeiros ovos. O início da postura é um momento de grande exigência fisiológica.'
  ],
  importantParameters: [
    {
      name: 'Idade da fase',
      unit: 'semanas',
      idealValue: '17 a 22',
      minValue: '17',
      maxValue: '22',
      description: 'Período de preparação para produção.'
    },
    {
      name: 'Início esperado da postura',
      unit: 'semanas',
      idealValue: '18 a 24',
      minValue: '18',
      maxValue: '24',
      description: 'Pode variar conforme linhagem e manejo.'
    },
    {
      name: 'Proteína na ração de pré-postura',
      unit: '%',
      idealValue: '16 a 18',
      minValue: '15',
      maxValue: '19',
      description: 'Teor de proteína ideal para transição.'
    },
    {
      name: 'Cálcio na ração de pré-postura',
      unit: '%',
      idealValue: '2 a 3 (aumentar gradual)',
      minValue: '1.8',
      maxValue: '3.5',
      description: 'Preparação para produção de casca de ovo.'
    },
    {
      name: 'Densidade no galpão',
      unit: 'aves/m²',
      idealValue: '8 a 10',
      minValue: '7',
      maxValue: '12',
      description: 'Densidade de lotação recomendada.'
    },
    {
      name: 'Ninhos por ave',
      unit: 'ninhos/aves',
      idealValue: '1 para 4-5',
      minValue: '1 para 4',
      maxValue: '1 para 6',
      description: 'Quantidade de ninhos para evitar ovos no chão.'
    },
    {
      name: 'Uniformidade do lote',
      unit: '%',
      idealValue: '>85',
      minValue: '75',
      maxValue: '100',
      description: 'Percentual de aves dentro de 10% do peso médio.'
    },
    {
      name: 'Mortalidade aceitável na pré-postura',
      unit: '%',
      idealValue: '<1',
      minValue: '0',
      maxValue: '2',
      description: 'Mortalidade máxima aceitável durante a pré-postura.'
    }
  ],
  bestPractices: [
    'Preparar ninhos antecipadamente (antes do primeiro ovo).',
    'Fazer transição alimentar gradual (5-7 dias).',
    'Acompanhar peso das aves semanalmente.',
    'Manter água limpa e fresca à vontade.',
    'Garantir ambiente tranquilo e sem estresse.',
    'Observar primeiros sinais de postura diariamente.',
    'Registrar início da produção e dados do lote.',
    'Manter controle sanitário preventivo.',
    'Evitar mudanças bruscas no ambiente ou manejo.',
    'Garantir espaço adequado e ventilação boa.'
  ],
  commonProblems: [
    {
      problem: 'Aves atrasam o início da postura',
      possibleCauses: [
        'Baixo desenvolvimento corporal',
        'Alimentação inadequada',
        'Estresse',
        'Problemas sanitários',
        'Iluminação inadequada'
      ],
      recommendedSolutions: [
        'Avaliar peso e desenvolvimento das aves',
        'Revisar alimentação e nutrição',
        'Verificar condições ambientais',
        'Investigar saúde das aves',
        'Ajustar programa de iluminação, se aplicável'
      ]
    },
    {
      problem: 'Primeiros ovos muito pequenos',
      possibleCauses: [
        'Início precoce da postura',
        'Genética da linhagem',
        'Desenvolvimento inadequado na recria',
        'Nutrição inadequada'
      ],
      recommendedSolutions: [
        'Avaliar condição corporal e peso das aves',
        'Revisar manejo da fase de recria',
        'Ajustar alimentação se necessário',
        'Acompanhar evolução da produção'
      ]
    },
    {
      problem: 'Muitos ovos no chão',
      possibleCauses: [
        'Falta de ninhos',
        'Ninhos inadequados (localização, conforto)',
        'Falta de adaptação das aves aos ninhos',
        'Densidade excessiva'
      ],
      recommendedSolutions: [
        'Disponibilizar ninhos adequados em quantidade',
        'Melhorar localização e conforto dos ninhos',
        'Estimular uso correto dos ninhos',
        'Reduzir densidade de lotação se necessário'
      ]
    },
    {
      problem: 'Casca de ovo fraca ou fina no início da postura',
      possibleCauses: [
        'Deficiência de cálcio',
        'Deficiência de fósforo ou vitamina D',
        'Problemas nutricionais',
        'Dieta inadequada'
      ],
      recommendedSolutions: [
        'Revisar alimentação e níveis minerais',
        'Avaliar fornecimento de cálcio e vitamina D',
        'Garantir ração adequada para a fase',
        'Acompanhar qualidade dos ovos regularmente'
      ]
    }
  ],
  commonMistakes: [
    'Não preparar os ninhos antes do início da postura.',
    'Trocar alimentação de forma brusca (sem transição).',
    'Não acompanhar desenvolvimento e peso das aves.',
    'Ignorar uniformidade do lote.',
    'Expor aves a mudanças constantes no ambiente ou manejo.',
    'Não registrar início da produção e dados importantes.',
    'Não realizar manejo preventivo sanitário.',
    'Fornecer cálcio excessivamente cedo ou em excesso.',
    'Negligenciar a qualidade da água e limpeza dos bebedouros.'
  ],
  managementChecklist: [
    { item: 'Conferir água limpa e fresca', frequency: 'Diário', responsible: 'Produtor', critical: true },
    { item: 'Conferir ração disponível e adequada', frequency: 'Diário', responsible: 'Produtor', critical: true },
    { item: 'Observar comportamento das aves', frequency: 'Diário', responsible: 'Produtor', critical: true },
    { item: 'Avaliar sinais de início da postura', frequency: 'Diário', responsible: 'Produtor', critical: true },
    { item: 'Verificar peso e desenvolvimento das aves', frequency: 'Semanal', responsible: 'Produtor', critical: true },
    { item: 'Conferir condições dos ninhos', frequency: 'Semanal', responsible: 'Produtor', critical: true },
    { item: 'Avaliar condições das instalações', frequency: 'Semanal', responsible: 'Produtor', critical: false },
    { item: 'Revisar condições sanitárias', frequency: 'Semanal', responsible: 'Produtor', critical: true },
    { item: 'Garantir que ninhos estejam preparados', frequency: 'Antes da postura', responsible: 'Produtor', critical: true },
    { item: 'Garantir alimentação ajustada para a fase', frequency: 'Antes da postura', responsible: 'Produtor', critical: true },
    { item: 'Organizar registros de produção', frequency: 'Antes da postura', responsible: 'Produtor', critical: false },
    { item: 'Definir rotina de manejo da postura', frequency: 'Antes da postura', responsible: 'Produtor', critical: false }
  ],
  intelligentRules: [
    {
      rule: 'Se aves próximas de 20 semanas e não apresentam sinais de preparação para postura, avaliar desenvolvimento corporal, genética e alimentação',
      condition: 'Idade ~20 semanas E sem sinais de preparação para postura',
      action: '1. Verificar peso e desenvolvimento das aves\n2. Revisar programa alimentar\n3. Verificar linhagem e expectativa de início de postura\n4. Avaliar condições sanitárias e ambientais',
      priority: 'alta'
    },
    {
      rule: 'Se primeiros ovos apresentam casca fina ou fraca, avaliar cálcio, minerais, vitamina D e manejo nutricional',
      condition: 'Primeiros ovos com casca fina/fraca',
      action: '1. Revisar níveis de cálcio e fósforo na ração\n2. Verificar fornecimento de vitamina D\n3. Avaliar qualidade da ração\n4. Acompanhar evolução da qualidade da casca',
      priority: 'alta'
    },
    {
      rule: 'Se muitos ovos aparecem fora dos ninhos, avaliar quantidade, localização e conforto dos ninhos',
      condition: '>10% dos ovos no chão',
      action: '1. Verificar quantidade de ninhos (1 para 4-5 aves)\n2. Avaliar localização e conforto dos ninhos\n3. Limpar e preparar ninhos adequadamente\n4. Reduzir densidade se necessário',
      priority: 'alta'
    },
    {
      rule: 'Se produção iniciar abaixo do esperado, analisar idade, linhagem, alimentação, ambiente e sanidade',
      condition: 'Início da postura abaixo do esperado para a linhagem',
      action: '1. Verificar idade e linhagem das aves\n2. Revisar alimentação e nutrição\n3. Avaliar condições ambientais\n4. Investigar possíveis problemas sanitários',
      priority: 'alta'
    }
  ],
  technicalSources: [
    'Embrapa Suínos e Aves — Produção e manejo de aves de postura.',
    'Embrapa Meio-Norte — Criação de galinhas caipiras.',
    'Universidade Federal de Viçosa (UFV) — Avicultura e nutrição de aves.',
    'Manuais técnicos de manejo de poedeiras.',
    'Literatura científica sobre fisiologia e produção de aves.'
  ]
};
