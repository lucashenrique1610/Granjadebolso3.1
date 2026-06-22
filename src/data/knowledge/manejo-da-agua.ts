import { KnowledgeModule } from '@/types';

export const manejoDaAgua: KnowledgeModule = {
  id: 'manejo-da-agua',
  title: 'Manejo da Água para Galinhas de Postura Caipira',
  category: 'manejo',
  summary: 'A água é o nutriente mais importante para as aves. Este módulo aborda a importância da água, qualidade, consumo, tipos de bebedouros e manejo adequado.',
  objective: 'Orientar o produtor sobre a importância da água, qualidade, consumo, manejo dos bebedouros e problemas comuns relacionados à água.',
  technicalContent: [
    'A água é o nutriente mais importante para as aves, correspondendo a aproximadamente 70% do peso corporal. É essencial para: digestão, absorção de nutrientes, transporte de substâncias, regulação da temperatura corporal, eliminação de resíduos e produção de ovos (os ovos contêm cerca de 70% de água).',
    'As aves consomem aproximadamente 2 a 3 vezes mais água que ração. O consumo de água varia com: temperatura ambiente (aumenta com calor), idade (aumenta com o crescimento), produção (aves em postura consomem mais), nível de sal na ração e saúde das aves.',
    '# 1. Qualidade da água: A água deve ser limpa, fresca, inodora, incolor e própria para consumo humano. A qualidade da água afeta: consumo de ração, saúde das aves, produtividade e qualidade dos ovos.',
    '# 2. Principais contaminantes: Micro-organismos (bactérias, vírus, fungos), produtos químicos (ferro, manganês, nitratos, pesticidas), resíduos orgânicos.',
    '# 3. Tipos de bebedouros: Bebedouro de copo, bebedouro de nipple, bebedouro de canaleta, bebedouro de suspensão. Cada tipo tem vantagens e desvantagens em limpeza, consumo e desperdício.',
    '# 4. Localização dos bebedouros: Devem ser facilmente acessíveis a todas as aves, protegidos do sol e da chuva, nivelados, sem obstáculos. Recomenda-se no mínimo um ponto de acesso a cada 5 a 8 aves, dependendo do tipo de bebedouro.',
    '# 5. Limpeza dos bebedouros: É fundamental para evitar contaminação. Devem ser limpos regularmente (diariamente ou no mínimo 2 a 3 vezes por semana) com água e sabão, seguido de enxágue abundante. Em casos de problemas sanitários, pode ser necessário usar desinfetante adequado para avicultura.',
    '# 6. Manejo em diferentes temperaturas: No calor, é fundamental garantir água fresca à vontade, aumentar a frequência de limpeza e verificar mais vezes. No frio, evitar água gelada ou congelada, manter água à temperatura ambiente.',
    '# 7. Monitoramento do consumo: O consumo de água é um excelente indicador de saúde e bem-estar das aves. Uma redução súbita no consumo pode indicar: doença, estresse, problema ambiental, má qualidade da água ou falta de água.'
  ],
  importantParameters: [
    {
      name: 'Consumo de água (cria)',
      unit: 'mL/ave/dia',
      idealValue: '50 a 100',
      minValue: '40',
      maxValue: '120',
      description: 'Consumo de pintinhos de 1 a 6 semanas (varia com temperatura).'
    },
    {
      name: 'Consumo de água (recria)',
      unit: 'mL/ave/dia',
      idealValue: '100 a 200',
      minValue: '80',
      maxValue: '250',
      description: 'Consumo de aves de 7 a 16 semanas (varia com temperatura).'
    },
    {
      name: 'Consumo de água (postura)',
      unit: 'mL/ave/dia',
      idealValue: '200 a 400',
      minValue: '150',
      maxValue: '500',
      description: 'Consumo de aves em postura (varia muito com temperatura).'
    },
    {
      name: 'Relação água/ração',
      unit: 'mL água/g ração',
      idealValue: '2.0 a 3.0',
      minValue: '1.8',
      maxValue: '3.5',
      description: 'Relação entre consumo de água e ração (aumenta com temperatura).'
    },
    {
      name: 'pH da água',
      unit: 'pH',
      idealValue: '6.5 a 7.5',
      minValue: '6.0',
      maxValue: '8.0',
      description: 'pH ideal para água de bebida das aves.'
    },
    {
      name: 'Temperatura da água',
      unit: '°C',
      idealValue: '15 a 25',
      minValue: '10',
      maxValue: '30',
      description: 'Temperatura ideal da água para consumo.'
    },
    {
      name: 'Bebedouros/aves',
      unit: 'aves/bebedouro',
      idealValue: '5 a 8',
      minValue: '4',
      maxValue: '10',
      description: 'Número ideal de aves por ponto de acesso a água (varia com tipo de bebedouro).'
    }
  ],
  bestPractices: [
    'Fornecer água limpa e fresca à vontade 24 horas por dia.',
    'Limpar bebedouros regularmente (2-3 vezes por semana).',
    'Usar água própria para consumo humano sempre que possível.',
    'Garantir que todas as aves tenham acesso fácil à água.',
    'Proteger bebedouros do sol, chuva e contaminação.',
    'Monitorar consumo de água diariamente.',
    'Verificar qualidade da água periodicamente.',
    'No calor, trocar água mais frequentemente para manter fresca.',
    'Evitar usar medicamentos na água sem orientação veterinária.',
    'Ter bebedouros de reserva para emergências.'
  ],
  commonProblems: [
    {
      problem: 'Água suja ou contaminada',
      possibleCauses: [
        'Limpeza rara dos bebedouros',
        'Fonte de água contaminada',
        'Material orgânico na água',
        'Pratos ou bebedouros expostos a poeira'
      ],
      recommendedSolutions: [
        'Limpar bebedouros com água e sabão',
        'Enxágue abundantemente após limpeza',
        'Verificar fonte de água',
        'Proteger bebedouros da poeira e sujeira'
      ]
    },
    {
      problem: 'Baixo consumo de água',
      possibleCauses: [
        'Água com gosto ou cheiro ruim',
        'Água muito quente ou muito fria',
        'Bebedouros inacessíveis',
        'Doenças nas aves',
        'Falta de limpeza'
      ],
      recommendedSolutions: [
        'Verificar qualidade e temperatura da água',
        'Ajustar localização dos bebedouros',
        'Limpar bebedouros',
        'Observar sinais de doença nas aves'
      ]
    },
    {
      problem: 'Muita água desperdiçada',
      possibleCauses: [
        'Bebedouros inadequados',
        'Pressão de água alta',
        'Bebedouros mal nivelados',
        'Uso de bebedouros de canaleta'
      ],
      recommendedSolutions: [
        'Ajustar pressão de água (se houver)',
        'Trocar tipo de bebedouro se necessário',
        'Nivelar bebedouros corretamente'
      ]
    },
    {
      problem: 'Aves não conseguem acessar água',
      possibleCauses: [
        'Bebedouros em altura inadequada',
        'Muitas aves por bebedouro',
        'Piso escorregadio ou obstáculos',
        'Falta de bebedouros'
      ],
      recommendedSolutions: [
        'Ajustar altura dos bebedouros conforme idade',
        'Aumentar número de bebedouros',
        'Remover obstáculos e melhorar piso'
      ]
    }
  ],
  commonMistakes: [
    'Não fornecer água à vontade 24h/dia.',
    'Limpar bebedouros raramente.',
    'Usar água de qualidade ruim para consumo.',
    'Não monitorar o consumo de água.',
    'Poucos bebedouros para o número de aves.',
    'Bebedouros em localização inadequada.',
    'Deixar bebedouros expostos ao sol direto.',
    'Não ter bebedouros de reserva para emergências.',
    'Uso de medicamentos na água sem orientação veterinária.',
    'Negligenciar a temperatura da água no calor e frio extremos.'
  ],
  managementChecklist: [
    { item: 'Conferir água disponível à vontade', frequency: 'Diário', responsible: 'Produtor', critical: true },
    { item: 'Conferir qualidade e temperatura da água', frequency: 'Diário', responsible: 'Produtor', critical: true },
    { item: 'Limpar bebedouros', frequency: '2-3x/semana', responsible: 'Produtor', critical: true },
    { item: 'Monitorar consumo de água', frequency: 'Diário', responsible: 'Produtor', critical: true },
    { item: 'Verificar localização e acessibilidade dos bebedouros', frequency: 'Semanal', responsible: 'Produtor', critical: false },
    { item: 'Verificar proteção dos bebedouros (sol/chuva)', frequency: 'Semanal', responsible: 'Produtor', critical: false },
    { item: 'Testar qualidade da água', frequency: 'Trimestral', responsible: 'Produtor', critical: false }
  ],
  intelligentRules: [
    {
      rule: 'Se consumo de água diminuir >10%, verificar qualidade, temperatura, limpeza e saúde das aves',
      condition: 'Consumo de água reduzido >10%',
      action: '1. Verificar qualidade e gosto da água\n2. Verificar temperatura da água\n3. Limpar bebedouros\n4. Observar sinais de doença nas aves\n5. Verificar se bebedouros estão acessíveis',
      priority: 'alta'
    },
    {
      rule: 'Se água ficar suja rapidamente, aumentar frequência de limpeza',
      condition: 'Água suja com frequência',
      action: '1. Limpar bebedouros diariamente\n2. Verificar fonte de água\n3. Proteger bebedouros de poeira',
      priority: 'média'
    },
    {
      rule: 'Se temperatura >30°C, garantir água fresca à vontade e verificar mais vezes',
      condition: 'Temperatura ambiente >30°C',
      action: '1. Trocar água mais frequentemente para manter fresca\n2. Garantir sombra nos bebedouros\n3. Verificar disponibilidade de água várias vezes por dia',
      priority: 'alta'
    }
  ],
  technicalSources: [
    'Embrapa Suínos e Aves — Água na Nutrição de Aves. Circular Técnica, 2016.',
    'Embrapa Meio-Norte — Galinhas Caipiras: Manejo da Água. 2018.',
    'Manual de Manejo de Aves de Postura — Associação Brasileira de Avicultura (ABA), 2019.',
    'LOPES, D. C. et al. Nutrição e Manejo de Aves de Postura. Editora UFV, 2019.',
    'BRASIL. Ministério da Saúde. Portaria GM/MS nº 888, de 4 de maio de 2021. Aprova o Regulamento Técnico de Qualidade da Água para Consumo Humano.'
  ]
};
