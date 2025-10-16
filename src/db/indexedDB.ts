import { openDB } from 'idb';
import * as idb from 'idb';

type DBSchema = idb.DBSchema;


interface Task {
  id?: number;
  title: string;
  description: string;
  timestamp: number;
}

interface MyDB extends DBSchema {
  tasks: {
    key: number;
    value: Task;
    indexes: { 'by-timestamp': number };
  };
}

export const dbPromise = openDB<MyDB>('tasks-db', 2, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('tasks')) {
      const store = db.createObjectStore('tasks', {
        keyPath: 'id',
        autoIncrement: true,
      });
      store.createIndex('by-timestamp', 'timestamp');
    }
  },
});

export const saveTask = async (task: Task) => {
  try {
    const db = await dbPromise;
    await db.add('tasks', task);
  } catch (error) {
    console.error('Error al guardar la tarea:', error);
  }
};

export const getAllTasks = async (): Promise<Task[]> => {
  try {
    const db = await dbPromise;
    return await db.getAll('tasks');
  } catch (error) {
    console.error('Error al obtener las tareas:', error);
    return [];
  }
};
