import React, { useCallback } from 'react';
import CadastroSection, { CadastroColumn, CadastroField } from '@/components/CadastroSection';
import { GalpaoRecord, AnimalRecord } from '@/types';

interface GalpoesPageProps {
  records: GalpaoRecord[];
  animals: AnimalRecord[];
  onSave: (record: GalpaoRecord) => Promise<void> | void;
  onDelete: (id: string) => Promise<void> | void;
  isLoading?: boolean;
  isSyncing?: boolean;
  errorMessage?: string;
  onRetry?: () => void;
}

const emptyValues: Omit<GalpaoRecord, 'id' | 'createdAt'> = {
  name: '',
  code: '',
  capacity: 0,
  currentBirdCount: 0,
  mortalityThresholdPercent: 5,
  location: '',
  notes: JSON.stringify({ lotes: [] }),
};

const columns: Array<CadastroColumn<GalpaoRecord> & { key: string }> = [
  { key: 'name', label: 'Nome' },
  { key: 'code', label: 'Código' },
  { key: 'location', label: 'Localização' },
  { key: 'capacity', label: 'Capacidade' },
  { key: 'currentBirdCount', label: 'Aves atuais' },
  {
    key: 'notes',
    label: 'Lotes',
    render: (record) => {
      try {
        const parsed = JSON.parse(record.notes);
        if (Array.isArray(parsed.lotes) && parsed.lotes.length > 0) {
          return parsed.lotes.map((lote: any) => lote.tag || lote.lot).join(', ');
        }
      } catch {
        // ignore
      }
      return '-';
    },
  },
];

interface LoteSelecionado {
  id: string;
  tag: string;
  lot: string;
  quantity: number;
  currentQuantity?: number;
}

function getLotsFromNotes(notes: string): LoteSelecionado[] {
  try {
    const parsed = JSON.parse(notes);
    if (Array.isArray(parsed.lotes)) {
      return parsed.lotes;
    }
  } catch {
    // ignore
  }
  return [];
}

function calculateCurrentBirdCount(lotes: LoteSelecionado[]) {
  return lotes.reduce((total, lote) => {
    const quantity = lote.currentQuantity ?? lote.quantity;
    return total + quantity;
  }, 0);
}

function getSearchableText(record: GalpaoRecord) {
  const lotes = getLotsFromNotes(record.notes);
  const lotesText = lotes.map((l) => l.tag || l.lot).join(' ');
  return [record.name, record.code, record.location, lotesText].join(' ');
}

function getSummary(items: GalpaoRecord[]) {
  const totalCapacity = items.reduce((total, item) => total + item.capacity, 0);
  const totalBirds = items.reduce((total, item) => total + item.currentBirdCount, 0);

  return [
    { label: 'Galpões', value: String(items.length) },
    { label: 'Capacidade Total', value: String(totalCapacity) },
    { label: 'Aves Alocadas', value: String(totalBirds) },
    {
      label: 'Ocupação Média',
      value: items.length > 0 && totalCapacity > 0 ? `${Math.round((totalBirds / totalCapacity) * 100)}%` : '0%',
    },
  ];
}

const galpaoFields: CadastroField<GalpaoRecord>[] = [
  { key: 'name', label: 'Nome do Galpão', type: 'text', placeholder: 'Ex: Galpão A', required: true },
  { key: 'code', label: 'Código', type: 'text', placeholder: 'Ex: GALP-001', required: true },
  { key: 'location', label: 'Localização', type: 'text', placeholder: 'Ex: Setor Norte' },
  { key: 'capacity', label: 'Capacidade (aves)', type: 'number', required: true, min: 0 },
  { key: 'mortalityThresholdPercent', label: 'Limite de Mortalidade (%)', type: 'number', min: 0 },
];

export default function GalpoesPage({
  records,
  animals,
  onSave,
  onDelete,
  isLoading,
  isSyncing,
  errorMessage,
  onRetry,
}: GalpoesPageProps) {
  const renderFormInsights = useCallback(
    (
      draft: Omit<GalpaoRecord, 'id' | 'createdAt'>,
      setDraft: React.Dispatch<React.SetStateAction<Omit<GalpaoRecord, 'id' | 'createdAt'>>>,
    ) => {
      const lotesSelecionados = getLotsFromNotes(draft.notes);
      const lotesDisponiveis = animals.filter(
        (animal) => !lotesSelecionados.some((l) => l.id === animal.id),
      );

      const handleAddLote = (animalId: string) => {
        const animal = animals.find((a) => a.id === animalId);
        if (!animal) return;

        const novosLotes = [
          ...lotesSelecionados,
          {
            id: animal.id,
            tag: animal.tag,
            lot: animal.lot,
            quantity: animal.quantity,
            currentQuantity: animal.currentQuantity,
          },
        ];
        const novoTotal = calculateCurrentBirdCount(novosLotes);
        setDraft({
          ...draft,
          notes: JSON.stringify({ lotes: novosLotes }),
          currentBirdCount: novoTotal,
        });
      };

      const handleRemoveLote = (animalId: string) => {
        const novosLotes = lotesSelecionados.filter((l) => l.id !== animalId);
        const novoTotal = calculateCurrentBirdCount(novosLotes);
        setDraft({
          ...draft,
          notes: JSON.stringify({ lotes: novosLotes }),
          currentBirdCount: novoTotal,
        });
      };

      return (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-[0.08em] text-gray-500 mb-2">
              Lotes no Galpão
            </label>

            <div className="mb-3">
              <label className="block text-xs font-bold uppercase tracking-[0.08em] text-gray-500 mb-1">
                Adicionar Lote
              </label>
              <select
                className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-[#0f1c2b]"
                onChange={(e) => {
                  if (e.target.value) {
                    handleAddLote(e.target.value);
                    e.target.value = '';
                  }
                }}
                defaultValue=""
              >
                <option value="">Selecione um lote</option>
                {lotesDisponiveis.map((animal) => (
                  <option key={animal.id} value={animal.id}>
                    {animal.tag} - {animal.quantity} aves
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              {lotesSelecionados.map((lote) => (
                <div
                  key={lote.id}
                  className="flex items-center justify-between rounded-2xl border border-gray-200 bg-slate-50 p-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-[#0f1c2b]">{lote.tag}</p>
                    <p className="text-xs text-gray-500">{lote.currentQuantity ?? lote.quantity} aves</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveLote(lote.id)}
                    className="px-3 py-1 rounded-full border border-red-200 text-red-600 text-xs font-bold hover:bg-red-50"
                  >
                    Remover
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3">
            <p className="text-sm font-medium text-blue-900">
              Total de aves no galpão: {draft.currentBirdCount}
            </p>
            {draft.capacity > 0 && (
              <p className="text-sm text-blue-800">
                Ocupação: {Math.round((draft.currentBirdCount / draft.capacity) * 100)}%
              </p>
            )}
          </div>
        </div>
      );
    },
    [animals],
  );

  return (
    <CadastroSection
      title="Cadastro • Galpões"
      description="Controle os galpões da sua granja, sua capacidade e os lotes que estão em cada um."
      searchPlaceholder="Buscar por nome, código, localização ou lotes"
      formTitle="Novo cadastro de galpão"
      itemLabel="galpão"
      records={records}
      emptyValues={emptyValues}
      fields={galpaoFields}
      columns={columns}
      getSearchableText={getSearchableText}
      getSummary={getSummary}
      renderFormInsights={renderFormInsights}
      onSave={onSave}
      onDelete={onDelete}
      isLoading={isLoading}
      isSyncing={isSyncing}
      errorMessage={errorMessage}
      onRetry={onRetry}
    />
  );
}
