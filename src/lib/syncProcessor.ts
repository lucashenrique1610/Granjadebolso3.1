import { getSyncQueue, removeOperationFromQueue, SyncOperation } from './offlineStore';
import * as db from './supabase';

export async function processSyncQueue() {
  const queue = await getSyncQueue();
  if (queue.length === 0) return;

  console.log(`[Sync] Processando ${queue.length} operações pendentes...`);

  for (const op of queue) {
    try {
      await executeOperation(op);
      await removeOperationFromQueue(op.id);
      console.log(`[Sync] Operação ${op.action} processada com sucesso.`);
    } catch (error: any) {
      // Se for erro de rede, paramos a fila para tentar depois
      if (error?.message === 'Failed to fetch' || !navigator.onLine) {
        console.warn(`[Sync] Sem rede. Fila pausada na operação ${op.action}.`);
        break;
      }
      
      // Se for outro erro (ex: validação), removemos da fila para não travar para sempre
      console.error(`[Sync] Erro permanente na operação ${op.action}:`, error);
      await removeOperationFromQueue(op.id);
    }
  }
}

async function executeOperation(op: SyncOperation) {
  const { action, payload } = op;
  
  switch (action) {
    case 'upsertAnimal': return db.upsertMyAnimal(payload);
    case 'deleteAnimal': return db.deleteMyAnimal(payload);
    
    case 'upsertClient': return db.upsertMyClient(payload);
    case 'deleteClient': return db.deleteMyClient(payload);
    
    case 'upsertSupplier': return db.upsertMySupplier(payload);
    case 'deleteSupplier': return db.deleteMySupplier(payload);
    
    case 'upsertPurchase': return db.upsertMyPurchase(payload);
    case 'deletePurchase': return db.deleteMyPurchase(payload);
    
    case 'upsertGalpao': return db.upsertMyGalpao(payload);
    case 'deleteGalpao': return db.deleteMyGalpao(payload);
    
    case 'upsertHealthProfessional': return db.upsertMyHealthProfessional(payload);
    case 'deleteHealthProfessional': return db.deleteMyHealthProfessional(payload);
    
    case 'upsertHealthRecord': return db.upsertMyHealthRecord(payload);
    case 'deleteHealthRecord': return db.deleteMyHealthRecord(payload);
    
    case 'upsertVeterinaryStock': return db.upsertMyVeterinaryStock(payload);
    case 'deleteVeterinaryStock': return db.deleteMyVeterinaryStock(payload);
    
    case 'upsertMortalityRecord': return db.upsertMyMortalityRecord(payload);
    case 'deleteMortalityRecord': return db.deleteMyMortalityRecord(payload);
    
    case 'upsertManejoRecord': return db.upsertMyManejoRecord(payload);
    case 'deleteManejoRecord': return db.deleteMyManejoRecord(payload);
    
    case 'upsertDisponibilidadeVenda': return db.upsertMyDisponibilidadeVenda(payload);
    case 'deleteDisponibilidadeVenda': return db.deleteMyDisponibilidadeVenda(payload);
    
    case 'upsertVenda': return db.upsertMyVenda(payload);
    case 'deleteVenda': return db.deleteMyVenda(payload);
    
    case 'upsertIngredient': return db.upsertMyIngredient(payload);
    case 'deleteIngredient': return db.deleteMyIngredient(payload);
    
    case 'upsertFormulacao': return db.upsertMyFormulacao(payload);
    case 'deleteFormulacao': return db.deleteMyFormulacao(payload);
    
    case 'upsertFormulatedFeedStock': return db.upsertMyFormulatedFeedStock(payload);
    case 'deleteFormulatedFeedStock': return db.deleteMyFormulatedFeedStock(payload);
    
    default:
      console.warn(`[Sync] Ação desconhecida ignorada: ${action}`);
  }
}
