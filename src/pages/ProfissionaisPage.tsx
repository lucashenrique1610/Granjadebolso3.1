import React from 'react';
import CadastroSection, { CadastroColumn, CadastroField } from '@/components/CadastroSection';
import { HealthProfessionalRecord, HealthProfessionalAccessLevel } from '@/types';

interface ProfissionaisPageProps {
  records: HealthProfessionalRecord[];
  onSave: (record: HealthProfessionalRecord) => Promise<void> | void;
  onDelete: (id: string) => Promise<void> | void;
  isLoading?: boolean;
  isSyncing?: boolean;
  errorMessage?: string;
  onRetry?: () => void;
}

const emptyValues: Omit<HealthProfessionalRecord, 'id' | 'createdAt'> = {
  name: '',
  role: '',
  councilNumber: '',
  phone: '',
  email: '',
  accessLevel: 'registro',
  isActive: true,
  notes: '',
};

const fields: CadastroField<HealthProfessionalRecord>[] = [
  { key: 'name', label: 'Nome', type: 'text', placeholder: 'Ex: Dr. João da Silva', required: true },
  { key: 'role', label: 'Cargo / Especialidade', type: 'text', placeholder: 'Ex: Veterinário, técnico de saúde', required: true },
  { key: 'councilNumber', label: 'Número do Conselho (CRMV/CRT)', type: 'text', placeholder: 'Ex: CRMV-SP 12345' },
  { key: 'phone', label: 'Telefone', type: 'tel', placeholder: 'Ex: (00) 00000-0000', required: true },
  { key: 'email', label: 'E-mail', type: 'email', placeholder: 'joao@exemplo.com', required: true },
  {
    key: 'accessLevel',
    label: 'Nível de Acesso',
    type: 'select',
    required: true,
    options: [
      { label: 'Visualização', value: 'visualizacao' },
      { label: 'Registro', value: 'registro' },
      { label: 'Gestão', value: 'gestao' },
    ],
  },
  {
    key: 'isActive',
    label: 'Status',
    type: 'select',
    required: true,
    options: [
      { label: 'Ativo', value: 'true' },
      { label: 'Inativo', value: 'false' },
    ],
  },
  { key: 'notes', label: 'Observações', type: 'textarea', placeholder: 'Informações adicionais sobre o profissional.', layout: 'full' },
];

const columns: CadastroColumn<HealthProfessionalRecord>[] = [
  { key: 'name', label: 'Nome' },
  { key: 'role', label: 'Cargo' },
  { key: 'councilNumber', label: 'Conselho' },
  { key: 'phone', label: 'Telefone' },
  { key: 'email', label: 'E-mail' },
  {
    key: 'accessLevel',
    label: 'Nível de Acesso',
    render: (record) => {
      const labels: Record<HealthProfessionalAccessLevel, string> = {
        visualizacao: 'Visualização',
        registro: 'Registro',
        gestao: 'Gestão',
      };
      return labels[record.accessLevel];
    },
  },
  {
    key: 'isActive',
    label: 'Status',
    render: (record) => (record.isActive ? 'Ativo' : 'Inativo'),
  },
];

export default function ProfissionaisPage({
  records,
  onSave,
  onDelete,
  isLoading,
  isSyncing,
  errorMessage,
  onRetry,
}: ProfissionaisPageProps) {
  return (
    <CadastroSection
      title="Cadastro • Profissionais"
      description="Gerencie os profissionais de saúde autorizados para registros veterinários, com controle de nível de acesso."
      searchPlaceholder="Buscar por nome, cargo, telefone ou e-mail"
      formTitle="Novo cadastro de profissional"
      itemLabel="profissional"
      records={records}
      emptyValues={emptyValues}
      fields={fields.map((field) =>
        field.key === 'isActive'
          ? {
              ...field,
              transformValue: (value: unknown) => value === 'true' || Boolean(value),
            }
          : field,
      )}
      columns={columns}
      getSearchableText={(record) =>
        [
          record.name,
          record.role,
          record.councilNumber,
          record.phone,
          record.email,
          record.notes,
        ].join(' ')
      }
      getSummary={(items) => [
        { label: 'Profissionais', value: String(items.length) },
        { label: 'Ativos', value: String(items.filter((item) => item.isActive).length) },
        { label: 'Com acesso a registro', value: String(items.filter((item) => ['registro', 'gestao'].includes(item.accessLevel)).length) },
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
