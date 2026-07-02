import {
  AnimalRecord,
  GalpaoRecord,
  HealthProfessionalRecord,
  HealthRecord,
  HealthAlert,
  MortalityRecord,
  VeterinaryStockRecord,
  NutritionalPhase,
} from '@/types';

const DAY_IN_MS = 1000 * 60 * 60 * 24;

// Nutritional targets per phase - updated for technical accuracy
export const NUTRITIONAL_TARGETS: Record<NutritionalPhase, {
  protein: { min: number; max: number };
  energy: { min: number; max: number };
  calcium: { min: number; max: number };
  phosphorus: { min: number; max: number };
  methionine: { min: number; max: number };
  metCis: { min: number; max: number };
  lysine: { min: number; max: number };
  fiber: { min: number; max: number };
  consumption: number; // g/ave/day
}> = {
  inicial_1_21: {
    protein: { min: 21, max: 23 },
    energy: { min: 2900, max: 3100 },
    calcium: { min: 0.9, max: 1.1 },
    phosphorus: { min: 0.45, max: 0.6 },
    methionine: { min: 0.45, max: 0.55 },
    metCis: { min: 0.8, max: 0.95 },
    lysine: { min: 1.1, max: 1.3 },
    fiber: { min: 2.5, max: 4 },
    consumption: 35
  },
  crescimento_1_22_42: {
    protein: { min: 19, max: 21 },
    energy: { min: 2850, max: 3050 },
    calcium: { min: 0.8, max: 1.0 },
    phosphorus: { min: 0.4, max: 0.55 },
    methionine: { min: 0.4, max: 0.5 },
    metCis: { min: 0.7, max: 0.85 },
    lysine: { min: 0.95, max: 1.15 },
    fiber: { min: 3, max: 5 },
    consumption: 60
  },
  crescimento_2_43_105: {
    protein: { min: 17, max: 19 },
    energy: { min: 2800, max: 3000 },
    calcium: { min: 0.7, max: 0.9 },
    phosphorus: { min: 0.35, max: 0.5 },
    methionine: { min: 0.35, max: 0.45 },
    metCis: { min: 0.65, max: 0.8 },
    lysine: { min: 0.85, max: 1.05 },
    fiber: { min: 3.5, max: 5.5 },
    consumption: 90
  },
  pre_postura_106_126: {
    protein: { min: 16, max: 18 },
    energy: { min: 2750, max: 2950 },
    calcium: { min: 2.0, max: 2.5 },
    phosphorus: { min: 0.4, max: 0.55 },
    methionine: { min: 0.38, max: 0.48 },
    metCis: { min: 0.7, max: 0.85 },
    lysine: { min: 0.8, max: 1.0 },
    fiber: { min: 3, max: 6 },
    consumption: 100
  },
  postura: {
    protein: { min: 16.5, max: 18.5 },
    energy: { min: 2700, max: 2900 },
    calcium: { min: 3.5, max: 4.0 },
    phosphorus: { min: 0.38, max: 0.52 },
    methionine: { min: 0.38, max: 0.48 },
    metCis: { min: 0.72, max: 0.88 },
    lysine: { min: 0.78, max: 0.98 },
    fiber: { min: 3, max: 6.5 },
    consumption: 115
  }
};

export const getBirdAgeInDays = (birthDate: string): number => {
  const birth = new Date(birthDate);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - birth.getTime());
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};

export const getPhaseByAge = (ageDays: number): NutritionalPhase => {
  if (ageDays <= 21) return 'inicial_1_21';
  if (ageDays <= 42) return 'crescimento_1_22_42';
  if (ageDays <= 105) return 'crescimento_2_43_105';
  if (ageDays <= 126) return 'pre_postura_106_126';
  return 'postura';
};

export function getAnimalCurrentQuantity(animal: Pick<AnimalRecord, 'quantity' | 'currentQuantity'>) {
  return Math.max(0, Number(animal.currentQuantity ?? animal.quantity ?? 0));
}

export function getAnimalLabel(animal: Pick<AnimalRecord, 'tag' | 'species' | 'quantity' | 'currentQuantity'>) {
  return `${animal.tag} • ${animal.species} • ${getAnimalCurrentQuantity(animal)} aves vivas`;
}

