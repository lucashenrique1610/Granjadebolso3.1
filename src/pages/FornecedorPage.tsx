import React from 'react';
import CadastroSection, { CadastroColumn, CadastroField } from '@/components/CadastroSection';
import { SupplierRecord } from '@/types';

interface FornecedorPageProps {
  records: SupplierRecord[];
  onSave: (record: SupplierRecord) => Promise<void> | void;
  onDelete: (id: string) => Promise<void> | void;
  isLoading?: boolean;
  isSyncing?: boolean;
  errorMessage?: string;
  onRetry?: () => void;
}

const emptyValues: Omit<SupplierRecord, 'id' | 'createdAt'> = {
  companyName: '',
  contactName: '',
  category: '',
  phone: '',
  email: '',
  city: '',
  state: '',
  status: 'ativo',
  notes: '',
};

const fields: CadastroField<SupplierRecord>[] = [
  { key: 'companyName', label: 'Empresa', type: 'text', placeholder: 'Ex: Nutri Aves LTDA', required: true },
  { key: 'contactName', label: 'Contato principal', type: 'text', placeholder: 'Ex: Carlos Mendes', required: true },
  {
    key: 'category',
    label: 'Categoria',
    type: 'select',
    required: true,
    options: [
      { label: 'Ração', value: 'racao' },
      { label: 'Medicamentos', value: 'medicamentos' },
      { label: 'Equipamentos', value: 'equipamentos' },
      { label: 'Transporte', value: 'transporte' },
      { label: 'Serviços', value: 'servicos' },
    ],
  },
  { key: 'phone', label: 'Telefone', type: 'tel', placeholder: 'Ex: (00) 00000-0000', required: true },
  { key: 'email', label: 'E-mail', type: 'email', placeholder: 'contato@fornecedor.com', required: true },
  { key: 'city', label: 'Cidade', type: 'text', placeholder: 'Ex: Ribeirao Preto', required: true },
  { key: 'state', label: 'UF', type: 'text', placeholder: 'Ex: SP', required: true },
  {
    key: 'status',
    label: 'Status',
    type: 'select',
    required: true,
    options: [
      { label: 'Ativo', value: 'ativo' },
      { label: 'Homologação', value: 'homologacao' },
      { label: 'Inativo', value: 'inativo' },
    ],
  },
  { key: 'notes', label: 'Observações', type: 'textarea', placeholder: 'Condições comerciais, prazos e notas de atendimento.', layout: 'full' },
];

const columns: CadastroColumn<SupplierRecord>[] = [
  { key: 'companyName', label: 'Empresa' },
  { key: 'contactName', label: 'Contato' },
  { key: 'category', label: 'Categoria' },
  { key: 'phone', label: 'Telefone' },
  { key: 'city', label: 'Cidade' },
  {
    key: 'status',
    label: 'Status',
    render: (record) => record.status.charAt(0).toUpperCase() + record.status.slice(1),
  },
];

function getSearchableText(record: SupplierRecord) {
  return [
    record.companyName,
    record.contactName,
    record.category,
    record.phone,
    record.email,
    record.city,
    record.state,
    record.status,
  ].join(' ');
}

function getSummary(items: SupplierRecord[]) {
  return [
    { label: 'Fornecedores', value: String(items.length) },
    { label: 'Ativos', value: String(items.filter((item) => item.status === 'ativo').length) },
    { label: 'Categorias', value: String(new Set(items.map((item) => item.category).filter(Boolean)).size) },
  ];
}

export default function FornecedorPage({
  records,
  onSave,
  onDelete,
  isLoading,
  isSyncing,
  errorMessage,
  onRetry,
}: FornecedorPageProps) {
  return (
    <CadastroSection
      title="Cadastro • Fornecedores"
      description="Organize fornecedores por categoria, localização e status para apoiar compras e homologação da operação."
      searchPlaceholder="Buscar por empresa, contato, categoria ou cidade"
      formTitle="Novo cadastro de fornecedor"
      itemLabel="fornecedor"
      records={records}
      emptyValues={emptyValues}
      fields={fields}
      columns={columns}
      getSearchableText={getSearchableText}
      getSummary={getSummary}
      onSave={onSave}
      onDelete={onDelete}
      isLoading={isLoading}
      isSyncing={isSyncing}
      errorMessage={errorMessage}
      onRetry={onRetry}
    />
  );
}
