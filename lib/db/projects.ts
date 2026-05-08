import { openDB } from 'idb';

const DB_NAME = 'cineforge';

export async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('projects')) db.createObjectStore('projects', { keyPath: 'id' });
    }
  });
}

export async function saveProject(project: unknown & { id: string }) {
  const db = await getDB();
  await db.put('projects', project);
}