export function getGalpaoLabel(galpao: Pick<GalpaoRecord, 'name' | 'code'>) {
  return galpao.code ? `${galpao.name} • ${galpao.code}` : galpao.name;
}

export function canProfessionalManageHealth(professional: HealthProfessionalRecord | undefined | null) {
  return Boolean(professional?.isActive && professional.accessLevel !== 'visualizacao');
}

export function adjustAnimalPopulation(animal: AnimalRecord, deltaBirds: number): AnimalRecord {
  return {
    ...animal,
    currentQuantity: Math.max(0, getAnimalCurrentQuantity(animal) + deltaBirds),
  };
}

export function adjustGalpaoPopulation(galpao: GalpaoRecord, deltaBirds: number): GalpaoRecord {
  return {
    ...galpao,
    currentBirdCount: Math.max(0, Number(galpao.currentBirdCount ?? 0) + deltaBirds),
  };
}

export function daysUntil(date: string) {
  if (!date) return Number.POSITIVE_INFINITY;
  const target = new Date(date);
  if (Number.isNaN(target.getTime())) return Number.POSITIVE_INFINITY;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - today.getTime()) / DAY_IN_MS);
}

export function getVeterinaryStockStatus(item: VeterinaryStockRecord) {
  const remainingDays = daysUntil(item.expirationDate);
  return {
    remainingDays,
    isExpired: remainingDays < 0,
    isExpiringSoon: remainingDays >= 0 && remainingDays <= 30,
    isLowStock: item.quantity <= item.minimumStock,
  };
}

export function summarizeVeterinaryStock(items: VeterinaryStockRecord[]) {
  const totals = items.reduce(
    (accumulator, item) => {
      const status = getVeterinaryStockStatus(item);
      if (status.isExpired) accumulator.expired += 1;
      if (status.isExpiringSoon) accumulator.expiringSoon += 1;
      if (status.isLowStock) accumulator.lowStock += 1;
      accumulator.estimatedValue += item.quantity * item.costPerUnit;
      return accumulator;
    },
    { expired: 0, expiringSoon: 0, lowStock: 0, estimatedValue: 0 },
  );

  return {
    ...totals,
    totalItems: items.length,
    totalAlerts: totals.expired + totals.expiringSoon + totals.lowStock,
  };
}

export function buildHealthReport(records: HealthRecord[], animals: AnimalRecord[], galpoes: GalpaoRecord[]) {
  const animalMap = new Map(animals.map((animal) => [animal.id, animal]));
  const galpaoMap = new Map(galpoes.map((galpao) => [galpao.id, galpao]));
  const byAnimal = new Map<
    string,
    { label: string; interventions: number; affectedBirds: number; recovered: number; totalCost: number; basePopulation: number }
  >();
  const byGalpao = new Map<
    string,
    { label: string; interventions: number; affectedBirds: number; recovered: number; totalCost: number; basePopulation: number }
  >();

  records.forEach((record) => {
    const animal = animalMap.get(record.animalId);
    const galpao = galpaoMap.get(record.galpaoId);
    const animalBasePopulation = animal ? Math.max(1, getAnimalCurrentQuantity(animal)) : 1;
    const galpaoBasePopulation = galpao ? Math.max(1, galpao.currentBirdCount || 0) : animalBasePopulation;

    if (animal) {
      const current = byAnimal.get(record.animalId) ?? {
        label: animal.tag,
        interventions: 0,
        affectedBirds: 0,
        recovered: 0,
        totalCost: 0,
        basePopulation: animalBasePopulation,
      };
      current.interventions += 1;
      current.affectedBirds += record.affectedBirdCount;
      current.totalCost += record.estimatedCost;
      if (record.recoveryStatus === 'recuperado') current.recovered += 1;
      byAnimal.set(record.animalId, current);
    }

    if (galpao) {
      const current = byGalpao.get(record.galpaoId) ?? {
        label: galpao.name,
        interventions: 0,
        affectedBirds: 0,
        recovered: 0,
        totalCost: 0,
        basePopulation: galpaoBasePopulation,
      };
      current.interventions += 1;
      current.affectedBirds += record.affectedBirdCount;
      current.totalCost += record.estimatedCost;
      if (record.recoveryStatus === 'recuperado') current.recovered += 1;
      byGalpao.set(record.galpaoId, current);
    }
  });

  const normalizeReport = (items: Iterable<{ label: string; interventions: number; affectedBirds: number; recovered: number; totalCost: number; basePopulation: number }>) =>
    Array.from(items)
      .map((item) => ({
        ...item,
        incidencePercent: item.basePopulation > 0 ? (item.affectedBirds / item.basePopulation) * 100 : 0,
        recoveryRatePercent: item.interventions > 0 ? (item.recovered / item.interventions) * 100 : 0,
      }))
      .sort((left, right) => right.incidencePercent - left.incidencePercent);

  const totalRecovered = records.filter((record) => record.recoveryStatus === 'recuperado').length;

  return {
    totalInterventions: records.length,
    totalCost: records.reduce((sum, record) => sum + record.estimatedCost, 0),
    recoveryRatePercent: records.length > 0 ? (totalRecovered / records.length) * 100 : 0,
    byAnimal: normalizeReport(byAnimal.values()),
    byGalpao: normalizeReport(byGalpao.values()),
  };
}

