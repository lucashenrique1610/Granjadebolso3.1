import { KnowledgeModule } from '@/types';

export const vacinacao: KnowledgeModule = {
  id: 'vacinacao',
  title: 'Vacinação de Galinhas de Postura Caipira',
  category: 'sanidade',
  summary: 'A vacinação é fundamental para prevenir doenças infecciosas que podem causar alta mortalidade e queda de produção. Este módulo aborda os principais conceitos de vacinação, doenças-alvo, rotinas recomendadas, rotas de administração, manejo das vacinas e resolução de problemas comuns.',
  objective: 'Orientar o produtor sobre a importância da vacinação, os principais doenças-alvo, rotinas recomendadas para galinhas de postura caipira, rotas de administração adequadas, manejo das vacinas e soluções para problemas comuns.',
  technicalContent: [
    'A vacinação é um dos pilares da sanidade avícola, mesmo em sistemas caipira, pois previne doenças que podem causar alta mortalidade, queda de produção e perdas econômicas significativas.',
    '# 1. Conceitos básicos: A vacina é um produto que contém antígenos (agentes infecciosos inativados, atenuados ou subunidades) que induzem resposta imune protetora sem causar a doença.',
    '# 2. Doenças-alvo principais: As principais doenças para vacinação em galinhas de postura caipira são: Newcastle, Gumboro, Bronquite Infecciosa, Coriza Infecciosa, EDS (Síndrome da Diminuição da Postura), Varíola Aviária, Coccidiose (algumas vacinas), Micoplasmose (algumas vacinas) e Doença de Marek (em áreas de risco).',
    '# 3. Rotas de administração: As principais rotas são: oral (água ou ração), ocular/nasal (gota no olho ou narina), injeção (subcutânea ou intramuscular) e aerosol (spray). A escolha da rota depende da vacina e da fase das aves.',
    '# 4. Manejo das vacinas: É fundamental seguir rigorosamente as instruções do fabricante: temperatura de armazenamento (2-8°C para vacinas vivas atenuadas, -20°C para liofilizadas), preparo da diluição, tempo de uso após reconstituição, proteção do sol, etc.',
    '# 5. Fases de vacinação: A rotina varia comum é dividida em: Cria (0-6 semanas), Recria (7-16 semanas), Pré-postura (17-22 semanas) e Postura (23+ semanas). É importante adaptar a rotina às doenças presentes na região e à consulta de um veterinário.',
    '# 6. Vacinação em área de risco: Em áreas com alta pressão de infecção, é recomendado reforços mais frequentes e consultar um veterinário especializado em sanidade avícola para ajustar o programa.',
    '# 7. Registro de vacinação: É fundamental manter um registro completo com: data da vacinação, tipo de vacina, lote da vacina, rota de administração, número de aves vacinadas, responsável pela vacinação e observações.'
  ],
  importantParameters: [
    {
      name: 'Temperatura de armazenamento de vacinas vivas atenuadas',
      unit: '°C',
      idealValue: '2 a 8',
      minValue: '2',
      maxValue: '8',
      description: 'Armazenamento em geladeira, sem congelar.'
    },
    {
      name: 'Temperatura de armazenamento de vacinas liofilizadas',
      unit: '°C',
      idealValue: '-20 a -18',
      minValue: '-20',
      maxValue: '-18',
      description: 'Armazenamento em freezer.'
    },
    {
      name: 'Tempo máximo de uso após reconstituição (vacinas vivas)',
      unit: 'horas',
      idealValue: '1 a 2',
      minValue: '1',
      maxValue: '2',
      description: 'Depois de reconstituída, a vacina deve ser usada em até 1-2 horas (varia por produto).'
    },
    {
      name: 'Dose de vacina por ave (gota ocular/nasal)',
      unit: 'gotas',
      idealValue: '1',
      minValue: '1',
      maxValue: '1',
      description: 'Uma gota por ave.'
    },
    {
      name: 'Temperatura da água para vacinação oral',
      unit: '°C',
      idealValue: '10 a 20',
      minValue: '10',
      maxValue: '20',
      description: 'Água fresca, sem cloro, sem sanitizantes e à temperatura ambiente.'
    }
  ],
  bestPractices: [
    'Consultar sempre um veterinário especializado em sanidade avícola para elaborar um programa de vacinação adaptado à região.',
    'Seguir rigorosamente as instruções do fabricante da vacina (armazenamento, preparo e administração).',
    'Vacinar apenas aves saudáveis (não vacinar aves doentes, estressadas ou com baixa imunidade).',
    'Manter as vacinas sempre em temperatura controlada durante o transporte e armazenamento.',
    'Usar equipamentos limpos e esterilizados para vacinação.',
    'Não misturar diferentes vacinas no mesmo recipiente ou mesmo dia, a menos que orientado pelo fabricante/veterinário.',
    'Ler e manter registros completos de todas as vacinações.',
    'Monitorar as aves nas primeiras 24-48 horas após a vacinação para observar reações adversas.',
    'Evitar vacinar aves em horários de calor excessivo ou frio intenso.',
    'Garantir que todas as aves recebam a dose correta da vacina.'
  ],
  commonProblems: [
    {
      problem: 'Reações adversas após vacinação',
      possibleCauses: [
        'Vacina viva atenuada em aves estressadas/doentes',
        'Dose excessiva de vacina',
        'Rota de administração inadequada',
        'Vacina inadequada para a fase das aves'
      ],
      recommendedSolutions: [
        'Isolar aves com sintomas graves',
        'Garantir água e alimentação à vontade',
        'Consultar veterinário se houver muitos casos',
        'Seguir instruções do fabricante para doses e rotas'
      ]
    },
    {
      problem: 'Vacinação com baixa eficácia',
      possibleCauses: [
        'Vacina mal armazenada',
        'Vacina vencida',
        'Aves não receberam a vacina completamente',
        'Aves com baixa imunidade',
        'Programa de vacinação inadequado'
      ],
      recommendedSolutions: [
        'Verificar condições de armazenamento da vacina',
        'Checar data de validade da vacina',
        'Garantir que todas as aves recebam a dose completa',
        'Melhorar condições de manejo e nutrição para melhorar imunidade',
        'Consultar veterinário para revisar o programa de vacinação'
      ]
    },
    {
      problem: 'Doença ainda aparece mesmo após vacinação',
      possibleCauses: [
        'Intervalo entre vacinas inadequado',
        'Cepa da vacina diferente da cepa circulante',
        'Aves vacinadas muito tarde',
        'Baixa imunidade das aves'
      ],
      recommendedSolutions: [
        'Ajustar intervalo entre vacinas conforme orientação veterinária',
        'Confirmar cepa da vacina',
        'Vacinar no tempo correto',
        'Melhorar manejo e nutrição'
      ]
    },
    {
      problem: 'Muitas aves não recebem a vacina',
      possibleCauses: [
        'Bebedouros insuficientes para vacinação oral',
        'Gota mal aplicada na rota ocular/nasal',
        'Pressão baixa no spray para vacinação aerosol'
      ],
      recommendedSolutions: [
        'Garantir bebedouros suficientes para vacinação oral',
        'Treinar pessoal para aplicar gota corretamente',
        'Ajustar pressão do spray para vacinação aerosol'
      ]
    }
  ],
  commonMistakes: [
    'Vacinar aves doentes ou estressadas.',
    'Não seguir instruções de armazenamento e preparo da vacina.',
    'Usar vacina vencida.',
    'Misturar diferentes vacinas no mesmo recipiente.',
    'Vacinar em horários de calor excessivo.',
    'Não manter registros de vacinação.',
    'Não consultar veterinário para elaborar o programa de vacinação.',
    'Aplicar vacina via rota inadequada.',
    'Não garantir que todas as aves recebam a dose correta.',
    'Esquecer reforços de vacinação.'
  ],
  managementChecklist: [
    { item: 'Verificar temperatura de armazenamento da vacina', frequency: 'Antes de cada vacinação', responsible: 'Produtor', critical: true },
    { item: 'Checar data de validade da vacina', frequency: 'Antes de cada vacinação', responsible: 'Produtor', critical: true },
    { item: 'Garantir que as aves estão saudáveis', frequency: 'Antes de cada vacinação', responsible: 'Produtor/Veterinário', critical: true },
    { item: 'Preparar vacina conforme instruções do fabricante', frequency: 'Antes de cada vacinação', responsible: 'Produtor', critical: true },
    { item: 'Registrar vacinação (data, vacina, lote, rota, aves vacinadas)', frequency: 'Após cada vacinação', responsible: 'Produtor', critical: true },
    { item: 'Monitorar aves nas primeiras 24-48h após vacinação', frequency: 'Após cada vacinação', responsible: 'Produtor', critical: true },
    { item: 'Seguir programa de vacinação conforme orientação veterinária', frequency: 'Sempre', responsible: 'Produtor/Veterinário', critical: true }
  ],
  intelligentRules: [
    {
      rule: 'Se houver reações adversas em >5% das aves após vacinação, consultar veterinário imediatamente',
      condition: 'Reações adversas em >5% das aves',
      action: '1. Isolar aves com sintomas graves\n2. Garantir água e alimentação à vontade\n3. Consultar veterinário imediatamente',
      priority: 'alta'
    },
    {
      rule: 'Se vacina for mantida em temperatura inadequada por mais de 2 horas, não usar',
      condition: 'Vacina em temperatura inadequada >2h',
      action: '1. Não usar vacina comprometida\n2. Comprar nova vacina e armazenar corretamente',
      priority: 'alta'
    },
    {
      rule: 'Se a doença aparece mesmo após vacinação, revisar programa e consultar veterinário',
      condition: 'Doença após vacinação',
      action: '1. Consultar veterinário para revisar programa\n2. Confirmar cepa da vacina\n3. Verificar imunidade das aves',
      priority: 'alta'
    }
  ],
  technicalSources: [
    'Embrapa Suínos e Aves — Sanidade e Vacinação em Aves de Postura. Circular Técnica, 2017.',
    'Embrapa Meio-Norte — Galinhas Caipiras: Sanidade e Vacinação. 2019.',
    'Associação Brasileira de Avicultura (ABA) — Manual de Sanidade Avícola. 4ª edição, 2020.',
    'Ministério da Agricultura e Pecuária (MAPA) — Programa Nacional de Sanidade Avícola (PNSA). 2021.',
    'LOPES, D. C. et al. Nutrição e Manejo de Aves de Postura. Editora UFV, 2019.'
  ]
};
