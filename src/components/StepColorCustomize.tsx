/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { ArrowLeft, ArrowRight, Paintbrush, CheckCircle, Circle, Palette } from 'lucide-react';
import { ThemePaletteId, THEME_PALETTES } from '@/types';
import { resolveThemePalette } from '@/lib/theme';

interface StepColorCustomizeProps {
  selectedPalette: ThemePaletteId;
  customPaletteColor?: string;
  onChangePalette: (paletteId: ThemePaletteId, customColor?: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepColorCustomize({
  selectedPalette,
  customPaletteColor,
  onChangePalette,
  onNext,
  onBack,
}: StepColorCustomizeProps) {
  // Let's print out the list of option objects
  const palettes = Object.values(THEME_PALETTES);

  // Apply subtle visual dynamic adjustments as an effect (for double safety across frames)
  useEffect(() => {
    // When selectedPalette changes, standard custom brand properties automatically sync!
    const activePaletteObj = resolveThemePalette(selectedPalette, customPaletteColor);
    if (activePaletteObj) {
      document.documentElement.style.setProperty('--brand-primary', activePaletteObj.themeVars.primary);
      document.documentElement.style.setProperty('--brand-hover', activePaletteObj.themeVars.primaryHover);
      document.documentElement.style.setProperty('--brand-active', activePaletteObj.themeVars.primaryActive);
      document.documentElement.style.setProperty('--brand-bg', activePaletteObj.themeVars.bgContainer);
      document.documentElement.style.setProperty('--brand-main', activePaletteObj.themeVars.bgMain);
    }
  }, [selectedPalette, customPaletteColor]);

  return (
    <div className="bg-brand-main min-h-screen flex flex-col font-sans antialiased text-[#0f1c2b]">
      {/* Top Header */}
      <header className="w-full h-14 px-4 flex items-center justify-between sticky top-0 bg-white border-b border-gray-100 z-50">
        <button
          onClick={onBack}
          className="text-[#414752] hover:bg-slate-100 p-2 rounded-full transition-colors active:scale-95 flex items-center justify-center cursor-pointer"
          type="button"
          aria-label="Voltar"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="font-bold text-lg text-brand-primary">Granja de Bolso</span>
        <div className="text-gray-500 font-semibold text-xs uppercase tracking-wider">Passo 3 de 4</div>
      </header>

      {/* Main Registration Canvas */}
      <main className="w-full max-w-md px-4 py-8 flex flex-col flex-grow mx-auto pb-32">
        {/* Progress Bar Segment */}
        <div className="w-full h-2 bg-slate-100 rounded-full mb-8 overflow-hidden flex gap-1.5">
          <div className="h-full bg-brand-primary w-1/4 rounded-full"></div>
          <div className="h-full bg-brand-primary w-1/4 rounded-full"></div>
          <div className="h-full bg-brand-primary w-1/4 rounded-full"></div>
          <div className="h-full bg-slate-300/30 w-1/4 rounded-full"></div>
        </div>

        {/* Headline & Subtitle */}
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f1c2b] mb-2 tracking-tight">
            Personalize sua experiência
          </h1>
          <p className="text-sm text-[#414752] leading-relaxed">
            Escolha a paleta de cores que melhor combina com a sua granja.
          </p>
        </div>

        {/* Palette Selection Stack */}
        <div className="space-y-4 mb-8" id="palette-container">
          {palettes.map((palette) => {
            const isActive = selectedPalette === palette.id;
            return (
              <button
                key={palette.id}
                type="button"
                onClick={() => onChangePalette(palette.id)}
                className={`w-full flex items-center justify-between p-4 bg-white border ${
                  isActive
                    ? 'border-brand-primary ring-2 ring-brand-primary/10 shadow-sm'
                    : 'border-gray-200 hover:border-brand-primary/60'
                } rounded-2xl cursor-pointer transition-all duration-200 outline-none hover:scale-[1.01]`}
              >
                <div className="flex items-center gap-4">
                  {/* Overlapping Circles preview */}
                  <div className="flex -space-x-2.5">
                    {palette.colors.map((color, index) => (
                      <div
                        key={index}
                        style={{ backgroundColor: color }}
                        className="w-8 h-8 rounded-full border-2 border-white shadow-sm flex-shrink-0"
                      />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-[#0f1c2b] tracking-wide">
                    {palette.name}
                  </span>
                </div>

                {isActive ? (
                  <CheckCircle className="text-brand-primary w-6 h-6 flex-shrink-0" />
                ) : (
                  <Circle className="text-gray-300 hover:text-brand-primary w-5 h-5 flex-shrink-0" />
                )}
              </button>
            );
          })}

          {selectedPalette === 'custom' && (
            <div className="p-4 bg-white border border-brand-primary rounded-2xl flex flex-col gap-3 animate-in fade-in slide-in-from-top-2">
              <span className="text-sm font-bold text-[#0f1c2b]">Escolha sua cor HEX:</span>
              <div className="flex gap-4 items-center">
                <input
                  type="color"
                  value={customPaletteColor || '#6366f1'}
                  onChange={(e) => onChangePalette('custom', e.target.value)}
                  className="w-12 h-12 rounded-xl cursor-pointer p-1"
                />
                <input
                  type="text"
                  value={customPaletteColor || '#6366f1'}
                  onChange={(e) => onChangePalette('custom', e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-primary outline-none"
                  placeholder="#HEX"
                />
              </div>
            </div>
          )}
        </div>

        {/* Dynamic Warning Card */}
        <div className="relative overflow-hidden rounded-2xl bg-brand-primary/[0.04] p-5 border border-brand-primary/10">
          <div className="flex items-center gap-4 relative z-10">
            <div className="p-3 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-[#0f1c2b]">Visualização Dinâmica</h3>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                A interface será ajustada instantaneamente para a cor escolhida.
              </p>
            </div>
          </div>
          {/* Abstract glowing shape */}
          <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-brand-primary opacity-5 rounded-full blur-2xl"></div>
        </div>
      </main>

      {/* Bottom Sticky Action navigation */}
      <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 z-20 shadow-[0_-4px_10px_rgba(0,0,0,0.04)] flex justify-center">
        <div className="w-full max-w-md flex gap-4">
          <button
            onClick={onBack}
            className="flex-1 py-3 px-6 rounded-full border border-gray-300 hover:border-brand-primary font-bold text-sm text-[#0f1c2b] hover:bg-slate-50 active:scale-95 transition-all text-center cursor-pointer"
          >
            Voltar
          </button>
          <button
            onClick={onNext}
            className="flex-[2] py-3 px-6 rounded-full bg-brand-primary text-white font-bold text-sm shadow-sm hover:bg-brand-hover active:scale-[0.98] transition-all text-center cursor-pointer flex items-center justify-center gap-2"
          >
            Próximo
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </footer>
    </div>
  );
}
