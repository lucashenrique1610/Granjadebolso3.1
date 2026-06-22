import React from 'react';
import CadastroSection, { CadastroColumn, CadastroField } from '@/components/CadastroSection';
import { ClientRecord } from '@/types';

interface ClientePageProps {
  records: ClientRecord[];
  onSave: (record: ClientRecord) => Promise<void> | void;
  onDelete: (id: string) => Promise<void> | void;
  isLoading?: boolean;
  isSyncing?: boolean;
  errorMessage?: string;
  onRetry?: () => void;
}

const emptyValues: Omit<ClientRecord, 'id' | 'createdAt'> = {
  name: '',
  document: '',
  phone: '',
  email: '',
  city: '',
  state: '',
  status: 'ativo',
  notes: '',
};

const fields: CadastroField<ClientRecord>[] = [
  { key: 'name', label: 'Nome / Razão social', type: 'text', placeholder: 'Ex: Agropecuária Silva', required: true },
  { key: 'document', label: 'CPF/CNPJ', type: 'text', placeholder: 'Ex: 00.000.000/0001-00' },
  { key: 'phone', label: 'Telefone', type: 'tel', placeholder: 'Ex: (00) 00000-0000', required: true },
  { key: 'email', label: 'E-mail', type: 'email', placeholder: 'cliente@exemplo.com', required: true },
  { key: 'city', label: 'Cidade', type: 'text', placeholder: 'Ex: Uberlandia', required: true },
  { key: 'state', label: 'UF', type: 'text', placeholder: 'Ex: MG', required: true },
  {
    key: 'status',
    label: 'Status',
    type: 'select',
    required: true,
    options: [
      { label: 'Ativo', value: 'ativo' },
      { label: 'Inativo', value: 'inativo' },
      { label: 'Em prospecção', value: 'prospeccao' },
    ],
  },
  { key: 'notes', label: 'Observações', type: 'textarea', placeholder: 'Anotações comerciais e preferências de atendimento.', layout: 'full' },
];

const columns: CadastroColumn<ClientRecord>[] = [
  { key: 'name', label: 'Cliente' },
  { key: 'document', label: 'Documento' },
  { key: 'city', label: 'Cidade' },
  { key: 'phone', label: 'Telefone' },
  { key: 'email', label: 'E-mail' },
  {
    key: 'status',
    label: 'Status',
    render: (record) => record.status.charAt(0).toUpperCase() + record.status.slice(1),
  },
];

export default function ClientePage({ records, onSave, onDelete, isLoading, isSyncing, errorMessage, onRetry }: ClientePageProps) {
  return (
    <CadastroSection
      title="Cadastro • Clientes"
      description="Concentre o cadastro comercial dos seus compradores e parceiros para apoiar vendas, cobrança e relacionamento."
      searchPlaceholder="Buscar por nome, documento, cidade ou telefone"
      formTitle="Novo cadastro de cliente"
      itemLabel="cliente"
      records={records}
      emptyValues={emptyValues}
      fields={fields}
      columns={columns}
      getSearchableText={(record) =>
        [record.name, record.document, record.phone, record.email, record.city, record.state, record.status].join(' ')
      }
      getSummary={(items) => [
        { label: 'Clientes', value: String(items.length) },
        { label: 'Ativos', value: String(items.filter((item) => item.status === 'ativo').length) },
        { label: 'Cidades', value: String(new Set(items.map((item) => item.city).filter(Boolean)).size) },
      ]}
      onSave={onSave}
      onDelete={onDelete}
      isLoading={isLoading}
      isSyncing={isSyncing}
      errorMessage={errorMessage}
      onRetry={onRetry}
    />
  );
}
