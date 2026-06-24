/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { FarmConfigData, FarmProfileData, OnboardingState, SystemSettingsData, ThemePaletteId, UserPersonalData, FONT_OPTIONS, RADIUS_OPTIONS } from '@/types';
import { resolveThemePalette } from '@/lib/theme';
import AppShell from '@/components/AppShell';
import LoginScreen from '@/components/LoginScreen';
import OnboardingHero from '@/components/OnboardingHero';
import StepColorCustomize from '@/components/StepColorCustomize';
import StepFarmConfig from '@/components/StepFarmConfig';
import StepFinalization from '@/components/StepFinalization';
import StepPersonalData from '@/components/StepPersonalData';
import PWAInstallBanner from '@/components/PWAInstallBanner';
import PWAUpdateBanner from '@/components/PWAUpdateBanner';
import {
  createMyGranja,
  getMyLatestGranja,
  getMyUser,
  isSupabaseConfigured,
  signOut,
  signUpWithEmail,
  supabase,
  supabaseConfigIssue,
  updateMyGranja,
  upsertMyUser,
} from '@/lib/supabase';

const LOCAL_STORAGE_KEY = 'granjadebolso_onboarding_state';
const DARK_MODE_STORAGE_KEY = 'granjadebolso_dark_mode';

const initialDefaultState: OnboardingState = {
  step: 0,
  personal: {
    fullName: '',
    email: '',
    phone: '',
  },
  farm: {
    farmName: '',
    state: '',
    city: '',
    birdCount: 150,
  },
  selectedPalette: 'blue',
  marketingSource: '',
  systemSettings: {
    selectedPalette: 'blue',
    fontFamily: 'inter',
    borderRadius: 'rounded',
    eggSalePrice: 0,
    birdSalePrice: 0,
    litterSalePrice: 0,
    weather: {
      display: {
        currentTemp: true,
        feelsLike: true,
        humidity: true,
        windSpeed: true,
        condition: true,
        dailyForecast: true,
        uvIndex: true,
        precipitation: true,
        pressure: true,
        visibility: true,
      },
      recentLocations: [],
    },
  },
};

function normalizeState(state: Partial<OnboardingState>): OnboardingState {
  return {
    ...initialDefaultState,
    ...state,
    personal: {
      ...initialDefaultState.personal,
      ...state.personal,
    },
    farm: {
      ...initialDefaultState.farm,
      ...state.farm,
    },
    systemSettings: {
      ...initialDefaultState.systemSettings,
      ...state.systemSettings,
      selectedPalette: state.systemSettings?.selectedPalette ?? state.selectedPalette ?? initialDefaultState.selectedPalette,
    },
    selectedPalette: state.selectedPalette ?? state.systemSettings?.selectedPalette ?? initialDefaultState.selectedPalette,
  };
}

function getPendingOnboardingStep(state: OnboardingState) {
  if (!state.personal.fullName.trim() || !state.personal.email.trim() || !state.personal.phone.trim()) {
    return 1;
  }

  if (!state.farm.farmName.trim() || !state.farm.state.trim() || !state.farm.city.trim()) {
    return 2;
  }

  if (!state.marketingSource.trim()) {
    return 4;
  }

  return 4;
}

function hasCompleteOnboardingData(state: OnboardingState, emailOverride?: string) {
  const email = (emailOverride ?? state.personal.email).trim();
  return Boolean(
    state.personal.fullName.trim() &&
      email &&
      state.personal.phone.trim() &&
      state.farm.farmName.trim() &&
      state.farm.state.trim() &&
      state.farm.city.trim() &&
      state.marketingSource.trim(),
  );
}

