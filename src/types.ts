/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface UserPersonalData {
  fullName: string;
  email: string;
  phone: string;
  password?: string;
}

export interface FarmConfigData {
  farmName: string;
  state: string;
  city: string;
  birdCount: number;
}

export interface FarmProfileData extends FarmConfigData {
  selectedPalette: ThemePaletteId;
  marketingSource: string;
}

export interface SystemSettingsData {
  selectedPalette: ThemePaletteId;
  eggSalePrice: number;
  birdSalePrice: number;
  litterSalePrice: number;
  openWeatherApiKey?: string;
  weather: {
    defaultCity?: {
      name: string;
      lat: number;
      lon: number;
    };
    display: {
      currentTemp: boolean;
      feelsLike: boolean;
      humidity: boolean;
      windSpeed: boolean;
      condition: boolean;
      dailyForecast: boolean;
      uvIndex: boolean;
      precipitation: boolean;
      pressure: boolean;
      visibility: boolean;
    };
    recentLocations: Array<{
      name: string;
      lat: number;
      lon: number;
      timestamp: number;
    }>;
  };
}

export type BackupFrequency = 'daily' | 'weekly' | 'monthly';

export interface BackupAutomationSettings {
  enabled: boolean;
  frequency: BackupFrequency;
  lastRunAt: string;
  keepCount: number;
}

export type ThemePaletteId = 'blue' | 'green' | 'brown' | 'yellow' | 'minimal';

export interface ThemePalette {
  id: ThemePaletteId;
  name: string;
  colors: string[]; // Represent circles e.g. [primary, secondary, light-bg]
  themeVars: {
    primary: string;
    primaryHover: string;
    primaryActive: string;
    bgContainer: string;
    bgMain: string;
  };
}

export interface OnboardingState {
  step: number; // 0: Live Landing, 1: personal details, 2: farm info, 3: choose theme, 4: marketing source, 5: dashboard (finalized)
  personal: UserPersonalData;
  farm: FarmConfigData;
  selectedPalette: ThemePaletteId;
  marketingSource: string;
  systemSettings: SystemSettingsData;
}

export interface AnimalRecord {
  id: string;
  tag: string;
  supplierId: string;
  lot: string;
  species: string;
  purpose: string;
  breed: string;
  quantity: number;
  currentQuantity?: number;
  totalPurchasePrice: number;
  averageWeightKg: number;
  birthDate: string;
  status: string;
  notes: string;
  createdAt: string;
}

export interface ClientRecord {
  id: string;
  name: string;
  document: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  status: string;
  notes: string;
  createdAt: string;
}

export interface SupplierRecord {
  id: string;
  companyName: string;
  contactName: string;
  category: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  status: string;
  notes: string;
  createdAt: string;
}

export type PurchaseCategory =
  | 'racao'
  | 'ingrediente_racao'
  | 'insumo_veterinario'
  | 'mao_de_obra'
  | 'material_operacional'
  | 'aves'
  | 'outro';

export type PurchasePaymentStatus = 'pendente' | 'pago' | 'parcial';

export interface PurchaseRecord {
  id: string;
  supplierId: string;
  linkedAnimalId: string;
  category: PurchaseCategory;
  itemName: string;
  purchaseDate: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
  invoiceNumber: string;
  paymentStatus: PurchasePaymentStatus;
  notes: string;
  feedClassification: string;
  veterinaryPurpose: string;
  expirationDate: string;
  serviceType: string;
  operationalArea: string;
  createdAt: string;
}

export interface GalpaoRecord {
  id: string;
  name: string;
  code: string;
  capacity: number;
  currentBirdCount: number;
  mortalityThresholdPercent: number;
  location: string;
  notes: string;
  createdAt: string;
}

export type HealthProfessionalAccessLevel = 'visualizacao' | 'registro' | 'gestao';

