import { IDBPDatabase } from 'idb';
import openDatabase from './openDatabase';

let database: IDBPDatabase<Database.GifGif>;

export async function getAllConfigs(): Promise <Database.ConfigStore> {
  database = await openDatabase();
  const values: (boolean|string|number)[] = await database.getAll('configs');
  const keys: string[] = await database.getAllKeys('configs');
  const configStore: Database.ConfigStore = { values, keys };
  return configStore;
}

export async function getConfig(key: string): Promise<string|number|boolean|undefined> {
  database = await openDatabase();
  return database.get('configs', key);
}

export async function setConfig(value: string | number | boolean, key: string): Promise < string > {
  database = await openDatabase();
  return database.put('configs', value, key);
}
