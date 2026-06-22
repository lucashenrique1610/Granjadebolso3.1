import { KnowledgeModule } from '@/types';

export const sanidade: KnowledgeModule = {
  id: 'sanidade',
  title: 'Sanidade para Galinhas de Postura Caipira',
  category: 'sanidade',
  summary: 'O manejo sanitário é fundamental para manter a saúde das aves, prevenir doenças e garantir produtividade. Este módulo aborda limpeza, desinfecção, prevenção de doenças, sinais de alerta e condutas em caso de doença.',
  objective: 'Orientar o produtor sobre o manejo sanitário adequado, incluindo limpeza, desinfecção, prevenção de doenças, sinais de alerta e condutas em caso de problemas de saúde. Sempre que houver suspeita de doença, é fundamental consultar um veterinário qualificado.',
  technicalContent: [
    'A sanidade é um dos pilares da avicultura. Uma granja com bom manejo sanitário tem menos problemas de doenças, melhor produtividade, melhor qualidade dos ovos e maior rentabilidade.',
    '# 1. Limpeza e desinfecção: A limpeza regular das instalações, equipamentos e área externa é fundamental. A desinfecção deve ser feita com produtos específicos para avicultura, seguindo as instruções do fabricante. As instalações devem ser limpas no mínimo semanalmente, e no final de cada lote (vazio sanitário), uma limpeza e desinfecção completa é recomendada.',
    '# 2. Vazio sanitário: É o período em que a granja fica sem aves, com o objetivo de eliminar agentes patogênicos. Recomenda-se no mínimo 2 a 4 semanas, dependendo da história sanitária. Durante este período, é feita limpeza completa, desinfecção e repouso da área.',
    '# 3. Prevenção de doenças: Prevenir é melhor do que curar. Principais medidas: vacinação (seguir calendário veterinário), controle de pragas (roedores, insetos, pássaros), medidas de biosseguridade, limpeza regular, manejo de água e ração, e seleção de fornecedores confiáveis.',
    '# 4. Sinais de doença nas aves: O produtor deve observar as aves diariamente. Principais sinais de alerta: queda de produção, aumento da mortalidade, diminuição do consumo de ração ou água, mudança de comportamento (amontoamento, inatividade), diarreia, sinais respiratórios (tosse, espirro, dificuldade para respirar), mudança na cor ou aparência das penas ou crista, e baixa qualidade dos ovos.',
    '# 5. Condutas em caso de suspeita de doença: Isolar aves doentes ou com sintomas, consultar veterinário imediatamente, evitar entrada de pessoas e animais na área, não medicar sem orientação, e limpar e desinfetar equipamentos usados na área.',
    '# 6. Controle de parasitas: Parásitos internos (vermes) e externos (ácaros, piolhos, carrapatos) causam problemas de saúde e queda de produção. O controle deve ser feito com orientação veterinária e seguindo as recomendações de produto.',
    '# 7. Manejo da mortalidade: Aves mortas devem ser removidas imediatamente e descartadas adequadamente (buraco sanitário, incineração ou compostagem controlada). Não deixar corpos de aves expostos, pois atraem pragas e contaminam o ambiente.',
    '# 8. Registros sanitários: É importante manter registros de: mortalidade diária, sinais de doença observados, vacinações aplicadas, medicamentos usados (com orientação veterinária), e visitas de veterinário. Estes registros ajudam a monitorar a saúde do lote e tomar decisões.'
  ],
  importantParameters: [
    {
      name: 'Mortalidade aceitável (cria)',
      unit: '%',
      idealValue: '<5',
      minValue: '0',
      maxValue: '8',
      description: 'Mortalidade máxima aceitável na fase de cria (0-6 semanas).'
    },
    {
      name: 'Mortalidade aceitável (recria)',
      unit: '%',
      idealValue: '<2',
      minValue: '0',
      maxValue: '4',
      description: 'Mortalidade máxima aceitável na fase de recria (7-16 semanas).'
    },
    {
      name: 'Mortalidade aceitável (postura)',
      unit: '%/semana',
      idealValue: '<0.5',
      minValue: '0',
      maxValue: '1.0',
      description: 'Mortalidade máxima aceitável por semana na fase de postura.'
    },
    {
      name: 'Vazio sanitário (mínimo)',
      unit: 'semanas',
      idealValue: '2 a 4',
      minValue: '2',
      maxValue: '6',
      description: 'Período mínimo de vazio sanitário recomendado entre lotes.'
    }
  ],
  bestPractices: [
    'Limpar instalações e equipamentos regularmente.',
    'Seguir programa de vacinação com orientação veterinária.',
    'Monitorar aves diariamente para sinais de doença.',
    'Remover mortalidade imediatamente.',
    'Descartar mortalidade adequadamente.',
    'Controlar pragas (roedores, insetos, pássaros selvagens).',
    'Manter limpeza da água e ração.',
    'Isolar aves doentes imediatamente.',
    'Consultar veterinário em caso de suspeita de doença.',
    'Manter registros sanitários atualizados.',
    'Fazer vazio sanitário entre lotes, sempre que possível.'
  ],
  commonProblems: [
    {
      problem: 'Aumento da mortalidade',
      possibleCauses: [
        'Doença infecciosa',
        'Manejo inadequado',
        'Problema nutricional',
        'Condições ambientais ruins',
        'Predadores'
      ],
      recommendedSolutions: [
        'Isolar aves com sintomas',
        'Consultar veterinário imediatamente',
        'Verificar manejo (água, ração, temperatura)',
        'Melhorar limpeza e desinfecção'
      ]
    },
    {
      problem: 'Diarreia nas aves',
      possibleCauses: [
        'Água contaminada',
        'Ração estragada ou inadequada',
        'Doença infecciosa',
        'Estresse',
        'Parasitas'
      ],
      recommendedSolutions: [
        'Trocar água e limpar bebedouros',
        'Verificar ração (qualidade e prazo)',
        'Observar sinais de doença',
        'Consultar veterinário'
      ]
    },
    {
      problem: 'Sinais respiratórios (tosse, espirro)',
      possibleCauses: [
        'Doença respiratória infecciosa',
        'Poeira excessiva',
        'Má ventilação',
        'Amônia alta'
      ],
      recommendedSolutions: [
        'Melhorar ventilação (sem correntes de ar)',
        'Reduzir poeira no galpão',
        'Limpar e trocar cama se necessário',
        'Consultar veterinário'
      ]
    },
    {
      problem: 'Presença de parasitas (vermes, piolhos, ácaros)',
      possibleCauses: [
        'Manejo sanitário inadequado',
        'Falta de controle preventivo',
        'Contaminação do ambiente',
        'Entrada de novas aves sem quarentena'
      ],
      recommendedSolutions: [
        'Consultar veterinário para diagnóstico',
        'Seguir tratamento indicado pelo veterinário',
        'Melhorar limpeza do ambiente',
        'Quarentena de novas aves (quando aplicável)'
      ]
    }
  ],
  commonMistakes: [
    'Não consultar veterinário em caso de suspeita de doença.',
    'Medicar aves sem orientação profissional.',
    'Limpar instalações raramente.',
    'Não monitorar aves diariamente.',
    'Deixar mortalidade exposta na granja.',
    'Não fazer vazio sanitário entre lotes.',
    'Não manter registros sanitários.',
    'Controle de pragas negligenciado.',
    'Entrada de pessoas sem limpeza prévia (biosseguridade).',
    'Uso de desinfetantes inadequados ou sem diluição correta.'
  ],
  managementChecklist: [
    { item: 'Observar aves para sinais de doença', frequency: 'Diário', responsible: 'Produtor', critical: true },
    { item: 'Remover mortalidade imediatamente', frequency: 'Diário', responsible: 'Produtor', critical: true },
    { item: 'Limpar instalações e equipamentos', frequency: 'Semanal', responsible: 'Produtor', critical: true },
    { item: 'Verificar limpeza da água e ração', frequency: 'Diário', responsible: 'Produtor', critical: true },
    { item: 'Monitorar mortalidade diária', frequency: 'Diário', responsible: 'Produtor', critical: true },
    { item: 'Manter controle de pragas', frequency: 'Conforme necessidade', responsible: 'Produtor', critical: false },
    { item: 'Seguir programa de vacinação', frequency: 'Conforme calendário', responsible: 'Produtor/Veterinário', critical: true },
    { item: 'Atualizar registros sanitários', frequency: 'Diário', responsible: 'Produtor', critical: false }
  ],
  intelligentRules: [
    {
      rule: 'Se mortalidade aumentar >0.5% em 1 dia ou >1.0% em 1 semana, consultar veterinário urgentemente',
      condition: 'Aumento súbito de mortalidade',
      action: '1. Isolar aves com sintomas imediatamente\n2. Consultar veterinário urgentemente\n3. Melhorar limpeza e desinfecção\n4. Limitar acesso à área afetada',
      priority: 'alta'
    },
    {
      rule: 'Se observar sinais respiratórios ou diarreia em várias aves, consultar veterinário',
      condition: 'Várias aves com sinais de doença',
      action: '1. Observar o lote com atenção\n2. Consultar veterinário\n3. Melhorar ventilação ou limpeza, se necessário',
      priority: 'alta'
    },
    {
      rule: 'Se mortalidade não for removida diariamente, alertar sobre risco sanitário',
      condition: 'Mortalidade não removida por mais de 1 dia',
      action: '1. Remover mortalidade imediatamente\n2. Limpar área e desinfetar se necessário\n3. Iniciar monitoramento mais frequente',
      priority: 'alta'
    }
  ],
  technicalSources: [
    'Embrapa Suínos e Aves — Sanidade na Avicultura de Postura. Circular Técnica, 2017.',
    'Embrapa Meio-Norte — Sanidade em Galinhas Caipiras. 2018.',
    'Manual de Sanidade Avícola — Associação Brasileira de Avicultura (ABA), 2019.',
    'MACIEL, R. P. et al. Produção Alternativa de Aves. Editora UFV, 2020.',
    'BRASIL. Ministério da Agricultura, Pecuária e Abastecimento (MAPA). Instruções Normativas relacionadas à sanidade avícola.'
  ]
};