export interface HealthProfessionalRecord {
  id: string;
  name: string;
  role: string;
  councilNumber: string;
  phone: string;
  email: string;
  accessLevel: HealthProfessionalAccessLevel;
  isActive: boolean;
  notes: string;
  createdAt: string;
}

export type HealthProcedureType = 'consulta' | 'tratamento' | 'vacina' | 'medicamento' | 'monitoramento' | 'outro';
export type HealthRecoveryStatus = 'em_tratamento' | 'recuperado' | 'monitoramento' | 'cronico';

export interface HealthRecord {
  id: string;
  occurredAt: string;
  procedureType: HealthProcedureType;
  animalId: string;
  galpaoId: string;
  professionalId: string;
  title: string;
  diseaseName: string;
  affectedBirdCount: number;
  estimatedCost: number;
  recoveryStatus: HealthRecoveryStatus;
  notes: string;
  vaccineName?: string;
  medicationName?: string;
  applicationMethod?: string;
  treatmentDetails?: string;
  createdAt: string;
}

export type VeterinaryStockCategory = 'vacina' | 'medicamento' | 'material' | 'outro';

export interface VeterinaryStockRecord {
  id: string;
  name: string;
  category: VeterinaryStockCategory;
  supplierId: string;
  batchNumber: string;
  quantity: number;
  unit: string;
  minimumStock: number;
  expirationDate: string;
  storageLocation: string;
  costPerUnit: number;
  notes: string;
  createdAt: string;
}

export interface MortalityAttachment {
  id: string;
  fileName: string;
  mimeType: string;
  sizeInBytes: number;
  dataUrl: string;
  uploadedAt: string;
}

export type MortalityCause = 'doenca' | 'estresse_calor' | 'outros';
export type MortalityCauseStatus = 'suspeita' | 'confirmada';

export interface MortalityRecord {
  id: string;
  date: string;
  occurredAt?: string;
  galpaoId?: string;
  animalId: string;
  responsibleProfessionalId?: string;
  deadCount: number;
  causeStatus?: MortalityCauseStatus;
  cause: MortalityCause | string;
  notes: string;
  attachments?: MortalityAttachment[];
  createdAt: string;
  updatedAt?: string;
}

// New types for Manejo section
export type ManejoTurno = 'manha' | 'tarde';

export interface ManejoRecord {
  id: string;
  date: string;
  animalId: string;
  turno: ManejoTurno;
  ovosColetados: number;
  ovosDanificados: number;
  racaoKg: number;
  formulationId?: string;
  portaAberta: boolean;
  pesoMedioOvos: number;
  tamanhoOvos: string;
  createdAt: string;
  updatedAt: string;
}

export interface DisponibilidadeVenda {
  id: string;
  date: string;
  galinhasVivas: number;
  galinhasLimpas: number;
  camaAviarioUnidades: number;
  createdAt: string;
  updatedAt: string;
}

export type ProdutoVenda = 'ovos' | 'galinhas_vivas' | 'galinhas_limpas' | 'cama_aviario';

export type FormaPagamento = 'dinheiro' | 'cartao' | 'pix';

export interface VendaRecord {
  id: string;
  date: string;
  clientId: string;
  produto: ProdutoVenda;
  quantidade: number;
  lote: string;
  formaPagamento: FormaPagamento;
  valorUnitario: number;
  valorTotal: number;
  notes: string;
  createdAt: string;
}

// Types for Formulacao section
export type NutritionalPhase = 'inicial_1_21' | 'crescimento_1_22_42' | 'crescimento_2_43_105' | 'pre_postura_106_126' | 'postura';

