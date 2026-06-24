import React, { useEffect, useState } from 'react';
import { Download, X, Smartphone, Share } from 'lucide-react';

const INSTALL_DISMISSED_KEY = 'granjadebolso_install_dismissed';

// Detecta iOS (Safari não suporta beforeinstallprompt)
function isIOS() {
  return (
    /iphone|ipad|ipod/i.test(navigator.userAgent) ||
    // iPad no iOS 13+ se identifica como Mac
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );
}

// Detecta se já está rodando como PWA instalado
function isStandalone() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true
  );
}

// Verifica se o banner foi descartado recentemente
function wasDismissedRecently(): boolean {
  const val = localStorage.getItem(INSTALL_DISMISSED_KEY);
  if (!val) return false;
  if (val === 'permanent') return true;
  const expires = Number(val);
  return !isNaN(expires) && Date.now() < expires;
}

export default function PWAInstallBanner() {
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<'prompt' | 'ios' | null>(null);
  const [installing, setInstalling] = useState(false);

  useEffect(() => {
    // Não mostrar se já está instalado ou foi descartado
    if (isStandalone() || wasDismissedRecently()) return;

    // --- iOS: mostrar instruções manuais ---
    if (isIOS()) {
      const timer = setTimeout(() => {
        setMode('ios');
        setVisible(true);
      }, 2500);
      return () => clearTimeout(timer);
    }

    // --- Android/Chrome/Edge: usar beforeinstallprompt ---

    // Já capturado antes do React montar?
    if ((window as any).__pwaInstallPrompt) {
      const timer = setTimeout(() => {
        setMode('prompt');
        setVisible(true);
      }, 2500);
      return () => clearTimeout(timer);
    }

    // Escuta o evento customizado emitido pelo main.tsx
    const onReady = () => {
      setMode('prompt');
      setVisible(true);
    };
    window.addEventListener('pwaInstallReady', onReady);
    return () => window.removeEventListener('pwaInstallReady', onReady);
  }, []);

  const handleInstall = async () => {
    const prompt = (window as any).__pwaInstallPrompt;
    if (!prompt) return;
    setInstalling(true);
    await prompt.prompt();
    const { outcome } = await prompt.userChoice;
    if (outcome === 'accepted') {
      localStorage.setItem(INSTALL_DISMISSED_KEY, 'permanent');
    }
    (window as any).__pwaInstallPrompt = null;
    setVisible(false);
    setInstalling(false);
  };

  const handleDismiss = () => {
    setVisible(false);
    // Lembra por 3 dias
    const expires = Date.now() + 3 * 24 * 60 * 60 * 1000;
    localStorage.setItem(INSTALL_DISMISSED_KEY, String(expires));
  };

  if (!visible || !mode) return null;

  return (
    <div
      id="pwa-install-banner"
      style={{
        position: 'fixed',
        bottom: '88px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 2rem)',
        maxWidth: '430px',
        zIndex: 9999,
        animation: 'slideUpBanner 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
      }}
    >
      <style>{`
        @keyframes slideUpBanner {
          from { opacity: 0; transform: translateX(-50%) translateY(28px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>

      <div
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          borderRadius: '1.25rem',
          padding: '1rem 1.125rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.875rem',
          boxShadow: '0 8px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.07)',
        }}
      >
        {/* Ícone */}
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '0.875rem',
            background: 'linear-gradient(135deg, var(--brand-primary, #005da6), var(--brand-hover, #004882))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 4px 16px rgba(0,93,166,0.5)',
          }}
        >
          <Smartphone size={24} color="#fff" />
        </div>

        {/* Texto */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: 0, color: '#f1f5f9', fontWeight: 700, fontSize: '0.875rem', lineHeight: 1.3 }}>
            Instalar Granja de Bolso
          </p>
          {mode === 'ios' ? (
            <p style={{ margin: '0.25rem 0 0', color: '#94a3b8', fontSize: '0.72rem', lineHeight: 1.5 }}>
              Toque em <Share size={11} style={{ display: 'inline', verticalAlign: 'middle' }} /> <strong style={{ color: '#cbd5e1' }}>Compartilhar</strong> → <strong style={{ color: '#cbd5e1' }}>Adicionar à Tela Inicial</strong>
            </p>
          ) : (
            <p style={{ margin: '0.2rem 0 0', color: '#94a3b8', fontSize: '0.75rem', lineHeight: 1.4 }}>
              Acesse mais rápido, offline e sem navegador
            </p>
          )}
        </div>

        {/* Botão instalar (apenas para Android/Chrome) */}
        {mode === 'prompt' && (
          <button
            onClick={handleInstall}
            disabled={installing}
            style={{
              background: 'var(--brand-primary, #005da6)',
              color: '#fff',
              border: 'none',
              borderRadius: '0.625rem',
              padding: '0.5rem 0.875rem',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              opacity: installing ? 0.7 : 1,
              transition: 'opacity 0.15s',
              whiteSpace: 'nowrap',
            }}
          >
            <Download size={14} />
            {installing ? 'Instalando…' : 'Instalar'}
          </button>
        )}

        {/* Fechar */}
        <button
          onClick={handleDismiss}
          style={{
            background: 'transparent',
            border: 'none',
            padding: '0.25rem',
            cursor: 'pointer',
            color: '#64748b',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
          }}
          aria-label="Fechar"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
