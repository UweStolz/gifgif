import {
  openDB, IDBPDatabase,
} from 'idb';

export default async function openDatabase(): Promise<IDBPDatabase<Database.GifGif>> {
  const database = await openDB<Database.GifGif>('gifgif', 1, {
    upgrade(db: IDBPDatabase<Database.GifGif>) {
      db.createObjectStore('gifdata', { autoIncrement: true });
      db.createObjectStore('configs', { autoIncrement: true });
    },
  });
  return database;
}
