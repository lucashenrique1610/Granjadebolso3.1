/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Wheat,
  Bird,
  Flame,
  Droplet,
  Plus,
  Compass,
  AlertTriangle,
  RotateCcw,
  LogOut,
  MapPin,
  CheckCircle,
  Calendar,
  Send,
  Sparkles,
  Palette,
  Database,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { OnboardingState, ThemePaletteId, THEME_PALETTES } from '@/types';
import { isSupabaseConfigured, listUsers, SupabaseUserRow } from '@/lib/supabase';

interface DashboardProps {
  appState: OnboardingState;
  onLogout: () => void;
  onReset: () => void;
  onChangePalette: (paletteId: ThemePaletteId) => void;
}

interface LogEntry {
  id: string;
  time: string;
  text: string;
  type: 'info' | 'success' | 'warning';
}

export default function Dashboard({
  appState,
  onLogout,
  onReset,
  onChangePalette,
}: DashboardProps) {
  const { personal, farm, selectedPalette } = appState;

  // Local interactive metrics
  const [currentBirds, setCurrentBirds] = useState(farm.birdCount || 150);
  const [collectedToday, setCollectedToday] = useState(Math.round(currentBirds * 0.72));
  const [feedLevel, setFeedLevel] = useState(84);
  const [humidity, setHumidity] = useState(62);
  const [temperature, setTemperature] = useState(23.4);
  const [isAlertActive, setIsAlertActive] = useState(false);

  // Custom log system
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: '1', time: '07:30', text: 'Sincronização com sensores do galpão realizada com sucesso', type: 'success' },
    { id: '2', time: '08:00', text: 'Bebedouros automáticos de fluxo higienizados', type: 'info' },
    { id: '3', time: '09:12', text: `Coleta matinal automática concluída nas esteiras`, type: 'success' },
  ]);
  const [newLogText, setNewLogText] = useState('');

  // Weekly stats for the customized SVG Chart
  const [weeklyData, setWeeklyData] = useState([
    { label: 'Seg', eggs: Math.round(currentBirds * 0.7) },
    { label: 'Ter', eggs: Math.round(currentBirds * 0.73) },
    { label: 'Qua', eggs: Math.round(currentBirds * 0.68) },
    { label: 'Qui', eggs: Math.round(currentBirds * 0.75) },
    { label: 'Sex', eggs: Math.round(currentBirds * 0.72) },
    { label: 'Sáb', eggs: Math.round(currentBirds * 0.71) },
    { label: 'Dom', eggs: Math.round(currentBirds * 0.74) },
  ]);

  // Supabase states and sync hooks
  const [supabaseUsers, setSupabaseUsers] = useState<SupabaseUserRow[]>([]);
  const [isLoadingSupabase, setIsLoadingSupabase] = useState(false);

  const fetchSupabaseUsers = async () => {
    if (!isSupabaseConfigured) return;
    setIsLoadingSupabase(true);
    try {
      const data = await listUsers();
      setSupabaseUsers(data);
    } catch (e) {
      console.error('Falha ao buscar dados do Supabase:', e);
    } finally {
      setIsLoadingSupabase(false);
    }
  };

  useEffect(() => {
    fetchSupabaseUsers();
  }, []);

  // Recalculate statistics if bird count updates
  useEffect(() => {
    setCollectedToday(Math.round(currentBirds * 0.72));
    setWeeklyData([
      { label: 'Seg', eggs: Math.round(currentBirds * 0.7) },
      { label: 'Ter', eggs: Math.round(currentBirds * 0.73) },
      { label: 'Qua', eggs: Math.round(currentBirds * 0.68) },
      { label: 'Qui', eggs: Math.round(currentBirds * 0.75) },
      { label: 'Sex', eggs: Math.round(currentBirds * 0.72) },
      { label: 'Sáb', eggs: Math.round(currentBirds * 0.71) },
      { label: 'Dom', eggs: Math.round(currentBirds * 0.74) },
    ]);
  }, [currentBirds]);

  // Apply colors dynamically
  useEffect(() => {
    const activePaletteObj = THEME_PALETTES[selectedPalette];
    if (activePaletteObj) {
      document.documentElement.style.setProperty('--brand-primary', activePaletteObj.themeVars.primary);
      document.documentElement.style.setProperty('--brand-hover', activePaletteObj.themeVars.primaryHover);
      document.documentElement.style.setProperty('--brand-active', activePaletteObj.themeVars.primaryActive);
      document.documentElement.style.setProperty('--brand-bg', activePaletteObj.themeVars.bgContainer);
      document.documentElement.style.setProperty('--brand-main', activePaletteObj.themeVars.bgMain);
    }
  }, [selectedPalette]);

  // Quick increment metrics
  const handleIncreaseBirds = () => {
    setCurrentBirds((prev) => prev + 50);
    const newEntry: LogEntry = {
      id: Date.now().toString(),
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      text: 'Lote incrementado em +50 novas aves poedeiras',
      type: 'info',
    };
    setLogs((prev) => [newEntry, ...prev]);
  };

  const handleCollectEggs = () => {
    setCollectedToday((prev) => prev + 12);
    const newEntry: LogEntry = {
      id: Date.now().toString(),
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      text: 'Registro manual de coleta: +12 ovos adicionados',
      type: 'success',
    };
    setLogs((prev) => [newEntry, ...prev]);
  };

  const handleRefillFeed = () => {
    setFeedLevel(100);
    const newEntry: LogEntry = {
      id: Date.now().toString(),
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      text: 'Silos de ração reabastecidos para 100% de capacidade',
      type: 'info',
    };
    setLogs((prev) => [newEntry, ...prev]);
  };

  const handleSimulateAlert = () => {
    setIsAlertActive(true);
    setTemperature(31.2);
    const newEntry: LogEntry = {
      id: Date.now().toString(),
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      text: 'ALERTA CRÍTICO: Temperatura acima do limite seguro no galpão lateral',
      type: 'warning',
    };
    setLogs((prev) => [newEntry, ...prev]);
  };

  const handleClearAlert = () => {
    setIsAlertActive(false);
    setTemperature(23.4);
    const newEntry: LogEntry = {
      id: Date.now().toString(),
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      text: 'Alerta cancelado: Climatizadores reestabeleceram temperatura ideal',
      type: 'success',
    };
    setLogs((prev) => [newEntry, ...prev]);
  };

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLogText.trim()) return;

    const newEntry: LogEntry = {
      id: Date.now().toString(),
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      text: newLogText.trim(),
      type: 'info',
    };
    setLogs((prev) => [newEntry, ...prev]);
    setNewLogText('');
  };

  // Find max egg value for relative chart bar heights
  const maxEggs = Math.max(...weeklyData.map((d) => d.eggs), 1);

  return (
    <div className="bg-slate-50 text-[#0f1c2b] min-h-screen flex flex-col font-sans transition-all duration-300">
      
      {/* Dashboard Topbar */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100 px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center">
            <Wheat className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-extrabold text-lg text-brand-primary leading-tight">
              {farm.farmName || 'Minha Granja'}
            </h1>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              <span>{farm.city || 'Cidade'}, {farm.state || 'UF'}</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Quick theme selector button container */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-full border border-gray-200">
            {Object.keys(THEME_PALETTES).map((palId) => (
              <button
                key={palId}
                onClick={() => onChangePalette(palId as ThemePaletteId)}
                title={THEME_PALETTES[palId as ThemePaletteId].name}
                className={`w-6 h-6 rounded-full border-2 transition-all ${
                  selectedPalette === palId ? 'border-brand-primary scale-110' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
                style={{ backgroundColor: THEME_PALETTES[palId as ThemePaletteId].colors[0] }}
              />
            ))}
          </div>

          <button
            onClick={onReset}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 active:scale-95 text-xs font-bold text-gray-700 rounded-full transition-all flex items-center gap-1.5 cursor-pointer border border-gray-200"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Editar Cadastro</span>
          </button>

          <button
            onClick={onLogout}
            className="px-4 py-2 bg-slate-100 hover:bg-red-50 text-red-600 hover:text-red-700 active:scale-95 text-xs font-bold rounded-full transition-all flex items-center gap-1.5 cursor-pointer border border-gray-200"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sair</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Grid Area: Core Statistics & Controls (Span 2/3) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Alert banner if active */}
          {isAlertActive && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl flex items-start justify-between gap-4 animate-pulse">
              <div className="flex gap-3">
                <AlertTriangle className="text-red-600 w-6 h-6 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-red-800 text-sm">Alerta Crítico: Altas Temperaturas Detetadas</h3>
                  <p className="text-xs text-red-700 mt-1 font-medium">
                    A temperatura atingiu {temperature}°C no pavilhão modular. Isso pode expor as aves a estresse térmico grave.
                  </p>
                </div>
              </div>
              <button
                onClick={handleClearAlert}
                className="bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 text-xs font-bold rounded-full transition-colors cursor-pointer"
              >
                Normalizar Estado
              </button>
            </div>
          )}

          {/* Welcome User Section */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Sparkles className="w-5 h-5 text-brand-primary animate-spin" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#717783]">Painel Administrativo</span>
              </div>
              <h2 className="text-xl font-extrabold text-[#0f1c2b]">
                Boas-vindas, {personal.fullName || 'Produtor Rural'}
              </h2>
              <p className="text-xs text-gray-500 mt-1 max-w-md leading-relaxed font-medium">
                Seu aplicativo está sintonizado com os dados da granja de <strong className="text-brand-primary">{farm.city}</strong>. Monitore o ciclo produtivo das suas aves.
              </p>
            </div>
            
            <div className="bg-brand-primary/10 text-brand-primary px-4 py-2.5 rounded-2xl flex items-center gap-2">
              <Palette className="w-4 h-4 flex-shrink-0" />
              <div className="text-left">
                <span className="block text-[10px] font-bold uppercase tracking-wider opacity-70">Aparência</span>
                <span className="text-xs font-extrabold">{THEME_PALETTES[selectedPalette].name}</span>
              </div>
            </div>
          </div>

          {/* Core Metric Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            
            {/* Birds Count */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#717783] text-xs font-semibold uppercase tracking-wider">Aves Totais</span>
                <div className="p-2 bg-brand-primary/5 text-brand-primary rounded-xl group-hover:scale-105 transition-all">
                  <Bird className="w-4 h-4" />
                </div>
              </div>
              <div>
                <span className="block text-3xl font-extrabold text-[#0f1c2b] tracking-tight mb-2">
                  {currentBirds}
                </span>
                <button
                  onClick={handleIncreaseBirds}
                  className="w-full py-1.5 bg-brand-primary text-white hover:bg-brand-hover text-xs font-bold rounded-full transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Novo Lote</span>
                </button>
              </div>
            </div>

            {/* Collected Eggs Today */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#717783] text-xs font-semibold uppercase tracking-wider">Ovos Hoje</span>
                <div className="p-2 bg-amber-500/10 text-amber-600 rounded-xl group-hover:scale-105 transition-all">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>
              <div>
                <span className="block text-3xl font-extrabold text-[#0f1c2b] tracking-tight mb-2">
                  {collectedToday}
                </span>
                <button
                  onClick={handleCollectEggs}
                  className="w-full py-1.5 bg-amber-500 text-white hover:bg-amber-600 text-xs font-bold rounded-full transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Coleta Manual</span>
                </button>
              </div>
            </div>

            {/* Feed Capacity */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#717783] text-xs font-semibold uppercase tracking-wider">Silos Ração</span>
                <div className="p-2 bg-green-500/10 text-green-600 rounded-xl group-hover:scale-105 transition-all">
                  <Wheat className="w-4 h-4" />
                </div>
              </div>
              <div>
                <span className="block text-3xl font-extrabold text-[#0f1c2b] tracking-tight mb-1">
                  {feedLevel}%
                </span>
                {/* Custom linear mini progress bar to make UI looks extremely rich */}
                <div className="w-full h-1.5 bg-slate-100 rounded-full mb-2 overflow-hidden">
                  <div
                    style={{ width: `${feedLevel}%` }}
                    className="h-full bg-green-500 rounded-full"
                  />
                </div>
                <button
                  onClick={handleRefillFeed}
                  className="w-full py-1.5 bg-green-600 text-white hover:bg-green-700 text-xs font-bold rounded-full transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Reabastecer</span>
                </button>
              </div>
            </div>

            {/* Smart Sensor details (Combo Temp/Hum) */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#717783] text-xs font-semibold uppercase tracking-wider">Sensores</span>
                <div className={`p-2 rounded-xl transition-all ${isAlertActive ? 'bg-red-500/10 text-red-600' : 'bg-blue-500/10 text-blue-600'}`}>
                  <Flame className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="mb-2">
                  <span className={`block text-xl font-extrabold tracking-tight ${isAlertActive ? 'text-red-600 font-bold' : 'text-[#0f1c2b]'}`}>
                    {temperature}°C
                  </span>
                  <span className="text-[10px] text-gray-400 block font-bold uppercase">Umidade: {humidity}%</span>
                </div>
                <button
                  onClick={isAlertActive ? handleClearAlert : handleSimulateAlert}
                  className={`w-full py-1.5 text-xs font-bold rounded-full transition-colors flex items-center justify-center gap-1 cursor-pointer ${
                    isAlertActive
                      ? 'bg-red-100 hover:bg-red-200 text-red-600 font-bold border border-red-200'
                      : 'bg-slate-100 hover:bg-slate-200 text-gray-700 border border-gray-200'
                  }`}
                >
                  {isAlertActive ? 'Cancelar Alerta' : 'Testar Alerta'}
                </button>
              </div>
            </div>

          </div>

          {/* SVG Custom Egg Production Weekly Chart */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-extrabold text-[#0f1c2b] text-base">Produção Semanal de Ovos</h3>
                <span className="block text-xs text-gray-500 font-medium">Estimativa automatizada do ciclo produtivo atual</span>
              </div>
              <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-lg text-xs font-semibold text-gray-600">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                <span>Últimos 7 dias</span>
              </div>
            </div>

            {/* Custom Responsive SVG Chart Canvas */}
            <div className="w-full h-56 relative flex items-end">
              <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
                {/* Background Grid Lines */}
                <line x1="0" y1="50" x2="500" y2="50" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="0" y1="100" x2="500" y2="100" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="0" y1="150" x2="500" y2="150" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />

                {/* Draw SVG Bar Elements */}
                {weeklyData.map((item, index) => {
                  const barWidth = 35;
                  const xSpacing = 500 / weeklyData.length;
                  const xPos = index * xSpacing + (xSpacing - barWidth) / 2;
                  const barHeight = (item.eggs / maxEggs) * 140; // Max height inside SVG safe bounds
                  const yPos = 175 - barHeight;

                  return (
                    <g key={item.label} className="group cursor-pointer">
                      {/* Interactive Bar */}
                      <rect
                        x={xPos}
                        y={yPos}
                        width={barWidth}
                        height={barHeight}
                        rx="6"
                        fill="var(--brand-primary)"
                        className="opacity-80 hover:opacity-100 transition-opacity"
                      />
                      
                      {/* Interactive hover egg value label above bar */}
                      <text
                        x={xPos + barWidth / 2}
                        y={yPos - 8}
                        textAnchor="middle"
                        fill="var(--brand-primary)"
                        className="text-[10px] font-bold"
                      >
                        {item.eggs}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Chart Overlay Layer for clean X-Axis labels */}
              <div className="absolute bottom-0 left-0 w-full flex justify-between px-2 text-xs font-bold text-gray-500 border-t border-slate-100 pt-2 bg-white">
                {weeklyData.map((item) => (
                  <span key={item.label} className="w-10 text-center uppercase">
                    {item.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Right Grid Area: Interactive Log Feeds & Manual Alerts (Span 1/3) */}
        <div className="space-y-6">
          
          {/* Farm Contact Details */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
            <h3 className="font-extrabold text-[#0f1c2b] text-base mb-2">Contato do Gestor</h3>
            
            <div className="space-y-3.5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-gray-500">
                  <Bird className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] text-gray-400 font-bold uppercase uppercase tracking-wider">Nome do Gestor</span>
                  <span className="text-sm font-semibold">{personal.fullName || 'Produtor Demo'}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-gray-500">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] text-gray-400 font-bold uppercase uppercase tracking-wider">E-mail de Contato</span>
                  <span className="text-sm font-semibold truncate max-w-[200px] block">{personal.email || 'contato@agro.com'}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-gray-500">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] text-gray-400 font-bold uppercase uppercase tracking-wider">Telefone Celular</span>
                  <span className="text-sm font-semibold">{personal.phone || '(11) 99999-9999'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Logs Frame */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col h-[380px]">
            <h3 className="font-extrabold text-[#0f1c2b] text-base mb-2 flex items-center gap-2">
              <Compass className="w-5 h-5 text-brand-primary" />
              <span>Registro de Atividades</span>
            </h3>
            
            {/* Scrollable list container */}
            <div className="flex-1 overflow-y-auto space-y-3.5 pr-2 my-4 scrollbar-thin">
              {logs.map((log) => (
                <div key={log.id} className="text-xs flex items-start gap-2.5 leading-relaxed group">
                  <span className="font-mono text-[10px] text-gray-400 mt-0.5 font-bold flex-shrink-0">
                    [{log.time}]
                  </span>
                  <div>
                    <p className={`font-medium ${
                      log.type === 'warning'
                        ? 'text-red-600 font-bold'
                        : log.type === 'success'
                        ? 'text-green-600'
                        : 'text-gray-700'
                    }`}>
                      {log.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* In-app interactive feed entry form */}
            <form onSubmit={handleAddLog} className="relative flex items-center mt-2.5">
              <input
                type="text"
                value={newLogText}
                onChange={(e) => setNewLogText(e.target.value)}
                placeholder="Digitar nota da granja..."
                className="w-full text-xs bg-slate-50 border border-gray-200 rounded-full pl-4 pr-10 py-2.5 focus:bg-white focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors text-slate-800"
              />
              <button
                type="submit"
                className="absolute right-2 text-brand-primary hover:text-brand-hover active:scale-95 transition-transform cursor-pointer p-1"
                aria-label="Submit log note"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Supabase Sync Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-[#0f1c2b] text-base flex items-center gap-2">
                <Database className={`w-5 h-5 ${isSupabaseConfigured ? 'text-green-600' : 'text-amber-500'}`} />
                <span>Nuvem Supabase</span>
              </h3>
              {isSupabaseConfigured && (
                <button
                  onClick={fetchSupabaseUsers}
                  disabled={isLoadingSupabase}
                  className="p-1.5 text-gray-500 hover:text-brand-primary disabled:opacity-40 rounded-full hover:bg-slate-50 transition-colors cursor-pointer"
                  title="Atualizar dados"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoadingSupabase ? 'animate-spin' : ''}`} />
                </button>
              )}
            </div>

            {isSupabaseConfigured ? (
              <div className="space-y-3">
                <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-xs text-green-800 font-semibold flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span>Sincronização em tempo real ativa</span>
                </div>

                <div className="text-xs text-gray-500 font-bold uppercase tracking-wider block">
                  Usuários cadastrados
                </div>

                {isLoadingSupabase ? (
                  <div className="py-8 text-center text-xs text-gray-400">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-brand-primary" />
                    Carregando registros...
                  </div>
                ) : supabaseUsers.length === 0 ? (
                  <div className="py-6 text-center text-xs text-gray-400 border border-dashed border-gray-200 rounded-lg">
                    Nenhum usuário encontrado.
                  </div>
                ) : (
                  <div className="max-h-[160px] overflow-y-auto space-y-2 pr-1 scrollbar-thin">
                    {supabaseUsers.map((item) => (
                      <div key={item.id} className="p-2.5 bg-slate-50 border border-gray-100 rounded-lg text-xs leading-relaxed">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-[#0f1c2b]">{item.full_name}</span>
                          <span className="text-[10px] text-gray-400 font-mono font-bold uppercase">{item.email}</span>
                        </div>
                        <div className="text-[11px] text-gray-500 font-medium">
                          <span className="block mt-0.5">Telefone: {item.phone || '-'}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 font-medium leading-relaxed">
                  Conexão com o Supabase pendente. Configure as credenciais no painel de segredos do workspace.
                </div>
                <div className="text-xs text-gray-400 leading-relaxed font-semibold">
                  Ao preencher e salvar as credenciais **VITE_SUPABASE_URL** e **VITE_SUPABASE_ANON_KEY**, esta seção listará automaticamente os cadastros em tempo real diretamente do banco!
                </div>
              </div>
            )}
          </div>

        </div>

      </main>

      {/* Embedded footer disclaimer */}
      <footer className="bg-white border-t border-gray-100 py-6 px-8 text-center text-xs text-gray-400 font-medium">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 Granja de Bolso • Sistema Integrado de Precisão Avícola.</p>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Sensores Integrados Conectados • Canal Aberto</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