export function calculateMortalityRate(deadCount: number, populationBase: number) {
  if (!populationBase || populationBase <= 0) return 0;
  return (deadCount / populationBase) * 100;
}

export function buildMortalityReport(
  records: MortalityRecord[],
  animals: AnimalRecord[],
) {
  const animalMap = new Map(animals.map((animal) => [animal.id, animal]));

  const byAnimal = new Map<string, { label: string; deadBirds: number; populationBase: number }>();
  const dailyTotals = new Map<string, number>();

  records.forEach((record) => {
    const animal = animalMap.get(record.animalId);

    if (animal) {
      const current = byAnimal.get(record.animalId) ?? {
        label: animal.tag,
        deadBirds: 0,
        populationBase: Math.max(1, animal.quantity),
      };
      current.deadBirds += record.deadCount;
      byAnimal.set(record.animalId, current);
    }

    const dayKey = record.date.slice(0, 10);
    dailyTotals.set(dayKey, (dailyTotals.get(dayKey) || 0) + record.deadCount);
  });

  return {
    totalOccurrences: records.length,
    totalDeadBirds: records.reduce((sum, record) => sum + record.deadCount, 0),
    byAnimal: Array.from(byAnimal.values())
      .map((item) => ({
        ...item,
        mortalityRatePercent: calculateMortalityRate(item.deadBirds, item.populationBase),
      }))
      .sort((left, right) => right.mortalityRatePercent - left.mortalityRatePercent),
    dailyTrend: Array.from(dailyTotals.entries())
      .map(([date, deadBirds]) => ({ date, deadBirds }))
      .sort((left, right) => left.date.localeCompare(right.date)),
  };
}

// ---------------------------------------------------------------------------
// NOVAS FUNÇÕES - Reestruturação Saúde
// ---------------------------------------------------------------------------

/**
 * Valida um registro de saúde com base nas regras por tipo de intervenção
 */
