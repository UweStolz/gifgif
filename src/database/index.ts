import {
  openDB, DBSchema, IDBPDatabase,
} from 'idb';

let database: IDBPDatabase<GifGif>;

export type GifData = {
  rating: number;
  preview: ArrayBuffer|string;
}

export type GifStore = {
  values: GifData[];
  keys: ArrayBuffer[]|string[];
}

export type ConfigStore = {
  values: (boolean|string|number)[];
  keys: string[];
}

export interface GifGif extends DBSchema {
  gifdata: {
    key: ArrayBuffer|string;
    value: GifData;
  };
  configs: {
    key: string;
    value: boolean|string|number;
  }
}

export default {
  async openDatabase(): Promise<IDBPDatabase<GifGif>> {
    database = await openDB<GifGif>('gifgif', 1, {
      upgrade(db: IDBPDatabase<GifGif>) {
        db.createObjectStore('gifdata', { autoIncrement: true });
        db.createObjectStore('configs', { autoIncrement: true });
      },
    });
    return database;
  },

  async getGifData(key: ArrayBuffer|string): Promise<GifData|undefined> {
    database = await this.openDatabase();
    return database.get('gifdata', key);
  },

  async setGifdata(rating: number, preview: ArrayBuffer|string, key: ArrayBuffer|string): Promise<ArrayBuffer|string> {
    database = await this.openDatabase();
    return database.put('gifdata', { rating, preview }, key);
  },

  async removeGifData(key: ArrayBuffer|string): Promise<void> {
    database = await this.openDatabase();
    return database.delete('gifdata', key);
  },

  async removeCompleteGifData(): Promise<void> {
    database = await this.openDatabase();
    return database.clear('gifdata');
  },

  async getCountOfGifs(): Promise<number> {
    database = await this.openDatabase();
    return database.count('gifdata', undefined);
  },

  async getAllData(): Promise<GifStore> {
    database = await this.openDatabase();
    const values: GifData[] = await database.getAll('gifdata');
    const keys = await database.getAllKeys('gifdata') as ArrayBuffer[]|string[];
    const gifstore: GifStore = { values, keys };
    return gifstore;
  },

  async getAllConfigs(): Promise<ConfigStore> {
    database = await this.openDatabase();
    const values: (boolean|string|number)[] = await database.getAll('configs');
    const keys: string[] = await database.getAllKeys('configs');
    const configStore: ConfigStore = { values, keys };
    return configStore;
  },

  async getConfig(key: string): Promise<string|number|boolean|undefined> {
    database = await this.openDatabase();
    return database.get('configs', key);
  },

  async setConfig(value: string|number|boolean, key: string): Promise<string> {
    database = await this.openDatabase();
    return database.put('configs', value, key);
  },
};