export interface IngredientRecord {
  id: string;
  name: string;
  dryMatter: number; // % Matéria Seca
  protein: number; // % PB (Proteína Bruta)
  energy: number; // kcal/kg EM (Energia Metabolizável)
  calcium: number; // % Cálcio
  phosphorusTotal: number; // % Fósforo Total
  phosphorusAvailable: number; // % Fósforo Disponível
  sodium: number; // % Sódio
  potassium: number; // % Potássio
  methionine: number; // % Metionina
  metCis: number; // % Metionina + Cistina
  lysine: number; // % Lisina
  threonine: number; // % Treonina
  tryptophan: number; // % Triptofano
  fiber: number; // % Fibra Bruta
  etherExtract: number; // % Extrato Etéreo
  price: number; // R$/kg
  stock: number; // kg
  dataSource: string; // Fonte da Informação
  referenceYear: number; // Ano da Referência
  lastUpdated: string; // Data da Última Atualização
  technicalNotes: string; // Observações Técnicas
  userEditable: boolean; // Permitir Edição pelo Usuário
  createdAt: string;
}

export interface FormulationIngredient {
  ingredientId: string;
  percentage: number;
}

export interface FormulationRecord {
  id: string;
  name: string;
  phase: NutritionalPhase;
  animalId?: string;
  ingredients: FormulationIngredient[];
  isActive: boolean;
  createdAt: string;
}

export interface FormulatedFeedStockRecord {
  id: string;
  formulationId: string;
  quantityKg: number;
  producedAt: string;
  createdAt: string;
}

export interface WeatherForecastItem {
  time: string;
  temperature: number;
  weatherCode: number;
}

export interface DailyForecastItem {
  date: string;
  dayName: string;
  tempMin: number;
  tempMax: number;
  weatherCode: number;
}

export interface UnifiedWeatherData {
  temperature: number;
  feelsLike: number;
  temperatureMax: number;
  temperatureMin: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  pressure: number;
  visibility: number;
  sunrise: string;
  sunset: string;
  description: string;
  weatherCode: number;
  uvIndex: number;
  precipitation: number;
  cloudCover: number;
  forecast12h: WeatherForecastItem[];
  forecast5d: DailyForecastItem[];
  location: string;
  lastUpdated: string;
  source: 'open-meteo' | 'openweather';
}

export interface WeatherData {
  temperatura: number;
  umidade: number;
  velocidadeVento: number;
  chuvaMm: number;
  ultimaAtualizacao: string;
}

export interface Recommendation {
  id: string;
  tipo: 'alerta' | 'recomendacao';
  titulo: string;
  descricao: string;
  prioridade: 'alta' | 'media' | 'baixa';
}

export interface BackupSnapshot {
  version: 1;
  exportedAt: string;
  personal: Omit<UserPersonalData, 'password'>;
  farmProfile: FarmProfileData;
  systemSettings: SystemSettingsData;
  backupSettings: BackupAutomationSettings;
  animals: AnimalRecord[];
  clients: ClientRecord[];
  suppliers: SupplierRecord[];
  galpoes: GalpaoRecord[];
  healthProfessionals: HealthProfessionalRecord[];
  healthRecords: HealthRecord[];
  veterinaryStock: VeterinaryStockRecord[];
  mortalityRecords: MortalityRecord[];
  manejoRecords: ManejoRecord[];
  disponibilidadeVenda: DisponibilidadeVenda[];
  vendas: VendaRecord[];
  ingredients: IngredientRecord[];
  formulations: FormulationRecord[];
  formulatedFeedStock: FormulatedFeedStockRecord[];
}

export interface BackupRecord {
  id: string;
  name: string;
  createdAt: string;
  snapshot: BackupSnapshot;
}

export type KnowledgeModuleId =
  | 'fundamentos-criacao-caipira'
  | 'instalacoes'
  | 'escolha-da-linhagem'
  | 'cria'
  | 'recria'
  | 'pre-postura'
  | 'postura'
  | 'nutricao'
  | 'manejo-da-agua'
  | 'sanidade'
  | 'vacinacao'
  | 'biosseguridade'
  | 'producao-de-ovos'
  | 'classificacao-de-ovos'
  | 'comercializacao'
  | 'custos'
  | 'indicadores-zootecnicos'
  | 'bem-estar-animal'
  | 'manejo-de-piquetes'
  | 'reproducao'
  | 'incubacao'
  | 'gestao-da-propriedade'
  | 'solucao-de-problemas';