export default function App() {
  const [appState, setAppState] = useState<OnboardingState>(initialDefaultState);
  const [loginNotice, setLoginNotice] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const appStateRef = useRef(appState);

  useEffect(() => {
    appStateRef.current = appState;
  }, [appState]);

  const sanitizeForStorage = (state: OnboardingState): OnboardingState => {
    return normalizeState({
      ...state,
      personal: {
        ...state.personal,
        password: undefined,
      },
    });
  };

  // Load from local storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed.step === 'number') {
          setAppState(sanitizeForStorage(normalizeState(parsed)));
        }
      }
    } catch (e) {
      console.error('Failed to load local storage state:', e);
    }
  }, []);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(DARK_MODE_STORAGE_KEY);
      setIsDarkMode(stored === 'true');
    } catch {
      setIsDarkMode(false);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(DARK_MODE_STORAGE_KEY, String(isDarkMode));
    } catch {}

    document.documentElement.classList.toggle('dark-theme', isDarkMode);
    document.body.classList.toggle('dark-theme', isDarkMode);
  }, [isDarkMode]);

  const saveState = (updater: OnboardingState | ((prev: OnboardingState) => OnboardingState)) => {
    setAppState((prev) => {
      const next = typeof updater === 'function' ? (updater as (p: OnboardingState) => OnboardingState)(prev) : updater;
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sanitizeForStorage(next)));
      } catch (e) {
        console.error('Failed to save state to local storage:', e);
      }
      return next;
    });
  };

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;

    const syncOnboardingToSupabase = async (state: OnboardingState, emailOverride?: string) => {
      const email = (emailOverride ?? state.personal.email).trim();
      const user = await upsertMyUser({
        full_name: state.personal.fullName,
        email,
        phone: state.personal.phone,
      });

      const granjaPayload = {
        farm_name: state.farm.farmName,
        state: state.farm.state,
        city: state.farm.city,
        bird_count: state.farm.birdCount,
        selected_palette: state.selectedPalette,
        marketing_source: state.marketingSource,
        egg_sale_price: state.systemSettings.eggSalePrice,
        bird_sale_price: state.systemSettings.birdSalePrice,
        litter_sale_price: state.systemSettings.litterSalePrice,
        auto_backup_enabled: false,
        auto_backup_frequency: 'weekly',
        auto_backup_last_run_at: null,
        auto_backup_keep_count: 10,
      };

      const existingGranja = await getMyLatestGranja();
      const granja = existingGranja
        ? await updateMyGranja(existingGranja.id, granjaPayload)
        : await createMyGranja(granjaPayload);

      return { user, granja };
    };

    const hydrateFromSession = async (email: string) => {
      try {
        let [user, granja] = await Promise.all([getMyUser(), getMyLatestGranja()]);
        const pendingState = appStateRef.current;

        if (!granja && hasCompleteOnboardingData(pendingState, email)) {
          const synced = await syncOnboardingToSupabase(
            {
              ...pendingState,
              personal: {
                ...pendingState.personal,
                email,
              },
            },
            email,
          );
          user = synced.user;
          granja = synced.granja;
        }

        saveState((prev) => {
          const nextPalette =
            granja?.selected_palette
              ? (granja.selected_palette as ThemePaletteId)
              : prev.selectedPalette;

          const nextState: OnboardingState = {
            ...prev,
            step: granja ? 5 : getPendingOnboardingStep(prev),
            personal: {
              ...prev.personal,
              fullName: user?.full_name || prev.personal.fullName,
              email: email || prev.personal.email,
              phone: user?.phone || prev.personal.phone,
              password: undefined,
            },
            farm: {
              ...prev.farm,
              farmName: granja?.farm_name || prev.farm.farmName,
              state: granja?.state || prev.farm.state,
              city: granja?.city || prev.farm.city,
              birdCount: typeof granja?.bird_count === 'number' ? granja.bird_count : prev.farm.birdCount,
            },
            selectedPalette: nextPalette,
            marketingSource: granja?.marketing_source ?? prev.marketingSource,
            systemSettings: {
              selectedPalette: nextPalette,
              fontFamily: prev.systemSettings.fontFamily || 'inter',
              borderRadius: prev.systemSettings.borderRadius || 'rounded',
              eggSalePrice: Number(granja?.egg_sale_price ?? prev.systemSettings.eggSalePrice ?? 0),
              birdSalePrice: Number(granja?.bird_sale_price ?? prev.systemSettings.birdSalePrice ?? 0),
              litterSalePrice: Number(granja?.litter_sale_price ?? prev.systemSettings.litterSalePrice ?? 0),
              weather: prev.systemSettings.weather || {
                display: {
                  currentTemp: true,
                  feelsLike: true,
                  humidity: true,
                  windSpeed: true,
                  condition: true,
                  dailyForecast: true,
                  uvIndex: true,
                  precipitation: true,
                  pressure: true,
                  visibility: true,
                },
                recentLocations: [],
              },
            },
          };

          return granja
            ? nextState
            : {
                ...nextState,
                step: getPendingOnboardingStep(nextState),
              };
        });

        if (granja) {
          setLoginNotice('');
        } else {
          setLoginNotice('Sua conta foi autenticada, mas a granja inicial ainda não foi salva. Finalize o cadastro para continuar.');
        }
      } catch (e: any) {
        console.warn('Falha ao carregar dados do Supabase, continuando com dados locais:', e);
        // Even if there's an error, don't crash the app! Continue with local state!
      }
    };

    supabase.auth.getSession().then(({ data }) => {
      const session = data.session;
      if (session?.user?.email) {
        hydrateFromSession(session.user.email);
      } else {
        saveState((prev) => (prev.step === 5 ? { ...prev, step: 0 } : prev));
      }
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user?.email) {
        setLoginNotice('');
        hydrateFromSession(session.user.email);
      } else {
        saveState((prev) => (prev.step === 5 ? { ...prev, step: 0 } : prev));
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  // Immediate live theme sync
  useEffect(() => {
    const activePaletteObj = resolveThemePalette(appState.selectedPalette, appState.systemSettings.customPaletteColor);
    document.documentElement.style.setProperty('--brand-primary', activePaletteObj.themeVars.primary);
    document.documentElement.style.setProperty('--brand-hover', activePaletteObj.themeVars.primaryHover);
    document.documentElement.style.setProperty('--brand-active', activePaletteObj.themeVars.primaryActive);
    document.documentElement.style.setProperty('--brand-bg', activePaletteObj.themeVars.bgContainer);
    document.documentElement.style.setProperty('--brand-main', activePaletteObj.themeVars.bgMain);

    // Inject font & border-radius
    const fontOption = FONT_OPTIONS.find((f) => f.id === appState.systemSettings.fontFamily);
    if (fontOption) {
      document.documentElement.style.setProperty('--app-font', fontOption.css);
      document.body.style.fontFamily = fontOption.css;
    }
    const radiusOption = RADIUS_OPTIONS.find((r) => r.id === appState.systemSettings.borderRadius);
    if (radiusOption) {
      document.documentElement.style.setProperty('--app-radius', radiusOption.value);
    }
  }, [appState.selectedPalette, appState.systemSettings.fontFamily, appState.systemSettings.borderRadius]);

  // View transitions helper
  const handleStartOnboarding = () => {
    setLoginNotice('');
    saveState((prev) => ({ ...prev, step: 1 }));
  };

  const handleGoToLogin = () => {
    saveState((prev) => ({ ...prev, step: -1 }));
  };

  const handlePersonalDataSubmit = (personalData: UserPersonalData) => {
    saveState((prev) => ({
      ...prev,
      personal: personalData,
      step: 2,
    }));
  };

  const handleFarmConfigSubmit = (farmData: FarmConfigData) => {
    saveState((prev) => ({
      ...prev,
      farm: farmData,
      step: 3,
    }));
  };

  const handlePaletteSelect = (paletteId: ThemePaletteId, customColor?: string) => {
    saveState((prev) => ({
      ...prev,
      selectedPalette: paletteId,
      systemSettings: {
        ...prev.systemSettings,
        selectedPalette: paletteId,
        ...(customColor ? { customPaletteColor: customColor } : {}),
      },
    }));
  };

  const handleColorCustomizeNext = () => {
    saveState((prev) => ({ ...prev, step: 4 }));
  };

  const handleMarketingComplete = async (source: string) => {
    saveState((prev) => ({ ...prev, marketingSource: source }));

    if (!isSupabaseConfigured) {
      if (supabaseConfigIssue === 'service_role') {
        setLoginNotice('Chave do Supabase inválida: você colou uma service_role key. Use a anon public key (Settings → API → anon public).');
      } else {
        setLoginNotice('Supabase não está configurado. Crie ou preencha o arquivo .env na raiz do projeto com VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY e reinicie o npm run dev.');
      }
      saveState((prev) => ({ ...prev, step: -1, personal: { ...prev.personal, password: undefined } }));
      return;
    }

    const current = appStateRef.current;
    const email = current.personal.email?.trim();
    const password = current.personal.password || '';
    if (!email || !password) {
      setLoginNotice('Finalize o cadastro com e-mail e senha e faça login para sincronizar com a nuvem.');
      saveState((prev) => ({ ...prev, step: -1, personal: { ...prev.personal, password: undefined } }));
      return;
    }

    try {
      const signUpResult = await signUpWithEmail(email, password, {
        full_name: current.personal.fullName,
        phone: current.personal.phone,
      });
      const hasSession = !!signUpResult.session;

      if (!hasSession) {
        setLoginNotice('Conta criada. Confirme seu e-mail e entre para concluir automaticamente o salvamento dos dados da granja.');
        saveState((prev) => ({ ...prev, step: -1, personal: { ...prev.personal, password: undefined } }));
        return;
      }

      const currentWithMarketing = {
        ...current,
        marketingSource: source,
      };

      await upsertMyUser({
        full_name: currentWithMarketing.personal.fullName,
        email,
        phone: currentWithMarketing.personal.phone,
      });

      const existingGranja = await getMyLatestGranja();
      const granjaPayload = {
        farm_name: currentWithMarketing.farm.farmName,
        state: currentWithMarketing.farm.state,
        city: currentWithMarketing.farm.city,
        bird_count: currentWithMarketing.farm.birdCount,
        selected_palette: currentWithMarketing.selectedPalette,
        marketing_source: currentWithMarketing.marketingSource,
        egg_sale_price: currentWithMarketing.systemSettings.eggSalePrice,
        bird_sale_price: currentWithMarketing.systemSettings.birdSalePrice,
        litter_sale_price: currentWithMarketing.systemSettings.litterSalePrice,
        auto_backup_enabled: false,
        auto_backup_frequency: 'weekly',
        auto_backup_last_run_at: null,
        auto_backup_keep_count: 10,
      };

      if (existingGranja) {
        await updateMyGranja(existingGranja.id, granjaPayload);
      } else {
        await createMyGranja(granjaPayload);
      }

      saveState((prev) => ({ ...prev, step: 5, personal: { ...prev.personal, password: undefined } }));
    } catch (e: any) {
      const message = typeof e?.message === 'string' ? e.message : '';
      if (message.toLowerCase().includes('user already registered') || message.toLowerCase().includes('already registered')) {
        setLoginNotice('Este e-mail já possui conta. Entre com sua senha para continuar.');
        saveState((prev) => ({ ...prev, step: -1, personal: { ...prev.personal, password: undefined } }));
        return;
      }
      setLoginNotice(message || 'Falha ao criar conta. Tente novamente.');
      saveState((prev) => ({ ...prev, step: -1, personal: { ...prev.personal, password: undefined } }));
    }
  };

  const handleLoginSuccess = () => {
    setLoginNotice('');
  };

  const handleLogout = async () => {
    try {
      if (isSupabaseConfigured) {
        await signOut();
      }
    } catch (e) {
      console.error('Falha ao sair:', e);
    } finally {
      saveState((prev) => ({ ...prev, step: 0 }));
    }
  };

  const handleReset = () => {
    setLoginNotice('');
    saveState({ ...initialDefaultState, step: 1 });
  };

  const handlePersonalProfileUpdate = (personal: Omit<UserPersonalData, 'password'>) => {
    saveState((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        ...personal,
        password: undefined,
      },
    }));
  };

  const handleFarmProfileUpdate = (farmProfile: FarmProfileData) => {
    saveState((prev) => ({
      ...prev,
      farm: {
        ...prev.farm,
        farmName: farmProfile.farmName,
        state: farmProfile.state,
        city: farmProfile.city,
        birdCount: farmProfile.birdCount,
      },
      selectedPalette: farmProfile.selectedPalette,
      marketingSource: farmProfile.marketingSource,
      systemSettings: {
        ...prev.systemSettings,
        selectedPalette: farmProfile.selectedPalette,
      },
    }));
  };

  const handleSystemSettingsUpdate = (systemSettings: SystemSettingsData) => {
    saveState((prev) => ({
      ...prev,
      selectedPalette: systemSettings.selectedPalette,
      systemSettings,
    }));
  };

  const handleSystemPalettePreview = (paletteId: SystemSettingsData['selectedPalette'], customColor?: string) => {
    setAppState((prev) => ({
      ...prev,
      selectedPalette: paletteId,
      systemSettings: {
        ...prev.systemSettings,
        selectedPalette: paletteId,
        customPaletteColor: customColor || prev.systemSettings.customPaletteColor,
      },
    }));
  };

  return (
    <div className={`w-full min-h-screen bg-brand-main transition-colors ${isDarkMode ? 'dark-theme' : ''}`}>
      {/* Switch Screens dynamically based on step index */}
      {appState.step === -1 && (
        <LoginScreen
          onLogin={handleLoginSuccess}
          onGoToSignup={handleReset}
          initialEmail={appState.personal.email}
          notice={loginNotice}
        />
      )}

      {appState.step === 0 && (
        <OnboardingHero
          onStart={handleStartOnboarding}
          onGoToLogin={handleGoToLogin}
        />
      )}

      {appState.step === 1 && (
        <StepPersonalData
          initialData={appState.personal}
          onNext={handlePersonalDataSubmit}
          onBack={() => saveState((prev) => ({ ...prev, step: 0 }))}
        />
      )}

      {appState.step === 2 && (
        <StepFarmConfig
          initialData={appState.farm}
          onNext={handleFarmConfigSubmit}
          onBack={() => saveState((prev) => ({ ...prev, step: 1 }))}
        />
      )}

      {appState.step === 3 && (
        <StepColorCustomize
          selectedPalette={appState.selectedPalette}
          onChangePalette={handlePaletteSelect}
          onNext={handleColorCustomizeNext}
          onBack={() => saveState((prev) => ({ ...prev, step: 2 }))}
        />
      )}

      {appState.step === 4 && (
        <StepFinalization
          initialSource={appState.marketingSource}
          onBack={() => saveState((prev) => ({ ...prev, step: 3 }))}
          onComplete={handleMarketingComplete}
        />
      )}

      {appState.step === 5 && (
        <AppShell
          appState={appState}
          onLogout={handleLogout}
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode((v) => !v)}
          onUpdatePersonalProfile={handlePersonalProfileUpdate}
          onUpdateFarmProfile={handleFarmProfileUpdate}
          onUpdateSystemSettings={handleSystemSettingsUpdate}
          onPreviewSystemPaletteChange={handleSystemPalettePreview}
        />
      )}

      {/* PWA Banners — visíveis em todas as telas */}
      <PWAUpdateBanner />
      <PWAInstallBanner />
    </div>
  );
}
