import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Edit3, Plus, Search, Trash2, X } from 'lucide-react';
import { usePagination } from '@/hooks/usePagination';
import { PaginationControls } from '@/components/ui/PaginationControls';

type FieldType = 'text' | 'email' | 'tel' | 'number' | 'date' | 'select' | 'textarea';

interface FieldOption {
  label: string;
  value: string;
}

export interface CadastroField<T extends { id: string }> {
  key: keyof T;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  options?: FieldOption[];
  min?: number;
  step?: number;
  layout?: 'full' | 'half';
}

export interface CadastroColumn<T extends { id: string }> {
  key: string;
  label: string;
  render?: (record: T) => React.ReactNode;
}

interface CadastroSectionProps<T extends { id: string }> {
  title: string;
  description: string;
  searchPlaceholder: string;
  formTitle: string;
  itemLabel: string;
  records: T[];
  emptyValues: Omit<T, 'id' | 'createdAt'>;
  fields: CadastroField<T>[];
  columns: CadastroColumn<T>[];
  getSearchableText: (record: T) => string;
  getSummary: (records: T[]) => Array<{ label: string; value: string }>;
  renderFormInsights?: (
    draft: Omit<T, 'id' | 'createdAt'>,
    setDraft: React.Dispatch<React.SetStateAction<Omit<T, 'id' | 'createdAt'>>>,
  ) => React.ReactNode;
  onSave: (payload: T) => Promise<void> | void;
  onDelete: (id: string) => Promise<void> | void;
  isLoading?: boolean;
  isSyncing?: boolean;
  errorMessage?: string;
  onRetry?: () => void;
}

function createDraft<T extends { id: string }>(emptyValues: Omit<T, 'id' | 'createdAt'>): Omit<T, 'id' | 'createdAt'> {
  return JSON.parse(JSON.stringify(emptyValues)) as Omit<T, 'id' | 'createdAt'>;
}

interface CadastroRecordCardProps {
  record: { id: string };
  columns: CadastroColumn<{ id: string }>[];
  isLoading: boolean;
  isSyncing: boolean;
  isSubmitting: boolean;
  onEdit: (record: { id: string }) => void;
  onDelete: (id: string) => void;
}