export type KnowledgeCategory =
  | 'instalações'
  | 'produção'
  | 'manejo'
  | 'sanidade'
  | 'negócios'
  | 'gestão';

export interface KnowledgeParameter {
  name: string;
  unit?: string;
  idealValue?: string;
  minValue?: string;
  maxValue?: string;
  description: string;
}

export interface KnowledgeProblem {
  problem: string;
  possibleCauses: string[];
  recommendedSolutions: string[];
}

export interface KnowledgeChecklistItem {
  item: string;
  frequency: string;
  responsible: string;
  critical: boolean;
}

export interface KnowledgeIntelligentRule {
  rule: string;
  condition: string;
  action: string;
  priority: 'alta' | 'média' | 'baixa';
}

export interface KnowledgeModule {
  id: KnowledgeModuleId;
  title: string;
  category: KnowledgeCategory;
  summary: string;
  objective: string;
  technicalContent: string[];
  importantParameters: KnowledgeParameter[];
  bestPractices: string[];
  commonProblems: KnowledgeProblem[];
  commonMistakes: string[];
  managementChecklist: KnowledgeChecklistItem[];
  intelligentRules: KnowledgeIntelligentRule[];
  technicalSources: string[];
}

export const THEME_PALETTES: Record<ThemePaletteId, ThemePalette> = {
  blue: {
    id: 'blue',
    name: 'Azul Corporativo',
    colors: ['#00457e', '#005da6', '#d3e3ff'],
    themeVars: {
      primary: 'rgb(0, 93, 166)',
      primaryHover: 'rgb(0, 72, 130)',
      primaryActive: 'rgb(0, 50, 90)',
      bgContainer: 'rgba(0, 93, 166, 0.08)',
      bgMain: 'rgb(248, 249, 255)',
    },
  },
  green: {
    id: 'green',
    name: 'Verde Campo',
    colors: ['#2d6a4f', '#52b788', '#d8f3dc'],
    themeVars: {
      primary: 'rgb(45, 106, 79)',
      primaryHover: 'rgb(30, 80, 58)',
      primaryActive: 'rgb(18, 55, 39)',
      bgContainer: 'rgba(45, 106, 79, 0.08)',
      bgMain: 'rgb(244, 248, 245)',
    },
  },
  brown: {
    id: 'brown',
    name: 'Terra Fértil',
    colors: ['#603808', '#d68102', '#ffddb3'],
    themeVars: {
      primary: 'rgb(139, 90, 43)',
      primaryHover: 'rgb(110, 70, 30)',
      primaryActive: 'rgb(80, 50, 20)',
      bgContainer: 'rgba(139, 90, 43, 0.08)',
      bgMain: 'rgb(255, 251, 248)',
    },
  },
  yellow: {
    id: 'yellow',
    name: 'Sol da Manhã',
    colors: ['#7a5900', '#fabd00', '#ffdf91'],
    themeVars: {
      primary: 'rgb(170, 120, 0)',
      primaryHover: 'rgb(130, 90, 0)',
      primaryActive: 'rgb(90, 60, 0)',
      bgContainer: 'rgba(170, 120, 0, 0.08)',
      bgMain: 'rgb(255, 254, 245)',
    },
  },
  minimal: {
    id: 'minimal',
    name: 'Minimalista',
    colors: ['#1b1b1f', '#44474e', '#e1e2e9'],
    themeVars: {
      primary: 'rgb(27, 27, 31)',
      primaryHover: 'rgb(68, 71, 78)',
      primaryActive: 'rgb(15, 15, 18)',
      bgContainer: 'rgba(27, 27, 31, 0.08)',
      bgMain: 'rgb(248, 248, 248)',
    },
  },
};
