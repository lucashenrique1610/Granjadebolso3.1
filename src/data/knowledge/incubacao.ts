import { KnowledgeModule } from '@/types';

export const incubacao: KnowledgeModule = {
  id: 'incubacao',
  title: 'Incubação de Ovos de Galinha',
  category: 'produção',
  summary: 'A incubação é o processo de desenvolvimento dos embriões em pintinhos. Este módulo aborda incubação natural (galinha chocadeira) e artificial (incubadora), parâmetros ideais (temperatura, umidade, viragem), seleção de ovos, manejo da incubação e eclosão.',
  objective: 'Orientar o produtor sobre os processos de incubação natural e artificial, parâmetros ideais (temperatura, umidade, viragem), seleção de ovos, manejo da incubação e cuidados com a eclosão para maximizar o índice de eclosão.',
  technicalContent: [
    'A incubação pode ser natural (usando galinhas chocadeiras) ou artificial (usando incubadoras). O objetivo é garantir condições ideais para o desenvolvimento do embrião e eclosão de pintinhos saudáveis.',
    '# 1. Incubação natural: É feita com galinhas chocadeiras. Vantagens: baixo custo, galinha cuida da viragem e umidade. Desvantagens: menor escala, dependência da chocadeira. Recomenda-se uma galinha chocadeira para 10 a 15 ovos (dependendo do tamanho da galinha).',
    '# 2. Incubação artificial: Usada em maiores escalas, com incubadoras (forçadas ou estacionárias). Requer controle rigoroso de temperatura, umidade e viragem dos ovos.',
    '# 3. Seleção de ovos para incubação: Ovos devem ter peso 52 a 65g (ideal para linhagem), casca intacta e de boa qualidade, forma oval normal, limpos (sem sujeira excessiva), armazenados por até 7 a 10 dias (temperatura 12 a 18°C, ponta arredondada para cima).',
    '# 4. Parâmetros ideais da incubadora (dependendo do modelo): Temperatura: 37,5 a 37,8°C (dias 1 a 18) e 36,9 a 37,2°C (dias 19 a 21/eclosão). Umidade: 55 a 60% (dias 1 a 18) e 65 a 75% (dias 19 a 21).',
    '# 5. Viragem dos ovos: Os ovos devem ser virados 3 a 5 vezes por dia até o dia 18. A viragem evita que o embrião cole na casca. Incubadoras automáticas viram automaticamente; para incubadoras manuais, faça manualmente.',
    '# 6. Transfira para o nascedouro: No dia 19, transfira os ovos para o nascedouro (ou parte inferior da incubadora, se for combinada). Pare a viragem e aumente a umidade.',
    '# 7. Eclosão: A eclosão acontece entre dias 20 e 21. Evite abrir a incubadora durante a eclosão para manter a temperatura e umidade. Deixe os pintinhos secarem completamente antes de retirar.',
    '# 8. Cuidados pré-incubação: Lave e desinfete a incubadora/nascedouro antes de usar. Teste a temperatura e umidade por pelo menos 24 horas antes de colocar os ovos.',
    '# 9. Monitoramento: Verifique temperatura e umidade regularmente (pelo menos 2 vezes por dia). Anote os dados para controle.',
    '# 10. Descarte de ovos não eclodidos: Após a eclosão, remova e descarte os ovos que não eclodiram, cascas e restos.',
    '# 11. Índice de eclosão: O índice de eclosão ideal é 70 a 85% (número de pintinhos saudáveis / número de ovos férteis). Baixos índices indicam problemas na seleção de ovos, incubação ou sanidade.'
  ],
  importantParameters: [
    {
      name: 'Temperatura incubação (dias 1-18)',
      unit: '°C',
      idealValue: '37,5 a 37,8',
      minValue: '37,2',
      maxValue: '38,2',
      description: 'Temperatura ideal para incubação no período 1-18 dias.'
    },
    {
      name: 'Temperatura eclosão (dias 19-21)',
      unit: '°C',
      idealValue: '36,9 a 37,2',
      minValue: '36,5',
      maxValue: '37,5',
      description: 'Temperatura ideal para o período de eclosão.'
    },
    {
      name: 'Umidade incubação (dias 1-18)',
      unit: '%',
      idealValue: '55 a 60',
      minValue: '50',
      maxValue: '65',
      description: 'Umidade ideal para incubação no período 1-18 dias.'
    },
    {
      name: 'Umidade eclosão (dias 19-21)',
      unit: '%',
      idealValue: '65 a 75',
      minValue: '60',
      maxValue: '80',
      description: 'Umidade ideal para o período de eclosão.'
    },
    {
      name: 'Frequência de viragem',
      unit: 'vezes/dia',
      idealValue: '3 a 5',
      minValue: '2',
      maxValue: '8',
      description: 'Frequência ideal de viragem dos ovos até o dia 18.'
    },
    {
      name: 'Período de incubação total',
      unit: 'dias',
      idealValue: '21',
      minValue: '20',
      maxValue: '22',
      description: 'Período total de incubação para galinhas.'
    }
  ],
  bestPractices: [
    'Selecionar ovos adequados para incubação (peso, casca, forma).',
    'Armazenar ovos para incubação por até 7-10 dias.',
    'Limpar e desinfetar incubadora/nascedouro antes do uso.',
    'Testar temperatura e umidade por 24h antes de iniciar.',
    'Manter temperatura e umidade dentro dos parâmetros ideais.',
    'Virar ovos 3 a 5 vezes por dia até o dia 18.',
    'Transferir ovos para o nascedouro no dia 19.',
    'Não abrir incubadora durante a eclosão.',
    'Deixar pintinhos secarem completamente antes de retirar.',
    'Monitorar temperatura e umidade regularmente (registrar dados).',
    'Calcular índice de eclosão para controle de qualidade.'
  ],
  commonProblems: [
    {
      problem: 'Baixo índice de eclosão',
      possibleCauses: [
        'Ovos inadequados (peso, casca, armazenamento longos)',
        'Temperatura ou umidade inadequadas na incubação',
        'Viragem insuficiente ou excessiva',
        'Fertilidade baixa dos ovos (problemas na reprodução)',
        'Sanidade inadequada (doenças no lote de reprodução)',
        'Incubadora suja ou mal calibrada'
      ],
      recommendedSolutions: [
        'Melhorar seleção e armazenamento dos ovos',
        'Calibrar e ajustar temperatura/umidade da incubadora',
        'Ajustar frequência de viragem',
        'Verificar fertilidade dos ovos (problemas na reprodução)',
        'Melhorar sanidade do lote de reprodução',
        'Limpar e desinfetar incubadora antes do uso'
      ]
    },
    {
      problem: 'Muitos embriões mortos na incubação',
      possibleCauses: [
        'Variações bruscas de temperatura ou umidade',
        'Ovos com casca trincada ou suja',
        'Viragem inadequada',
        'Sanidade inadequada (contaminação)'
      ],
      recommendedSolutions: [
        'Manter temperatura e umidade constantes',
        'Selecionar apenas ovos com casca intacta e limpos',
        'Virar ovos corretamente (3-5 vezes/dia)',
        'Desinfetar incubadora e equipamentos'
      ]
    },
    {
      problem: 'Pintinhos com dificuldade para eclodir',
      possibleCauses: [
        'Umidade baixa no período de eclosão',
        'Temperatura baixa ou alta no final da incubação',
        'Ovos com casca muito espessa'
      ],
      recommendedSolutions: [
        'Aumentar umidade para 65-75% no período de eclosão',
        'Ajustar temperatura para 36,9-37,2°C',
        'Selecionar ovos com casca de espessura normal'
      ]
    }
  ],
  commonMistakes: [
    'Usar ovos inadequados (muito pequenos, grandes, trincados, sujos) para incubação.',
    'Armazenar ovos para incubação por mais de 10 dias.',
    'Não testar temperatura/umidade da incubadora antes de usar.',
    'Não virar ovos regularmente.',
    'Mudar temperatura/umidade de forma brusca.',
    'Abrir incubadora durante a eclosão.',
    'Transferir ovos para o nascedouro muito cedo ou muito tarde.',
    'Não limpar incubadora/nascedouro antes do uso.',
    'Não monitorar temperatura/umidade regularmente.'
  ],
  managementChecklist: [
    { item: 'Limpar e desinfetar incubadora/nascedouro', frequency: 'Antes de cada incubação', responsible: 'Produtor', critical: true },
    { item: 'Testar temperatura e umidade por 24h', frequency: 'Antes de cada incubação', responsible: 'Produtor', critical: true },
    { item: 'Selecionar ovos adequados para incubação', frequency: 'Antes de colocar na incubadora', responsible: 'Produtor', critical: true },
    { item: 'Verificar temperatura e umidade (registrar)', frequency: '2 a 3 vezes/dia', responsible: 'Produtor', critical: true },
    { item: 'Virar ovos 3 a 5 vezes/dia (até dia 18)', frequency: 'Diário (até dia 18)', responsible: 'Produtor', critical: true },
    { item: 'Transferir ovos para o nascedouro no dia 19', frequency: 'Dia 19', responsible: 'Produtor', critical: true },
    { item: 'Não abrir incubadora durante eclosão', frequency: 'Dias 19-21', responsible: 'Produtor', critical: true },
    { item: 'Calcular índice de eclosão', frequency: 'Após cada incubação', responsible: 'Produtor', critical: false }
  ],
  intelligentRules: [
    {
      rule: 'Se temperatura sair da faixa ideal, ajustar imediatamente',
      condition: 'Temperatura inadequada',
      action: '1. Verificar e calibrar a incubadora\n2. Ajustar a temperatura para a faixa ideal',
      priority: 'alta'
    },
    {
      rule: 'Se índice de eclosão for <70%, verificar seleção de ovos, incubação e sanidade',
      condition: 'Baixo índice de eclosão',
      action: '1. Verificar seleção e armazenamento dos ovos\n2. Verificar incubadora (temperatura, umidade, viragem)\n3. Verificar sanidade do lote de reprodução',
      priority: 'alta'
    }
  ],
  technicalSources: [
    'Embrapa Suínos e Aves — Incubação de Ovos de Aves. Circular Técnica, 2018.',
    'Embrapa Meio-Norte — Incubação Natural e Artificial de Galinhas Caipiras. 2019.',
    'MACIEL, R. P. et al. Produção Alternativa de Aves. Editora UFV, 2020.',
    'Associação Brasileira de Avicultura (ABA) — Manual de Incubação de Aves, 2020.',
    'LOPES, D. C. et al. Nutrição e Manejo de Aves de Postura. Editora UFV, 2019.'
  ]
};
