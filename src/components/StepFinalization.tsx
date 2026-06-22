/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, Loader2, Wheat, Check } from 'lucide-react';

interface StepFinalizationProps {
  initialSource: string;
  onBack: () => void;
  onComplete: (source: string) => void;
}

export default function StepFinalization({
  initialSource,
  onBack,
  onComplete,
}: StepFinalizationProps) {
  const [selectedSource, setSelectedSource] = useState(initialSource);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const chips = [
    { value: 'social', label: 'Redes Sociais' },
    { value: 'referral', label: 'Indicação' },
    { value: 'search', label: 'Pesquisa no Google' },
    { value: 'events', label: 'Eventos' },
    { value: 'other', label: 'Outros' },
  ];

  const handleFinish = () => {
    if (!selectedSource) return;

    setIsProcessing(true);
    // Simulate short processing state exactly like the original code scripts
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        onComplete(selectedSource);
      }, 1000);
    }, 1500);
  };

  return (
    <div className="bg-brand-main min-h-screen text-on-surface antialiased flex flex-col font-sans text-sm">
      {/* Branding Header */}
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
          <Wheat className="w-5 h-5 animate-bounce" />
          <span className="font-bold text-lg text-brand-primary">Granja de Bolso</span>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 py-8 max-w-lg mx-auto w-full">
        {/* Main Form Card */}
        <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-slate-50 px-6 py-4 border-b border-gray-200 flex items-center justify-center gap-2">
            <Wheat className="text-brand-primary w-5 h-5" />
            <span className="font-semibold text-[#0f1c2b]">Granja de Bolso • Setup</span>
          </div>

          <div className="p-6 md:p-8 flex flex-col gap-6">
            {/* Progress segment */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <h1 className="text-lg md:text-xl font-bold text-[#0f1c2b]">Finalização</h1>
                <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Passo 4 de 4</span>
              </div>
              
              {/* Progress bar segmented */}
              <div className="flex gap-1 w-full mt-2">
                <div className="h-1.5 flex-1 bg-brand-primary rounded-full"></div>
                <div className="h-1.5 flex-1 bg-brand-primary rounded-full"></div>
                <div className="h-1.5 flex-1 bg-brand-primary rounded-full"></div>
                <div className="h-1.5 flex-1 bg-brand-primary rounded-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-brand-primary opacity-35 animate-pulse"></div>
                  <div className="h-full bg-brand-primary rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex flex-col gap-4">
              <p className="text-base text-[#0f1c2b] font-bold">Como conheceu o nosso sistema?</p>
              <p className="text-sm text-gray-500 -mt-2">Selecione a opção que melhor descreve como você nos encontrou.</p>

              {/* Chip Selection Grid */}
              <div className="flex flex-wrap gap-2.5 mt-2" id="source-chips">
                {chips.map((chip) => {
                  const isActive = selectedSource === chip.value;
                  return (
                    <button
                      key={chip.value}
                      type="button"
                      onClick={() => !isProcessing && !isSuccess && setSelectedSource(chip.value)}
                      className={`group flex items-center gap-1.5 px-4 py-2.5 rounded-full border text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                        isActive
                          ? 'bg-brand-primary text-white border-transparent shadow-sm'
                          : 'bg-slate-50 border-gray-300 text-gray-600 hover:bg-slate-200'
                      }`}
                    >
                      {isActive && <Check className="w-3.5 h-3.5 flex-shrink-0 animate-scale" />}
                      {chip.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons Inside Card */}
            <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 mt-6 pt-5 border-t border-gray-200">
              <button
                disabled={isProcessing || isSuccess}
                onClick={onBack}
                className="w-full sm:w-auto px-6 py-2.5 flex items-center justify-center gap-2 rounded-full border border-gray-300 text-gray-700 font-bold hover:bg-slate-50 transition-colors disabled:opacity-40"
                type="button"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </button>

              <button
                disabled={!selectedSource || isProcessing || isSuccess}
                onClick={handleFinish}
                className={`w-full sm:w-auto h-11 px-6 flex items-center justify-center gap-2 rounded-full font-bold transition-all transition-colors cursor-pointer ${
                  !selectedSource
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : isSuccess
                    ? 'bg-green-600 text-white'
                    : 'bg-brand-primary text-white hover:bg-brand-hover active:scale-95'
                }`}
                id="btn-finish"
                type="button"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processando...
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckCircle className="w-4 h-4 animate-ping" />
                    Sucesso!
                  </>
                ) : (
                  <>
                    Finalizar Cadastro
                    <CheckCircle className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
