import React, { useState, useMemo, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Calculator, 
  Wallet, 
  Save, 
  X, 
  PieChart, 
  DollarSign, 
  Hammer, 
  FileText,
  AlertCircle
} from 'lucide-react';
import { InvestmentCategory, InvestmentItem, InvestmentProject } from '@/types';

export default function InvestimentosPage() {
  const [activeTab, setActiveTab] = useState<'projetos' | 'calculadora'>('calculadora');
  const [projects, setProjects] = useState<InvestmentProject[]>([]);
  const [viewingProjectId, setViewingProjectId] = useState<string | null>(null);
  
  // New Project/Item Modals
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [showNewItemModal, setShowNewItemModal] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [newItemCategory, setNewItemCategory] = useState<InvestmentCategory>('infraestrutura');
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemQtd, setNewItemQtd] = useState(1);
  const [newItemPrice, setNewItemPrice] = useState(0);

  // Calculadora State
  const [calcAves, setCalcAves] = useState<number>(500);
  const [calcFase, setCalcFase] = useState<'postura' | 'corte'>('postura');
  const [calcSistema, setCalcSistema] = useState<'caipira' | 'intensivo'>('caipira');

  useEffect(() => {
    const saved = localStorage.getItem('granja-investments');
    if (saved) {
      try {
        setProjects(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse investments', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('granja-investments', JSON.stringify(projects));
  }, [projects]);

  // --- Calculadora Logic ---
  const calcResults = useMemo(() => {
    const densidade = calcSistema === 'caipira' 
      ? (calcFase === 'postura' ? 6 : 10) 
      : (calcFase === 'postura' ? 10 : 14);
    
    const areaM2 = Math.ceil(calcAves / densidade);
    
    // Ideal dimensions
    const largura = areaM2 <= 50 ? 5 : areaM2 <= 100 ? 8 : 10; // Max 10-12m for cross-ventilation
    const comprimento = Math.ceil(areaM2 / largura);
    const areaPiquete = calcSistema === 'caipira' ? calcAves * 3 : 0; // 3m2 per bird for caipira
    
    // Equipment
    const comedouros = Math.ceil(calcAves / 40);
    const bebedouros = Math.ceil(calcAves / 80);
    const ninhos = calcFase === 'postura' ? Math.ceil(calcAves / 5) : 0;

    return {
      areaM2,
      largura,
      comprimento,
      areaPiquete,
      comedouros,
      bebedouros,
      ninhos,
    };
  }, [calcAves, calcFase, calcSistema]);

  // --- Templates Dinâmicos Baseados no Conhecimento ---
  const handleGenerateTemplate = (templateId: string, aves: number, fase: 'postura' | 'corte', sistema: 'caipira' | 'intensivo') => {
    // Lógica da base de conhecimento
    const densidade = sistema === 'caipira' 
      ? (fase === 'postura' ? 6 : 10) 
      : (fase === 'postura' ? 10 : 14);
    
    const areaM2 = Math.ceil(aves / densidade);
    const largura = areaM2 <= 50 ? 5 : areaM2 <= 100 ? 8 : 10;
    const comprimento = Math.ceil(areaM2 / largura);
    const perimetro = (largura + comprimento) * 2;
    
    const items: Partial<InvestmentItem>[] = [];

    if (templateId === 'galpao-completo') {
      items.push(
        { categoria: 'infraestrutura', descricao: 'Madeira/Eucalipto Tratado (Pilares a cada 2.5m)', precoUnitario: 45, quantidade: Math.ceil(perimetro / 2.5) },
        { categoria: 'infraestrutura', descricao: 'Telhas de Fibrocimento (2.44m)', precoUnitario: 50, quantidade: Math.ceil(areaM2 / 2.1) }, // Cada telha cobre ~2.1m2
        { categoria: 'infraestrutura', descricao: 'Tela Galvanizada Pinteiro (Metros)', precoUnitario: 15, quantidade: perimetro },
        { categoria: 'infraestrutura', descricao: 'Lona Plástica para Cortinas (Metros)', precoUnitario: 10, quantidade: perimetro },
        { categoria: 'infraestrutura', descricao: 'Cimento (Sacos para mureta e piso leve)', precoUnitario: 35, quantidade: Math.ceil(perimetro * 0.6) },
        { categoria: 'equipamentos', descricao: 'Bebedouros Pendulares', precoUnitario: 65, quantidade: Math.ceil(aves / 80) },
        { categoria: 'equipamentos', descricao: 'Comedouros Tubulares', precoUnitario: 45, quantidade: Math.ceil(aves / 40) }
      );
      if (fase === 'postura') {
        items.push({ categoria: 'equipamentos', descricao: 'Bocas de Ninho', precoUnitario: 15, quantidade: Math.ceil(aves / 5) });
      }
      items.push({ categoria: 'mao_de_obra', descricao: 'Construção (Diárias Estimadas)', precoUnitario: 180, quantidade: Math.ceil(areaM2 / 5) });
      
      return { nome: `Galpão ${fase === 'postura' ? 'Postura' : 'Corte'} (${aves} aves)`, items };
    }

    if (templateId === 'automacao-agua') {
      items.push(
        { categoria: 'equipamentos', descricao: 'Linha de Nipple (Metros)', precoUnitario: 35, quantidade: comprimento },
        { categoria: 'equipamentos', descricao: 'Regulador de Pressão', precoUnitario: 250, quantidade: 1 },
        { categoria: 'equipamentos', descricao: 'Filtro de Água', precoUnitario: 120, quantidade: 1 },
        { categoria: 'infraestrutura', descricao: 'Canos PVC 25mm e Conexões', precoUnitario: 15, quantidade: Math.ceil(comprimento / 3) },
        { categoria: 'mao_de_obra', descricao: 'Instalação Hidráulica (Diárias)', precoUnitario: 250, quantidade: Math.ceil(comprimento / 20) }
      );
      return { nome: `Automação de Bebedouros (${aves} aves)`, items };
    }

    return { nome: 'Projeto Personalizado', items: [] };
  };

  const handleCreateFromTemplate = () => {
    if (!selectedTemplateId) return;

    const { nome, items } = handleGenerateTemplate(selectedTemplateId, paramAves, paramFase, paramSistema);
    
    const newProject: InvestmentProject = {
      id: crypto.randomUUID(),
      nome,
      status: 'planejamento',
      dataInicio: new Date().toISOString(),
      items: items.map(item => ({
        id: crypto.randomUUID(),
        projectId: 'pending',
        categoria: item.categoria!,
        descricao: item.descricao!,
        quantidade: item.quantidade || 1,
        precoUnitario: item.precoUnitario || 0,
      })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    newProject.items.forEach(i => i.projectId = newProject.id);
    
    setProjects(prev => [newProject, ...prev]);
    setViewingProjectId(newProject.id);
    setShowTemplateModal(false);
  };

  // State for template modal
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [paramAves, setParamAves] = useState(500);
  const [paramFase, setParamFase] = useState<'postura' | 'corte'>('postura');
  const [paramSistema, setParamSistema] = useState<'caipira' | 'intensivo'>('caipira');

  const currentProjectView = useMemo(() => {
    return projects.find(p => p.id === viewingProjectId);
  }, [projects, viewingProjectId]);

  const handleAddItem = () => {
    if (!currentProjectView) return;
    
    setProjects(prev => prev.map(p => {
      if (p.id === currentProjectView.id) {
        if (editingItemId) {
          return {
            ...p,
            items: p.items.map(i => i.id === editingItemId ? {
              ...i,
              categoria: newItemCategory,
              descricao: newItemDesc,
              quantidade: newItemQtd,
              precoUnitario: newItemPrice,
            } : i),
            updatedAt: new Date().toISOString()
          };
        } else {
          const item: InvestmentItem = {
            id: crypto.randomUUID(),
            projectId: currentProjectView.id,
            categoria: newItemCategory,
            descricao: newItemDesc,
            quantidade: newItemQtd,
            precoUnitario: newItemPrice,
          };
          return {
            ...p,
            items: [item, ...p.items],
            updatedAt: new Date().toISOString()
          };
        }
      }
      return p;
    }));

    setShowNewItemModal(false);
    setEditingItemId(null);
    setNewItemDesc('');
    setNewItemQtd(1);
    setNewItemPrice(0);
  };

  const openEditModal = (item: InvestmentItem) => {
    setEditingItemId(item.id);
    setNewItemCategory(item.categoria);
    setNewItemDesc(item.descricao);
    setNewItemQtd(item.quantidade);
    setNewItemPrice(item.precoUnitario);
    setShowNewItemModal(true);
  };

  const handleDeleteItem = (projectId: string, itemId: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          items: p.items.filter(i => i.id !== itemId)
        };
      }
      return p;
    }));
  };

  // --- Render ---
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-primary to-brand-active text-white shadow-lg shadow-brand-primary/30">
            <Wallet className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-[#0f1c2b]">Planejamento e Investimentos</h1>
            <p className="mt-1 text-sm font-medium text-gray-500">
              Orçamentos, custos de infraestrutura e engenharia de galpões
            </p>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <section className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setActiveTab('calculadora')}
          className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-colors ${
            activeTab === 'calculadora'
              ? 'bg-brand-primary text-white'
              : 'border border-gray-300 bg-white text-gray-700 hover:bg-slate-50'
          }`}
        >
          <Calculator className="h-4 w-4" />
          Calculadora de Galpões
        </button>
        <button
          onClick={() => setActiveTab('projetos')}
          className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-colors ${
            activeTab === 'projetos'
              ? 'bg-brand-primary text-white'
              : 'border border-gray-300 bg-white text-gray-700 hover:bg-slate-50'
          }`}
        >
          <Hammer className="h-4 w-4" />
          Meus Projetos
        </button>
      </section>

      {activeTab === 'calculadora' && (
        <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          {/* Controls */}
          <div className="app-section-card space-y-6">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
              <Calculator className="h-5 w-5 text-brand-primary" />
              <h2 className="text-lg font-extrabold text-[#0f1c2b]">Parâmetros do Galpão</h2>
            </div>
            
            <div className="space-y-5">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-bold text-gray-700">Quantidade de Aves Desejada</span>
                <input
                  type="number"
                  min="50"
                  step="50"
                  value={calcAves}
                  onChange={(e) => setCalcAves(Number(e.target.value) || 0)}
                  className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-[#0f1c2b] outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                />
              </label>
              
              <div className="grid grid-cols-2 gap-4">
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-bold text-gray-700">Fase</span>
                  <select
                    value={calcFase}
                    onChange={(e) => setCalcFase(e.target.value as 'postura' | 'corte')}
                    className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-[#0f1c2b] outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                  >
                    <option value="postura">Postura (Ovos)</option>
                    <option value="corte">Corte (Carne)</option>
                  </select>
                </label>
                
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-bold text-gray-700">Sistema</span>
                  <select
                    value={calcSistema}
                    onChange={(e) => setCalcSistema(e.target.value as 'caipira' | 'intensivo')}
                    className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-[#0f1c2b] outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                  >
                    <option value="caipira">Caipira / Orgânico</option>
                    <option value="intensivo">Intensivo / Confinado</option>
                  </select>
                </label>
              </div>

              <div className="rounded-xl bg-blue-50 p-4 border border-blue-100 flex gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <p className="text-sm text-blue-900 leading-relaxed">
                  Os cálculos utilizam referências padrão da zootecnia moderna. Ajuste as medidas para garantir que o galpão encaixe na topografia do seu terreno.
                </p>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="rounded-[1.5rem] p-6 sm:p-8 bg-gradient-to-br from-[#0f1c2b] to-slate-800 text-white shadow-2xl relative overflow-hidden border-0 flex flex-col h-full">
            {/* Glowing orb effect */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-brand-primary opacity-20 blur-3xl pointer-events-none" />
            
            <div className="relative flex-1">
              <h2 className="text-xl font-extrabold mb-6 flex items-center gap-2">
                <FileText className="h-5 w-5 text-brand-primary" />
                Projeto Estimado
              </h2>

              <div className="space-y-6">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Estrutura Principal</div>
                  <div className="grid grid-cols-2 gap-3 min-w-0">
                    <div className="rounded-xl bg-white/5 p-4 border border-white/10 min-w-0">
                      <div className="text-2xl font-black text-white truncate">{calcResults.areaM2} <span className="text-sm font-medium text-slate-400">m²</span></div>
                      <div className="text-xs text-slate-400 mt-1 truncate">Área do Galpão</div>
                    </div>
                    <div className="rounded-xl bg-white/5 p-4 border border-white/10 min-w-0">
                      <div className="text-2xl font-black text-white truncate">{calcResults.largura}x{calcResults.comprimento} <span className="text-sm font-medium text-slate-400">m</span></div>
                      <div className="text-xs text-slate-400 mt-1 truncate">Medidas Ideais</div>
                    </div>
                  </div>
                </div>

                {calcResults.areaPiquete > 0 && (
                  <div className="rounded-xl bg-emerald-500/10 p-4 border border-emerald-500/20">
                    <div className="text-2xl font-black text-emerald-400">{calcResults.areaPiquete} <span className="text-sm font-medium text-emerald-600/60">m²</span></div>
                    <div className="text-xs text-emerald-500 mt-1">Área Mínima de Pasto (Piquete)</div>
                  </div>
                )}

                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Equipamentos Base</div>
                  <ul className="space-y-3">
                    <li className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="text-sm text-slate-300">Comedouros Tubulares</span>
                      <span className="font-bold text-white">{calcResults.comedouros} unid.</span>
                    </li>
                    <li className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="text-sm text-slate-300">Bebedouros Pendulares</span>
                      <span className="font-bold text-white">{calcResults.bebedouros} unid.</span>
                    </li>
                    {calcFase === 'postura' && (
                      <li className="flex items-center justify-between pb-2">
                        <span className="text-sm text-slate-300">Bocas de Ninho</span>
                        <span className="font-bold text-white">{calcResults.ninhos} unid.</span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="relative z-10 mt-6 pt-6 border-t border-white/10 mt-auto">
              <button 
                className="w-full rounded-xl bg-white text-[#0f1c2b] py-3 px-4 font-black flex items-center justify-center gap-2 hover:bg-brand-primary hover:text-white transition-colors shadow-xl"
                onClick={() => {
                  setSelectedTemplateId('galpao-completo');
                  setParamAves(calcAves);
                  setParamFase(calcFase);
                  setParamSistema(calcSistema);
                  setShowTemplateModal(true);
                }}
              >
                <Hammer className="h-5 w-5" />
                Criar Orçamento deste Projeto
              </button>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'projetos' && !viewingProjectId && (
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Hammer className="h-5 w-5 text-brand-primary" />
              <h2 className="text-xl font-extrabold text-[#0f1c2b]">Meus Orçamentos e Projetos</h2>
            </div>
            <button 
              className="inline-flex items-center gap-2 rounded-full bg-brand-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-hover" 
              onClick={() => {
                const newProject: InvestmentProject = {
                  id: crypto.randomUUID(),
                  nome: 'Novo Projeto Personalizado',
                  status: 'planejamento',
                  dataInicio: new Date().toISOString(),
                  items: [],
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                };
                setProjects(prev => [newProject, ...prev]);
                setViewingProjectId(newProject.id);
              }}
            >
              <Plus className="h-4 w-4" />
              Criar do Zero
            </button>
          </div>

          {/* Templates Section (For Beginners) */}
          <div className="rounded-2xl border border-brand-primary/20 bg-gradient-to-br from-brand-primary/5 to-transparent p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5 text-brand-primary" />
              <h3 className="text-lg font-bold text-[#0f1c2b]">Modelos Inteligentes (Conhecimento Granja de Bolso)</h3>
            </div>
            <p className="text-sm text-gray-600 mb-6">Nossos modelos utilizam a base de conhecimento de zootecnia. Você informa a quantidade de aves e nós geramos a lista completa de materiais com as quantidades e estimativas exatas!</p>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl bg-white p-5 transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer border border-gray-100 min-w-0 flex flex-col h-full" onClick={() => { setSelectedTemplateId('galpao-completo'); setShowTemplateModal(true); }}>
                <h4 className="font-bold text-[#0f1c2b] text-base truncate">Galpão Completo (Do Zero)</h4>
                <p className="text-xs text-gray-500 mt-2 line-clamp-2 mb-4">Calcula telhas, madeira, telas, cimento, bebedouros e comedouros baseado na quantidade de aves desejada.</p>
                <div className="mt-auto flex items-center justify-between text-xs font-bold text-brand-primary">
                  <span className="flex items-center gap-1 bg-brand-primary/10 px-2 py-1 rounded-md">Configurar Projeto →</span>
                </div>
              </div>
              <div className="rounded-xl bg-white p-5 transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer border border-gray-100 min-w-0 flex flex-col h-full" onClick={() => { setSelectedTemplateId('automacao-agua'); setShowTemplateModal(true); }}>
                <h4 className="font-bold text-[#0f1c2b] text-base truncate">Automação de Bebedouros (Nipples)</h4>
                <p className="text-xs text-gray-500 mt-2 line-clamp-2 mb-4">Calcula os metros de canos, niples e reguladores com base no tamanho do seu lote.</p>
                <div className="mt-auto flex items-center justify-between text-xs font-bold text-brand-primary">
                  <span className="flex items-center gap-1 bg-brand-primary/10 px-2 py-1 rounded-md">Configurar Projeto →</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Projects List */}
          {projects.length > 0 && (
            <div className="grid gap-4 md:grid-cols-3">
              {projects.map(proj => {
                const total = proj.items.reduce((sum, item) => sum + (item.precoUnitario * item.quantidade), 0);
                return (
                  <div key={proj.id} className="app-section-card cursor-pointer hover:shadow-md transition-shadow min-w-0" onClick={() => setViewingProjectId(proj.id)}>
                    <div className="flex justify-between items-start mb-4 gap-2">
                      <h4 className="font-bold text-[#0f1c2b] truncate">{proj.nome}</h4>
                      <span className={`flex-shrink-0 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                        proj.status === 'planejamento' ? 'bg-amber-100 text-amber-700' :
                        proj.status === 'em_andamento' ? 'bg-blue-100 text-blue-700' :
                        'bg-emerald-100 text-emerald-700'
                      }`}>
                        {proj.status.replace('_', ' ')}
                      </span>
                    </div>
                    
                    <div className="text-2xl font-black text-gray-900 mb-1">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}
                    </div>
                    <div className="text-xs text-gray-500 mb-4">{proj.items.length} itens no orçamento</div>
                    
                    <div className="text-xs text-brand-primary font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Abrir detalhamento →
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* Project Detail View */}
      {activeTab === 'projetos' && viewingProjectId && currentProjectView && (
        <section className="space-y-6 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <button 
              className="text-sm font-bold text-gray-500 hover:text-gray-900 flex items-center gap-1"
              onClick={() => setViewingProjectId(null)}
            >
              ← Voltar para projetos
            </button>
            <button 
              className="text-sm font-bold text-red-500 hover:text-red-700"
              onClick={() => {
                if (confirm('Excluir este projeto inteiro?')) {
                  setProjects(prev => prev.filter(p => p.id !== currentProjectView.id));
                  setViewingProjectId(null);
                }
              }}
            >
              Excluir Projeto
            </button>
          </div>

          <div className="app-section-card border-t-4 border-t-brand-primary min-w-0">
            <h2 className="text-2xl font-black text-[#0f1c2b] mb-1 truncate">{currentProjectView.nome}</h2>
            <p className="text-sm text-gray-500 mb-6 flex items-center gap-2">
              Status: 
              <select 
                className="text-sm bg-gray-50 border border-gray-200 rounded-md py-1 px-2 font-bold"
                value={currentProjectView.status}
                onChange={(e) => {
                  setProjects(prev => prev.map(p => p.id === currentProjectView.id ? {...p, status: e.target.value as any} : p));
                }}
              >
                <option value="planejamento">Em Planejamento</option>
                <option value="em_andamento">Em Andamento</option>
                <option value="concluido">Concluído</option>
              </select>
            </p>

            {/* Dashboard & Chart */}
            <div className="grid gap-6 md:grid-cols-4 mb-8">
              <div className="md:col-span-1 rounded-2xl bg-gradient-to-br from-[#0f1c2b] to-slate-800 p-5 text-white">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Custo Total Estimado</div>
                <div className="text-3xl font-black">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                    currentProjectView.items.reduce((sum, i) => sum + (i.precoUnitario * i.quantidade), 0)
                  )}
                </div>
              </div>
              
              <div className="md:col-span-3 grid grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Calculate Categories */}
                {['infraestrutura', 'equipamentos', 'mao_de_obra', 'outros'].map(cat => {
                  const catTotal = currentProjectView.items.filter(i => i.categoria === cat).reduce((s, i) => s + (i.precoUnitario * i.quantidade), 0);
                  const colors: any = {
                    infraestrutura: 'text-orange-600 bg-orange-50 border-orange-100',
                    equipamentos: 'text-blue-600 bg-blue-50 border-blue-100',
                    mao_de_obra: 'text-emerald-600 bg-emerald-50 border-emerald-100',
                    outros: 'text-gray-600 bg-gray-50 border-gray-100'
                  };
                  return (
                    <div key={cat} className={`rounded-xl p-4 border ${colors[cat]}`}>
                      <div className="text-xs font-bold uppercase mb-1 opacity-70">{cat.replace(/_/g, ' ')}</div>
                      <div className="text-lg font-black">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(catTotal)}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Itens List */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[#0f1c2b] text-lg">Itens do Orçamento</h3>
              <button 
                className="inline-flex items-center gap-2 rounded-full bg-brand-primary px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-hover" 
                onClick={() => {
                  setEditingItemId(null);
                  setNewItemDesc('');
                  setNewItemQtd(1);
                  setNewItemPrice(0);
                  setShowNewItemModal(true);
                }}
              >
                <Plus className="h-4 w-4" /> Add Item
              </button>
            </div>

            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 px-4 text-xs font-bold uppercase text-gray-500">Descrição / Material</th>
                    <th className="py-3 px-4 text-xs font-bold uppercase text-gray-500">Categoria</th>
                    <th className="py-3 px-4 text-xs font-bold uppercase text-gray-500">Qtd</th>
                    <th className="py-3 px-4 text-xs font-bold uppercase text-gray-500">Valor Unit.</th>
                    <th className="py-3 px-4 text-xs font-bold uppercase text-gray-500">Subtotal</th>
                    <th className="py-3 px-4 text-xs font-bold uppercase text-gray-500"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {currentProjectView.items.map(item => (
                    <tr key={item.id} className="hover:bg-gray-50/50">
                      <td className="py-3 px-4 font-bold text-gray-900">{item.descricao}</td>
                      <td className="py-3 px-4 text-sm text-gray-500 capitalize">{item.categoria.replace(/_/g, ' ')}</td>
                      <td className="py-3 px-4 text-sm font-medium">{item.quantidade}</td>
                      <td className="py-3 px-4 text-sm text-gray-500">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.precoUnitario)}
                      </td>
                      <td className="py-3 px-4 font-bold text-gray-900">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.quantidade * item.precoUnitario)}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <button 
                            className="text-brand-primary hover:text-brand-active p-1"
                            onClick={() => openEditModal(item as InvestmentItem)}
                            title="Editar item"
                          >
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <button 
                            className="text-red-400 hover:text-red-600 p-1"
                            onClick={() => handleDeleteItem(currentProjectView.id, item.id)}
                            title="Excluir item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {currentProjectView.items.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-sm text-gray-500">
                        Nenhum item adicionado ao projeto ainda.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* New Item Modal */}
      {showNewItemModal && currentProjectView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-black text-gray-900">{editingItemId ? 'Editar Item / Custo' : 'Adicionar Item / Custo'}</h3>
              <button onClick={() => setShowNewItemModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-bold text-gray-700">Descrição (Ex: Saco de Cimento)</span>
                <input
                  type="text"
                  value={newItemDesc}
                  onChange={(e) => setNewItemDesc(e.target.value)}
                  className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-[#0f1c2b] outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                  autoFocus
                />
              </label>
              
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-bold text-gray-700">Categoria</span>
                <select
                  value={newItemCategory}
                  onChange={(e) => setNewItemCategory(e.target.value as any)}
                  className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-[#0f1c2b] outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                >
                  <option value="infraestrutura">Infraestrutura / Materiais</option>
                  <option value="equipamentos">Equipamentos (Bebedouros, etc)</option>
                  <option value="mao_de_obra">Mão de Obra</option>
                  <option value="licencas">Licenças / Legalização</option>
                  <option value="outros">Outros</option>
                </select>
              </label>

              <div className="grid grid-cols-2 gap-4">
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-bold text-gray-700">Quantidade</span>
                  <input
                    type="number"
                    min="1"
                    value={newItemQtd}
                    onChange={(e) => setNewItemQtd(Number(e.target.value))}
                    className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-[#0f1c2b] outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-bold text-gray-700">Valor Unitário (R$)</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={newItemPrice}
                    onChange={(e) => setNewItemPrice(Number(e.target.value))}
                    className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-[#0f1c2b] outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                  />
                </label>
              </div>

              <button 
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-hover mt-4"
                onClick={handleAddItem}
                disabled={!newItemDesc.trim()}
              >
                Salvar Item
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Template Config Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-black text-gray-900">Dimensione seu Projeto</h3>
              <button onClick={() => setShowTemplateModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <p className="text-sm text-gray-600 mb-6">Nossa inteligência vai calcular as quantidades exatas baseadas nas configurações do seu lote.</p>

            <div className="space-y-4">
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-bold text-gray-700">Quantidade Prevista de Aves</span>
                <input
                  type="number"
                  min="50"
                  step="50"
                  value={paramAves}
                  onChange={(e) => setParamAves(Number(e.target.value) || 0)}
                  className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-[#0f1c2b] outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                  autoFocus
                />
              </label>
              
              <div className="grid grid-cols-2 gap-4">
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-bold text-gray-700">Fase</span>
                  <select
                    value={paramFase}
                    onChange={(e) => setParamFase(e.target.value as 'postura' | 'corte')}
                    className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-[#0f1c2b] outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                  >
                    <option value="postura">Postura (Ovos)</option>
                    <option value="corte">Corte (Carne)</option>
                  </select>
                </label>
                
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-bold text-gray-700">Sistema</span>
                  <select
                    value={paramSistema}
                    onChange={(e) => setParamSistema(e.target.value as 'caipira' | 'intensivo')}
                    className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-[#0f1c2b] outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                  >
                    <option value="caipira">Caipira</option>
                    <option value="intensivo">Intensivo</option>
                  </select>
                </label>
              </div>

              <div className="rounded-xl bg-blue-50 p-4 border border-blue-100 flex gap-3 mt-2">
                <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <p className="text-xs text-blue-900 leading-relaxed font-medium">
                  Os preços gerados são uma média de mercado atual. Você poderá editar cada item, alterar preços e incluir novos materiais após a criação.
                </p>
              </div>

              <button 
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-hover mt-4"
                onClick={handleCreateFromTemplate}
              >
                Gerar Projeto e Orçamento
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
