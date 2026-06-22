import { KnowledgeModule } from '@/types';

export const custos: KnowledgeModule = {
  id: 'custos',
  title: 'Gestão de Custos da Granja',
  category: 'negócios',
  summary: 'A gestão de custos é fundamental para a rentabilidade. Este módulo aborda classificação de custos (fixos/variáveis), custos principais da granja, como registrar e controlar gastos, análise de custos e estratégias de redução de custos.',
  objective: 'Orientar o produtor sobre como classificar, registrar, controlar e analisar os custos da granja, visando otimizar gastos e aumentar a rentabilidade.',
  technicalContent: [
    'A gestão de custos é essencial para saber se a granja está dando lucro ou prejuízo, e onde é possível economizar. Registrar todas as entradas e saídas é o primeiro passo.',
    '# 1. Classificação de custos: Custos fixos (não variam com a produção: instalações, equipamentos, seguro, mão de obra fixa) e custos variáveis (variam com a produção: ração, medicamentos, vacinas, embalagens, combustível).',
    '# 2. Principais custos de uma granja de postura: Ração (geralmente o maior custo, 60-70% do total), galinhas/pintinhos, medicamentos/vacinas, embalagens, mão de obra, energia elétrica, água, manutenção de instalações/equipamentos, e transporte.',
    '# 3. Registro de custos: Anote todas as despesas (data, valor, tipo: ração, medicamentos, etc.). Você pode usar planilhas (Excel/Google Sheets), cadernos ou aplicativos de gestão financeira.',
    '# 4. Cálculo de custo por ovo: Para calcular o custo por ovo, divida os custos totais do período pela quantidade de ovos vendidos. Isso ajuda a definir o preço de venda (não venda abaixo do custo!).',
    '# 5. Análise de custos: Periodicamente analise os custos para verificar onde está gastando mais e onde pode economizar. Compare seus custos com valores de referência (se possível).',
    '# 6. Estratégias para reduzir custos: Economizar ração (evitar desperdício, usar ração adequada para cada fase), reduzir mortalidade (melhorar sanidade e manejo), economizar energia/água, comprar insumos em quantidade (se for vantajoso), e fazer manutenção preventiva (evita gastos maiores).',
    '# 7. Receitas: Anote também todas as receitas (venda de ovos, venda de galinhas, venda de esterco, etc.). Para ter lucro, as receitas devem ser maiores que os custos.',
    '# 8. Balanço: Periodicamente (mensal ou anual) faça um balanço: total de receitas menos total de custos. Se o resultado for positivo, houve lucro; se negativo, prejuízo.',
    '# 9. Impostos e obrigações: Verifique as obrigações fiscais da sua granja (emissão de notas fiscais, declarações, impostos). Isso também é parte dos custos.',
    '# 10. Planejamento financeiro: Planeje os gastos para os próximos meses (por exemplo, compra de ração, vacinas). Isso ajuda a evitar surpresas.'
  ],
  importantParameters: [
    {
      name: 'Custo da ração em relação ao total',
      unit: '%',
      idealValue: '60-70',
      minValue: '50',
      maxValue: '80',
      description: 'Percentual típico do custo da ração em relação ao custo total da granja.'
    },
    {
      name: 'Margem de lucro ideal',
      unit: '%',
      idealValue: '15-30',
      minValue: '5',
      maxValue: '50',
      description: 'Margem de lucro ideal para granjas de postura (varia por sistema e mercado).'
    }
  ],
  bestPractices: [
    'Registrar todas as despesas e receitas diariamente.',
    'Classificar os custos em fixos e variáveis.',
    'Calcular o custo por ovo para definir o preço de venda.',
    'Analisar os custos periodicamente (mensalmente).',
    'Economizar ração (evitar desperdício).',
    'Fazer manutenção preventiva de instalações e equipamentos.',
    'Comprar insumos em quantidade (se for vantajoso).',
    'Fazer um balanço mensal ou anual.',
    'Planejar os gastos para os próximos meses.',
    'Consultar um contador ou especialista em finanças (se necessário).'
  ],
  commonProblems: [
    {
      problem: 'Não sabe se tem lucro ou prejuízo',
      possibleCauses: [
        'Não registra despesas/receitas',
        'Não calcula o custo por ovo',
        'Não faz balanço'
      ],
      recommendedSolutions: [
        'Comece a registrar todas as entradas e saídas',
        'Calcule o custo por ovo',
        'Faça um balanço mensal'
      ]
    },
    {
      problem: 'Custos muito elevados',
      possibleCauses: [
        'Desperdício de ração',
        'Mortalidade alta',
        'Custos de energia/água elevados',
        'Compra de insumos em quantidades pequenas'
      ],
      recommendedSolutions: [
        'Reduza o desperdício de ração',
        'Melhore a sanidade para reduzir mortalidade',
        'Economize energia/água',
        'Compre insumos em quantidade (se vantajoso)'
      ]
    },
    {
      problem: 'Preço de venda abaixo do custo',
      possibleCauses: [
        'Não calculou o custo por ovo',
        'Não atualizou o preço com o aumento dos custos'
      ],
      recommendedSolutions: [
        'Calcule o custo por ovo',
        'Atualize o preço de venda periodicamente'
      ]
    }
  ],
  commonMistakes: [
    'Não registra despesas/receitas.',
    'Não calcula o custo por ovo.',
    'Vende ovos abaixo do custo.',
    'Desperdiça ração.',
    'Não faz manutenção preventiva.',
    'Não analisa os custos periodicamente.',
    'Não planeja os gastos.',
    'Não verifica as obrigações fiscais.'
  ],
  managementChecklist: [
    { item: 'Registrar todas as despesas e receitas', frequency: 'Diário', responsible: 'Produtor', critical: true },
    { item: 'Classificar custos em fixos/variáveis', frequency: 'Mensal', responsible: 'Produtor', critical: false },
    { item: 'Calcular custo por ovo', frequency: 'Mensal', responsible: 'Produtor', critical: true },
    { item: 'Fazer balanço mensal', frequency: 'Mensal', responsible: 'Produtor', critical: true },
    { item: 'Analisar custos para identificar economias', frequency: 'Mensal', responsible: 'Produtor', critical: false },
    { item: 'Verificar obrigações fiscais', frequency: 'Anual', responsible: 'Produtor', critical: false }
  ],
  intelligentRules: [
    {
      rule: 'Se preço de venda for menor que custo por ovo, aumentar preço ou reduzir custos',
      condition: 'Preço < custo',
      action: '1. Recalcule o custo por ovo\n2. Aumente o preço de venda ou encontre formas de reduzir custos',
      priority: 'alta'
    },
    {
      rule: 'Se custo da ração for >80% do total, verificar desperdício e preço da ração',
      condition: 'Custo ração elevado',
      action: '1. Verifique o desperdício de ração\n2. Verifique o preço da ração (comprar em quantidade?)\n3. Verifique se a ração é adequada para a fase das aves',
      priority: 'alta'
    }
  ],
  technicalSources: [
    'MACIEL, R. P. et al. Produção Alternativa de Aves. Editora UFV, 2020.',
    'Manual de Gestão Financeira para Pequenos Produtores — Associação Brasileira de Avicultura (ABA), 2020.',
    'Serviço Brasileiro de Apoio às Micro e Pequenas Empresas (SEBRAE) — Guia de Gestão de Custos para Pequenos Negócios. 2019.',
    'LOPES, D. C. et al. Nutrição e Manejo de Aves de Postura. Editora UFV, 2019.'
  ]
};