const CadastroRecordCard = React.memo(function CadastroRecordCard({
  record,
  columns,
  isLoading,
  isSyncing,
  isSubmitting,
  onEdit,
  onDelete,
}: CadastroRecordCardProps) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-slate-50 p-4">
      <div className="grid gap-3 sm:grid-cols-2">
        {columns.map((column) => (
          <div key={String(column.key)}>
            <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-gray-500">{column.label}</div>
            <div className="mt-1 text-sm font-semibold text-[#0f1c2b]">
              {column.render ? column.render(record) : String(record[column.key] ?? '-')}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={isLoading || isSyncing || isSubmitting}
          onClick={() => onEdit(record)}
          className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-xs font-bold text-gray-700 transition-colors hover:bg-white"
        >
          <Edit3 className="w-3.5 h-3.5" />
          Editar
        </button>
        <button
          type="button"
          disabled={isLoading || isSyncing || isSubmitting}
          onClick={() => void onDelete(record.id)}
          className="inline-flex items-center gap-2 rounded-full border border-red-200 px-4 py-2 text-xs font-bold text-red-600 transition-colors hover:bg-red-50"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Excluir
        </button>
      </div>
    </article>
  );
});

export default function CadastroSection<T extends { id: string; createdAt: string }>({
  title,
  description,
  searchPlaceholder,
  formTitle,
  itemLabel,
  records,
  emptyValues,
  fields,
  columns,
  getSearchableText,
  getSummary,
  renderFormInsights,
  onSave,
  onDelete,
  isLoading = false,
  isSyncing = false,
  errorMessage,
  onRetry,
}: CadastroSectionProps<T>) {
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Omit<T, 'id' | 'createdAt'>>(() => createDraft(emptyValues));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredRecords = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    if (!normalized) return records;
    return records.filter((record) => getSearchableText(record).toLowerCase().includes(normalized));
  }, [getSearchableText, records, search]);

  const {
    paginatedItems,
    currentPage,
    totalPages,
    totalItems,
    nextPage,
    prevPage,
    resetPage,
  } = usePagination(filteredRecords, 20);

  useEffect(() => {
    resetPage();
  }, [search, resetPage]);

  const summaryCards = useMemo(() => getSummary(records), [getSummary, records]);

  const resetForm = useCallback(() => {
    setEditingId(null);
    setDraft(createDraft(emptyValues));
  }, [emptyValues]);

  const handleFieldChange = useCallback((key: keyof T, rawValue: string, type: FieldType) => {
    let parsedValue: string | number = rawValue;
    if (type === 'number') {
      parsedValue = rawValue === '' ? 0 : Number(rawValue);
    }

    setDraft((prev) => ({
      ...prev,
      [key]: parsedValue,
    }));
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      ...(draft as Omit<T, 'id' | 'createdAt'>),
      id: editingId ?? crypto.randomUUID(),
      createdAt: editingId
        ? records.find((record) => record.id === editingId)?.createdAt ?? new Date().toISOString()
        : new Date().toISOString(),
    } as T;

    try {
      setIsSubmitting(true);
      await onSave(payload);
      resetForm();
    } catch {
      return;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = useCallback((record: T) => {
    const { id, createdAt: _createdAt, ...rest } = record;
    setEditingId(id);
    setDraft(rest as Omit<T, 'id' | 'createdAt'>);
  }, []);

  const handleEditRecord = useCallback(
    (record: { id: string }) => {
      const fullRecord = records.find((item) => item.id === record.id);
      if (fullRecord) handleEdit(fullRecord);
    },
    [handleEdit, records],
  );

  return (
    <div className="app-section space-y-6">
      <section className="app-section-card">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="app-section-badge">Cadastro</div>
            <h1 className="app-section-title">{title}</h1>
            <p className="app-section-description">{description}</p>
          </div>

          <label className="relative w-full lg:max-w-sm">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={searchPlaceholder}
              className="w-full rounded-2xl border border-gray-300 bg-white py-3 pl-11 pr-4 text-sm text-[#0f1c2b] outline-none transition-colors focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
            />
          </label>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {summaryCards.map((card) => (
            <div key={card.label} className="rounded-2xl border border-gray-200 bg-slate-50 p-4">
              <div className="text-xs font-bold uppercase tracking-[0.14em] text-gray-500">{card.label}</div>
              <div className="mt-2 text-2xl font-extrabold text-[#0f1c2b]">{card.value}</div>
            </div>
          ))}
        </div>

        {(errorMessage || isSyncing) && (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
            <div className="text-sm font-medium text-amber-800">
              {errorMessage || 'Sincronizando dados com o Supabase...'}
            </div>
            {errorMessage && onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="rounded-full border border-amber-300 px-4 py-2 text-xs font-bold text-amber-700 transition-colors hover:bg-white"
              >
                Tentar novamente
              </button>
            )}
          </div>
        )}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="app-section-card">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-extrabold text-[#0f1c2b]">{formTitle}</h2>
              <p className="mt-1 text-sm text-gray-500">
                {editingId ? `Editando ${itemLabel}.` : `Preencha os dados principais para cadastrar ${itemLabel}.`}
              </p>
            </div>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-xs font-bold text-gray-700 transition-colors hover:bg-slate-50"
              >
                <X className="w-4 h-4" />
                Cancelar edição
              </button>
            )}
          </div>

          <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
            {fields.map((field) => {
              const value = draft[field.key as keyof typeof draft];
              const sharedClassName =
                'w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-[#0f1c2b] outline-none transition-colors focus:border-brand-primary focus:ring-1 focus:ring-brand-primary';
              const wrapperClass = field.layout === 'full' ? 'md:col-span-2' : '';

              return (
                <label key={String(field.key)} className={`flex flex-col gap-1.5 ${wrapperClass}`}>
                  <span className="text-xs font-bold uppercase tracking-[0.08em] text-gray-500">{field.label}</span>

                  {field.type === 'select' ? (
                    <select
                      value={String(value ?? '')}
                      onChange={(event) => handleFieldChange(field.key, event.target.value, field.type)}
                      required={field.required}
                      className={sharedClassName}
                    >
                      <option value="">Selecione</option>
                      {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : field.type === 'textarea' ? (
                    <textarea
                      value={String(value ?? '')}
                      onChange={(event) => handleFieldChange(field.key, event.target.value, field.type)}
                      required={field.required}
                      placeholder={field.placeholder}
                      rows={4}
                      className={sharedClassName}
                    />
                  ) : (
                    <input
                      type={field.type}
                      value={field.type === 'number' ? Number(value ?? 0) : String(value ?? '')}
                      onChange={(event) => handleFieldChange(field.key, event.target.value, field.type)}
                      required={field.required}
                      min={field.min}
                      step={field.step}
                      placeholder={field.placeholder}
                      className={sharedClassName}
                    />
                  )}
                </label>
              );
            })}

            {renderFormInsights && (
              <div className="md:col-span-2 rounded-2xl border border-gray-200 bg-slate-50 p-4">
                {renderFormInsights(draft, setDraft)}
              </div>
            )}

            <div className="md:col-span-2 flex flex-wrap items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={isLoading || isSyncing || isSubmitting}
                className="inline-flex items-center gap-2 rounded-full bg-brand-primary px-5 py-3 text-sm font-bold text-white transition-all hover:bg-brand-hover active:scale-95"
              >
                <Plus className="w-4 h-4" />
                {editingId ? `Salvar ${itemLabel}` : `Adicionar ${itemLabel}`}
              </button>

              <button
                type="button"
                disabled={isLoading || isSyncing || isSubmitting}
                onClick={resetForm}
                className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-5 py-3 text-sm font-bold text-gray-700 transition-colors hover:bg-slate-50"
              >
                Limpar formulário
              </button>
            </div>
          </form>
        </div>

        <div className="app-section-card">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-extrabold text-[#0f1c2b]">Registros</h2>
              <p className="mt-1 text-sm text-gray-500">
                {filteredRecords.length} {filteredRecords.length === 1 ? 'registro encontrado' : 'registros encontrados'}.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {filteredRecords.length === 0 && (
              <div className="rounded-2xl border border-dashed border-gray-300 bg-slate-50 p-6 text-sm text-gray-500">
                {isLoading ? 'Carregando registros...' : 'Nenhum registro encontrado. Cadastre o primeiro item para começar.'}
              </div>
            )}

            {paginatedItems.map((record) => (
              <CadastroRecordCard
                key={record.id}
                record={record}
                columns={columns as CadastroColumn<{ id: string }>[]}
                isLoading={isLoading}
                isSyncing={isSyncing}
                isSubmitting={isSubmitting}
                onEdit={handleEditRecord}
                onDelete={onDelete}
              />
            ))}

            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              onNext={nextPage}
              onPrev={prevPage}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
