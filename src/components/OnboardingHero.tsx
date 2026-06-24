/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, ShieldCheck, LineChart, Egg } from 'lucide-react';

interface OnboardingHeroProps {
  onStart: () => void;
  onGoToLogin: () => void;
}

export default function OnboardingHero({ onStart, onGoToLogin }: OnboardingHeroProps) {

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row bg-brand-main text-on-surface antialiased overflow-x-hidden">
      {/* Left Side: Hero Image Spot and Advantages */}
      <div className="relative w-full h-[400px] md:h-screen md:w-1/2 bg-[#0f1c2b] flex-shrink-0 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 md:hover:scale-105"
          style={{ backgroundImage: `url('/hero_background.png')` }}
        />
        
        {/* Modern Dark/Color Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1c2b] via-[#0f1c2b]/60 to-transparent md:bg-gradient-to-r md:from-transparent md:via-[#0f1c2b]/80 md:to-brand-main"></div>
        <div className="absolute inset-0 bg-brand-primary mix-blend-overlay opacity-30"></div>

        {/* Floating Advantages (Visible mainly on Desktop, hidden or small on mobile) */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 pb-12 md:pb-24 pointer-events-none z-10">
          
          <div className="hidden md:flex flex-col gap-4 max-w-sm mb-auto mt-12">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl shadow-2xl animate-fade-in-up">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-500/20 text-green-400 rounded-lg">
                  <LineChart className="w-5 h-5" />
                </div>
                <h4 className="text-white font-bold text-sm">Rentabilidade Comprovada</h4>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                Nossos algoritmos ajudam você a otimizar a ração e acompanhar a margem de lucro de cada lote, em tempo real.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl shadow-2xl animate-fade-in-up" style={{ animationDelay: '150ms' }}>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-brand-primary/20 text-brand-primary rounded-lg">
                  <Egg className="w-5 h-5" />
                </div>
                <h4 className="text-white font-bold text-sm">Alta Produtividade</h4>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                Monitore a taxa de postura diária e a viabilidade dos animais para alcançar o máximo potencial produtivo.
              </p>
            </div>
          </div>
          
          <div className="text-white md:hidden mt-auto pb-4">
            <h3 className="text-2xl font-extrabold mb-2 leading-tight">O futuro da sua<br/>produção caipira.</h3>
            <p className="text-sm text-slate-300">Gestão profissional, lucro real.</p>
          </div>
        </div>
      </div>

      {/* Right Side: Content & Actions Area */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-12 py-10 md:py-8 relative flex-grow bg-brand-main overflow-y-auto">
        {/* Subtle grid pattern to underscore modern logistics tech mood */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

        <div className="max-w-md mx-auto md:mx-0 w-full relative z-10">
          
          {/* Removed dev banners */}

          {/* Brand Header */}
          <div className="flex flex-col items-center md:items-start mb-10">
            <img
                src="/logo.png"
                alt="Logo Granja de Bolso"
                className="w-36 h-36 md:w-44 md:h-44 object-contain drop-shadow-sm"
              />
          </div>

          {/* Typography Heading */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f1c2b] tracking-tight leading-tight mb-4">
            Gestão Inteligente para sua Granja Caipira
          </h1>

          <p className="text-sm sm:text-base text-[#414752] leading-relaxed mb-8 font-medium">
            Eficiência, rastreabilidade e controle total da sua operação avícola, direto na palma da sua mão. Seus dados estão sempre seguros e disponíveis de onde você estiver.
          </p>

          {/* Actions Column */}
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <button
              onClick={onStart}
              className="flex-1 h-12 inline-flex items-center justify-center gap-2 bg-brand-primary text-white font-semibold px-6 hover:bg-brand-hover active:bg-brand-active active:scale-[0.98] transition-all duration-200 shadow-sm rounded-full cursor-pointer text-sm"
              id="btn-start"
            >
              Começar Agora
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onGoToLogin}
              className="flex-1 h-12 inline-flex items-center justify-center bg-transparent border border-gray-300 hover:border-brand-primary text-brand-primary font-semibold px-6 hover:bg-brand-primary/5 active:bg-brand-primary/10 transition-colors duration-200 rounded-full cursor-pointer text-sm"
              id="btn-goto-login"
            >
              Já tenho uma conta
            </button>
          </div>

          {/* Trust Meta Indicator */}
          <div className="mt-10 pt-6 border-t border-gray-200/60 flex items-center gap-2">
            <ShieldCheck className="text-brand-primary w-5 h-5 flex-shrink-0" />
            <span className="text-xs text-gray-600 font-semibold tracking-wide">
              Feito por quem entende: criado de avicultor para avicultor.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