export function validateHealthRecord(
  record: HealthRecord,
  animals: AnimalRecord[],
  professionals: HealthProfessionalRecord[],
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const animal = animals.find((a) => a.id === record.animalId);
  const professional = professionals.find((p) => p.id === record.professionalId);

  // Validações comuns a todos os tipos
  if (!record.occurredAt) errors.push('Data/hora da intervenção é obrigatória');
  if (!record.animalId) errors.push('Seleção do lote é obrigatória');
  if (!record.notes?.trim()) errors.push('Anotações são obrigatórias');

  // Validações específicas por tipo
  switch (record.procedureType) {
    case 'consulta':
      if (!record.professionalId) errors.push('Seleção do veterinário responsável é obrigatória');
      if (professional && !canProfessionalManageHealth(professional)) {
        errors.push('O profissional selecionado não tem permissão para registrar consultas');
      }
      if (record.consultationCost === undefined || record.consultationCost === null) {
        errors.push('Valor monetário da consulta é obrigatório');
      }
      if (animal) {
        // Para consultas, afeta toda a população do lote
        record.affectedBirdCount = getAnimalCurrentQuantity(animal);
      }
      break;

    case 'tratamento':
      if (!record.professionalId) errors.push('Seleção do veterinário responsável é obrigatória');
      if (professional && !canProfessionalManageHealth(professional)) {
        errors.push('O profissional selecionado não tem permissão para registrar tratamentos');
      }
      if (!record.treatmentType) errors.push('Tipo de tratamento (vacina/medicamento) é obrigatório');
      if (!record.productName?.trim()) errors.push('Nome do produto é obrigatório');
      if (!record.affectedBirdCount || record.affectedBirdCount <= 0) {
        errors.push('Quantidade de aves afetadas é obrigatória');
      }
      if (animal && record.affectedBirdCount! > getAnimalCurrentQuantity(animal)) {
        errors.push('Quantidade de aves afetadas não pode exceder a população do lote');
      }
      break;

    case 'monitoramento':
      // Monitoramento é mais flexível
      if (animal && record.affectedBirdCount && record.affectedBirdCount > getAnimalCurrentQuantity(animal)) {
        errors.push('Quantidade de aves afetadas não pode exceder a população do lote');
      }
      break;

    // Para tipos históricos
    case 'vacina':
    case 'medicamento':
    case 'outro':
      // Validações mínimas para retrocompatibilidade
      break;
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Converte registros históricos para o novo formato
 */
export function convertLegacyRecord(record: HealthRecord): HealthRecord {
  const converted: HealthRecord = { ...record };

  // Mapeia tipos antigos para os novos
  if (record.procedureType === 'vacina' || record.procedureType === 'medicamento') {
    converted.procedureType = 'tratamento';
    converted.treatmentType = record.procedureType === 'vacina' ? 'vacina' : 'medicamento';
    converted.productName = record.vaccineName || record.medicationName || '';
  }

  // Se for um tipo antigo não mapeado, mantém como 'outro' mas mapeia para 'monitoramento'
  if (record.procedureType === 'outro') {
    converted.procedureType = 'monitoramento';
  }

  return converted;
}

/**
 * Gera alertas para próximas doses e retornos de consulta
 */
export function getNextDoseAlerts(records: HealthRecord[], animals: AnimalRecord[]): HealthAlert[] {
  const alerts: HealthAlert[] = [];
  const animalMap = new Map(animals.map((a) => [a.id, a]));

  records.forEach((record) => {
    // Alertas para próximas doses (tratamentos)
    if ((record.procedureType === 'tratamento' || record.procedureType === 'vacina' || record.procedureType === 'medicamento') && record.nextDoseDate) {
      const daysLeft = daysUntil(record.nextDoseDate);
      let priority: 'urgent' | 'high' | 'medium' | 'low' = 'low';
      let title = '';
      let description = '';

      const animal = animalMap.get(record.animalId);

      if (daysLeft < 0) {
        priority = 'urgent';
        title = `Dose vencida! ${record.productName || record.vaccineName || record.medicationName || 'Tratamento'}`;
        description = `A dose do lote ${animal?.tag || record.animalId} está ${Math.abs(daysLeft)} dias vencida.`;
      } else if (daysLeft === 0) {
        priority = 'urgent';
        title = `Dose HOJE! ${record.productName || record.vaccineName || record.medicationName || 'Tratamento'}`;
        description = `A dose do lote ${animal?.tag || record.animalId} está marcada para hoje.`;
      } else if (daysLeft <= 3) {
        priority = 'high';
        title = `Próxima dose em ${daysLeft} dia${daysLeft > 1 ? 's' : ''}`;
        description = `${record.productName || record.vaccineName || record.medicationName || 'Tratamento'} para o lote ${animal?.tag || record.animalId}.`;
      } else if (daysLeft <= 7) {
        priority = 'medium';
        title = `Próxima dose em ${daysLeft} dias`;
        description = `${record.productName || record.vaccineName || record.medicationName || 'Tratamento'} para o lote ${animal?.tag || record.animalId}.`;
      } else if (daysLeft <= 14) {
        priority = 'low';
        title = `Próxima dose em ${daysLeft} dias`;
        description = `${record.productName || record.vaccineName || record.medicationName || 'Tratamento'} para o lote ${animal?.tag || record.animalId}.`;
      }

      if (title) {
        alerts.push({
          id: `alert-dose-${record.id}`,
          healthRecordId: record.id,
          type: 'next_dose',
          title,
          description,
          scheduledDate: record.nextDoseDate,
          isRead: false,
          priority,
          createdAt: new Date().toISOString(),
        });
      }
    }

    // Alertas para retornos de consulta
    if (record.procedureType === 'consulta' && record.returnDate) {
      const daysLeft = daysUntil(record.returnDate);
      let priority: 'urgent' | 'high' | 'medium' | 'low' = 'low';
      let title = '';
      let description = '';

      const animal = animalMap.get(record.animalId);

      if (daysLeft < 0) {
        priority = 'urgent';
        title = 'Retorno vencido!';
        description = `O retorno da consulta do lote ${animal?.tag || record.animalId} está ${Math.abs(daysLeft)} dias vencido.`;
      } else if (daysLeft === 0) {
        priority = 'urgent';
        title = 'Retorno HOJE!';
        description = `O retorno da consulta do lote ${animal?.tag || record.animalId} está marcado para hoje.`;
      } else if (daysLeft <= 3) {
        priority = 'high';
        title = `Retorno em ${daysLeft} dia${daysLeft > 1 ? 's' : ''}`;
        description = `Retorno da consulta do lote ${animal?.tag || record.animalId}.`;
      } else if (daysLeft <= 7) {
        priority = 'medium';
        title = `Retorno em ${daysLeft} dias`;
        description = `Retorno da consulta do lote ${animal?.tag || record.animalId}.`;
      }

      if (title) {
        alerts.push({
          id: `alert-return-${record.id}`,
          healthRecordId: record.id,
          type: 'return_visit',
          title,
          description,
          scheduledDate: record.returnDate,
          isRead: false,
          priority,
          createdAt: new Date().toISOString(),
        });
      }
    }
  });

  // Ordena alertas por prioridade e data
  const priorityOrder: Record<string, number> = { urgent: 0, high: 1, medium: 2, low: 3 };
  return alerts.sort((a, b) => {
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime();
  });
}

/**
 * Sincroniza tratamento com estoque veterinário (opcional)
 */
export function syncTreatmentWithStock(
  treatmentRecord: HealthRecord,
  stockItems: VeterinaryStockRecord[],
): { canApply: boolean; message: string; matchedItem?: VeterinaryStockRecord } {
  if (treatmentRecord.procedureType !== 'tratamento') {
    return { canApply: true, message: '' };
  }

  const productName = treatmentRecord.productName?.toLowerCase().trim();
  if (!productName) {
    return { canApply: true, message: 'Nome do produto não informado. Verificação de estoque não realizada.' };
  }

  const matchedItem = stockItems.find((item) =>
    item.name.toLowerCase().trim().includes(productName) || productName.includes(item.name.toLowerCase().trim())
  );

  if (!matchedItem) {
    return {
      canApply: true,
      message: 'Produto não encontrado no estoque. Registrar tratamento mesmo assim?',
    };
  }

  const stockStatus = getVeterinaryStockStatus(matchedItem);

  if (stockStatus.isExpired) {
    return {
      canApply: false,
      message: `Produto ${matchedItem.name} está vencido!`,
      matchedItem,
    };
  }

  if (stockStatus.isLowStock) {
    return {
      canApply: true,
      message: `Atenção: estoque de ${matchedItem.name} está baixo (${matchedItem.quantity} ${matchedItem.unit}).`,
      matchedItem,
    };
  }

  if (stockStatus.isExpiringSoon) {
    return {
      canApply: true,
      message: `Atenção: ${matchedItem.name} vence em ${stockStatus.remainingDays} dias.`,
      matchedItem,
    };
  }

  return { canApply: true, message: '', matchedItem };
}

/**
 * Obtém a label do tipo de procedimento para exibição
 */
export function getHealthProcedureLabel(type: string): string {
  const labels: Record<string, string> = {
    consulta: 'Consulta Veterinária',
    tratamento: 'Tratamento',
    monitoramento: 'Monitoramento',
    vacina: 'Vacinação',
    medicamento: 'Medicação',
    outro: 'Outro',
  };
  return labels[type] || type;
}

