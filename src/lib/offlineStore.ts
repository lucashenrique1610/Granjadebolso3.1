import { get, set } from 'idb-keyval';

export async function saveToCache(key: string, data: any) {
  try {
    await set(key, data);
  } catch (e) {
    console.warn('Failed to save to cache:', e);
  }
}

export async function loadFromCache(key: string) {
  try {
    return await get(key);
  } catch (e) {
    console.warn('Failed to load from cache:', e);
    return null;
  }
}

export interface SyncOperation {
  id: string;
  action: string;
  payload: any;
  timestamp: number;
}

export async function enqueueOperation(action: string, payload: any) {
  try {
    const queue: SyncOperation[] = (await get('sync_queue')) || [];
    queue.push({
      id: crypto.randomUUID(),
      action,
      payload,
      timestamp: Date.now(),
    });
    await set('sync_queue', queue);
  } catch (e) {
    console.error('Failed to enqueue operation:', e);
  }
}

export async function getSyncQueue(): Promise<SyncOperation[]> {
  try {
    return (await get('sync_queue')) || [];
  } catch (e) {
    return [];
  }
}

export async function removeOperationFromQueue(id: string) {
  try {
    const queue: SyncOperation[] = (await get('sync_queue')) || [];
    await set('sync_queue', queue.filter(op => op.id !== id));
  } catch (e) {
    console.error('Failed to remove operation from queue:', e);
  }
}

export async function clearSyncQueue() {
  try {
    await set('sync_queue', []);
  } catch (e) {
    console.error('Failed to clear queue:', e);
  }
}
