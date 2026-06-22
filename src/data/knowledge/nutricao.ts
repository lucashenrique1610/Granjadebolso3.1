import { KnowledgeModule } from '@/types';

export const nutricao: KnowledgeModule = {
  id: 'nutricao',
  title: 'Nutrição para Galinhas de Postura Caipira',
  category: 'manejo',
  summary: 'A nutrição adequada é fundamental para a saúde, o desenvolvimento esquelético e a produtividade das aves. Este módulo aborda os principais nutrientes, exigências nutricionais por fase, tipos de ração, manejo alimentar e problemas nutricionais comuns.',
  objective: 'Orientar o produtor na escolha, compra, armazenamento e fornecimento da ração correta para cada fase de vida da ave, buscando a máxima eficiência alimentar e o menor custo por dúzia de ovos produzida.',
  technicalContent: [
    'A alimentação representa cerca de 70% dos custos operacionais de uma granja. No sistema caipira, o manejo nutricional exige entender que o piquete é um aliado estético e de bem-estar, mas a precisão dos aminoácidos e minerais vem do galpão.',
    '# 1. Água: É o nutriente mais importante e o mais barato. As aves consomem aproximadamente 2 a 3 vezes mais água do que ração (peso/peso). A privação de água por apenas 24 horas pode cortar a postura por semanas ou causar muda de penas precoce. Ela deve ser limpa, fresca, clorada (semanalmente) e disponível 24h.',
    '# 2. Proteínas e Aminoácidos: Cruciais para o crescimento, empenamento e formação do albúmen (clara). Mais do que a Proteína Bruta (PB) total, o produtor avançado monitora a digestibilidade da Lisina e Metionina, os aminoácidos limitantes para o tamanho do ovo.',
    '# 3. Energia: Combustível para as atividades e mantença térmica. Fornecida majoritariamente pelo milho. O excesso de energia (comum ao dar apenas milho puro ou quirela) acumula gordura abdominal e hepática, causando a Síndrome do Fígado Gororrento/Graxo e prolapso de oviduto.',
    '# 4. Minerais (O Foco no Cálcio): O cálcio e o fósforo disponível formam a estrutura óssea e a casca. Na fase de postura, a ave precisa de partículas finas de cálcio (absorção rápida durante o dia) e partículas grossas (calcário granulado ou farinha de ostra de 2 a 4 mm) para absorção lenta durante a noite, período em que a casca é fabricada no útero.',
    '# 5. Vitaminas: Necessárias em microgramas, com destaque para a Vitamina D3 (sem ela, a ave não fixa o cálcio nos ossos e na casca) e as vitaminas A e E, responsáveis pela imunidade e integridade reprodutiva.',
    '# 6. Cronograma de Fases de Alimentação:',
    '- Cria (0-6 semanas): Ração Inicial. Alta proteína (18-22%) para acelerar órgãos e imunidade.',
    '- Recria (7-16 semanas): Ração de Recria. Proteína moderada (15-18%) e baixa energia para desenvolver esqueleto longo sem engordar a ave.',
    '- Pré-postura (17-22 semanas): Ração de Pré-Postura. O elo de transição. Dobra-se o nível de cálcio para criar o estoque ósseo medular antes do primeiro ovo.',
    '- Postura (23+ semanas): Ração de Postura. Alto cálcio (3.5-4.5%) e proteína ajustada (16-18%).',
    '# 7. Relação com Alimentos Alternativos e Piquete: Capim, leguminosas e insetos fornecem fibras que melhoram a saúde intestinal e carotenoides que pigmentam fortemente a gema (padrão caipira). Porém, eles não substituem a ração. O pasto cobre menos de 10% dos requerimentos diários de uma ave melhorada (como a Embrapa 051 ou Isa Brown).',
    '# 8. Manejo Alimentar Avançado: Para evitar que as aves escolham apenas as partículas grandes (milho) e deixem o pó rico em vitaminas e minerais no fundo, os comedouros devem ficar vazios por cerca de 1 hora no meio do dia (fome controlada) para que limpem o fundo do trato antes do reabastecimento.'
  ],
  importantParameters: [
    {
      name: 'Proteína Ração de Cria',
      unit: '%',
      idealValue: '18 a 22',
      minValue: '17',
      maxValue: '23',
      description: 'Foco em musculatura e órgãos internos primários.'
    },
    {
      name: 'Proteína Ração de Recria',
      unit: '%',
      idealValue: '15 a 18',
      minValue: '14',
      maxValue: '19',
      description: 'Crescimento ósseo sem acúmulo de gordura.'
    },
    {
      name: 'Proteína Ração de Postura',
      unit: '%',
      idealValue: '16 a 18',
      minValue: '15',
      maxValue: '19',
      description: 'Manutenção e peso do ovo (formação da clara).'
    },
    {
      name: 'Cálcio Ração de Postura',
      unit: '%',
      idealValue: '3.5 a 4.5',
      minValue: '3.2',
      maxValue: '4.8',
      description: 'Essencial para a rigidez e espessura da casca.'
    },
    {
      name: 'Cálcio Ração de Recria',
      unit: '%',
      idealValue: '0.8 a 1.2',
      minValue: '0.7',
      maxValue: '1.4',
      description: 'Nível baixo para evitar calcificação precoce dos rins.'
    },
    {
      name: 'Conversão Alimentar',
      unit: 'kg/dúzia',
      idealValue: '1.35 a 1.55',
      minValue: '1.3',
      maxValue: '1.65',
      description: 'Quilos de ração consumidos para gerar 1 dúzia de ovos.'
    },
    {
      name: 'Consumo de Água (Adulta)',
      unit: 'mL/ave/dia',
      idealValue: '200 a 400',
      minValue: '150',
      maxValue: '500',
      description: 'Dobra ou triplica em dias de calor intenso (≥ 30°C).'
    },
    {
      name: 'Consumo de Ração (Postura)',
      unit: 'g/ave/dia',
      idealValue: '100 a 130',
      minValue: '90',
      maxValue: '150',
      description: 'Média diária consumida por linhagens caipiras melhoradas.'
    }
  ],
  bestPractices: [
    'Use ração balanceada e de granulometria farelada grossa (partículas uniformes evitam seleção).',
    'Forneça água limpa, fresca e em temperatura abaixo de 24°C (água quente faz a ave rejeitar o consumo).',
    'Armazene a ração sobre pallets de madeira, afastados 30 cm da parede e protegidos de umidade e roedores.',
    'Ao mudar de fase, faça uma transição gradual misturando as rações por 5 a 7 dias para não estressar a microbiota intestinal.',
    'Adicione fontes de cálcio grosseiro (farinha de ostra ou calcário granulado) nos comedouros especificamente na parte da tarde.',
    'Mantenha a altura dos comedouros regulada pela borda do dorso/peito das aves para zerar o desperdício por projeção (ciscar a ração).',
    'Lave e desinfete os bebedouros diariamente.',
    'Pese amostra de aves (1% do lote) semanalmente para conferir a curva de crescimento.'
  ],
  commonProblems: [
    {
      problem: 'Deficiência crônica de proteína (Aves leves e ovos pequenos)',
      possibleCauses: [
        'Erro na mistura da ração',
        'Uso de milho de baixa qualidade (baixo teor proteico)',
        'Consumo insuficiente por estresse calórico'
      ],
      recommendedSolutions: [
        'Revisar os níveis de garantia do fornecedor',
        'Formular com foco em aminoácidos sintéticos (Metionina)',
        'Climatizar o galpão para estimular o apetite'
      ]
    },
    {
      problem: 'Problema de casca de ovo (Mole, trincada ou "fubenta")',
      possibleCauses: [
        'Deficiência ou desbalanço de Cálcio/Fósforo',
        'Falta de Vitamina D3',
        'Estresse térmico (a ave arqueja, elimina CO₂ e reduz o carbonato de cálcio da casca)',
        'Aves muito velhas'
      ],
      recommendedSolutions: [
        'Introduzir calcário granulado à tarde',
        'Usar bicarbonato de sódio na água em dias quentes',
        'Monitorar a relação Cálcio:Fósforo (ideal de 4:1 a 5:1 na postura)'
      ]
    },
    {
      problem: 'Síndrome do Fígado Gordo (Aves gordas com morte súbita)',
      possibleCauses: [
        'Excesso de energia na dieta (baseada quase que exclusivamente em milho)',
        'Falta de exercício'
      ],
      recommendedSolutions: [
        'Reduzir a energia metabolizável da ração incluindo fontes de fibra de qualidade',
        'Garantir a soltura diária obrigatória nos piquetes'
      ]
    },
    {
      problem: 'Ração mofada ou empedrada (Risco de Micotoxinas)',
      possibleCauses: [
        'Umidade alta no galpão ou estoque',
        'Vazamento em silos/telhados',
        'Falta de limpeza física nos cantos dos comedouros'
      ],
      recommendedSolutions: [
        'Descartar imediatamente o lote afetado',
        'Utilizar sequestrantes de micotoxinas na ração',
        'Implementar rotina de raspagem e higienização semanal dos comedouros'
      ]
    }
  ],
  commonMistakes: [
    'Alimentar galinhas em postura usando apenas milho moído e restos de horta (derruba a taxa de postura para menos de 30%).',
    'Adiantar a ração de postura rica em cálcio na fase de recria, provocando gota úrica e falência renal nas aves jovens.',
    'Comprar milho úmido (≥ 13% de umidade) sem testar, intoxicando o lote com aflatoxinas que destroem o fígado.',
    'Deixar os bebedouros sujos com resíduo de ração que entra em decomposição na água.',
    'Não fazer transição gradual de ração ao mudar de fase.',
    'Deixar os comedouros sempre cheios, permitindo seleção de partículas grandes.'
  ],
  managementChecklist: [
    {
      item: 'Medir e abastecer os comedouros ajustando a altura',
      frequency: 'Diário',
      responsible: 'Produtor',
      critical: true
    },
    {
      item: 'Lavar e desinfetar os bebedouros (tipo pendular ou calha)',
      frequency: 'Diário',
      responsible: 'Produtor',
      critical: true
    },
    {
      item: 'Pesar amostra de aves (1% do lote) para conferir a curva',
      frequency: 'Semanal',
      responsible: 'Produtor',
      critical: true
    },
    {
      item: 'Limpar o fundo dos comedouros eliminando resíduos velhos',
      frequency: 'Semanal',
      responsible: 'Produtor',
      critical: false
    },
    {
      item: 'Fechar planilha de fechamento: Consumo Total vs. Ovos Colhidos',
      frequency: 'Mensal',
      responsible: 'Produtor',
      critical: true
    },
    {
      item: 'Avaliar umidade e presença de carunchos no estoque de sacaria',
      frequency: 'Semanal',
      responsible: 'Produtor',
      critical: true
    }
  ],
  intelligentRules: [
    {
      rule: 'Se o consumo diário do galpão cair mais de 8% em 48 horas → Ação: Suspender a soltura no piquete, checar se a ração está azeda/mofada e medir a temperatura da água. Se a água estiver quente, elas param de comer.',
      condition: 'Consumo de ração reduzido >8% em 48h',
      action: '1. Suspender soltura no piquete\n2. Checar se a ração está azeda/mofada\n3. Medir temperatura da água\n4. Se água estiver quente, providenciar resfriamento',
      priority: 'alta'
    },
    {
      rule: 'Se a Conversão Alimentar subir para ≥ 1,65 kg/dúzia → Ação: Auditar fisicamente o galpão à noite em busca de infestação de ratos (que roubam ração) ou inspecionar o fundo dos comedouros para caçar vazamentos no piso.',
      condition: 'Conversão Alimentar ≥ 1.65 kg/dúzia',
      action: '1. Auditar galpão à noite para infestação de ratos\n2. Inspecionar fundo dos comedouros para vazamentos\n3. Verificar desperdício de ração',
      priority: 'alta'
    },
    {
      rule: 'Se >10% dos ovos com casca fraca, verificar cálcio, fósforo e vitamina D na ração',
      condition: '>10% ovos com problema de casca',
      action: '1. Verificar níveis de cálcio na ração (3.5-4.5%)\n2. Verificar níveis de fósforo e vitamina D3\n3. Verificar se a ração é adequada para postura\n4. Avaliar temperatura do ambiente',
      priority: 'alta'
    },
    {
      rule: 'Se ração estiver mofada, descartar e melhorar armazenamento',
      condition: 'Ração mofada ou estragada',
      action: '1. Descartar ração mofada imediatamente\n2. Limpar local de armazenamento\n3. Armazenar ração em local seco e arejado',
      priority: 'alta'
    }
  ],
  technicalSources: [
    'ROSTAGNO, H. S. et al. Tabelas Brasileiras para Aves e Suínos: Composição de Alimentos e Exigências Nutricionais. 4ª Ed. Viçosa: UFV, 2017.',
    'EMBRAPA Suínos e Aves. Manual de Nutrição e Alimentação de Aves de Postura em Sistemas Alternativos. Concórdia, 2019.',
    'ALBINO, L. F. T. et al. Criando Galinhas Caipiras: Da Cria ao Abate e Produção de Ovos. Editora Aprenda Fácil, 2019.'
  ]
};
