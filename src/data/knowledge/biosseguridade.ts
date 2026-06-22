import { KnowledgeModule } from '@/types';

export const biosseguridade: KnowledgeModule = {
  id: 'biosseguridade',
  title: 'Biosseguridade em Granjas de Galinhas de Postura Caipira',
  category: 'sanidade',
  summary: 'A biosseguridade são medidas que previnem a entrada e a disseminação de agentes patogênicos na granja. Este módulo aborda o conceito, medidas essenciais, controle de acesso, limpeza e desinfecção, quarentena e gestão de risco.',
  objective: 'Orientar o produtor sobre a implementação de medidas de biosseguridade na granja, com o objetivo de evitar a entrada e a propagação de doenças infecciosas que comprometem a saúde das aves e a rentabilidade do negócio.',
  technicalContent: [
    'Biosseguridade é o conjunto de medidas que reduz o risco de entrada e disseminação de agentes patogênicos (vírus, bactérias, fungos, parasitas) na granja. É fundamental para a sanidade e a produtividade.',
    '# 1. Conceitos básicos: A biosseguridade é composta por três níveis: conceitual (planejamento da granja), estrutural (instalações físicas) e operacional (práticas diárias).',
    '# 2. Localização da granja: Idealmente, a granja deve estar distante de outras granjas, abatedouros, mercados de aves e estradas de tráfego intenso. A distância mínima recomendada é de 500 m a 1 km (dependendo da região e risco).',
    '# 3. Controle de acesso: É fundamental limitar o acesso à granja. Somente pessoas autorizadas devem entrar. Recomenda-se instalar cercas, placas de "Acesso Restrito" e um portão principal único.',
    '# 4. Módulo de entrada: Sempre que possível, ter um módulo de entrada com troca de sapatos, banho (se for o caso) e troca de roupas e equipamentos. O ideal é não usar sapatos e roupas da rua dentro da área de criação.',
    '# 5. Pedilúvio ou pé-de-galinha: Um recipiente com desinfetante (solução adequada para avicultura) na entrada de cada galpão ou área de criação. É importante manter a solução sempre limpa e com concentração correta, trocando-a regularmente.',
    '# 6. Limpeza e desinfecção de equipamentos: Equipamentos que entram na granja (caixas, ferramentas, veículos) devem ser limpos e desinfetados. Sempre que possível, evite compartilhar equipamentos com outras granjas.',
    '# 7. Quarentena de novas aves: Sempre que comprar novas aves, coloque-as em quarentena (separadas do resto do lote) por pelo menos 2 a 4 semanas. Isso ajuda a evitar a introdução de doenças.',
    '# 8. Controle de pragas: Roedores, insetos (moscas, mosquitos) e pássaros selvagens são vetores de doenças. Deve-se implementar um programa de controle de pragas com orientação profissional.',
    '# 9. Manejo de mortalidade: Aves mortas devem ser removidas e descartadas adequadamente (buraco sanitário, incineração ou compostagem controlada) imediatamente, para evitar atrair pragas e disseminar patógenos.',
    '# 10. Limitação de visitas: Evite visitas não essenciais à granja. Se houver visitas, exigir troca de roupas e sapatos e limitar o acesso às áreas essenciais.',
    '# 11. Água e ração: Garantir que a água esteja limpa e própria para consumo. A ração deve ser armazenada em local seco e limpo, protegida de pragas e sem contato com o chão.',
    '# 12. Limpeza e desinfecção rotineira: Instalações, equipamentos e galpões devem ser limpos e desinfetados regularmente, seguindo um cronograma e usando produtos adequados para avicultura.'
  ],
  importantParameters: [
    {
      name: 'Distância mínima de outras granjas',
      unit: 'm',
      idealValue: '≥500',
      minValue: '300',
      maxValue: '1000+',
      description: 'Distância mínima recomendada entre granjas para reduzir risco de contaminação.'
    },
    {
      name: 'Período de quarentena de novas aves',
      unit: 'semanas',
      idealValue: '2 a 4',
      minValue: '2',
      maxValue: '6',
      description: 'Período mínimo de quarentena para novas aves antes de introduzir no lote principal.'
    },
    {
      name: 'Troca de desinfetante no pedilúvio',
      unit: 'dias',
      idealValue: '≤3',
      minValue: '1',
      maxValue: '7',
      description: 'Frequência máxima recomendada para trocar a solução desinfetante no pedilúvio.'
    }
  ],
  bestPractices: [
    'Implementar controle de acesso rigoroso à granja.',
    'Ter módulo de entrada com troca de sapatos/roupas sempre que possível.',
    'Usar pedilúvio com desinfetante adequado na entrada dos galpões.',
    'Manter quarentena para novas aves.',
    'Controlar pragas (roedores, insetos, pássaros selvagens).',
    'Limitar visitas à granja.',
    'Limpar e desinfetar equipamentos e veículos regularmente.',
    'Armazenar ração em local adequado (seco, limpo, alto).',
    'Garantir qualidade da água.',
    'Descartar mortalidade imediatamente e adequadamente.',
    'Limpar e desinfetar instalações regularmente.',
    'Seguir medidas de vacinação e sanidade com orientação veterinária.'
  ],
  commonProblems: [
    {
      problem: 'Entrada de pessoas não autorizadas',
      possibleCauses: [
        'Falta de cerca ou controle de acesso',
        'Portão aberto ou sem cadeado',
        'Aviso inadequado'
      ],
      recommendedSolutions: [
        'Instalar cerca e portão com cadeado',
        'Colocar placas de "Acesso Restrito"',
        'Treinar equipe para controlar acesso'
      ]
    },
    {
      problem: 'Controle de pragas inadequado',
      possibleCauses: [
        'Armazenamento de ração inadequado',
        'Descarte de mortalidade inadequado',
        'Falta de limpeza regular'
      ],
      recommendedSolutions: [
        'Melhorar armazenamento da ração',
        'Descartar mortalidade adequadamente',
        'Aumentar frequência de limpeza',
        'Implementar programa de controle de pragas'
      ]
    },
    {
      problem: 'Quarentena não aplicada',
      possibleCauses: [
        'Falta de área separada para quarentena',
        'Desconhecimento da importância',
        'Pressão para introduzir rapidamente'
      ],
      recommendedSolutions: [
        'Preparar área para quarentena',
        'Compreender risco de não fazer quarentena',
        'Sempre aplicar quarentena, mesmo que demore'
      ]
    },
    {
      problem: 'Pedilúvio inadequado ou sem solução',
      possibleCauses: [
        'Desconhecimento da importância',
        'Solução secou ou expirou',
        'Esquecimento de trocar'
      ],
      recommendedSolutions: [
        'Incluir verificação do pedilúvio no checklist',
        'Trocar solução regularmente',
        'Garantir que sempre haja solução no pedilúvio'
      ]
    }
  ],
  commonMistakes: [
    'Permitir acesso livre à granja.',
    'Não fazer quarentena de novas aves.',
    'Usar sapatos/roupas da rua dentro da área de criação.',
    'Pedilúvio sem solução ou com solução inadequada.',
    'Compartilhar equipamentos com outras granjas.',
    'Negligenciar controle de pragas.',
    'Deixar mortalidade exposta por muito tempo.',
    'Armazenar ração diretamente no chão.',
    'Limpar instalações raramente.',
    'Não verificar procedimentos de biosseguridade regularmente.'
  ],
  managementChecklist: [
    { item: 'Verificar portões e controles de acesso', frequency: 'Diário', responsible: 'Produtor', critical: true },
    { item: 'Verificar pedilúvio e solução desinfetante', frequency: 'Diário', responsible: 'Produtor', critical: true },
    { item: 'Remover mortalidade e descartar adequadamente', frequency: 'Diário', responsible: 'Produtor', critical: true },
    { item: 'Verificar armazenamento da ração', frequency: 'Diário', responsible: 'Produtor', critical: false },
    { item: 'Limpar e desinfetar instalações', frequency: 'Semanal', responsible: 'Produtor', critical: true },
    { item: 'Controlar pragas (monitoramento)', frequency: 'Semanal', responsible: 'Produtor', critical: false },
    { item: 'Revisar medidas de biosseguridade', frequency: 'Mensal', responsible: 'Produtor', critical: false }
  ],
  intelligentRules: [
    {
      rule: 'Se pedilúvio estiver sem solução ou com solução inadequada, alertar para preenchimento',
      condition: 'Pedilúvio inadequado',
      action: '1. Preparar nova solução desinfetante\n2. Limpar e encher o pedilúvio\n3. Incluir verificação no checklist diário',
      priority: 'alta'
    },
    {
      rule: 'Se houver novas aves e quarentena não for aplicada, alertar sobre risco',
      condition: 'Novas aves sem quarentena',
      action: '1. Isolar novas aves imediatamente\n2. Manter em quarentena por período recomendado\n3. Consultar veterinário',
      priority: 'alta'
    },
    {
      rule: 'Se mortalidade não for removida diariamente, alertar sobre risco de pragas',
      condition: 'Mortalidade não removida por >24h',
      action: '1. Remover mortalidade imediatamente\n2. Descartar adequadamente\n3. Limpar e desinfetar área',
      priority: 'alta'
    }
  ],
  technicalSources: [
    'Embrapa Suínos e Aves — Biosseguridade na Avicultura. Circular Técnica, 2018.',
    'Embrapa Meio-Norte — Galinhas Caipiras: Biosseguridade e Sanidade. 2019.',
    'Manual de Sanidade Avícola — Associação Brasileira de Avicultura (ABA), 2020.',
    'Organização Mundial de Saúde Animal (OIE) — Princípios de Biosseguridade na Avicultura.',
    'BRASIL. Ministério da Agricultura e Pecuária (MAPA) — Normas de Biosseguridade para Aves. 2021.'
  ]
};
