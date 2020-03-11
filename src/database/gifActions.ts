import { IDBPDatabase } from 'idb';
import openDatabase from './openDatabase';

let database: IDBPDatabase<Database.GifGif>;

export async function getGifData(key: string): Promise <Database.GifData | undefined > {
  database = await openDatabase();
  return database.get('gifdata', key);
}

export async function setGifdata(rating: number, preview: Blob|string, image: Blob|string, key: string): Promise<string> {
  database = await openDatabase();
  return database.put('gifdata', { rating, preview, image }, key);
}

export async function removeGifData(key: string): Promise<void> {
  database = await openDatabase();
  return database.delete('gifdata', key);
}

export async function removeCompleteGifData(): Promise<void> {
  database = await openDatabase();
  return database.clear('gifdata');
}

export async function getCountOfGifs(): Promise<number> {
  database = await openDatabase();
  return database.count('gifdata');
}

export async function getAllData(): Promise<Database.GifStore> {
  database = await openDatabase();
  const values: Database.GifData[] = await database.getAll('gifdata');
  const keys = await database.getAllKeys('gifdata');
  const gifstore: Database.GifStore = { values, keys };
  return gifstore;
}
