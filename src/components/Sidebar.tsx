import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Home,
  ClipboardList,
  ShoppingBag,
  Beaker,
  Bird,
  Users,
  Truck,
  ShoppingCart,
  Wallet,
  FileText,
  CloudSun,
  BookOpen,
  HeartPulse,
  Cog,
  Menu,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  UserCircle2,
  SlidersHorizontal,
  DatabaseBackup,
  Palette,
  Calculator,
} from 'lucide-react';

export type RouteId =
  | 'inicio'
  | 'manejo'
  | 'vendas'
  | 'formulacao'
  | 'animais'
  | 'cliente'
  | 'fornecedor'
  | 'galpoes'
  | 'profissionais'
  | 'compras'
  | 'financeiro'
  | 'relatorios'
  | 'investimentos'
  | 'clima'
  | 'conhecimento'
  | 'perfil'
  | 'sistema'
  | 'personalizacao'
  | 'backups'
  | 'assinatura';

interface SidebarProps {
  activeRoute: RouteId;
  onNavigate: (route: RouteId) => void;
  isCollapsed: boolean;
  onToggleCollapsed: () => void;
  isDarkMode: boolean;
  isMobileOpen: boolean;
  onRequestOpenMobile: () => void;
  onRequestCloseMobile: () => void;
}

type MenuItem = {
  id: RouteId;
  label: string;
  icon: React.ReactNode;
};

type MenuCategory =
  | { kind: 'single'; item: MenuItem }
  | { kind: 'group'; id: string; label: string; icon: React.ReactNode; items: MenuItem[] };

// ---------------------------------------------------------------------------
// SidebarGroupItem — proper React component so useState hooks are always valid
// ---------------------------------------------------------------------------
interface SidebarGroupItemProps {
  key?: React.Key;
  cat: Extract<MenuCategory, { kind: 'group' }>;
  isCollapsed: boolean;
  isDarkMode: boolean;
  activeRoute: RouteId;
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: (route: RouteId) => void;
}

