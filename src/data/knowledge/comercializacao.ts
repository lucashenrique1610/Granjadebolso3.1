import { KnowledgeModule } from '@/types';

export const comercializacao: KnowledgeModule = {
  id: 'comercializacao',
  title: 'Comercialização de Ovos e Produtos',
  category: 'negócios',
  summary: 'A comercialização é fundamental para a rentabilidade da granja. Este módulo aborda canais de venda (mercados locais, supermercados, entrega, delivery), precificação, embalagem, qualidade, fidelização de clientes e legislação aplicável.',
  objective: 'Orientar o produtor sobre estratégias de comercialização para ovos e outros produtos da granja, incluindo canais de venda, precificação, qualidade, embalagem e atendimento ao cliente, visando aumentar a rentabilidade.',
  technicalContent: [
    'A comercialização dos produtos da granja (principalmente ovos) é fundamental para gerar renda e garantir a sustentabilidade do negócio. É importante planejar a estratégia de venda para maximizar o lucro.',
    '# 1. Canais de venda comuns para galinhas caipiras: Mercados locais/feiras, venda direta na granja, entrega local (pedidos por telefone/WhatsApp), delivery via apps, supermercados, mercados especializados em produtos orgânicos/caipiras, e venda para comércios locais (padarias, restaurantes).',
    '# 2. Qualidade e padronização: Para vender com sucesso, os ovos devem ser de qualidade: casca intacta e limpa, uniformidade de peso, albúmen e gema de boa qualidade. Padronizar a classificação por peso (Extra, Grande, Média, Pequena, Mini) ajuda na venda.',
    '# 3. Embalagem: As embalagens devem ser limpas, resistentes e adequadas (caixas de papelão com capacidade para 10, 12, 30 ou mais ovos). A embalagem pode ser um diferencial para o produto, com marca e informações da granja.',
    '# 4. Marca e diferenciação: Criar uma marca para a granja ajuda na fidelização. Diferenciais importantes: ovos caipiras, orgânicos (se for o caso), sistema de criação, qualidade, e origem local.',
    '# 5. Precificação: Para definir o preço, considere os custos de produção (ração, medicamentos, galinhas, instalações, mão de obra), a demanda do mercado e o preço dos concorrentes. Calcule o custo por ovo para não vender abaixo do custo.',
    '# 6. Fidelização de clientes: Atendimento de qualidade, entrega regular, qualidade constante, e programas de fidelidade (descontos para clientes frequentes, pequenos brindes) ajudam a manter clientes.',
    '# 7. Legislação e normas: Verifique a legislação local sobre venda de ovos (exigências de higiene, embalagem, registros). Em muitos locais, é necessário ter registro no órgão de sanidade agropecuária.',
    '# 8. Armazenamento e transporte: Durante a comercialização, os ovos devem ser armazenados em ambiente fresco (10 a 15°C) e transportados com cuidado para evitar quebrar.',
    '# 9. Marketing: Use redes sociais (Instagram, Facebook, WhatsApp Business) para divulgar o produto, com fotos de qualidade e informações sobre a granja e o sistema de criação.',
    '# 10. Venda de outros produtos: Além de ovos, você pode vender galinhas abatidas, pintinhos, esterco para adubo, dependendo da estrutura da granja e do mercado local.'
  ],
  importantParameters: [
    {
      name: 'Temperatura de armazenamento para venda',
      unit: '°C',
      idealValue: '10 a 15',
      minValue: '7',
      maxValue: '18',
      description: 'Temperatura ideal para armazenar ovos durante a venda.'
    },
    {
      name: 'Perdas aceitáveis (quebrados/trincados)',
      unit: '%',
      idealValue: '<5',
      minValue: '0',
      maxValue: '10',
      description: 'Percentual máximo aceitável de ovos quebrados/trincados na comercialização.'
    }
  ],
  bestPractices: [
    'Padronizar a classificação dos ovos por peso.',
    'Usar embalagens limpas e com a marca da granja.',
    'Calcular o custo de produção para definir o preço.',
    'Fidelizar clientes com atendimento de qualidade e entrega regular.',
    'Usar redes sociais para divulgar o produto.',
    'Manter a qualidade dos ovos constante.',
    'Armazenar e transportar ovos com cuidado.',
    'Verificar a legislação local sobre venda de ovos.',
    'Oferecer diferentes opções de entrega (retiro na granja, entrega local).',
    'Diferenciar o produto (caipira, orgânico, origem local).'
  ],
  commonProblems: [
    {
      problem: 'Dificuldade para vender ovos',
      possibleCauses: [
        'Mercado competitivo',
        'Preço elevado',
        'Qualidade inadequada',
        'Falta de divulgação',
        'Falta de canais de venda'
      ],
      recommendedSolutions: [
        'Diferenciar o produto (ex: ovos caipiras)',
        'Revisar o preço (verificar custos e concorrência)',
        'Melhorar a qualidade dos ovos',
        'Divulgar nas redes sociais e em feiras locais',
        'Explorar novos canais de venda (delivery, supermercados)'
      ]
    },
    {
      problem: 'Muitos ovos quebrados na venda/transporte',
      possibleCauses: [
        'Embalagem inadequada',
        'Transporte com muito choque',
        'Manuseio inadequado'
      ],
      recommendedSolutions: [
        'Usar embalagens resistentes (caixas com divisórias)',
        'Transporte com cuidado (evitar choques)',
        'Treinar para manejar os ovos com cuidado'
      ]
    },
    {
      problem: 'Clientes não voltam',
      possibleCauses: [
        'Qualidade inconsistente',
        'Atendimento inadequado',
        'Preço elevado'
      ],
      recommendedSolutions: [
        'Manter a qualidade dos ovos constante',
        'Melhorar o atendimento ao cliente',
        'Revisar o preço'
      ]
    }
  ],
  commonMistakes: [
    'Vender ovos com casca suja ou trincada.',
    'Não padronizar o peso dos ovos.',
    'Usar embalagens inadequadas ou sujas.',
    'Vender ovos sem calcular o custo de produção (prejuízo).',
    'Não divulgar o produto.',
    'Não fidelizar clientes.',
    'Não verificar a legislação aplicável.',
    'Transportar/armazenar ovos com cuidado insuficiente.'
  ],
  managementChecklist: [
    { item: 'Classificar e padronizar ovos por peso', frequency: 'Diário', responsible: 'Produtor', critical: false },
    { item: 'Verificar qualidade dos ovos (casca intacta, limpa)', frequency: 'Diário', responsible: 'Produtor', critical: true },
    { item: 'Usar embalagens limpas e adequadas', frequency: 'Todas as vendas', responsible: 'Produtor', critical: false },
    { item: 'Atualizar preços com base nos custos', frequency: 'Mensal', responsible: 'Produtor', critical: false },
    { item: 'Verificar a legislação local', frequency: 'Anual', responsible: 'Produtor', critical: false },
    { item: 'Fazer divulgação do produto', frequency: 'Semanal', responsible: 'Produtor', critical: false }
  ],
  intelligentRules: [
    {
      rule: 'Se percentual de ovos quebrados for >5%, verificar embalagem e transporte',
      condition: 'Muitos ovos quebrados',
      action: '1. Verificar embalagem (usar embalagens com divisórias)\n2. Melhorar o transporte (evitar choques)\n3. Treinar manuseio',
      priority: 'alta'
    },
    {
      rule: 'Se a demanda for baixa, aumentar a divulgação e diferenciar o produto',
      condition: 'Demanda baixa',
      action: '1. Aumentar a divulgação nas redes sociais\n2. Diferenciar o produto (ex: caipira/organico)\n3. Explorar novos canais de venda',
      priority: 'média'
    }
  ],
  technicalSources: [
    'Embrapa Meio-Norte — Comercialização de Ovos Caipiras. 2019.',
    'MACIEL, R. P. et al. Produção Alternativa de Aves. Editora UFV, 2020.',
    'Manual de Negócios para Pequenos Produtores Avícolas — Associação Brasileira de Avicultura (ABA), 2020.',
    'Serviço Brasileiro de Apoio às Micro e Pequenas Empresas (SEBRAE) — Guia de Comercialização para Produtos Agropecuários. 2019.'
  ]
};
