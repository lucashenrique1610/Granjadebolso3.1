import { KnowledgeModule } from '@/types';

export const reproducao: KnowledgeModule = {
  id: 'reproducao',
  title: 'Reprodução de Galinhas Caipiras',
  category: 'produção',
  summary: 'A reprodução é fundamental para manter ou aumentar o rebanho. Este módulo aborda o manejo de matrizes e galos, proporção entre galo e galinha, acasalamento, seleção de matrizes e galos, e manejo da reprodução para produção de ovos férteis.',
  objective: 'Orientar o produtor sobre o manejo adequado da reprodução de galinhas caipiras, incluindo seleção de matrizes e galos, proporção entre galo e galinha, manejo do acasalamento e produção de ovos férteis de qualidade para incubação.',
  technicalContent: [
    'A reprodução de galinhas caipiras é importante para a renovação do rebanho e produção de pintinhos. Para sucesso, é necessário um bom manejo de matrizes, galos e acasalamento, além de sanidade e nutrição adequadas.',
    '# 1. Seleção de matrizes: As galinhas matrizes devem ser saudáveis, com boa conformação corporal, histórico de boa produção (se for linhagem selecionada), idade adequada (início da reprodução entre 24 a 30 semanas, dependendo da linhagem) e sem defeitos genéticos ou físicos.',
    '# 2. Seleção de galos: Os galos devem ser saudáveis, vigorosos, com boa conformação, fertilidade comprovada (se possível), sem defeitos físicos ou genéticos, e na idade ideal para reprodução (semelhante às matrizes, ou ligeiramente mais velhos).',
    '# 3. Proporção entre galo e galinha: A proporção ideal é de 1 galo para 8 a 12 galinhas (varia por sistema e vigor do galo). Em sistema semi-intensivo/caipira, 1 para 8 a 10 é comum. Proporções excessivas reduzem a fertilidade.',
    '# 4. Idade para reprodução: As matrizes começam a reprodução entre 24 a 30 semanas (dependendo da linhagem e desenvolvimento). O pico de fertilidade é geralmente entre 30 a 60 semanas. A fertilidade diminui gradualmente após esse período.',
    '# 5. Manejo do acasalamento: Em sistema natural, os galos devem estar com as galinhas para acasalamento. É importante garantir que todos os galos tenham acesso às galinhas sem competição excessiva (evitar muitos galos juntos).',
    '# 6. Nutrição para reprodução: Matrizes e galos devem receber ração de reprodução (ou ração de postura com qualidade) com níveis adequados de proteína (16 a 18%), energia, vitaminas (especialmente A, D3, E e complexo B) e minerais (cálcio, fósforo, zinco, manganês). A deficiência nutricional reduz fertilidade e qualidade dos ovos férteis.',
    '# 7. Sanidade: O lote de reprodução deve estar com vacinação em dia, programa de sanitização adequado e controle de parasitas (internos e externos). Doenças reduzem a fertilidade e podem causar mortalidade embrionária.',
    '# 8. Ambiente: O ambiente deve ser tranquilo (evitar estresse), com espaço adequado, temperatura ideal (15 a 25°C), ventilação adequada e iluminação de 14 a 16 horas por dia (para manter a produção de ovos férteis).',
    '# 9. Coleta de ovos férteis: Os ovos férteis devem ser coletados regularmente (2 a 3 vezes por dia), selecionados (peso 52 a 65g, casca intacta, forma oval normal, limpos) e armazenados adequadamente para incubação.',
    '# 10. Descarte de aves não produtivas: Periodicamente, descarte matrizes e galos com baixa fertilidade, idade avançada ou problemas de saúde. Renove o lote para manter a produtividade da reprodução.'
  ],
  importantParameters: [
    {
      name: 'Proporção galo:galinha',
      unit: 'galo/galinhas',
      idealValue: '1:8 a 1:12',
      minValue: '1:6',
      maxValue: '1:15',
      description: 'Proporção ideal entre galo e galinhas para boa fertilidade.'
    },
    {
      name: 'Idade de início da reprodução',
      unit: 'semanas',
      idealValue: '24 a 30',
      minValue: '22',
      maxValue: '34',
      description: 'Idade ideal para início da reprodução (varia por linhagem).'
    },
    {
      name: 'Peso ideal de ovos férteis',
      unit: 'g',
      idealValue: '52 a 65',
      minValue: '50',
      maxValue: '68',
      description: 'Faixa de peso ideal para ovos de incubação.'
    },
    {
      name: 'Horas de luz por dia (reprodução)',
      unit: 'horas',
      idealValue: '14 a 16',
      minValue: '13',
      maxValue: '17',
      description: 'Duração ideal de iluminação para reprodução e produção de ovos férteis.'
    }
  ],
  bestPractices: [
    'Selecionar matrizes e galos saudáveis e com boa conformação.',
    'Manter proporção de 1 galo para 8 a 12 galinhas.',
    'Garantir nutrição adequada com ração de reprodução.',
    'Manter ambiente tranquilo e com 14 a 16h de luz por dia.',
    'Coletar ovos férteis 2 a 3 vezes por dia.',
    'Selecionar ovos férteis com peso e qualidade adequados.',
    'Armazenar ovos férteis corretamente (ponta arredondada para cima).',
    'Manter programa de vacinação e sanitização em dia.',
    'Controlar parasitas (internos e externos).',
    'Descartar aves não produtivas periodicamente.'
  ],
  commonProblems: [
    {
      problem: 'Baixa fertilidade dos ovos',
      possibleCauses: [
        'Proporção galo:galinha inadequada (poucos galos ou muitos)',
        'Galo velho ou com baixa fertilidade',
        'Nutrição inadequada (deficiência de vitaminas/minerais)',
        'Estresse excessivo',
        'Sanidade inadequada (doenças ou parasitas)',
        'Idade avançada das aves',
        'Ambiente inadequado (temperatura, luz, espaço)'
      ],
      recommendedSolutions: [
        'Ajustar proporção galo:galinha para 1:8 a 1:12',
        'Substituir galos velhos ou com baixa fertilidade',
        'Melhorar nutrição (verificar ração e vitaminas/minerais)',
        'Reduzir estresse (evitar mudanças bruscas)',
        'Verificar sanidade e consultar veterinário',
        'Renovar lote de reprodução',
        'Melhorar ambiente (luz, temperatura, espaço)'
      ]
    },
    {
      problem: 'Muitos ovos trincados ou quebrados na reprodução',
      possibleCauses: [
        'Ninhos inadequados',
        'Coleta infrequente',
        'Cama ou chão duro',
        'Densidade excessiva'
      ],
      recommendedSolutions: [
        'Melhorar ninhos (número e qualidade)',
        'Coletar ovos mais vezes por dia',
        'Melhorar cama ou chão',
        'Reduzir densidade de aves'
      ]
    },
    {
      problem: 'Galo não acasala',
      possibleCauses: [
        'Galo velho ou doente',
        'Estresse',
        'Muitos galos juntos (competição excessiva)',
        'Nutrição inadequada'
      ],
      recommendedSolutions: [
        'Substituir galo',
        'Reduzir estresse',
        'Reduzir número de galos por área',
        'Melhorar nutrição'
      ]
    }
  ],
  commonMistakes: [
    'Muitos galos juntos (competição excessiva).',
    'Proporção galo:galinha inadequada (muitas galinhas por galo).',
    'Não selecionar matrizes e galos adequadamente.',
    'Não ajustar ração para reprodução.',
    'Não manter iluminação adequada para reprodução.',
    'Não coletar ovos férteis com frequência suficiente.',
    'Não descartar aves não produtivas.',
    'Negligenciar sanidade do lote de reprodução.'
  ],
  managementChecklist: [
    { item: 'Verificar proporção galo:galinha', frequency: 'Semanal', responsible: 'Produtor', critical: true },
    { item: 'Garantir ração de reprodução à vontade', frequency: 'Diário', responsible: 'Produtor', critical: true },
    { item: 'Coletar ovos férteis 2 a 3 vezes por dia', frequency: 'Diário', responsible: 'Produtor', critical: true },
    { item: 'Verificar iluminação (14 a 16h/dia)', frequency: 'Diário', responsible: 'Produtor', critical: true },
    { item: 'Monitorar saúde do lote de reprodução', frequency: 'Diário', responsible: 'Produtor', critical: true },
    { item: 'Selecionar ovos férteis para incubação', frequency: 'Diário', responsible: 'Produtor', critical: true },
    { item: 'Descartar aves não produtivas', frequency: 'Mensal', responsible: 'Produtor', critical: false }
  ],
  intelligentRules: [
    {
      rule: 'Se fertilidade dos ovos for <70%, verificar proporção galo:galinha, nutrição, sanidade e idade das aves',
      condition: 'Baixa fertilidade',
      action: '1. Verificar proporção galo:galinha\n2. Verificar ração e nutrição\n3. Verificar sanidade e consultar veterinário\n4. Verificar idade das aves',
      priority: 'alta'
    },
    {
      rule: 'Se for incubar, só usar ovos de 52 a 65g e <10 dias de armazenamento',
      condition: 'Incubação',
      action: '1. Selecionar ovos de peso ideal\n2. Verificar período de armazenamento\n3. Garantir armazenamento adequado',
      priority: 'alta'
    }
  ],
  technicalSources: [
    'Embrapa Meio-Norte — Reprodução de Galinhas Caipiras. 2019.',
    'Embrapa Suínos e Aves — Manejo de Aves de Reprodução. Circular Técnica, 2018.',
    'MACIEL, R. P. et al. Produção Alternativa de Aves. Editora UFV, 2020.',
    'Associação Brasileira de Avicultura (ABA) — Manual de Reprodução de Aves, 2020.',
    'LOPES, D. C. et al. Nutrição e Manejo de Aves de Postura. Editora UFV, 2019.'
  ]
};
