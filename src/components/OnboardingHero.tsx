/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Warehouse, Database, Check, AlertCircle, Copy, Terminal } from 'lucide-react';
import { isSupabaseConfigured } from '@/lib/supabase';

interface OnboardingHeroProps {
  onStart: () => void;
  onGoToLogin: () => void;
}

export default function OnboardingHero({ onStart, onGoToLogin }: OnboardingHeroProps) {
  const [showSqlGuide, setShowSqlGuide] = useState(false);
  const [copied, setCopied] = useState(false);

  const sqlSchema = `DROP TABLE IF EXISTS farms;
DROP TABLE IF EXISTS profiles;

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users_select_authenticated" ON users FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "users_insert_own" ON users FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "users_update_own" ON users FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);`;

  const handleCopySql = () => {
    navigator.clipboard.writeText(sqlSchema);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row bg-brand-main text-on-surface antialiased overflow-x-hidden">
      {/* Left Side: Hero Image Spot (Becomes top block on mobile, left block on desktop) */}
      <div className="relative w-full h-[320px] md:h-screen md:w-1/2 bg-slate-200 flex-shrink-0">
        <img
          alt="Granja Caipira no campo ao amanhecer"
          className="absolute inset-0 w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
          src="https://lh3.googleusercontent.com/aida/AP1WRLtpcOu9ituv7Jr4PpKvI2-G1GsSI_8Pqcs7v79_qKuKBcHmwUOQ-8-rdck9w55cyUImlb0b0AxYUkXInBXQHOfJ0md1PgU7Hl5K7vpbZ_seKDYkeXwtUYpOxdDyEvYT4OkwBTjLfbLnjRgZW4yrPBgph39wSzpNdpvIFlOozO9SNPAIK7_iADZk9VWA172ugR_CZijkJTXwSNvBKpyaWM5Kmd4dd72n37a7KdGhorCiFjNBPq9NT4hHHa0"
        />
        {/* Gradients to harmonize visual integration & make elements look unified */}
        <div className="absolute inset-0 bg-brand-primary mix-blend-multiply opacity-15"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-main via-brand-main/10 to-transparent md:bg-gradient-to-r md:from-transparent md:via-brand-main/20 md:to-brand-main"></div>
      </div>

      {/* Right Side: Content & Actions Area */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-12 py-10 md:py-8 relative flex-grow bg-brand-main overflow-y-auto">
        {/* Subtle grid pattern to underscore modern logistics tech mood */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

        <div className="max-w-md mx-auto md:mx-0 w-full relative z-10">
          
          {/* Supabase Connection Status Banner */}
          <div className="mb-6 p-3 bg-white border border-gray-200 rounded-xl shadow-xs flex items-center justify-between text-xs font-semibold">
            <div className="flex items-center gap-2">
              <Database className={`w-4 h-4 ${isSupabaseConfigured ? 'text-green-600' : 'text-amber-500 animate-pulse'}`} />
              <div>
                <span className="block text-gray-400 text-[10px] uppercase font-bold tracking-wider">Status do Supabase</span>
                <span className={isSupabaseConfigured ? 'text-green-700' : 'text-amber-600'}>
                  {isSupabaseConfigured ? 'Banco de Dados Conectado' : 'Configuração de Credenciais Pendente'}
                </span>
              </div>
            </div>
            
            <button
              onClick={() => setShowSqlGuide(!showSqlGuide)}
              className="px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider text-brand-primary bg-brand-primary/10 rounded-md hover:bg-brand-primary/20 transition-all cursor-pointer"
            >
              {showSqlGuide ? 'Fechar Guia' : 'Ver Instruções SQL'}
            </button>
          </div>

          {/* SQL Setup Instructions */}
          {showSqlGuide && (
            <div className="mb-6 p-4 bg-[#1e1e24] text-[#d4d4d8] border border-gray-800 rounded-xl shadow-lg relative font-mono text-[11px] animate-scale">
              <div className="flex items-center justify-between mb-3.5 pb-2 border-b border-gray-800">
                <span className="font-sans font-bold text-gray-400 flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                  <Terminal className="w-3.5 h-3.5 text-brand-primary" />
                  Script de criação da tabela Supabase
                </span>
                <button
                  onClick={handleCopySql}
                  className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer text-[10px] px-2 py-1 bg-white/5 rounded-md border border-white/10"
                >
                  {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                  {copied ? 'Copiado!' : 'Copiar'}
                </button>
              </div>
              <p className="font-sans text-xs text-gray-400 mb-3 font-medium">
                Execute o comando abaixo no painel <strong className="text-[#a3c9ff]">SQL Editor</strong> do seu projeto Supabase:
              </p>
              <pre className="overflow-x-auto whitespace-pre p-2 bg-black/30 rounded-lg max-h-40 overflow-y-auto text-green-400 leading-relaxed scrollbar-thin">
                {sqlSchema}
              </pre>
            </div>
          )}

          {/* Brand Header */}
          <div className="flex items-center gap-3 mb-8">
            <img
                src="/logo.png"
                alt="Logo Granja de Bolso"
                className="w-16 h-16 object-contain"
              />
            <div>
              <span className="font-bold text-2xl text-brand-primary tracking-tight">Granja de Bolso</span>
              <span className="block text-xs uppercase tracking-widest text-[#717783] font-medium">Agro-Precision</span>
            </div>
          </div>

          {/* Typography Heading */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f1c2b] tracking-tight leading-tight mb-4">
            Gestão Inteligente para sua Granja Caipira
          </h1>

          <p className="text-sm sm:text-base text-[#414752] leading-relaxed mb-8 font-medium">
            Eficiência, rastreabilidade e controle total da sua operação logística e avícola, direto na palma da sua mão com integração em tempo real no banco de dados **Supabase**.
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

          {/* Setup Alert Message if missing keys */}
          {!isSupabaseConfigured && (
            <div className="mt-6 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <p className="text-[11px] text-amber-800 leading-relaxed font-semibold">
                **Dica do Desenvolvedor**: Para salvar dados diretamente no Supabase, configure as variáveis de ambiente **VITE_SUPABASE_URL** e **VITE_SUPABASE_ANON_KEY** nas configurações de Segredos de seu Workspace. Enquanto não configurado, o app utilizará cache local do navegador.
              </p>
            </div>
          )}

          {/* Trust Meta Indicator */}
          <div className="mt-8 pt-6 border-t border-gray-200/60 flex items-center gap-2">
            <ShieldCheck className="text-gray-400 w-5 h-5 flex-shrink-0" />
            <span className="text-xs text-gray-400 font-medium">
              Plataforma Segura Institucional • v2.4.1
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