function SidebarGroupItem({
  cat,
  isCollapsed,
  isDarkMode,
  activeRoute,
  isOpen,
  onToggle,
  onNavigate,
}: SidebarGroupItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const hasActiveChild = cat.items.some((item) => item.id === activeRoute);

  return (
    <div
      className="space-y-1 relative"
      style={{ zIndex: isHovered && isCollapsed ? 9999 : undefined }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Group header button */}
      <button
        type="button"
        onClick={() => { if (!isCollapsed) onToggle(); }}
        className={[
          'w-full flex items-center gap-3 px-5 py-3 rounded-xl text-[14px] font-semibold transition-all duration-200 cursor-pointer text-left',
          hasActiveChild
            ? isDarkMode
              ? 'text-slate-100 bg-slate-800/70 shadow-md'
              : 'text-slate-800 bg-brand-bg shadow-sm'
            : isDarkMode
            ? 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800',
          isCollapsed ? 'justify-center px-3' : '',
        ].join(' ')}
        aria-expanded={!isCollapsed ? isOpen : undefined}
        aria-label={`${cat.label} (${cat.items.length} sub-itens)`}
        title={isCollapsed ? cat.label : undefined}
      >
        {/* Icon */}
        <span
          style={hasActiveChild ? { color: 'var(--brand-primary)' } : undefined}
        >
          {React.cloneElement(cat.icon as React.ReactElement, {
            className: isCollapsed ? 'w-6 h-6' : 'w-5 h-5',
          })}
        </span>

        {!isCollapsed && (
          <>
            <span className="flex-1 truncate">{cat.label}</span>
            <ChevronDown
              className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${
                isDarkMode ? 'text-slate-500' : 'text-slate-400'
              } ${isOpen ? 'rotate-180' : ''}`}
            />
          </>
        )}
      </button>

      {/* Collapsed → hover popover */}
      {isCollapsed && isHovered && (
        <div
          className="absolute left-[100%] top-0 z-[9999] min-w-[13rem] pt-0 pb-0 pl-2 pr-0"
          role="menu"
        >
          <div
            className={[
              'rounded-xl p-2 shadow-2xl border',
              isDarkMode
                ? 'bg-slate-800 border-slate-700'
                : 'bg-white border-slate-200',
            ].join(' ')}
          >
          <div
            className={`px-3 py-2 mb-1 border-b text-xs font-bold uppercase tracking-wider ${
              isDarkMode
                ? 'border-slate-700 text-slate-400'
                : 'border-slate-100 text-slate-500'
            }`}
          >
            {cat.label}
          </div>
          <div className="space-y-0.5" role="none">
            {cat.items.map((item) => {
              const isActive = activeRoute === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  className={[
                    'w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer text-left',
                    isActive
                      ? isDarkMode
                        ? 'bg-slate-700/80 shadow-sm'
                        : 'bg-brand-bg shadow-sm'
                      : isDarkMode
                      ? 'text-slate-400 hover:bg-slate-700/60 hover:text-slate-200'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800',
                  ].join(' ')}
                  style={
                    isActive
                      ? { color: 'var(--brand-primary)' }
                      : undefined
                  }
                  aria-current={isActive ? 'page' : undefined}
                  aria-label={item.label}
                  role="menuitem"
                >
                  <span style={isActive ? { color: 'var(--brand-primary)' } : undefined}>
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
          </div>
        </div>
      )}

      {/* Expanded → animated sub-items */}
      {!isCollapsed && (
        <div
          className="overflow-hidden transition-all duration-200"
          style={{ maxHeight: isOpen ? `${cat.items.length * 52}px` : '0px', opacity: isOpen ? 1 : 0 }}
        >
          <div
            className={`ml-5 pl-3 border-l space-y-0.5 pb-1 ${
              isDarkMode ? 'border-slate-700' : 'border-slate-200'
            }`}
          >
            {cat.items.map((item) => {
              const isActive = activeRoute === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  className={[
                    'w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer text-left',
                    isActive
                      ? isDarkMode
                        ? 'bg-slate-800/90 shadow-sm'
                        : 'bg-brand-bg shadow-sm'
                      : isDarkMode
                      ? 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                      : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800',
                  ].join(' ')}
                  style={isActive ? { color: 'var(--brand-primary)' } : undefined}
                  aria-current={isActive ? 'page' : undefined}
                  aria-label={item.label}
                >
                  {/* Active indicator dot */}
                  {isActive && (
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: 'var(--brand-primary)' }}
                    />
                  )}
                  <span
                    style={isActive ? { color: 'var(--brand-primary)' } : undefined}
                    className="flex-shrink-0"
                  >
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Sidebar component
// ---------------------------------------------------------------------------
export default function Sidebar({
  activeRoute,
  onNavigate,
  isCollapsed,
  onToggleCollapsed,
  isDarkMode,
  isMobileOpen,
  onRequestOpenMobile,
  onRequestCloseMobile,
}: SidebarProps) {
  const categories = useMemo<MenuCategory[]>(
    () => [
      {
        kind: 'single',
        item: { id: 'inicio', label: 'Início', icon: <Home className="w-5 h-5" /> },
      },
      {
        kind: 'group',
        id: 'operacoes',
        label: 'Operações',
        icon: <ClipboardList className="w-5 h-5" />,
        items: [
          { id: 'manejo', label: 'Manejo', icon: <ClipboardList className="w-4 h-4" /> },
          { id: 'vendas', label: 'Vendas', icon: <ShoppingBag className="w-4 h-4" /> },
          { id: 'formulacao', label: 'Formulação', icon: <Beaker className="w-4 h-4" /> },
        ],
      },
      {
        kind: 'group',
        id: 'cadastro',
        label: 'Cadastro',
        icon: <Bird className="w-5 h-5" />,
        items: [
          { id: 'animais', label: 'Animais', icon: <Bird className="w-4 h-4" /> },
          { id: 'galpoes', label: 'Galpões', icon: <Home className="w-4 h-4" /> },
          { id: 'profissionais', label: 'Profissionais', icon: <HeartPulse className="w-4 h-4" /> },
          { id: 'cliente', label: 'Clientes', icon: <Users className="w-4 h-4" /> },
          { id: 'fornecedor', label: 'Fornecedores', icon: <Truck className="w-4 h-4" /> },
        ],
      },
      {
        kind: 'group',
        id: 'gestao',
        label: 'Gestão',
        icon: <Wallet className="w-5 h-5" />,
        items: [
          { id: 'compras', label: 'Compras', icon: <ShoppingCart className="w-4 h-4" /> },
          { id: 'financeiro', label: 'Financeiro', icon: <Wallet className="w-4 h-4" /> },
          { id: 'investimentos', label: 'Investimentos', icon: <Calculator className="w-4 h-4" /> },
          { id: 'relatorios', label: 'Relatórios', icon: <FileText className="w-4 h-4" /> },
        ],
      },
      {
        kind: 'group',
        id: 'monitoramento',
        label: 'Monitoramento',
        icon: <CloudSun className="w-5 h-5" />,
        items: [
          { id: 'clima', label: 'Clima', icon: <CloudSun className="w-4 h-4" /> },
          { id: 'conhecimento', label: 'Conhecimento', icon: <BookOpen className="w-4 h-4" /> },
        ],
      },
      {
        kind: 'group',
        id: 'configuracoes',
        label: 'Configurações',
        icon: <Cog className="w-5 h-5" />,
        items: [
          { id: 'perfil', label: 'Perfil', icon: <UserCircle2 className="w-4 h-4" /> },
          { id: 'personalizacao', label: 'Personalização', icon: <Palette className="w-4 h-4" /> },
          { id: 'sistema', label: 'Sistema', icon: <SlidersHorizontal className="w-4 h-4" /> },
          { id: 'backups', label: 'Backups', icon: <DatabaseBackup className="w-4 h-4" /> },
          { id: 'assinatura', label: 'Assinatura', icon: <Cog className="w-4 h-4" /> },
        ],
      },
    ],
    []
  );

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    operacoes: false,
    cadastro: false,
    gestao: false,
    monitoramento: false,
    configuracoes: false,
  });

  const isNavigatingRef = useRef(false);
  const mobileSidebarRef = useRef<HTMLDivElement>(null);

  // Auto-open the group containing the active route
  useEffect(() => {
    const activeGroup = categories.find(
      (cat) => cat.kind === 'group' && cat.items.some((item) => item.id === activeRoute)
    );
    if (activeGroup?.kind === 'group') {
      setOpenGroups((prev) => ({ ...prev, [activeGroup.id]: true }));
    }
  }, [activeRoute, categories]);

  // Keyboard: close mobile sidebar with Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isMobileOpen && e.key === 'Escape') onRequestCloseMobile();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileOpen, onRequestCloseMobile]);

  // Focus trap for mobile sidebar
  useEffect(() => {
    if (isMobileOpen && mobileSidebarRef.current) {
      const first = mobileSidebarRef.current.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      first?.focus();
    }
  }, [isMobileOpen]);

  const handleNavigate = (route: RouteId) => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    onNavigate(route);
    setTimeout(() => { isNavigatingRef.current = false; }, 300);
  };

  const toggleGroup = (id: string) =>
    setOpenGroups((prev) => ({ ...prev, [id]: !prev[id] }));

  // -------------------------------------------------------------------------
  // Render helpers
  // -------------------------------------------------------------------------
  const renderSingleItem = (item: MenuItem) => {
    const isActive = activeRoute === item.id;
    return (
      <button
        key={item.id}
        type="button"
        onClick={() => handleNavigate(item.id)}
        className={[
          'w-full relative flex items-center gap-3 px-5 py-3 rounded-xl text-[14px] font-semibold transition-all duration-200 cursor-pointer text-left',
          isActive
            ? isDarkMode
              ? 'bg-slate-800/80 shadow-md'
              : 'bg-brand-bg shadow-md'
            : isDarkMode
            ? 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800',
          isCollapsed ? 'justify-center px-3' : '',
        ].join(' ')}
        style={isActive ? { color: 'var(--brand-primary)' } : undefined}
        aria-current={isActive ? 'page' : undefined}
        aria-label={item.label}
        title={isCollapsed ? item.label : undefined}
      >
        {/* Left accent bar */}
        {isActive && !isCollapsed && (
          <span
            className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full"
            style={{ background: 'var(--brand-primary)' }}
          />
        )}
        <span style={isActive ? { color: 'var(--brand-primary)' } : undefined}>
          {React.cloneElement(item.icon as React.ReactElement, {
            className: isCollapsed ? 'w-6 h-6' : 'w-5 h-5',
          })}
        </span>
        {!isCollapsed && (
          <>
            <span className="truncate flex-1">{item.label}</span>
            <ChevronRight
              className="w-4 h-4 flex-shrink-0"
              style={isActive ? { color: 'var(--brand-primary)' } : { color: '#94a3b8' }}
            />
          </>
        )}
      </button>
    );
  };

  const renderSidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div
        className={`flex items-center border-b flex-shrink-0 ${
          isDarkMode ? 'border-slate-700/60' : 'border-slate-200'
        } ${isCollapsed ? 'justify-center px-3 py-4' : 'justify-between px-4 py-4'}`}
      >
        {isCollapsed ? (
          /* Collapsed: show small icon-only logo */
          <button
            type="button"
            onClick={onToggleCollapsed}
            className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200 cursor-pointer ${
              isDarkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-brand-bg hover:bg-slate-200'
            }`}
            aria-label="Expandir menu lateral"
          >
            <ChevronRight
              className={`w-5 h-5 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}
            />
          </button>
        ) : (
          <>
            <img
              src="/logo.png"
              alt="Logo Granja de Bolso"
              className="h-16 w-auto object-contain drop-shadow-sm"
            />
            <button
              type="button"
              onClick={onToggleCollapsed}
              className={`hidden md:inline-flex w-9 h-9 items-center justify-center rounded-xl transition-all duration-200 cursor-pointer shadow-sm flex-shrink-0 ${
                isDarkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white hover:bg-slate-100 border border-slate-200'
              }`}
              aria-label="Recolher menu lateral"
            >
              <ChevronLeft className={`w-4 h-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-500'}`} />
            </button>
            <button
              type="button"
              onClick={onRequestCloseMobile}
              className={`md:hidden w-9 h-9 inline-flex items-center justify-center rounded-xl transition-all duration-200 cursor-pointer shadow-sm ${
                isDarkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white hover:bg-slate-100'
              }`}
              aria-label="Fechar menu lateral"
            >
              <ChevronLeft className={`w-4 h-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-500'}`} />
            </button>
          </>
        )}
      </div>

      {/* Navigation */}
      <nav
        className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-thin"
        role="navigation"
        aria-label="Menu principal"
      >
        {categories.map((cat, idx) => {
          if (cat.kind === 'single') {
            return <div key={`single-${idx}`}>{renderSingleItem(cat.item)}</div>;
          }
          return (
            <SidebarGroupItem
              key={cat.id}
              cat={cat as Extract<MenuCategory, { kind: 'group' }>}
              isCollapsed={isCollapsed}
              isDarkMode={isDarkMode}
              activeRoute={activeRoute}
              isOpen={openGroups[cat.id] ?? false}
              onToggle={() => toggleGroup(cat.id)}
              onNavigate={handleNavigate}
            />
          );
        })}
      </nav>
    </div>
  );

  // -------------------------------------------------------------------------
  // Bottom mobile nav
  // -------------------------------------------------------------------------
  const bottomNavGroups: Array<{ id: RouteId; label: string; icon: React.ReactNode; routes: RouteId[] }> = [
    { id: 'inicio', label: 'Início', icon: <Home className="w-5 h-5" />, routes: ['inicio'] },
    { id: 'manejo', label: 'Operações', icon: <ClipboardList className="w-5 h-5" />, routes: ['manejo', 'vendas', 'formulacao'] },
    { id: 'animais', label: 'Cadastro', icon: <Bird className="w-5 h-5" />, routes: ['animais', 'cliente', 'fornecedor', 'galpoes', 'profissionais'] },
    { id: 'financeiro', label: 'Gestão', icon: <Wallet className="w-5 h-5" />, routes: ['compras', 'financeiro', 'investimentos', 'relatorios'] },
  ];

  const isMoreActive = ['clima', 'conhecimento', 'perfil', 'sistema', 'backups', 'assinatura'].includes(activeRoute);

  // -------------------------------------------------------------------------
  // Classes
  // -------------------------------------------------------------------------
  const widthClass = isCollapsed ? 'w-[4.5rem]' : 'w-64';
  const desktopClass = `hidden md:flex ${widthClass} flex-col z-40 overflow-visible transition-all duration-250 ${
    isDarkMode
      ? 'bg-slate-900 border-slate-700/60'
      : 'bg-white border-slate-200'
  } border-r shadow-xl`;

  return (
    <>
      {/* Desktop sidebar */}
      <aside className={desktopClass} aria-label="Menu lateral principal">
        {renderSidebarContent()}
      </aside>

      {/* Mobile overlay + sidebar */}
      <div
        className={`md:hidden fixed inset-0 z-40 ${isMobileOpen ? '' : 'pointer-events-none'}`}
        aria-hidden={!isMobileOpen}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-250 ${
            isMobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={onRequestCloseMobile}
          aria-hidden="true"
        />
        <aside
          ref={mobileSidebarRef}
          className={`absolute left-0 top-0 bottom-0 w-64 ${
            isDarkMode
              ? 'bg-slate-900 border-slate-700'
              : 'bg-white border-slate-200'
          } border-r shadow-2xl transform transition-transform duration-250 ${
            isMobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          aria-label="Menu lateral móvel"
          role="dialog"
          aria-modal="true"
        >
          {renderSidebarContent()}
        </aside>
      </div>

      {/* Mobile bottom nav */}
      <nav
        className={[
          'md:hidden fixed left-0 right-0 bottom-0 z-30 border-t backdrop-blur-xl',
          isDarkMode ? 'bg-slate-900/95 border-slate-800' : 'bg-white/95 border-slate-200',
        ].join(' ')}
        aria-label="Navegação inferior"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 0.25rem)' }}
      >
        <div className="grid grid-cols-5 gap-1 px-2 pt-2 pb-1">
          {bottomNavGroups.map((grp) => {
            const isActive = grp.routes.includes(activeRoute);
            return (
              <button
                key={grp.id}
                type="button"
                onClick={() => handleNavigate(grp.id)}
                className={[
                  'flex flex-col items-center justify-center gap-1 rounded-xl px-1 py-2 text-[10px] font-bold transition-all duration-200 cursor-pointer',
                  isActive
                    ? isDarkMode
                      ? 'bg-slate-800'
                      : 'bg-brand-bg'
                    : isDarkMode
                    ? 'text-slate-400 hover:bg-slate-800/70'
                    : 'text-slate-500 hover:bg-slate-100',
                ].join(' ')}
                style={isActive ? { color: 'var(--brand-primary)' } : undefined}
                aria-current={isActive ? 'page' : undefined}
                aria-label={grp.label}
              >
                {grp.icon}
                <span className="truncate w-full text-center leading-tight">{grp.label}</span>
              </button>
            );
          })}

          {/* More button */}
          <button
            type="button"
            onClick={onRequestOpenMobile}
            className={[
              'flex flex-col items-center justify-center gap-1 rounded-xl px-1 py-2 text-[10px] font-bold transition-all duration-200 cursor-pointer',
              isMoreActive
                ? isDarkMode
                  ? 'bg-slate-800'
                  : 'bg-brand-bg'
                : isDarkMode
                ? 'text-slate-400 hover:bg-slate-800/70'
                : 'text-slate-500 hover:bg-slate-100',
            ].join(' ')}
            style={isMoreActive ? { color: 'var(--brand-primary)' } : undefined}
            aria-label="Mais opções"
          >
            <Menu className="w-5 h-5" />
            <span className="truncate">Mais</span>
          </button>
        </div>
      </nav>
    </>
  );
}
