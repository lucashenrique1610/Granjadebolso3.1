/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, User, Mail, Phone, Lock, Eye, EyeOff, ShieldCheck, Check, Info } from 'lucide-react';
import { validatePasswordPolicy } from '@/lib/passwordSecurity';
import { RegistrationCredentials, UserPersonalData } from '@/types';

interface StepPersonalDataProps {
  initialData: UserPersonalData;
  onNext: (data: UserPersonalData, credentials: RegistrationCredentials) => void;
  onBack: () => void;
}

export default function StepPersonalData({
  initialData,
  onNext,
  onBack,
}: StepPersonalDataProps) {
  const [fullName, setFullName] = useState(initialData.fullName);
  const [email, setEmail] = useState(initialData.email);
  const [phone, setPhone] = useState(initialData.phone);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [showStrengthGuidelines, setShowStrengthGuidelines] = useState(false);

  // Auto-masking Brazilian phone strings "(00) 00000-0000" or similar
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, '');
    if (raw.length > 11) {
      raw = raw.substring(0, 11);
    }
    
    let formatted = '';
    if (raw.length > 0) {
      formatted += '(' + raw.substring(0, 2);
    }
    if (raw.length > 2) {
      formatted += ') ' + raw.substring(2, 7);
    }
    if (raw.length > 7) {
      formatted += '-' + raw.substring(7, 11);
    }
    
    setPhone(formatted);
  };

  const handleEmailBlur = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      setEmailError('Insira um endereço de e-mail válido.');
    } else {
      setEmailError('');
    }
  };

  const passwordPolicy = validatePasswordPolicy(password, { fullName, email, phone });
  const passedCheckCount = passwordPolicy.checks.filter((check) => check.passed).length;
  const isStrong = passwordPolicy.isValid;

  const getStrengthLabel = () => {
    if (password.length === 0) return { label: 'Nao informada', color: 'text-gray-400', barColor: 'bg-gray-200', width: 'w-0' };
    if (passedCheckCount <= 3) return { label: 'Senha Fraca', color: 'text-red-500', barColor: 'bg-red-500', width: 'w-1/4' };
    if (passedCheckCount <= 5) return { label: 'Senha Mediana', color: 'text-amber-500', barColor: 'bg-amber-500', width: 'w-2/4' };
    if (!isStrong) return { label: 'Senha Boa', color: 'text-blue-500', barColor: 'bg-blue-500', width: 'w-3/4' };
    return { label: 'Senha Forte', color: 'text-green-600 font-bold', barColor: 'bg-green-500', width: 'w-full' };
  };

  const strengthStatus = getStrengthLabel();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || fullName.trim().length < 3) {
      alert('Por favor, informe seu nome completo.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Insira um endereço de e-mail válido.');
      return;
    }
    if (!phone || phone.replace(/\D/g, '').length < 10) {
      alert('Por favor, insira um telefone celular válido.');
      return;
    }
    if (!password) {
      alert('Por favor, insira uma senha de acesso.');
      return;
    }
    if (!isStrong) {
      alert(`Sua senha nao atende aos requisitos: ${passwordPolicy.messages.join(', ')}.`);
      setShowStrengthGuidelines(true);
      return;
    }
    if (password !== confirmPassword) {
      alert('A confirmação de senha não confere com a senha digitada.');
      return;
    }
    
    onNext({ fullName: fullName.trim(), email: email.trim().toLowerCase(), phone }, { password });
  };

  return (
    <div className="bg-brand-main min-h-screen flex flex-col font-sans antialiased text-[#0f1c2b]">
      {/* Dynamic Header */}
      <header className="flex items-center justify-between px-4 h-14 w-full bg-white border-b border-gray-200 sticky top-0 z-10">
        <button
          onClick={onBack}
          className="text-[#414752] hover:bg-slate-100 p-2 rounded-full transition-colors active:scale-95 flex items-center justify-center cursor-pointer"
          type="button"
          aria-label="Voltar"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="font-bold text-lg text-brand-primary text-center flex-1">Granja de Bolso</span>
        <div className="w-9"></div> {/* Balancer */}
      </header>

      {/* Segmented Progress bar */}
      <div className="px-4 py-4 bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-md mx-auto">
          <div className="flex justify-between items-center mb-2 text-xs">
            <span className="font-semibold text-gray-500 uppercase tracking-wider">Passo 1 de 4</span>
            <span className="font-semibold text-brand-primary">Dados Pessoais</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full flex overflow-hidden gap-1.5">
            <div className="bg-brand-primary h-full w-1/4 rounded-full transition-all"></div>
            <div className="bg-slate-300/30 h-full w-1/4 rounded-full"></div>
            <div className="bg-slate-300/30 h-full w-1/4 rounded-full"></div>
            <div className="bg-slate-300/30 h-full w-1/4 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Primary form space */}
      <main className="flex-1 px-4 py-8 pb-32 max-w-md mx-auto w-full transition-all">
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-[#0f1c2b] mb-2">Vamos começar!</h2>
          <p className="text-sm text-[#414752] leading-relaxed">
            Preencha seus dados pessoais abaixo para iniciarmos o registro seguro do seu perfil.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" id="registration-form">
          {/* Full Name input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#0f1c2b] tracking-wide" htmlFor="fullName">
              Nome Completo
            </label>
            <div className="relative flex items-center">
              <User className="absolute left-4 text-gray-400 w-5 h-5 pointer-events-none" />
              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Digite seu nome completo"
                required
                className="w-full h-12 bg-white border border-gray-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary focus:outline-none pl-12 pr-4 text-sm text-[#0f1c2b] transition-all rounded-full"
              />
            </div>
          </div>

          {/* Email input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#0f1c2b] tracking-wide" htmlFor="email">
              Endereço de E-mail
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-4 text-gray-400 w-5 h-5 pointer-events-none" />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleEmailBlur}
                placeholder="seu.email@exemplo.com"
                required
                className={`w-full h-12 bg-white border ${
                  emailError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:border-brand-primary focus:ring-brand-primary'
                } focus:ring-1 focus:outline-none pl-12 pr-4 text-sm text-[#0f1c2b] transition-all rounded-full`}
              />
            </div>
            {emailError && (
              <p className="text-xs text-red-500 mt-1 font-medium select-none" id="email-error">
                {emailError}
              </p>
            )}
          </div>

          {/* Phone input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#0f1c2b] tracking-wide" htmlFor="phone">
              Telefone Celular
            </label>
            <div className="relative flex items-center">
              <Phone className="absolute left-4 text-gray-400 w-5 h-5 pointer-events-none" />
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="(00) 00000-0000"
                maxLength={15}
                required
                className="w-full h-12 bg-white border border-gray-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary focus:outline-none pl-12 pr-4 text-sm text-[#0f1c2b] transition-all rounded-full"
              />
            </div>
            <p className="text-xs text-gray-400 font-medium">Usado para validação de segurança via SMS.</p>
          </div>

          <div className="border-t border-gray-100 pt-5 space-y-4">
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#0f1c2b] uppercase tracking-wide">
              <ShieldCheck className="w-4.5 h-4.5 text-brand-primary" />
              <span>Segurança da Conta</span>
            </div>

            {/* Password input */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-[#0f1c2b] tracking-wide" htmlFor="password">
                  Definir Senha Forte
                </label>
                <span className={`text-[11px] font-bold ${strengthStatus.color}`}>
                  {strengthStatus.label}
                </span>
              </div>
              <div className="relative flex items-center">
                <Lock className="absolute left-4 text-gray-400 w-5 h-5 pointer-events-none" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimo 12 caracteres com simbolos"
                  required
                  className="w-full h-12 bg-white border border-gray-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary focus:outline-none pl-12 pr-12 text-sm text-[#0f1c2b] transition-all rounded-full"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-gray-400 hover:text-gray-600 focus:outline-none p-1 rounded-full cursor-pointer"
                  title={showPassword ? 'Ocultar senha' : 'Ver senha'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Dynamic Strength Indicator Bar */}
              {password.length > 0 && (
                <div className="mt-1">
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${strengthStatus.barColor} ${strengthStatus.width} transition-all duration-300 rounded-full`}></div>
                  </div>
                </div>
              )}
            </div>

            {/* Password Validation Requirements Checklist */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#0f1c2b]">
                <span>Critérios para Senha Forte:</span>
                <button
                  type="button"
                  onClick={() => setShowStrengthGuidelines(!showStrengthGuidelines)}
                  className="text-brand-primary p-0.5 hover:underline flex items-center gap-1 font-bold text-[10px]"
                >
                  <Info className="w-3.5 h-3.5" />
                  {showStrengthGuidelines ? 'Ocultar Dicas' : 'Ver Dicas de Segurança'}
                </button>
              </div>

              {showStrengthGuidelines && (
                <p className="text-[10px] text-gray-500 leading-normal bg-blue-50 border border-blue-100 p-2.5 rounded-xl font-medium">
                  Recomendação de especialistas: Não utilize dados pessoais fáceis como data de nascimento ou nomes próprios. Uma senha segura protege o faturamento de seus lotes e dados logísticos.
                </p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {passwordPolicy.checks.map((check) => (
                  <div key={check.id} className={`flex items-center gap-2 ${check.id === 'notPersonal' ? 'sm:col-span-2' : ''}`}>
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center border ${check.passed ? 'bg-green-100 border-green-300 text-green-700' : 'bg-slate-100 border-gray-300 text-gray-300'}`}>
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span className={`text-[11px] font-semibold ${check.passed ? 'text-green-700 font-bold' : 'text-gray-500'}`}>
                      {check.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {/* Confirm Password input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#0f1c2b] tracking-wide" htmlFor="confirmPassword">
                Confirmar Senha
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-4 text-gray-400 w-5 h-5 pointer-events-none" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repita sua senha"
                  required
                  className={`w-full h-12 bg-white border ${
                    password && confirmPassword && password !== confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-brand-primary'
                  } focus:ring-1 focus:outline-none pl-12 pr-12 text-sm text-[#0f1c2b] transition-all rounded-full`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 text-gray-400 hover:text-gray-600 focus:outline-none p-1 rounded-full cursor-pointer"
                  title={showConfirmPassword ? 'Ocultar senha' : 'Ver senha'}
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {password && confirmPassword && password !== confirmPassword && (
                <p className="text-xs text-red-500 mt-1 font-semibold">
                  As senhas informadas não coincidem.
                </p>
              )}
            </div>
          </div>
        </form>
      </main>

      {/* Sticky Bottom Next control */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 z-20 shadow-[0_-4px_10px_rgba(0,0,0,0.04)] flex justify-center">
        <button
          form="registration-form"
          type="submit"
          className="w-full max-w-sm h-12 bg-brand-primary text-white font-bold flex items-center justify-center gap-2 hover:bg-brand-hover active:bg-brand-active active:scale-[0.98] transition-all duration-150 rounded-full cursor-pointer text-sm"
        >
          Próximo
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
