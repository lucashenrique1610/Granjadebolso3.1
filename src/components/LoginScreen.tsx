/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Mail, Lock, ArrowRight, Wheat, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { signInWithEmail, isSupabaseConfigured, supabaseConfigIssue } from '@/lib/supabase';

interface LoginScreenProps {
  onLogin: () => void;
  onGoToSignup: () => void;
  initialEmail?: string;
  notice?: string;
}

export default function LoginScreen({ onLogin, onGoToSignup, initialEmail, notice }: LoginScreenProps) {
  const [email, setEmail] = useState(initialEmail || '');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    if (initialEmail) {
      setEmail(initialEmail);
    }
  }, [initialEmail]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (!isSupabaseConfigured) {
      if (supabaseConfigIssue === 'service_role') {
        setAuthError('Chave do Supabase inválida: você colou uma service_role key. Use a anon public key (Settings → API → anon public).');
        return;
      }
      setAuthError('Supabase não está configurado. Crie ou preencha o arquivo .env na raiz do projeto com VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY e reinicie o npm run dev.');
      return;
    }

    if (!email.trim() || !password) {
      setAuthError('Por favor, preencha todos os campos do formulário.');
      return;
    }

    try {
      await signInWithEmail(email.trim(), password);
      onLogin();
    } catch (e: any) {
      const message = typeof e?.message === 'string' ? e.message : '';
      if (message.toLowerCase().includes('invalid login credentials')) {
        setAuthError('E-mail ou senha inválidos.');
        return;
      }
      if (message.toLowerCase().includes('email not confirmed')) {
        setAuthError('Confirme seu e-mail antes de entrar.');
        return;
      }
      setAuthError(message || 'Falha ao autenticar. Tente novamente.');
    }
  };

  return (
    <div className="bg-brand-main text-on-surface min-h-screen flex items-center justify-center font-sans antialiased selection:bg-brand-primary selection:text-white">
      <div className="w-full min-h-screen flex flex-col md:flex-row">
        {/* Left Side: Hero Image (Hidden on Mobile) */}
        <div className="hidden md:block md:w-1/2 lg:w-7/12 relative bg-slate-300 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAF7jRK9z6qOzu0Nw0aOijEjcMPQZ64-Id9iX8IhJqUc-Xp9BJM7gwufHI49lwEvMVUq0Ry2qJjEzYw7hNBrHh3Lhe83UKOsx2DefmWHoeiyhimt-wgwqMEFhXy3fwYQyWIAYAjyOJNaLfHdtBvHVEY1WQGO_PQH_u0kWNxMRBVVsZ_Pe-9t9iw8lk5iS6su0p3nOqOZIG2mH6kvvudVyr1EhpdbvnrY8Hw9ufktoDPAzV5cKU3VlbpsuRLNNOZcyV_ZeGnqNbWQ3g')`,
            }}
          />
          {/* Tonal overlay for unified brand look */}
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/80 to-transparent mix-blend-multiply" />
          
          {/* Aesthetic Overlay Content */}
          <div className="absolute bottom-10 left-10 right-10 text-white relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Wheat className="w-8 h-8 text-white" />
              <h2 className="text-xl md:text-2xl font-bold tracking-tight">Sistema Integrado</h2>
            </div>
            <p className="text-sm md:text-sm max-w-sm opacity-90 leading-relaxed font-medium">
              Gestão de precisão e controle logístico para operações de alta performance.
            </p>
          </div>
        </div>

        {/* Right Side: Form Canvas */}
        <div className="w-full md:w-1/2 lg:w-5/12 flex items-center justify-center p-6 md:p-12 bg-white">
          <div className="w-full max-w-sm flex flex-col gap-6">
            
            {/* Header / Logo Area */}
            <div className="flex flex-col items-center md:items-start mb-2">
              <div className="flex items-center gap-2 text-brand-primary mb-1">
                <img
                  src="/logo.png"
                  alt="Logo Granja de Bolso"
                  className="w-12 h-12 object-contain"
                />
                <h1 className="text-xl md:text-2xl text-brand-primary font-bold tracking-tight">
                  Granja de Bolso
                </h1>
              </div>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider text-center md:text-left">
                Acesse sua conta para continuar
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              {notice && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-2xl flex items-start gap-2.5 text-xs text-green-800 font-semibold leading-relaxed">
                  <span>{notice}</span>
                </div>
              )}
              
              {/* Email Input Group */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-700" htmlFor="email-login">
                  Email Corporativo
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                  <input
                    id="email-login"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nome@empresa.com"
                    className="w-full bg-slate-50 border border-gray-300 text-sm text-[#0f1c2b] py-3 pl-12 pr-4 focus:bg-white focus:border-brand-primary focus:ring-1 focus:ring-brand-primary focus:outline-none transition-colors rounded-full"
                  />
                </div>
              </div>

              {/* Password Input Group */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-700" htmlFor="password-login">
                  Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                  <input
                    id="password-login"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-gray-300 text-sm text-[#0f1c2b] py-3 pl-12 pr-12 focus:bg-white focus:border-brand-primary focus:ring-1 focus:ring-brand-primary focus:outline-none transition-colors rounded-full"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none p-1 rounded-full cursor-pointer"
                    title={showPassword ? 'Ocultar senha' : 'Ver senha'}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Utilities Row: Remember & Forget */}
              <div className="flex items-center justify-between mt-1 mb-2">
                <div className="flex items-center gap-2">
                  <input
                    id="remember"
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary focus:ring-offset-white bg-slate-50 cursor-pointer"
                  />
                  <label
                    htmlFor="remember"
                    className="text-xs font-semibold text-gray-500 cursor-pointer select-none"
                  >
                    Lembrar-me
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() => alert('Para redefinir sua senha, entre em contato com o suporte em suporte@granjadebolso.com')}
                  className="text-xs font-bold text-brand-primary hover:underline"
                >
                  Esqueci minha senha
                </button>
              </div>

              {/* Inline authentication error feedback banner */}
              {authError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-2.5 text-xs text-red-800 font-semibold leading-relaxed">
                  <AlertCircle className="w-4.5 h-4.5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              {/* Primary Action Button */}
              <button
                type="submit"
                className="w-full h-11 bg-brand-primary text-white font-bold py-3 hover:bg-brand-hover active:scale-[0.98] transition-all flex justify-center items-center gap-2 shadow-sm rounded-full cursor-pointer text-sm"
              >
                <span>Entrar no Sistema</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Footer Sign Up Link */}
            <div className="text-center text-xs font-semibold text-gray-500 mt-2">
              Não tem uma conta?{' '}
              <button
                onClick={onGoToSignup}
                className="text-brand-primary hover:underline font-bold"
              >
                Cadastre-se
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
