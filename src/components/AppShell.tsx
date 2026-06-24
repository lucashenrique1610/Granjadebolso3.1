import React, { useEffect, useMemo, useRef, useState } from 'react';
import { LogOut, Moon, Sun } from 'lucide-react';
import {
  AnimalRecord,
  BackupAutomationSettings,
  BackupRecord,
  BackupSnapshot,
  ClientRecord,
  FarmProfileData,
  GalpaoRecord,
  HealthProfessionalRecord,
  HealthRecord,
  MortalityRecord,
  ManejoRecord,
  DisponibilidadeVenda,
  OnboardingState,
  PurchaseRecord,
  SupplierRecord,
  SystemSettingsData,
  THEME_PALETTES,
  UserPersonalData,
  VeterinaryStockRecord,
  VendaRecord,
  IngredientRecord,
  FormulationRecord,
  FormulatedFeedStockRecord,
} from '@/types';
import Sidebar, { RouteId } from '@/components/Sidebar';
import AnimaisPage from '@/pages/AnimaisPage';
import AssinaturaPage from '@/pages/AssinaturaPage';
import BackupsPage from '@/pages/BackupsPage';
import ClientePage from '@/pages/ClientePage';
import ClimaPage from '@/pages/ClimaPage';
import ComprasPage from '@/pages/ComprasPage';
import ConhecimentoPage from '@/pages/ConhecimentoPage';
import FinanceiroPage from '@/pages/FinanceiroPage';
import FormulacaoPage from '@/pages/FormulacaoPage';
import FornecedorPage from '@/pages/FornecedorPage';
import GalpoesPage from '@/pages/GalpoesPage';
import ProfissionaisPage from '@/pages/ProfissionaisPage';
import InicioPage from '@/pages/InicioPage';
import InvestimentosPage from '@/pages/InvestimentosPage';
import ManejoPage from '@/pages/ManejoPage';
import PerfilPage from '@/pages/PerfilPage';
import PersonalizacaoPage from '@/pages/PersonalizacaoPage';
import RelatoriosPage from '@/pages/RelatoriosPage';
import SistemaPage from '@/pages/SistemaPage';
import VendasPage from '@/pages/VendasPage';
import {
  buildMyBackupSnapshot,
  createMyGranja,
  deleteMyBackup,
  deleteMyAnimal,
  deleteMyClient,
  deleteMyGalpao,
  deleteMyHealthProfessional,
  deleteMyHealthRecord,
  deleteMyMortalityRecord,
  deleteMyPurchase,
  deleteMySupplier,
  deleteMyVeterinaryStock,
  deleteMyManejoRecord,
  deleteMyDisponibilidadeVenda,
  deleteMyVenda,
  deleteMyIngredient,
  deleteMyFormulacao,
  deleteMyFormulatedFeedStock,
  getMyLatestGranja,
  getMyUser,
  getBackupAutomationSettingsFromGranja,
  isSupabaseConfigured,
  listMyBackups,
  listMyAnimals,
  listMyClients,
  listMyGalpoes,
  listMyHealthProfessionals,
  listMyHealthRecords,
  listMyMortalityRecords,
  listMyPurchases,
  listMySuppliers,
  listMyVeterinaryStock,
  listMyManejoRecords,
  listMyDisponibilidadeVenda,
  listMyVendas,
  listMyIngredients,
  listMyFormulacoes,
  listMyFormulatedFeedStock,
  restoreMyBackupSnapshot,
  saveMyBackupToSupabase,
  updateMyGranja,
  updateMyGranjaAutoBackupSettings,
  updateMyGranjaBirdCount,
  upsertMyUser,
  upsertMyAnimal,
  upsertMyClient,
  upsertMyGalpao,
  upsertMyHealthProfessional,
  upsertMyHealthRecord,
  upsertMyMortalityRecord,
  upsertMyPurchase,
  upsertMySupplier,
  upsertMyVeterinaryStock,
  upsertMyManejoRecord,
  upsertMyDisponibilidadeVenda,
  upsertMyVenda,
  upsertMyIngredient,
  upsertMyFormulacao,
  upsertMyFormulatedFeedStock,
} from '@/lib/supabase';

interface AppShellProps {
  appState: OnboardingState;
  onLogout: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onUpdatePersonalProfile: (personal: Omit<UserPersonalData, 'password'>) => void;
  onUpdateFarmProfile: (farmProfile: FarmProfileData) => void;
  onUpdateSystemSettings: (systemSettings: SystemSettingsData) => void;
  onPreviewSystemPaletteChange: (paletteId: SystemSettingsData['selectedPalette'], customColor?: string) => void;
}

const DEFAULT_BACKUP_AUTOMATION: BackupAutomationSettings = {
  enabled: false,
  frequency: 'weekly',
  lastRunAt: '',
  keepCount: 10,
};

function getNextBackupTime(frequency: BackupAutomationSettings['frequency'], fromDate: Date) {
  const next = new Date(fromDate);
  if (frequency === 'daily') next.setDate(next.getDate() + 1);
  if (frequency === 'weekly') next.setDate(next.getDate() + 7);
  if (frequency === 'monthly') next.setMonth(next.getMonth() + 1);
  return next;
}

