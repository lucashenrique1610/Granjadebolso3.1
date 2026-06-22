/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Wheat, ChevronDown, Binary, Bird } from 'lucide-react';
import { FarmConfigData } from '@/types';

interface StepFarmConfigProps {
  initialData: FarmConfigData;
  onNext: (data: FarmConfigData) => void;
  onBack: () => void;
}

export default function StepFarmConfig({
  initialData,
  onNext,
  onBack,
}: StepFarmConfigProps) {
  const [farmName, setFarmName] = useState(initialData.farmName);
  const [state, setState] = useState(initialData.state);
  const [city, setCity] = useState(initialData.city);
  const [birdCount, setBirdCount] = useState<number>(initialData.birdCount || 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!farmName.trim()) {
      alert('Por favor, informe o nome da sua granja.');
      return;
    }
    if (!state) {
      alert('Por favor, selecione seu estado.');
      return;
    }
    if (!city.trim()) {
      alert('Por favor, informe sua cidade.');
      return;
    }
    if (birdCount < 0) {
      alert('A quantidade de aves não pode ser negativa.');
      return;
    }
    onNext({ farmName, state, city, birdCount });
  };

  return (
    <div className="bg-brand-main min-h-screen flex flex-col font-sans antialiased text-[#0f1c2b]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 flex items-center px-4 h-14 w-full top-0 sticky z-50">
        <button
          onClick={onBack}
          className="text-[#414752] hover:bg-slate-100 p-2 rounded-full transition-colors active:scale-95 flex items-center justify-center cursor-pointer"
          type="button"
          aria-label="Voltar"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 text-brand-primary justify-center flex-grow -ml-6">
          <Wheat className="w-5 h-5" />
          <span className="font-bold text-lg text-brand-primary">Granja de Bolso</span>
        </div>
      </header>

      {/* Progress segment */}
      <div className="px-4 py-4 bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-md mx-auto">
          <div className="flex justify-between items-center mb-2 text-xs">
            <span className="font-semibold text-gray-500 uppercase tracking-wider">Passo 2 de 4</span>
            <span className="font-semibold text-brand-primary">Dados da Granja</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full flex overflow-hidden gap-1.5">
            <div className="bg-brand-primary h-full w-1/4 rounded-full"></div>
            <div className="bg-brand-primary h-full w-1/4 rounded-full transition-all"></div>
            <div className="bg-slate-300/30 h-full w-1/4 rounded-full"></div>
            <div className="bg-slate-300/30 h-full w-1/4 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Main card */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
          {/* Headline */}
          <div className="mb-6 text-center">
            <h1 className="text-xl md:text-2xl font-bold text-[#0f1c2b] mb-2 leading-snug">Configure sua operação</h1>
            <p className="text-xs md:text-sm text-[#414752]">
              Precisamos de alguns detalhes sobre a sua granja para personalizar sua experiência.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Farm Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#0f1c2b]" htmlFor="farm-name">
                Nome da Granja
              </label>
              <input
                id="farm-name"
                name="farm-name"
                type="text"
                value={farmName}
                onChange={(e) => setFarmName(e.target.value)}
                placeholder="Ex: Granja São João"
                required
                className="w-full bg-slate-50 border border-gray-300 px-4 py-3 text-sm text-[#0f1c2b] focus:border-brand-primary focus:ring-1 focus:ring-brand-primary focus:bg-white outline-none transition-colors rounded-full"
              />
            </div>

            {/* State and City row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#0f1c2b]" htmlFor="state">
                  Estado
                </label>
                <div className="relative">
                  <select
                    id="state"
                    name="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-gray-300 px-4 py-3 text-sm text-[#0f1c2b] appearance-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary focus:bg-white outline-none transition-colors rounded-full"
                  >
                    <option value="" disabled>Selecione</option>
                    <option value="SP">São Paulo</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="PR">Paraná</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="GO">Goiás</option>
                    <option value="BA">Bahia</option>
                    <option value="PE">Pernambuco</option>
                  </select>
                  <ChevronDown className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#0f1c2b]" htmlFor="city">
                  Cidade
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Ex: Campinas"
                  required
                  className="w-full bg-slate-50 border border-gray-300 px-4 py-3 text-sm text-[#0f1c2b] focus:border-brand-primary focus:ring-1 focus:ring-brand-primary focus:bg-white outline-none transition-colors rounded-full"
                />
              </div>
            </div>

            {/* Bird count */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#0f1c2b]" htmlFor="bird-count">
                Quantidade de aves (Lote Inicial)
              </label>
              <div className="relative">
                <Bird className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                <input
                  id="bird-count"
                  type="number"
                  min="0"
                  value={birdCount || ''}
                  onChange={(e) => setBirdCount(Number(e.target.value))}
                  placeholder="0"
                  className="w-full bg-slate-50 border border-gray-300 pl-12 pr-4 py-3 text-sm text-[#0f1c2b] focus:border-brand-primary focus:ring-1 focus:ring-brand-primary focus:bg-white outline-none transition-colors rounded-full"
                />
              </div>
              <p className="text-[11px] text-gray-400 font-medium">Estimativa para o seu primeiro lote acompanhado.</p>
            </div>

            {/* Footer action buttons */}
            <div className="pt-6 flex flex-col sm:flex-row gap-3 justify-between border-t border-gray-200">
              <button
                type="button"
                onClick={onBack}
                className="w-full sm:w-auto px-6 py-3 text-xs font-bold text-brand-primary bg-slate-100 hover:bg-slate-200 active:scale-95 border border-gray-200 transition-colors flex items-center justify-center gap-2 rounded-full cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 text-xs font-bold text-white bg-brand-primary hover:bg-brand-hover active:scale-95 transition-colors flex items-center justify-center gap-2 rounded-full cursor-pointer"
              >
                Próximo
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
