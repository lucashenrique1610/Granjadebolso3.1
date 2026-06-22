import { KnowledgeModule } from '@/types';

export const recria: KnowledgeModule = {
  id: 'recria',
  title: 'Recria de Galinhas de Postura Caipira (7 a 16 semanas)',
  category: 'produção',
  summary: 'A fase de recria corresponde ao período entre aproximadamente 7 e 16 semanas de idade. Nesta etapa, as aves desenvolvem estrutura corporal, músculos, ossos, penas e órgãos importantes para a futura produção de ovos. O objetivo principal é formar uma poedeira saudável, uniforme e preparada para iniciar a postura.',
  objective: 'Orientar o produtor sobre o manejo correto das aves durante a recria, garantindo desenvolvimento adequado, controle de peso, uniformidade do lote e preparação para a fase de pré-postura.',
  technicalContent: [
    'A recria é uma fase de desenvolvimento intermediária entre a criação inicial dos pintinhos e a entrada na produção de ovos.',
    'Durante esse período a ave passa por importantes mudanças: crescimento corporal acelerado, desenvolvimento muscular, formação da estrutura óssea, troca e crescimento das penas e desenvolvimento dos órgãos reprodutivos.',
    'O principal objetivo da recria não é produzir ovos, mas preparar uma ave saudável para apresentar bom desempenho na postura.',
    'Uma ave mal recriada pode apresentar: atraso no início da postura, ovos menores, baixa produção, maior sensibilidade a doenças e dificuldade de atingir o potencial genético.',
    '# 1. Desenvolvimento corporal: O acompanhamento do crescimento é fundamental. O produtor deve observar: peso corporal, tamanho da ave, uniformidade do lote, condição das penas e comportamento. A uniformidade significa que a maioria das aves apresenta desenvolvimento semelhante. Lotes desuniformes indicam possíveis problemas como: competição por alimento, espaço inadequado, problemas sanitários ou alimentação incorreta.',
    '# 2. Alimentação na recria: A alimentação deve acompanhar as necessidades da fase. O objetivo é fornecer nutrientes para: crescimento, formação óssea, desenvolvimento muscular e preparação para postura. A dieta deve conter: proteína adequada, energia equilibrada, minerais e vitaminas. É importante evitar excesso de energia, pois pode causar: aves com excesso de gordura, problemas no início da postura e redução do desempenho produtivo.',
    '# 3. Manejo da água: A água continua sendo essencial. Deve estar disponível: limpa, fresca e sem contaminação. Cuidados: limpar bebedouros, observar consumo, evitar falta de água. Redução no consumo de água pode indicar: problema ambiental, doença ou alteração no manejo.',
    '# 4. Instalações durante a recria: As aves precisam de espaço suficiente para se desenvolver. O ambiente deve oferecer: boa ventilação, proteção contra chuva, proteção contra predadores, área seca e espaço para movimentação. No sistema caipira, o acesso aos piquetes pode estimular: comportamento natural, atividade física e melhor adaptação ao ambiente.',
    '# 5. Manejo dos piquetes: O piquete deve ser planejado. Boas práticas: oferecer sombra, evitar excesso de lotação, permitir recuperação da vegetação e realizar rotação quando possível. O manejo inadequado pode causar: desgaste do solo, aumento de parasitas e contaminação.',
    '# 6. Controle sanitário: A prevenção continua sendo prioridade. Medidas importantes: seguir programa de vacinação, controlar parasitas, manter higiene e observar sinais de doença. Durante a recria, problemas sanitários podem comprometer toda a vida produtiva.',
    '# 7. Preparação para a pré-postura: Ao final da recria a ave deve estar preparada para iniciar a produção. Avaliar: peso corporal, desenvolvimento, saúde e uniformidade. A transição para pré-postura deve ser planejada.'
  ],
  importantParameters: [
    {
      name: 'Idade da fase',
      unit: 'semanas',
      idealValue: '7 a 16',
      minValue: '7',
      maxValue: '16',
      description: 'Período de crescimento e preparação para postura.'
    },
    {
      name: 'Peso ideal ao final da recria',
      unit: 'g',
      idealValue: '1200 a 1500',
      minValue: '1100',
      maxValue: '1600',
      description: 'Peso corporal recomendado ao final da recria para linhagens caipiras de postura (varia por linhagem).'
    },
    {
      name: 'Proteína na ração de recria',
      unit: '%',
      idealValue: '15 a 18',
      minValue: '14',
      maxValue: '19',
      description: 'Teor de proteína ideal na ração de recria.'
    },
    {
      name: 'Densidade no galpão',
      unit: 'aves/m²',
      idealValue: '10 a 12',
      minValue: '8',
      maxValue: '14',
      description: 'Densidade de lotação recomendada na fase de recria.'
    },
    {
      name: 'Uniformidade do lote',
      unit: '%',
      idealValue: '>85',
      minValue: '75',
      maxValue: '100',
      description: 'Percentual de aves dentro de 10% do peso médio do lote.'
    },
    {
      name: 'Mortalidade aceitável na recria',
      unit: '%',
      idealValue: '<3',
      minValue: '0',
      maxValue: '5',
      description: 'Mortalidade total máxima aceitável durante a recria (7 a 16 semanas).'
    }
  ],
  bestPractices: [
    'Acompanhar crescimento das aves (peso semanal).',
    'Evitar superlotação.',
    'Garantir alimentação adequada para a fase.',
    'Manter água limpa e fresca à vontade.',
    'Fazer controle sanitário preventivo (vacinação, vermifugação).',
    'Fornecer ambiente seguro, limpo e ventilado.',
    'Garantir acesso ao piquete no sistema caipira.',
    'Realizar rotação de piquetes para recuperação da vegetação.',
    'Registrar informações do lote (peso, consumo, mortalidade).',
    'Planejar a transição para a fase de pré-postura.'
  ],
  commonProblems: [
    {
      problem: 'Aves pequenas ou com crescimento atrasado',
      possibleCauses: [
        'Baixa qualidade da alimentação',
        'Competição por alimento',
        'Doenças',
        'Falta de água',
        'Densidade excessiva'
      ],
      recommendedSolutions: [
        'Avaliar consumo de ração',
        'Verificar uniformidade do lote',
        'Revisar manejo alimentar e qualidade da ração',
        'Investigar problemas sanitários',
        'Reduzir densidade de lotação'
      ]
    },
    {
      problem: 'Lote desuniforme',
      possibleCauses: [
        'Diferenças de acesso à ração',
        'Excesso de aves por espaço',
        'Problemas de manejo',
        'Aves com idade muito diferentes misturadas'
      ],
      recommendedSolutions: [
        'Ajustar equipamentos (comedouros e bebedouros)',
        'Melhorar distribuição de alimento',
        'Separação de aves por tamanho/desenvolvimento quando necessário',
        'Reduzir densidade de lotação'
      ]
    },
    {
      problem: 'Aves com excesso de gordura',
      possibleCauses: [
        'Excesso de energia na dieta',
        'Falta de atividade física',
        'Ração inadequada'
      ],
      recommendedSolutions: [
        'Revisar a alimentação (reduzir energia se necessário)',
        'Melhorar manejo do ambiente (aumentar espaço/atividade)',
        'Garantir acesso ao piquete'
      ]
    },
    {
      problem: 'Alta ocorrência de parasitas',
      possibleCauses: [
        'Piquete contaminado',
        'Falta de rotação de piquetes',
        'Higiene inadequada',
        'Falta de controle preventivo'
      ],
      recommendedSolutions: [
        'Melhorar manejo dos piquetes',
        'Realizar rotação de área',
        'Melhorar limpeza das instalações',
        'Consultar veterinário para controle adequado'
      ]
    }
  ],
  commonMistakes: [
    'Tratar recria como uma fase sem importância.',
    'Não acompanhar peso das aves regularmente.',
    'Fornecer alimentação inadequada (usar ração errada para a fase).',
    'Misturar aves com grande diferença de idade.',
    'Ignorar falta de uniformidade do lote.',
    'Não preparar a transição para a fase de pré-postura.',
    'Negligenciar o controle sanitário.',
    'Superlotar o galpão ou piquetes.',
    'Não fornecer espaço suficiente para o desenvolvimento.'
  ],
  managementChecklist: [
    { item: 'Conferir água limpa e fresca', frequency: 'Diário', responsible: 'Produtor', critical: true },
    { item: 'Conferir ração disponível e adequada', frequency: 'Diário', responsible: 'Produtor', critical: true },
    { item: 'Observar comportamento das aves', frequency: 'Diário', responsible: 'Produtor', critical: true },
    { item: 'Verificar sinais de doença', frequency: 'Diário', responsible: 'Produtor', critical: true },
    { item: 'Avaliar crescimento/peso do lote', frequency: 'Semanal', responsible: 'Produtor', critical: true },
    { item: 'Conferir condições das instalações', frequency: 'Semanal', responsible: 'Produtor', critical: false },
    { item: 'Observar condição das penas', frequency: 'Semanal', responsible: 'Produtor', critical: false },
    { item: 'Avaliar condições dos piquetes', frequency: 'Semanal', responsible: 'Produtor', critical: false },
    { item: 'Conferir desenvolvimento corporal ao final da recria', frequency: 'Final da recria', responsible: 'Produtor', critical: true },
    { item: 'Avaliar uniformidade do lote ao final da recria', frequency: 'Final da recria', responsible: 'Produtor', critical: true },
    { item: 'Preparar transição para fase de pré-postura', frequency: 'Final da recria', responsible: 'Produtor', critical: true }
  ],
  intelligentRules: [
    {
      rule: 'Se aves entre 7 e 16 semanas e peso abaixo do esperado, avaliar alimentação, água, sanidade e competição no lote',
      condition: 'Idade 7-16 semanas E peso < esperado',
      action: '1. Verificar qualidade e disponibilidade da ração\n2. Verificar disponibilidade e qualidade da água\n3. Avaliar sinais de doença\n4. Verificar densidade de lotação e competição por alimento',
      priority: 'alta'
    },
    {
      rule: 'Se lote apresentar grande diferença de tamanho (uniformidade baixa), avaliar distribuição de alimento, espaço e manejo',
      condition: 'Uniformidade < 80%',
      action: '1. Verificar quantidade e distribuição de comedouros e bebedouros\n2. Ajustar densidade de lotação\n3. Considerar separar aves por tamanho se necessário',
      priority: 'alta'
    },
    {
      rule: 'Se aves próximas da postura (14-16 semanas) e desenvolvimento inadequado, orientar revisão da preparação para pré-postura',
      condition: 'Idade 14-16 semanas E desenvolvimento inadequado',
      action: '1. Reavaliar programa alimentar\n2. Verificar preparação para transição de ração\n3. Acompanhar peso e desenvolvimento próximos dias',
      priority: 'alta'
    },
    {
      rule: 'Se piquete apresentar excesso de lama ou contaminação, recomendar melhoria da drenagem e manejo de rotação',
      condition: 'Piquete com lama ou contaminação excessiva',
      action: '1. Melhorar drenagem da área\n2. Realizar rotação de piquetes\n3. Limpar ou trocar área se necessário',
      priority: 'média'
    }
  ],
  technicalSources: [
    'Embrapa Suínos e Aves — Manejo e produção de aves.',
    'Embrapa Meio-Norte — Sistemas de criação de galinhas caipiras.',
    'Universidade Federal de Viçosa (UFV) — Avicultura e nutrição de aves.',
    'Literatura técnica sobre recria e desenvolvimento de poedeiras.',
    'Publicações científicas sobre manejo de aves de postura.'
  ]
};