export default function AppShell({
  appState,
  onLogout,
  isDarkMode,
  onToggleDarkMode,
  onUpdatePersonalProfile,
  onUpdateFarmProfile,
  onUpdateSystemSettings,
  onPreviewSystemPaletteChange,
}: AppShellProps) {
  const [activeRoute, setActiveRoute] = useState<RouteId>('inicio');
  // Persist sidebar collapsed state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    return saved ? JSON.parse(saved) : false;
  });
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [animalRecords, setAnimalRecords] = useState<AnimalRecord[]>([]);
  const [clientRecords, setClientRecords] = useState<ClientRecord[]>([]);
  const [supplierRecords, setSupplierRecords] = useState<SupplierRecord[]>([]);
  const [purchaseRecords, setPurchaseRecords] = useState<PurchaseRecord[]>([]);
  const [galpaoRecords, setGalpaoRecords] = useState<GalpaoRecord[]>([]);
  const [healthProfessionalRecords, setHealthProfessionalRecords] = useState<HealthProfessionalRecord[]>([]);
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([]);
  const [veterinaryStockRecords, setVeterinaryStockRecords] = useState<VeterinaryStockRecord[]>([]);
  const [mortalityRecords, setMortalityRecords] = useState<MortalityRecord[]>([]);
  const [manejoRecords, setManejoRecords] = useState<ManejoRecord[]>([]);
  const [disponibilidadeVenda, setDisponibilidadeVenda] = useState<DisponibilidadeVenda[]>([]);
  const [vendasRecords, setVendasRecords] = useState<VendaRecord[]>([]);
  const [ingredientRecords, setIngredientRecords] = useState<IngredientRecord[]>([]);
  const [formulationRecords, setFormulationRecords] = useState<FormulationRecord[]>([]);
  const [formulatedFeedStockRecords, setFormulatedFeedStockRecords] = useState<FormulatedFeedStockRecord[]>([]);
  const [isCadastrosLoading, setIsCadastrosLoading] = useState(true);
  const [isCadastrosSyncing, setIsCadastrosSyncing] = useState(false);
  const [cadastrosError, setCadastrosError] = useState<string | null>(null);
  const [isProfileSyncing, setIsProfileSyncing] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [backupRecords, setBackupRecords] = useState<BackupRecord[]>([]);
  const [isBackupsLoading, setIsBackupsLoading] = useState(true);
  const [isBackupsSyncing, setIsBackupsSyncing] = useState(false);
  const [backupsError, setBackupsError] = useState<string | null>(null);
  const [backupAutomation, setBackupAutomation] = useState<BackupAutomationSettings>(DEFAULT_BACKUP_AUTOMATION);
  const autoBackupRunRef = useRef(false);

  // Save sidebar collapsed state to localStorage
  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', JSON.stringify(isSidebarCollapsed));
  }, [isSidebarCollapsed]);

  const loadCadastros = async () => {
    if (!isSupabaseConfigured) {
      setCadastrosError('Supabase não está configurado para sincronizar os cadastros.');
      setIsCadastrosLoading(false);
      return;
    }

    try {
      setIsCadastrosLoading(true);
      setCadastrosError(null);
      const [animals, clients, suppliers, purchases, galpoes, professionals, health, stock, mortality, manejo, disponibilidade, vendas, ingredients, formulations, formulatedFeedStock] =
        await Promise.all([
          listMyAnimals(),
          listMyClients(),
          listMySuppliers(),
          listMyPurchases(),
          listMyGalpoes(),
          listMyHealthProfessionals(),
          listMyHealthRecords(),
          listMyVeterinaryStock(),
          listMyMortalityRecords(),
          listMyManejoRecords(),
          listMyDisponibilidadeVenda(),
          listMyVendas(),
          listMyIngredients(),
          listMyFormulacoes(),
          listMyFormulatedFeedStock(),
        ]);
      setAnimalRecords(animals);
      setClientRecords(clients);
      setSupplierRecords(suppliers);
      setPurchaseRecords(purchases);
      setGalpaoRecords(galpoes);
      setHealthProfessionalRecords(professionals);
      setHealthRecords(health);
      setVeterinaryStockRecords(stock);
      setMortalityRecords(mortality);
      setManejoRecords(manejo);
      setDisponibilidadeVenda(disponibilidade);
      setVendasRecords(vendas);
      setIngredientRecords(ingredients);
      setFormulationRecords(formulations);
      setFormulatedFeedStockRecords(formulatedFeedStock);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao carregar cadastros do Supabase.';
      setCadastrosError(message);
    } finally {
      setIsCadastrosLoading(false);
    }
  };

  useEffect(() => {
    void loadCadastros();
  }, []);

  const loadBackups = async () => {
    if (!isSupabaseConfigured) {
      setBackupsError('Supabase não está configurado para sincronizar os backups.');
      setIsBackupsLoading(false);
      return;
    }

    try {
      setIsBackupsLoading(true);
      setBackupsError(null);
      const backups = await listMyBackups();
      setBackupRecords(backups);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao carregar backups.';
      setBackupsError(message);
    } finally {
      setIsBackupsLoading(false);
    }
  };

  useEffect(() => {
    void loadBackups();
  }, []);

  const refreshAppStateFromSupabase = async () => {
    const [user, granja] = await Promise.all([getMyUser(), getMyLatestGranja()]);

    if (user) {
      onUpdatePersonalProfile({
        fullName: user.full_name,
        email: user.email,
        phone: user.phone ?? '',
      });
    }

    if (granja) {
      const selectedPalette =
        granja.selected_palette ? (granja.selected_palette as SystemSettingsData['selectedPalette']) : 'blue';
      setBackupAutomation(getBackupAutomationSettingsFromGranja(granja));

      onUpdateFarmProfile({
        farmName: granja.farm_name,
        state: granja.state,
        city: granja.city,
        birdCount: granja.bird_count,
        selectedPalette,
        marketingSource: granja.marketing_source ?? '',
      });

      onUpdateSystemSettings({
        selectedPalette,
        fontFamily: appState.systemSettings.fontFamily || 'inter',
        borderRadius: appState.systemSettings.borderRadius || 'rounded',
        eggSalePrice: Number(granja.egg_sale_price ?? 0),
        birdSalePrice: Number(granja.bird_sale_price ?? 0),
        litterSalePrice: Number(granja.litter_sale_price ?? 0),
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
      });
      return;
    }

    setBackupAutomation(DEFAULT_BACKUP_AUTOMATION);
  };

  useEffect(() => {
    void refreshAppStateFromSupabase();
  }, []);

  const upsertAnimal = async (payload: AnimalRecord) => {
    try {
      setIsCadastrosSyncing(true);
      setCadastrosError(null);
      const saved = await upsertMyAnimal(payload);
      setAnimalRecords((prev) => {
        const existingIndex = prev.findIndex((item) => item.id === saved.id);
        if (existingIndex === -1) return [saved, ...prev];
        return prev.map((item) => (item.id === saved.id ? saved : item));
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao salvar animal.';
      setCadastrosError(message);
      throw error;
    } finally {
      setIsCadastrosSyncing(false);
    }
  };

  const removeAnimal = async (id: string) => {
    try {
      setIsCadastrosSyncing(true);
      setCadastrosError(null);
      await deleteMyAnimal(id);
      setAnimalRecords((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao excluir animal.';
      setCadastrosError(message);
    } finally {
      setIsCadastrosSyncing(false);
    }
  };

  const upsertClient = async (payload: ClientRecord) => {
    try {
      setIsCadastrosSyncing(true);
      setCadastrosError(null);
      const saved = await upsertMyClient(payload);
      setClientRecords((prev) => {
        const existingIndex = prev.findIndex((item) => item.id === saved.id);
        if (existingIndex === -1) return [saved, ...prev];
        return prev.map((item) => (item.id === saved.id ? saved : item));
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao salvar cliente.';
      setCadastrosError(message);
      throw error;
    } finally {
      setIsCadastrosSyncing(false);
    }
  };

  const removeClient = async (id: string) => {
    try {
      setIsCadastrosSyncing(true);
      setCadastrosError(null);
      await deleteMyClient(id);
      setClientRecords((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao excluir cliente.';
      setCadastrosError(message);
    } finally {
      setIsCadastrosSyncing(false);
    }
  };

  const upsertSupplier = async (payload: SupplierRecord) => {
    try {
      setIsCadastrosSyncing(true);
      setCadastrosError(null);
      const saved = await upsertMySupplier(payload);
      setSupplierRecords((prev) => {
        const existingIndex = prev.findIndex((item) => item.id === saved.id);
        if (existingIndex === -1) return [saved, ...prev];
        return prev.map((item) => (item.id === saved.id ? saved : item));
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao salvar fornecedor.';
      setCadastrosError(message);
      throw error;
    } finally {
      setIsCadastrosSyncing(false);
    }
  };

  const removeSupplier = async (id: string) => {
    try {
      setIsCadastrosSyncing(true);
      setCadastrosError(null);
      await deleteMySupplier(id);
      setSupplierRecords((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao excluir fornecedor.';
      setCadastrosError(message);
    } finally {
      setIsCadastrosSyncing(false);
    }
  };

  const upsertPurchase = async (payload: PurchaseRecord) => {
    try {
      setIsCadastrosSyncing(true);
      setCadastrosError(null);
      const saved = await upsertMyPurchase(payload);
      setPurchaseRecords((prev) => {
        const existingIndex = prev.findIndex((item) => item.id === saved.id);
        if (existingIndex === -1) return [saved, ...prev];
        return prev.map((item) => (item.id === saved.id ? saved : item));
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao salvar compra.';
      setCadastrosError(message);
      throw error;
    } finally {
      setIsCadastrosSyncing(false);
    }
  };

  const removePurchase = async (id: string) => {
    try {
      setIsCadastrosSyncing(true);
      setCadastrosError(null);
      await deleteMyPurchase(id);
      setPurchaseRecords((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao excluir compra.';
      setCadastrosError(message);
      throw error;
    } finally {
      setIsCadastrosSyncing(false);
    }
  };

  const syncFarmPopulationCount = async (nextAnimals: AnimalRecord[]) => {
    const totalBirds = nextAnimals.reduce((sum, item) => sum + (item.currentQuantity ?? item.quantity), 0);
    const currentGranja = await getMyLatestGranja();

    if (currentGranja) {
      await updateMyGranjaBirdCount(currentGranja.id, totalBirds);
    }

    onUpdateFarmProfile({
      farmName: appState.farm.farmName,
      state: appState.farm.state,
      city: appState.farm.city,
      birdCount: totalBirds,
      selectedPalette: appState.selectedPalette,
      marketingSource: appState.marketingSource,
    });
  };

  const upsertGalpao = async (payload: GalpaoRecord) => {
    try {
      setIsCadastrosSyncing(true);
      setCadastrosError(null);
      const saved = await upsertMyGalpao(payload);
      setGalpaoRecords((prev) => {
        const existingIndex = prev.findIndex((item) => item.id === saved.id);
        if (existingIndex === -1) return [saved, ...prev];
        return prev.map((item) => (item.id === saved.id ? saved : item));
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao salvar galpão.';
      setCadastrosError(message);
      throw error;
    } finally {
      setIsCadastrosSyncing(false);
    }
  };

  const removeGalpao = async (id: string) => {
    try {
      setIsCadastrosSyncing(true);
      setCadastrosError(null);
      await deleteMyGalpao(id);
      setGalpaoRecords((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao excluir galpão.';
      setCadastrosError(message);
      throw error;
    } finally {
      setIsCadastrosSyncing(false);
    }
  };

  const upsertHealthProfessional = async (payload: HealthProfessionalRecord) => {
    try {
      setIsCadastrosSyncing(true);
      setCadastrosError(null);
      const saved = await upsertMyHealthProfessional(payload);
      setHealthProfessionalRecords((prev) => {
        const existingIndex = prev.findIndex((item) => item.id === saved.id);
        if (existingIndex === -1) return [saved, ...prev];
        return prev.map((item) => (item.id === saved.id ? saved : item));
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao salvar profissional de saúde.';
      setCadastrosError(message);
      throw error;
    } finally {
      setIsCadastrosSyncing(false);
    }
  };

  const removeHealthProfessional = async (id: string) => {
    try {
      setIsCadastrosSyncing(true);
      setCadastrosError(null);
      await deleteMyHealthProfessional(id);
      setHealthProfessionalRecords((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao excluir profissional de saúde.';
      setCadastrosError(message);
      throw error;
    } finally {
      setIsCadastrosSyncing(false);
    }
  };

  const upsertHealth = async (payload: HealthRecord) => {
    try {
      setIsCadastrosSyncing(true);
      setCadastrosError(null);
      const saved = await upsertMyHealthRecord(payload);
      setHealthRecords((prev) => {
        const existingIndex = prev.findIndex((item) => item.id === saved.id);
        if (existingIndex === -1) return [saved, ...prev];
        return prev.map((item) => (item.id === saved.id ? saved : item));
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao salvar registro de saúde.';
      setCadastrosError(message);
      throw error;
    } finally {
      setIsCadastrosSyncing(false);
    }
  };

  const removeHealth = async (id: string) => {
    try {
      setIsCadastrosSyncing(true);
      setCadastrosError(null);
      await deleteMyHealthRecord(id);
      setHealthRecords((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao excluir registro de saúde.';
      setCadastrosError(message);
      throw error;
    } finally {
      setIsCadastrosSyncing(false);
    }
  };

  const upsertVeterinaryStock = async (payload: VeterinaryStockRecord) => {
    try {
      setIsCadastrosSyncing(true);
      setCadastrosError(null);
      const saved = await upsertMyVeterinaryStock(payload);
      setVeterinaryStockRecords((prev) => {
        const existingIndex = prev.findIndex((item) => item.id === saved.id);
        if (existingIndex === -1) return [saved, ...prev];
        return prev.map((item) => (item.id === saved.id ? saved : item));
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao salvar item do estoque veterinário.';
      setCadastrosError(message);
      throw error;
    } finally {
      setIsCadastrosSyncing(false);
    }
  };

  const removeVeterinaryStock = async (id: string) => {
    try {
      setIsCadastrosSyncing(true);
      setCadastrosError(null);
      await deleteMyVeterinaryStock(id);
      setVeterinaryStockRecords((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao excluir item do estoque veterinário.';
      setCadastrosError(message);
      throw error;
    } finally {
      setIsCadastrosSyncing(false);
    }
  };

  const upsertMortality = async (payload: MortalityRecord) => {
    try {
      setIsCadastrosSyncing(true);
      setCadastrosError(null);

      const previous = mortalityRecords.find((item) => item.id === payload.id) ?? null;
      const saved = await upsertMyMortalityRecord(payload);
      let nextAnimals = [...animalRecords];
      let nextGalpoes = [...galpaoRecords];
      const changedAnimalIds = new Set<string>();
      const changedGalpaoIds = new Set<string>();

      const applyPopulationDelta = (record: MortalityRecord, multiplier: 1 | -1) => {
        nextAnimals = nextAnimals.map((animal) => {
          if (animal.id !== record.animalId) return animal;
          changedAnimalIds.add(animal.id);
          return {
            ...animal,
            currentQuantity: Math.max(0, (animal.currentQuantity ?? animal.quantity) + multiplier * record.deadCount),
          };
        });

        if (record.galpaoId) {
          nextGalpoes = nextGalpoes.map((galpao) => {
            if (galpao.id !== record.galpaoId) return galpao;
            changedGalpaoIds.add(galpao.id);
            return {
              ...galpao,
              currentBirdCount: Math.max(0, galpao.currentBirdCount + multiplier * record.deadCount),
            };
          });
        }
      };

      if (previous) applyPopulationDelta(previous, 1);
      applyPopulationDelta(saved, -1);

      const changedAnimals = nextAnimals.filter((animal) => changedAnimalIds.has(animal.id));
      const changedGalpoes = nextGalpoes.filter((galpao) => changedGalpaoIds.has(galpao.id));

      await Promise.all([
        ...changedAnimals.map((animal) => upsertMyAnimal(animal)),
        ...changedGalpoes.map((galpao) => upsertMyGalpao(galpao)),
      ]);
      await syncFarmPopulationCount(nextAnimals);

      setAnimalRecords(nextAnimals);
      setGalpaoRecords(nextGalpoes);
      setMortalityRecords((prev) => {
        const existingIndex = prev.findIndex((item) => item.id === saved.id);
        if (existingIndex === -1) return [saved, ...prev];
        return prev.map((item) => (item.id === saved.id ? saved : item));
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao salvar registro de mortalidade.';
      setCadastrosError(message);
      throw error;
    } finally {
      setIsCadastrosSyncing(false);
    }
  };

  const removeMortality = async (id: string) => {
    try {
      setIsCadastrosSyncing(true);
      setCadastrosError(null);

      const previous = mortalityRecords.find((item) => item.id === id);
      if (!previous) {
        await deleteMyMortalityRecord(id);
        setMortalityRecords((prev) => prev.filter((item) => item.id !== id));
        return;
      }

      await deleteMyMortalityRecord(id);

      const nextAnimals = animalRecords.map((animal) =>
        animal.id === previous.animalId
          ? {
              ...animal,
              currentQuantity: Math.max(0, (animal.currentQuantity ?? animal.quantity) + previous.deadCount),
            }
          : animal,
      );
      const nextGalpoes = previous.galpaoId
        ? galpaoRecords.map((galpao) =>
            galpao.id === previous.galpaoId
              ? {
                  ...galpao,
                  currentBirdCount: Math.max(0, galpao.currentBirdCount + previous.deadCount),
                }
              : galpao,
          )
        : galpaoRecords;

      await Promise.all([
        ...nextAnimals.filter((animal) => animal.id === previous.animalId).map((animal) => upsertMyAnimal(animal)),
        ...(previous.galpaoId ? nextGalpoes.filter((galpao) => galpao.id === previous.galpaoId).map((galpao) => upsertMyGalpao(galpao)) : []),
      ]);
      await syncFarmPopulationCount(nextAnimals);

      setAnimalRecords(nextAnimals);
      setGalpaoRecords(nextGalpoes);
      setMortalityRecords((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao excluir registro de mortalidade.';
      setCadastrosError(message);
      throw error;
    } finally {
      setIsCadastrosSyncing(false);
    }
  };

  const upsertManejo = async (record: ManejoRecord) => {
    try {
      setIsCadastrosSyncing(true);
      setCadastrosError(null);
      const saved = await upsertMyManejoRecord(record);
      setManejoRecords((prev) => {
        const existingIndex = prev.findIndex((item) => item.id === saved.id);
        if (existingIndex === -1) return [saved, ...prev];
        return prev.map((item) => (item.id === saved.id ? saved : item));
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao salvar registro de manejo.';
      setCadastrosError(message);
      throw error;
    } finally {
      setIsCadastrosSyncing(false);
    }
  };

  const removeManejo = async (id: string) => {
    try {
      setIsCadastrosSyncing(true);
      setCadastrosError(null);
      await deleteMyManejoRecord(id);
      setManejoRecords((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao excluir registro de manejo.';
      setCadastrosError(message);
      throw error;
    } finally {
      setIsCadastrosSyncing(false);
    }
  };

  const upsertDisponibilidade = async (record: DisponibilidadeVenda) => {
    try {
      setIsCadastrosSyncing(true);
      setCadastrosError(null);
      const saved = await upsertMyDisponibilidadeVenda(record);
      setDisponibilidadeVenda((prev) => {
        const existingIndex = prev.findIndex((item) => item.id === saved.id);
        if (existingIndex === -1) return [saved, ...prev];
        return prev.map((item) => (item.id === saved.id ? saved : item));
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao salvar disponibilidade para venda.';
      setCadastrosError(message);
      throw error;
    } finally {
      setIsCadastrosSyncing(false);
    }
  };

  const removeDisponibilidade = async (id: string) => {
    try {
      setIsCadastrosSyncing(true);
      setCadastrosError(null);
      await deleteMyDisponibilidadeVenda(id);
      setDisponibilidadeVenda((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao excluir disponibilidade para venda.';
      setCadastrosError(message);
      throw error;
    } finally {
      setIsCadastrosSyncing(false);
    }
  };

  const upsertVenda = async (record: VendaRecord) => {
    try {
      setIsCadastrosSyncing(true);
      setCadastrosError(null);
      const saved = await upsertMyVenda(record);
      setVendasRecords((prev) => {
        const existingIndex = prev.findIndex((item) => item.id === saved.id);
        if (existingIndex === -1) return [saved, ...prev];
        return prev.map((item) => (item.id === saved.id ? saved : item));
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao salvar venda.';
      setCadastrosError(message);
      throw error;
    } finally {
      setIsCadastrosSyncing(false);
    }
  };

  const removeVenda = async (id: string) => {
    try {
      setIsCadastrosSyncing(true);
      setCadastrosError(null);
      await deleteMyVenda(id);
      setVendasRecords((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao excluir venda.';
      setCadastrosError(message);
      throw error;
    } finally {
      setIsCadastrosSyncing(false);
    }
  };

  const upsertIngredient = async (record: IngredientRecord) => {
    console.log('[DEBUG] AppShell upsertIngredient INICIADO com:', record);
    try {
      setIsCadastrosSyncing(true);
      setCadastrosError(null);
      console.log('[DEBUG] Chamando upsertMyIngredient...');
      const saved = await upsertMyIngredient(record);
      console.log('[DEBUG] Dados salvos recebidos do supabase.ts:', saved);
      setIngredientRecords((prev) => {
        const existingIndex = prev.findIndex((item) => item.id === saved.id);
        console.log('[DEBUG] Atualizando estado local! existingIndex:', existingIndex);
        if (existingIndex === -1) return [saved, ...prev];
        return prev.map((item) => (item.id === saved.id ? saved : item));
      });
      console.log('[DEBUG] Estado local atualizado com sucesso!');
    } catch (error) {
      console.error('[DEBUG] ERRO no AppShell upsertIngredient:', error);
      const message = error instanceof Error ? error.message : 'Erro ao salvar ingrediente.';
      setCadastrosError(message);
      throw error;
    } finally {
      setIsCadastrosSyncing(false);
    }
  };

  const removeIngredient = async (id: string) => {
    try {
      setIsCadastrosSyncing(true);
      setCadastrosError(null);
      await deleteMyIngredient(id);
      setIngredientRecords((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao excluir ingrediente.';
      setCadastrosError(message);
      throw error;
    } finally {
      setIsCadastrosSyncing(false);
    }
  };

  const upsertFormulacao = async (record: FormulationRecord) => {
    try {
      setIsCadastrosSyncing(true);
      setCadastrosError(null);
      const saved = await upsertMyFormulacao(record);
      setFormulationRecords((prev) => {
        const existingIndex = prev.findIndex((item) => item.id === saved.id);
        if (existingIndex === -1) return [saved, ...prev];
        return prev.map((item) => (item.id === saved.id ? saved : item));
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao salvar formulação.';
      setCadastrosError(message);
      throw error;
    } finally {
      setIsCadastrosSyncing(false);
    }
  };

  const removeFormulacao = async (id: string) => {
    try {
      setIsCadastrosSyncing(true);
      setCadastrosError(null);
      await deleteMyFormulacao(id);
      setFormulationRecords((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao excluir formulação.';
      setCadastrosError(message);
      throw error;
    } finally {
      setIsCadastrosSyncing(false);
    }
  };

  const upsertFormulatedFeedStock = async (record: FormulatedFeedStockRecord) => {
    try {
      setIsCadastrosSyncing(true);
      setCadastrosError(null);
      const saved = await upsertMyFormulatedFeedStock(record);
      setFormulatedFeedStockRecords((prev) => {
        const existingIndex = prev.findIndex((item) => item.id === saved.id);
        if (existingIndex === -1) return [saved, ...prev];
        return prev.map((item) => (item.id === saved.id ? saved : item));
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao salvar estoque de ração formulada.';
      setCadastrosError(message);
      throw error;
    } finally {
      setIsCadastrosSyncing(false);
    }
  };

  const removeFormulatedFeedStock = async (id: string) => {
    try {
      setIsCadastrosSyncing(true);
      setCadastrosError(null);
      await deleteMyFormulatedFeedStock(id);
      setFormulatedFeedStockRecords((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao excluir estoque de ração formulada.';
      setCadastrosError(message);
      throw error;
    } finally {
      setIsCadastrosSyncing(false);
    }
  };

  const savePersonalProfile = async (payload: Omit<UserPersonalData, 'password'>) => {
    try {
      setIsProfileSyncing(true);
      setProfileError(null);
      const saved = await upsertMyUser({
        full_name: payload.fullName,
        email: payload.email,
        phone: payload.phone,
      });

      onUpdatePersonalProfile({
        fullName: saved.full_name,
        email: saved.email,
        phone: saved.phone ?? '',
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao salvar perfil pessoal.';
      setProfileError(message);
      throw error;
    } finally {
      setIsProfileSyncing(false);
    }
  };

  const saveFarmProfile = async (payload: FarmProfileData) => {
    try {
      setIsProfileSyncing(true);
      setProfileError(null);

      const granjaPayload = {
        farm_name: payload.farmName,
        state: payload.state,
        city: payload.city,
        bird_count: payload.birdCount,
        selected_palette: payload.selectedPalette,
        marketing_source: payload.marketingSource,
        egg_sale_price: appState.systemSettings.eggSalePrice,
        bird_sale_price: appState.systemSettings.birdSalePrice,
        litter_sale_price: appState.systemSettings.litterSalePrice,
        auto_backup_enabled: backupAutomation.enabled,
        auto_backup_frequency: backupAutomation.frequency,
        auto_backup_last_run_at: backupAutomation.lastRunAt || null,
        auto_backup_keep_count: backupAutomation.keepCount,
      };

      const currentGranja = await getMyLatestGranja();
      const saved = currentGranja
        ? await updateMyGranja(currentGranja.id, granjaPayload)
        : await createMyGranja(granjaPayload);

      onUpdateFarmProfile({
        farmName: saved.farm_name,
        state: saved.state,
        city: saved.city,
        birdCount: saved.bird_count,
        selectedPalette:
          saved.selected_palette
            ? (saved.selected_palette as FarmProfileData['selectedPalette'])
            : payload.selectedPalette,
        marketingSource: saved.marketing_source,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao salvar perfil da granja.';
      setProfileError(message);
      throw error;
    } finally {
      setIsProfileSyncing(false);
    }
  };

  const saveSystemSettings = async (payload: SystemSettingsData) => {
    try {
      setIsProfileSyncing(true);
      setProfileError(null);

      const currentGranja = await getMyLatestGranja();
      const granjaPayload = {
        farm_name: appState.farm.farmName,
        state: appState.farm.state,
        city: appState.farm.city,
        bird_count: appState.farm.birdCount,
        selected_palette: payload.selectedPalette,
        marketing_source: appState.marketingSource,
        egg_sale_price: payload.eggSalePrice,
        bird_sale_price: payload.birdSalePrice,
        litter_sale_price: payload.litterSalePrice,
        auto_backup_enabled: backupAutomation.enabled,
        auto_backup_frequency: backupAutomation.frequency,
        auto_backup_last_run_at: backupAutomation.lastRunAt || null,
        auto_backup_keep_count: backupAutomation.keepCount,
      };

      const saved = currentGranja
        ? await updateMyGranja(currentGranja.id, granjaPayload)
        : await createMyGranja(granjaPayload);

      onUpdateSystemSettings({
        selectedPalette: saved.selected_palette
          ? (saved.selected_palette as SystemSettingsData['selectedPalette'])
          : payload.selectedPalette,
        fontFamily: payload.fontFamily || 'inter',
        borderRadius: payload.borderRadius || 'rounded',
        eggSalePrice: Number(saved.egg_sale_price ?? payload.eggSalePrice),
        birdSalePrice: Number(saved.bird_sale_price ?? payload.birdSalePrice),
        litterSalePrice: Number(saved.litter_sale_price ?? payload.litterSalePrice),
        weather: payload.weather,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao salvar preferências do sistema.';
      setProfileError(message);
      throw error;
    } finally {
      setIsProfileSyncing(false);
    }
  };

  const createSupabaseBackup = async (name: string) => {
    try {
      setIsBackupsSyncing(true);
      setBackupsError(null);
      const saved = await saveMyBackupToSupabase(name);
      setBackupRecords((prev) => [saved, ...prev]);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao salvar backup no Supabase.';
      setBackupsError(message);
      throw error;
    } finally {
      setIsBackupsSyncing(false);
    }
  };

  const saveBackupAutomation = async (settings: BackupAutomationSettings) => {
    try {
      setIsBackupsSyncing(true);
      setBackupsError(null);

      const currentGranja = await getMyLatestGranja();
      if (!currentGranja) {
        throw new Error('Nenhuma granja encontrada para configurar o backup automático.');
      }

      const saved = await updateMyGranjaAutoBackupSettings(currentGranja.id, {
        auto_backup_enabled: settings.enabled,
        auto_backup_frequency: settings.frequency,
        auto_backup_last_run_at: settings.lastRunAt || null,
        auto_backup_keep_count: settings.keepCount,
      });

      setBackupAutomation(getBackupAutomationSettingsFromGranja(saved));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao salvar automação de backup.';
      setBackupsError(message);
      throw error;
    } finally {
      setIsBackupsSyncing(false);
    }
  };

  const exportCurrentBackup = async () => {
    try {
      setIsBackupsSyncing(true);
      setBackupsError(null);
      return await buildMyBackupSnapshot();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao gerar arquivo de backup.';
      setBackupsError(message);
      throw error;
    } finally {
      setIsBackupsSyncing(false);
    }
  };

  const downloadSavedBackup = (record: BackupRecord) => {
    const blob = new Blob([JSON.stringify(record.snapshot, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${record.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'backup'}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const restoreBackup = async (snapshot: BackupSnapshot) => {
    try {
      setIsBackupsSyncing(true);
      setBackupsError(null);
      await restoreMyBackupSnapshot(snapshot);
      await Promise.all([loadCadastros(), loadBackups(), refreshAppStateFromSupabase()]);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao restaurar backup.';
      setBackupsError(message);
      throw error;
    } finally {
      setIsBackupsSyncing(false);
    }
  };

  const removeBackup = async (id: string) => {
    try {
      setIsBackupsSyncing(true);
      setBackupsError(null);
      await deleteMyBackup(id);
      setBackupRecords((prev) => prev.filter((record) => record.id !== id));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao excluir backup.';
      setBackupsError(message);
      throw error;
    } finally {
      setIsBackupsSyncing(false);
    }
  };

  useEffect(() => {
    if (isBackupsLoading || isBackupsSyncing || autoBackupRunRef.current || !backupAutomation.enabled) {
      return;
    }

    const lastRunDate = backupAutomation.lastRunAt ? new Date(backupAutomation.lastRunAt) : null;
    const isDue = !lastRunDate || Number.isNaN(lastRunDate.getTime()) || getNextBackupTime(backupAutomation.frequency, lastRunDate) <= new Date();

    if (!isDue) {
      return;
    }

    autoBackupRunRef.current = true;

    void (async () => {
      try {
        setIsBackupsSyncing(true);
        setBackupsError(null);

        const savedBackup = await saveMyBackupToSupabase(`Backup automático ${new Date().toLocaleString('pt-BR')}`);
        const currentGranja = await getMyLatestGranja();
        if (!currentGranja) {
          throw new Error('Nenhuma granja encontrada para executar o backup automático.');
        }

        const executedAt = new Date().toISOString();
        const savedGranja = await updateMyGranjaAutoBackupSettings(currentGranja.id, {
          auto_backup_enabled: true,
          auto_backup_frequency: backupAutomation.frequency,
          auto_backup_last_run_at: executedAt,
          auto_backup_keep_count: backupAutomation.keepCount,
        });

        setBackupAutomation(getBackupAutomationSettingsFromGranja(savedGranja));
        setBackupRecords((prev) => {
          const automaticBackups = [savedBackup, ...prev].filter((record) => record.name.startsWith('Backup automático '));
          const manualBackups = prev.filter((record) => !record.name.startsWith('Backup automático '));
          const keptAutomaticBackups = automaticBackups.slice(0, Math.max(1, backupAutomation.keepCount));
          const removedAutomaticBackups = automaticBackups.slice(Math.max(1, backupAutomation.keepCount));

          if (removedAutomaticBackups.length > 0) {
            void Promise.all(removedAutomaticBackups.map((record) => deleteMyBackup(record.id))).catch((error) => {
              const message = error instanceof Error ? error.message : 'Erro ao limpar backups automáticos antigos.';
              setBackupsError(message);
            });
          }

          return [...keptAutomaticBackups, ...manualBackups].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Erro ao executar backup automático.';
        setBackupsError(message);
      } finally {
        setIsBackupsSyncing(false);
        autoBackupRunRef.current = false;
      }
    })();
  }, [backupAutomation, isBackupsLoading, isBackupsSyncing]);

  const activeTitle = useMemo(() => {
    const titles: Record<RouteId, string> = {
      inicio: 'Início',
      manejo: 'Operações • Manejo',
      vendas: 'Operações • Vendas',
      formulacao: 'Operações • Formulação',
      animais: 'Cadastro • Animais',
      galpoes: 'Cadastro • Galpões',
      profissionais: 'Cadastro • Profissionais',
      cliente: 'Cadastro • Cliente',
      fornecedor: 'Cadastro • Fornecedor',
      compras: 'Gestão • Compras',
      financeiro: 'Gestão • Financeiro',
      investimentos: 'Gestão • Investimentos',
      relatorios: 'Gestão • Relatórios',
      clima: 'Monitoramento • Clima',
      conhecimento: 'Monitoramento • Conhecimento',
      perfil: 'Configurações • Perfil',
      personalizacao: 'Configurações • Personalização',
      sistema: 'Configurações • Sistema',
      backups: 'Configurações • Backups',
      assinatura: 'Configurações • Assinatura',
    };
    return titles[activeRoute];
  }, [activeRoute]);

  const renderPage = () => {
    switch (activeRoute) {
      case 'inicio':
        return (
          <InicioPage
            animals={animalRecords}
            vendas={vendasRecords}
            compras={purchaseRecords}
            manejos={manejoRecords}
            mortalities={mortalityRecords}
            settings={appState.systemSettings}
            farm={appState.farm}
            onNavigate={setActiveRoute}
          />
        );
      case 'manejo':
        return (
          <ManejoPage
            section="registro"
            animals={animalRecords}
            galpoes={galpaoRecords}
            suppliers={supplierRecords}
            purchases={purchaseRecords}
            healthProfessionals={healthProfessionalRecords}
            healthRecords={healthRecords}
            veterinaryStock={veterinaryStockRecords}
            mortalityRecords={mortalityRecords}
            manejoRecords={manejoRecords}
            disponibilidadeVenda={disponibilidadeVenda}
            formulations={formulationRecords}
            formulatedFeedStock={formulatedFeedStockRecords}
            onSaveGalpao={upsertGalpao}
            onDeleteGalpao={removeGalpao}
            onSaveHealthProfessional={upsertHealthProfessional}
            onDeleteHealthProfessional={removeHealthProfessional}
            onSaveHealthRecord={upsertHealth}
            onDeleteHealthRecord={removeHealth}
            onSaveVeterinaryStock={upsertVeterinaryStock}
            onDeleteVeterinaryStock={removeVeterinaryStock}
            onSaveMortalityRecord={upsertMortality}
            onDeleteMortalityRecord={removeMortality}
            onSaveManejoRecord={upsertManejo}
            onDeleteManejoRecord={removeManejo}
            onSaveDisponibilidadeVenda={upsertDisponibilidade}
            onDeleteDisponibilidadeVenda={removeDisponibilidade}
            onSaveFormulatedFeed={upsertFormulatedFeedStock}
            isLoading={isCadastrosLoading}
            isSyncing={isCadastrosSyncing}
            errorMessage={cadastrosError ?? undefined}
            onRetry={loadCadastros}
          />
        );
      case 'vendas':
        return (
          <VendasPage
            settings={appState.systemSettings}
            clients={clientRecords}
            animals={animalRecords}
            disponibilidadeVenda={disponibilidadeVenda}
            vendas={vendasRecords}
            manejoRecords={manejoRecords}
            onSaveVenda={upsertVenda}
            onDeleteVenda={removeVenda}
            isLoading={isCadastrosLoading}
            isSyncing={isCadastrosSyncing}
            errorMessage={cadastrosError ?? undefined}
            onRetry={loadCadastros}
          />
        );
      case 'formulacao':
        return (
          <FormulacaoPage
            animals={animalRecords}
            ingredients={ingredientRecords}
            formulations={formulationRecords}
            formulatedFeedStock={formulatedFeedStockRecords}
            onSaveIngredient={upsertIngredient}
            onDeleteIngredient={removeIngredient}
            onSaveFormulation={upsertFormulacao}
            onDeleteFormulation={removeFormulacao}
            onSaveFormulatedFeed={upsertFormulatedFeedStock}
          />
        );
      case 'animais':
        return (
          <AnimaisPage
            records={animalRecords}
            suppliers={supplierRecords}
            onSave={upsertAnimal}
            onDelete={removeAnimal}
            isLoading={isCadastrosLoading}
            isSyncing={isCadastrosSyncing}
            errorMessage={cadastrosError ?? undefined}
            onRetry={loadCadastros}
          />
        );
      case 'cliente':
        return (
          <ClientePage
            records={clientRecords}
            onSave={upsertClient}
            onDelete={removeClient}
            isLoading={isCadastrosLoading}
            isSyncing={isCadastrosSyncing}
            errorMessage={cadastrosError ?? undefined}
            onRetry={loadCadastros}
          />
        );
      case 'fornecedor':
        return (
          <FornecedorPage
            records={supplierRecords}
            onSave={upsertSupplier}
            onDelete={removeSupplier}
            isLoading={isCadastrosLoading}
            isSyncing={isCadastrosSyncing}
            errorMessage={cadastrosError ?? undefined}
            onRetry={loadCadastros}
          />
        );
      case 'galpoes':
        return (
          <GalpoesPage
            records={galpaoRecords}
            animals={animalRecords}
            onSave={upsertGalpao}
            onDelete={removeGalpao}
            isLoading={isCadastrosLoading}
            isSyncing={isCadastrosSyncing}
            errorMessage={cadastrosError ?? undefined}
            onRetry={loadCadastros}
          />
        );
      case 'profissionais':
        return (
          <ProfissionaisPage
            records={healthProfessionalRecords}
            onSave={upsertHealthProfessional}
            onDelete={removeHealthProfessional}
            isLoading={isCadastrosLoading}
            isSyncing={isCadastrosSyncing}
            errorMessage={cadastrosError ?? undefined}
            onRetry={loadCadastros}
          />
        );
      case 'compras':
        return (
          <ComprasPage
            records={purchaseRecords}
            animals={animalRecords}
            suppliers={supplierRecords}
            onSave={upsertPurchase}
            onDelete={removePurchase}
            isLoading={isCadastrosLoading}
            isSyncing={isCadastrosSyncing}
            errorMessage={cadastrosError ?? undefined}
            onRetry={loadCadastros}
          />
        );
      case 'financeiro':
        return (
          <FinanceiroPage
            settings={appState.systemSettings}
            vendas={vendasRecords}
            compras={purchaseRecords}
            animais={animalRecords}
          />
        );
      case 'investimentos':
        return <InvestimentosPage />;
      case 'relatorios':
        return (
          <RelatoriosPage
            settings={appState.systemSettings}
            vendas={vendasRecords}
            compras={purchaseRecords}
            animais={animalRecords}
            manejoRecords={manejoRecords}
          />
        );
      case 'clima':
        return <ClimaPage settings={appState.systemSettings} />;
      case 'conhecimento':
        return <ConhecimentoPage />;
      case 'perfil':
        return (
          <PerfilPage
            personal={{
              fullName: appState.personal.fullName,
              email: appState.personal.email,
              phone: appState.personal.phone,
            }}
            farm={{
              farmName: appState.farm.farmName,
              state: appState.farm.state,
              city: appState.farm.city,
              birdCount: appState.farm.birdCount,
              selectedPalette: appState.selectedPalette,
              marketingSource: appState.marketingSource,
            }}
            isSyncing={isProfileSyncing}
            errorMessage={profileError ?? undefined}
            onSavePersonal={savePersonalProfile}
            onSaveFarm={saveFarmProfile}
          />
        );
      case 'sistema':
        return (
          <SistemaPage
            settings={appState.systemSettings}
            isSyncing={isProfileSyncing}
            errorMessage={profileError ?? undefined}
            onSave={saveSystemSettings}
            onPreviewPaletteChange={onPreviewSystemPaletteChange}
          />
        );
      case 'personalizacao':
        return (
          <PersonalizacaoPage
            settings={appState.systemSettings}
            isDarkMode={isDarkMode}
            isSyncing={isProfileSyncing}
            errorMessage={profileError ?? undefined}
            onSave={saveSystemSettings}
            onToggleDarkMode={onToggleDarkMode}
            onPreviewPaletteChange={onPreviewSystemPaletteChange}
          />
        );
      case 'backups':
        return (
          <BackupsPage
            records={backupRecords}
            automation={backupAutomation}
            isLoading={isBackupsLoading}
            isSyncing={isBackupsSyncing}
            errorMessage={backupsError ?? undefined}
            onCreateSupabaseBackup={createSupabaseBackup}
            onDownloadCurrentBackup={exportCurrentBackup}
            onDownloadSavedBackup={downloadSavedBackup}
            onRestoreBackup={restoreBackup}
            onDeleteBackup={removeBackup}
            onSaveAutomation={saveBackupAutomation}
            onRetry={loadBackups}
          />
        );
      case 'assinatura':
        return <AssinaturaPage />;
    }
  };

  return (
    <div
      className={[
        'min-h-screen flex transition-colors',
        isDarkMode ? 'bg-[#0f172a] text-slate-100' : 'bg-brand-main text-[#0f1c2b]',
      ].join(' ')}
    >
      <Sidebar
        activeRoute={activeRoute}
        onNavigate={(route) => {
          setActiveRoute(route);
          setIsMobileSidebarOpen(false);
        }}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapsed={() => setIsSidebarCollapsed((v) => !v)}
        isDarkMode={isDarkMode}
        isMobileOpen={isMobileSidebarOpen}
        onRequestOpenMobile={() => setIsMobileSidebarOpen(true)}
        onRequestCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header
          className={[
            'h-16 sticky top-0 z-30 flex items-center justify-between px-6 border-b transition-all duration-250 shadow-sm',
            isDarkMode 
              ? 'bg-gradient-to-r from-slate-900 to-slate-800 border-slate-700' 
              : 'bg-gradient-to-r from-white to-slate-50 border-slate-200',
          ].join(' ')}
          role="banner"
        >
          <div className="flex items-center gap-4 min-w-0">
            <div className="min-w-0">
              <div className={`text-base font-bold truncate ${isDarkMode ? 'text-blue-400' : 'text-brand-primary'}`}>{activeTitle}</div>
              <div className={`text-xs font-medium truncate ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {appState.personal.email || 'Conta'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onToggleDarkMode}
              className={[
                'w-10 h-10 inline-flex items-center justify-center rounded-2xl active:scale-95 transition-all duration-250 cursor-pointer shadow-sm',
                isDarkMode 
                  ? 'bg-slate-800 hover:bg-slate-700' 
                  : 'bg-white hover:bg-slate-50',
              ].join(' ')}
              aria-label={isDarkMode ? 'Alternar para modo claro' : 'Alternar para modo escuro'}
              title={isDarkMode ? 'Alternar para modo claro' : 'Alternar para modo escuro'}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-amber-300" />
              ) : (
                <Moon className="w-5 h-5 text-slate-600" />
              )}
            </button>
            
            <button
              type="button"
              onClick={onLogout}
              className={[
                'px-4 py-2.5 rounded-2xl font-bold text-sm transition-all duration-250 active:scale-95 cursor-pointer flex items-center gap-2 shadow-sm',
                isDarkMode
                  ? 'bg-slate-800 hover:bg-red-950/50 text-red-400 hover:text-red-300'
                  : 'bg-slate-100 hover:bg-red-50 text-red-600 hover:text-red-700',
              ].join(' ')}
              aria-label="Sair da conta"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </header>

        <main 
          className={`flex-1 min-w-0 pb-24 md:pb-0 ${isDarkMode ? 'bg-[#0b1220]' : ''}`} 
          role="main"
        >
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
