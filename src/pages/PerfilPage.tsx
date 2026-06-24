import React, { useEffect, useMemo, useState } from 'react';
import { FarmProfileData, THEME_PALETTES, UserPersonalData } from '@/types';
import { resolveThemePalette } from '@/lib/theme';

type PersonalProfileInput = Omit<UserPersonalData, 'password'>;

interface PerfilPageProps {
  personal: PersonalProfileInput;
  farm: FarmProfileData;
  isSyncing?: boolean;
  errorMessage?: string;
  onSavePersonal: (data: PersonalProfileInput) => Promise<void> | void;
  onSaveFarm: (data: FarmProfileData) => Promise<void> | void;
}

const marketingOptions = [
  { value: 'social', label: 'Redes sociais' },
  { value: 'referral', label: 'Indicação' },
  { value: 'search', label: 'Pesquisa no Google' },
  { value: 'events', label: 'Eventos' },
  { value: 'other', label: 'Outros' },
];

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-slate-50 p-4">
      <div className="text-xs font-bold uppercase tracking-[0.14em] text-gray-500">{label}</div>
      <div className="mt-2 text-2xl font-extrabold text-[#0f1c2b]">{value}</div>
    </div>
  );
}

export default function PerfilPage({
  personal,
  farm,
  isSyncing,
  errorMessage,
  onSavePersonal,
  onSaveFarm,
}: PerfilPageProps) {
  const [personalDraft, setPersonalDraft] = useState<PersonalProfileInput>(personal);
  const [farmDraft, setFarmDraft] = useState<FarmProfileData>(farm);
  const [personalSuccess, setPersonalSuccess] = useState('');
  const [farmSuccess, setFarmSuccess] = useState('');

  useEffect(() => {
    setPersonalDraft(personal);
  }, [personal]);

  useEffect(() => {
    setFarmDraft(farm);
  }, [farm]);

  useEffect(() => {
    if (errorMessage) {
      setPersonalSuccess('');
      setFarmSuccess('');
    }
  }, [errorMessage]);

  const summary = useMemo(
    () => [
      { label: 'Responsável', value: personal.fullName || 'Não informado' },
      { label: 'Granja', value: farm.farmName || 'Não informada' },
      { label: 'Plantel', value: `${farm.birdCount || 0} aves` },
    ],
    [farm.birdCount, farm.farmName, personal.fullName],
  );

  const handlePersonalSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPersonalSuccess('');
    await onSavePersonal({
      fullName: personalDraft.fullName.trim(),
      email: personalDraft.email.trim(),
      phone: personalDraft.phone.trim(),
    });
    setPersonalSuccess('Perfil pessoal atualizado com sucesso.');
  };

  const handleFarmSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFarmSuccess('');
    await onSaveFarm({
      ...farmDraft,
      farmName: farmDraft.farmName.trim(),
      state: farmDraft.state.trim(),
      city: farmDraft.city.trim(),
      marketingSource: farmDraft.marketingSource.trim(),
    });
    setFarmSuccess('Perfil da granja atualizado com sucesso.');
  };

  return (
    <div className="app-section space-y-6">
      <section className="app-section-card">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="app-section-badge">Configurações</div>
            <h1 className="app-section-title">Configurações • Perfil</h1>
            <p className="app-section-description">
              Atualize os dados do cadastro do usuário e mantenha o perfil principal da granja sempre correto.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {summary.map((item) => (
            <div key={item.label}>
              <SummaryCard label={item.label} value={item.value} />
            </div>
          ))}
        </div>

        {errorMessage && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {errorMessage}
          </div>
        )}
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <form className="app-section-card space-y-5" onSubmit={handlePersonalSubmit}>
          <div>
            <h2 className="text-lg font-extrabold text-[#0f1c2b]">Perfil pessoal</h2>
            <p className="mt-1 text-sm text-gray-500">
              Estes dados são salvos na tabela `users` e identificam o responsável pela conta.
            </p>
          </div>

          <div className="grid gap-4">
            <label className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-gray-500">Nome completo</span>
              <input
                type="text"
                required
                value={personalDraft.fullName}
                onChange={(event) => setPersonalDraft((prev) => ({ ...prev, fullName: event.target.value }))}
                className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-[#0f1c2b] outline-none transition-colors focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                placeholder="Digite o nome do responsável"
              />
            </label>

            <label className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-gray-500">E-mail</span>
              <input
                type="email"
                required
                value={personalDraft.email}
                onChange={(event) => setPersonalDraft((prev) => ({ ...prev, email: event.target.value }))}
                className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-[#0f1c2b] outline-none transition-colors focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                placeholder="nome@empresa.com"
              />
            </label>

            <label className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-gray-500">Telefone</span>
              <input
                type="tel"
                required
                value={personalDraft.phone}
                onChange={(event) => setPersonalDraft((prev) => ({ ...prev, phone: event.target.value }))}
                className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-[#0f1c2b] outline-none transition-colors focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                placeholder="(00) 00000-0000"
              />
            </label>
          </div>

          {personalSuccess && (
            <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
              {personalSuccess}
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSyncing}
              className="rounded-full bg-brand-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSyncing ? 'Salvando...' : 'Salvar perfil pessoal'}
            </button>
          </div>
        </form>

        <form className="app-section-card space-y-5" onSubmit={handleFarmSubmit}>
          <div>
            <h2 className="text-lg font-extrabold text-[#0f1c2b]">Perfil da granja</h2>
            <p className="mt-1 text-sm text-gray-500">
              Atualize os dados principais da operação salvos na tabela `granjas`.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 md:col-span-2">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-gray-500">Nome da granja</span>
              <input
                type="text"
                required
                value={farmDraft.farmName}
                onChange={(event) => setFarmDraft((prev) => ({ ...prev, farmName: event.target.value }))}
                className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-[#0f1c2b] outline-none transition-colors focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                placeholder="Ex: Granja São José"
              />
            </label>

            <label className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-gray-500">Estado</span>
              <input
                type="text"
                required
                value={farmDraft.state}
                onChange={(event) => setFarmDraft((prev) => ({ ...prev, state: event.target.value }))}
                className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-[#0f1c2b] outline-none transition-colors focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                placeholder="UF"
              />
            </label>

            <label className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-gray-500">Cidade</span>
              <input
                type="text"
                required
                value={farmDraft.city}
                onChange={(event) => setFarmDraft((prev) => ({ ...prev, city: event.target.value }))}
                className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-[#0f1c2b] outline-none transition-colors focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                placeholder="Cidade principal"
              />
            </label>

            <label className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-gray-500">Quantidade de aves</span>
              <input
                type="number"
                min={0}
                required
                value={farmDraft.birdCount}
                onChange={(event) =>
                  setFarmDraft((prev) => ({ ...prev, birdCount: Number(event.target.value || 0) }))
                }
                className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-[#0f1c2b] outline-none transition-colors focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                placeholder="0"
              />
            </label>

            <label className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-gray-500">Origem do cadastro</span>
              <select
                required
                value={farmDraft.marketingSource}
                onChange={(event) => setFarmDraft((prev) => ({ ...prev, marketingSource: event.target.value }))}
                className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-[#0f1c2b] outline-none transition-colors focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
              >
                <option value="">Selecione</option>
                {marketingOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2 md:col-span-2">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-gray-500">Paleta principal</span>
              <div className="flex items-center gap-2">
                <select
                  value={farmDraft.selectedPalette}
                  onChange={(event) =>
                    setFarmDraft((prev) => ({ ...prev, selectedPalette: event.target.value as FarmProfileData['selectedPalette'] }))
                  }
                  className="flex-1 rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-[#0f1c2b] outline-none transition-colors focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                >
                  {Object.values(THEME_PALETTES).map((palette) => (
                    <option key={palette.id} value={palette.id}>
                      {palette.name}
                    </option>
                  ))}
                </select>
                {farmDraft.selectedPalette === 'custom' && (
                  <div className="relative">
                    <input
                      type="color"
                      value={farmDraft.customPaletteColor || '#6366f1'}
                      onChange={(e) => {
                        const color = e.target.value;
                        setFarmDraft(prev => ({ ...prev, customPaletteColor: color }));
                      }}
                      className="h-[46px] w-[46px] rounded-xl border border-gray-300 cursor-pointer p-1"
                      title="Escolha sua cor personalizada"
                    />
                  </div>
                )}
              </div>
            </label>
          </div>

          {farmSuccess && (
            <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
              {farmSuccess}
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSyncing}
              className="rounded-full bg-brand-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSyncing ? 'Salvando...' : 'Salvar perfil da granja'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
