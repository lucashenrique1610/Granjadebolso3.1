import React, { useEffect, useState } from 'react';
import { RefreshCw, X, Sparkles } from 'lucide-react';

export default function PWAUpdateBanner() {
  const [needsUpdate, setNeedsUpdate] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    // Escuta o evento do vite-plugin-pwa (registerType: 'autoUpdate')
    // O SW novo fica em "waiting" — capturamos isso para notificar o usuário
    const onControllerChange = () => {
      // Reload automático quando o SW novo assumir o controle
      window.location.reload();
    };

    navigator.serviceWorker.addEventListener('controllerchange', onControllerChange);

    // Verifica se já existe um SW novo esperando
    navigator.serviceWorker.ready.then((reg) => {
      setRegistration(reg);

      if (reg.waiting) {
        setNeedsUpdate(true);
      }

      // Escuta novos SW que entram em modo "waiting"
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        if (!newWorker) return;

        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            setNeedsUpdate(true);
          }
        });
      });
    });

    // Força checagem de atualização periodicamente (a cada 30 min)
    const checkInterval = setInterval(() => {
      navigator.serviceWorker.ready.then((reg) => reg.update());
    }, 30 * 60 * 1000);

    return () => {
      navigator.serviceWorker.removeEventListener('controllerchange', onControllerChange);
      clearInterval(checkInterval);
    };
  }, []);

  const handleUpdate = () => {
    if (!registration?.waiting) {
      window.location.reload();
      return;
    }
    setUpdating(true);
    // Manda mensagem ao SW para ele pular a espera e assumir o controle
    registration.waiting.postMessage({ type: 'SKIP_WAITING' });
  };

  const handleDismiss = () => {
    setNeedsUpdate(false);
  };

  if (!needsUpdate) return null;

  return (
    <div
      id="pwa-update-banner"
      style={{
        position: 'fixed',
        top: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 2rem)',
        maxWidth: '420px',
        zIndex: 9999,
        animation: 'slideDownBanner 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
      }}
    >
      <style>{`
        @keyframes slideDownBanner {
          from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes spinOnce {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>

      <div
        style={{
          background: 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)',
          borderRadius: '1.25rem',
          padding: '1rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.875rem',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(52,211,153,0.2)',
        }}
      >
        {/* Ícone */}
        <div
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '0.75rem',
            background: 'rgba(52, 211, 153, 0.2)',
            border: '1px solid rgba(52,211,153,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Sparkles size={22} color="#34d399" />
        </div>

        {/* Texto */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: 0, color: '#ecfdf5', fontWeight: 700, fontSize: '0.875rem', lineHeight: 1.3 }}>
            Nova versão disponível!
          </p>
          <p style={{ margin: '0.2rem 0 0', color: '#6ee7b7', fontSize: '0.75rem', lineHeight: 1.4 }}>
            Atualize para aproveitar as melhorias
          </p>
        </div>

        {/* Botão atualizar */}
        <button
          onClick={handleUpdate}
          disabled={updating}
          style={{
            background: '#10b981',
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
            opacity: updating ? 0.7 : 1,
            transition: 'opacity 0.15s',
          }}
        >
          <RefreshCw
            size={14}
            style={{ animation: updating ? 'spinOnce 0.6s linear infinite' : 'none' }}
          />
          {updating ? 'Atualizando…' : 'Atualizar'}
        </button>

        {/* Fechar */}
        <button
          onClick={handleDismiss}
          style={{
            background: 'transparent',
            border: 'none',
            padding: '0.25rem',
            cursor: 'pointer',
            color: '#6ee7b7',
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
