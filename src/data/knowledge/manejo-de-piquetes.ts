import { KnowledgeModule } from '@/types';

export const manejoDePiquetes: KnowledgeModule = {
  id: 'manejo-de-piquetes',
  title: 'Manejo de Piquetes',
  category: 'manejo',
  summary: 'Manejo adequado de piquetes para galinhas caipiras, incluindo rotação, vegetação, cercamento, sombra e prevenção de parasitas.',
  objective: 'Orientar o produtor sobre como manejar piquetes de forma sustentável, garantindo vegetação saudável, redução de parasitas e bom bem-estar para as galinhas.',
  technicalContent: [
    'Piquetes são essenciais para o sistema semi-intensivo de criação de galinhas caipiras. Proporcionam espaço para ciscar, banho de poeira, alimentação natural e melhor bem-estar.',
    '# 1. Espaçamento: 2 a 3 m² por ave no mínimo. Quanto mais espaço, melhor para a vegetação e as aves.',
    '# 2. Cerca de proteção: Cercar piquetes com tela (1,5 a 2 m de altura) para evitar predadores (cães, gatos, raposas, aves de rapina). Enterrar a tela 30 cm no solo para evitar escavação.',
    '# 3. Rotação de piquetes (pastagem rotacionada): Divida a área em múltiplos piquetes (3 a 6). Rotacione as aves a cada 1-4 semanas para permitir que a vegetação se recupere. Isso reduz parasitas, mantém a grama saudável e evita compactação do solo.',
    '# 4. Vegetação: Mantenha gramíneas e leguminosas adequadas (ex: capim pangola, capim elefante, clover). Evite plantas tóxicas! (ex: samambaia, mamona, erva-de-santa-luzia, oleandro).',
    '# 5. Sombra: Proporcione sombra suficiente (árvores, toldos ou barracas). Aves precisam se proteger do sol forte, especialmente no verão.',
    '# 6. Área de banho de poeira: Proporcione local com areia ou poeira para as aves se banharem (ajuda a controlar ácaros e piolhos).',
    '# 7. Água no piquete: Coloque bebedouros também no piquete para garantir água disponível sempre (não só no galpão).',
    '# 8. Limpeza e desinfecção: Limpe periodicamente o piquete, removendo esterco excessivo. Quando o piquete estiver em descanso, pode espalhar cal para ajudar a controlar parasitas.',
    '# 9. Prevenção de predadores: Além da cerca, coloque telas sobre o piquete (se orçamento permitir) para evitar aves de rapina. Feche as aves no galpão à noite, pois esse é o período de maior risco.',
    '# 10. Recuperação dos piquetes: Durante o período de descanso (sem aves), adube com esterco (compostado!), plant novas gramíneas se necessário e deixe a vegetação recuperar completamente antes de usar novamente.',
  ],
  importantParameters: [
    {
      name: 'Espaço no piquete',
      unit: 'm²/ave',
      idealValue: '2 a 3',
      minValue: '1.5',
      maxValue: '-',
      description: 'Área mínima por ave no piquete (semi-intensivo).'
    },
    {
      name: 'Número de piquetes',
      unit: '-',
      idealValue: '3 a 6',
      minValue: '2',
      maxValue: '-',
      description: 'Número de piquetes para rotação (mais é melhor).'
    },
    {
      name: 'Período em cada piquete',
      unit: 'semanas',
      idealValue: '1 a 4',
      minValue: '1',
      maxValue: '6',
      description: 'Tempo que as aves permanecem em cada piquete antes de rotacionar.'
    },
    {
      name: 'Período de descanso',
      unit: 'semanas',
      idealValue: '4 a 8',
      minValue: '3',
      maxValue: '-',
      description: 'Tempo que o piquete fica em descanso (sem aves) para recuperação.'
    },
    {
      name: 'Altura da cerca',
      unit: 'm',
      idealValue: '1.5 a 2',
      minValue: '1.2',
      maxValue: '-',
      description: 'Altura mínima da cerca de proteção.'
    },
    {
      name: 'Enterramento da tela',
      unit: 'cm',
      idealValue: '30',
      minValue: '20',
      maxValue: '-',
      description: 'Profundidade de enterramento da tela para evitar escavação de predadores.'
    },
  ],
  bestPractices: [
    'Divida a área em múltiplos piquetes para rotação.',
    'Rotacione as aves regularmente para preservar a vegetação.',
    'Cercar com tela de 1,5-2 m de altura, enterrada 30 cm no solo.',
    'Mantenha vegetação adequada (gramíneas, leguminosas).',
    'Garanta sombra suficiente (árvores ou toldos).',
    'Proporcione área para banho de poeira.',
    'Coloque bebedouros também no piquete.',
    'Feche as aves no galpão à noite para evitar predadores.',
    'Evite plantas tóxicas nos piquetes.',
    'Limpe e desinfete piquetes durante o período de descanso.',
    'Adube piquetes com esterco compostado durante o descanso.',
  ],
  commonProblems: [
    {
      problem: 'Vegetação dos piquetes acabando',
      possibleCauses: [
        'Poucos piquetes (sem rotação)',
        'Muitas aves em pouco espaço',
        'Aves ficam muito tempo no mesmo piquete',
        'Vegetação inadequada',
      ],
      recommendedSolutions: [
        'Divida a área em mais piquetes.',
        'Reduza número de aves ou aumente espaço.',
        'Rotacione mais frequentemente (1-2 semanas).',
        'Plante gramíneas e leguminosas adequadas.',
      ],
    },
    {
      problem: 'Ataques de predadores',
      possibleCauses: [
        'Cerca inadequada (muito baixa ou sem enterramento)',
        'Aves ficam no piquete à noite',
        'Faltam telas sobre o piquete (aves de rapina)',
      ],
      recommendedSolutions: [
        'Melhorar a cerca (altura + enterramento).',
        'Fechar as aves no galpão todas as noites.',
        'Colocar telas sobre o piquete (se possível).',
      ],
    },
    {
      problem: 'Acúmulo de parasitas',
      possibleCauses: [
        'Não rotação de piquetes',
        'Piquetes sempre úmidos',
        'Esterco acumulado',
      ],
      recommendedSolutions: [
        'Rotacione piquetes regularmente.',
        'Melhorar drenagem da área (evitar poças).',
        'Limpar esterco excessivo e aplicar cal durante descanso.',
      ],
    },
    {
      problem: 'Aves comendo plantas tóxicas',
      possibleCauses: [
        'Planta tóxica presente no piquete',
        'Falta de ração ou vegetação adequada',
      ],
      recommendedSolutions: [
        'Identificar e remover todas as plantas tóxicas.',
        'Garantir ração e vegetação adequada sempre disponíveis.',
      ],
    },
  ],
  commonMistakes: [
    'Não fazer rotação de piquetes.',
    'Poucos piquetes para o número de aves.',
    'Cerca muito baixa ou sem enterramento.',
    'Não proporcionar sombra suficiente.',
    'Não fechar as aves no galpão à noite.',
    'Permitir plantas tóxicas no piquete.',
    'Não colocar bebedouros no piquete.',
    'Muitas aves em pouco espaço no piquete.',
  ],
  managementChecklist: [
    {
      item: 'Verificar condições da cerca',
      frequency: 'Semanal',
      responsible: 'Produtor',
      critical: true,
    },
    {
      item: 'Rotacionar aves entre piquetes',
      frequency: '1-4 semanas',
      responsible: 'Produtor',
      critical: true,
    },
    {
      item: 'Garantir sombra suficiente no piquete',
      frequency: 'Diário',
      responsible: 'Produtor',
      critical: true,
    },
    {
      item: 'Verificar disponibilidade de água no piquete',
      frequency: 'Diário',
      responsible: 'Produtor',
      critical: true,
    },
    {
      item: 'Fechar aves no galpão à noite',
      frequency: 'Diário',
      responsible: 'Produtor',
      critical: true,
    },
    {
      item: 'Remover plantas tóxicas',
      frequency: 'Ocasional',
      responsible: 'Produtor',
      critical: true,
    },
  ],
  intelligentRules: [
    {
      rule: 'Se vegetação do piquete acabar, rotacionar imediatamente.',
      condition: 'Vegetação do piquete com menos de 50% de cobertura',
      action: '1. Mover aves para outro piquete. 2. Deixar o piquete em descanso para recuperação. 3. Se necessário, plantar novas gramíneas.',
      priority: 'alta',
    },
    {
      rule: 'Se houver sinais de predadores (fezes, vestígios), reforçar a segurança.',
      condition: 'Vestígios de predadores no piquete ou galpão',
      action: '1. Verificar integridade da cerca. 2. Garantir que todas as aves estão fechadas no galpão à noite. 3. Considere adicionar telas sobre o piquete.',
      priority: 'alta',
    },
  ],
  technicalSources: [
    'EMBRAPA Meio-Norte — Manejo de Piquetes para Galinhas Caipiras. 2018.',
    'EMBRAPA Suínos e Aves — Sistema Semi-Intensivo para Aves Alternativas. Circular Técnica, 2019.',
    'MACIEL, R. P. et al. Produção Alternativa de Aves. Editora UFV, 2020.',
    'Serviço Brasileiro de Apoio às Micro e Pequenas Empresas (SEBRAE) — Criação de Galinhas Caipiras. 2020.',
  ],
};
