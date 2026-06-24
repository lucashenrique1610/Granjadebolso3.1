import React, { useEffect, useState } from 'react';
import { Download, X, Smartphone } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const INSTALL_DISMISSED_KEY = 'granjadebolso_install_dismissed';

export default function PWAInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [installing, setInstalling] = useState(false);

  useEffect(() => {
    // Não mostrar se já foi instalado ou descartado permanentemente
    const dismissed = localStorage.getItem(INSTALL_DISMISSED_KEY);
    if (dismissed === 'permanent') return;

    // Não mostrar se já está rodando como PWA instalado
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;
    if (isStandalone) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Pequeno delay para não aparecer imediatamente na abertura
      setTimeout(() => setVisible(true), 2500);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    setInstalling(true);
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      localStorage.setItem(INSTALL_DISMISSED_KEY, 'permanent');
    }
    setDeferredPrompt(null);
    setVisible(false);
    setInstalling(false);
  };

  const handleDismiss = () => {
    setVisible(false);
    // Lembra por 3 dias
    const expires = Date.now() + 3 * 24 * 60 * 60 * 1000;
    localStorage.setItem(INSTALL_DISMISSED_KEY, String(expires));
  };

  if (!visible) return null;

  return (
    <div
      id="pwa-install-banner"
      style={{
        position: 'fixed',
        bottom: '80px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 2rem)',
        maxWidth: '420px',
        zIndex: 9999,
        animation: 'slideUpBanner 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
      }}
    >
      <style>{`
        @keyframes slideUpBanner {
          from { opacity: 0; transform: translateX(-50%) translateY(24px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>

      <div
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          borderRadius: '1.25rem',
          padding: '1rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.875rem',
          boxShadow: '0 8px 32px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.07)',
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
            boxShadow: '0 4px 12px rgba(0,93,166,0.4)',
          }}
        >
          <Smartphone size={24} color="#fff" />
        </div>

        {/* Texto */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: 0, color: '#f1f5f9', fontWeight: 700, fontSize: '0.875rem', lineHeight: 1.3 }}>
            Instalar Granja de Bolso
          </p>
          <p style={{ margin: '0.2rem 0 0', color: '#94a3b8', fontSize: '0.75rem', lineHeight: 1.4 }}>
            Acesse mais rápido, offline e sem navegador
          </p>
        </div>

        {/* Botão instalar */}
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
          }}
        >
          <Download size={14} />
          {installing ? 'Instalando…' : 'Instalar'}
        </button>

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
