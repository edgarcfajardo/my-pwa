import { openDB, type IDBPDatabase } from 'idb';

export interface Task {
  id?: number;
  title: string;
  description: string;
  timestamp: number;
}

const DB_NAME = 'tasks-db';
const STORE_NAME = 'tasks';
const DB_VERSION = 1;

export async function getDB(): Promise<IDBPDatabase> {
  return await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
}

export async function saveTask(task: Omit<Task, 'id'>): Promise<number> {
  const db = await getDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const key = await tx.store.add(task);
  await tx.done;
  // idb returns the generated key as number for autoIncrement stores
  return key as number;
}

export async function getTasks(): Promise<Task[]> {
  const db = await getDB();
  const tasks = (await db.getAll(STORE_NAME)) as Task[];
  // Sort newest first for better UX
  return tasks.sort((a, b) => b.timestamp - a.timestamp);
}
