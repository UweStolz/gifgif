import {
  openDB, DBSchema, IDBPDatabase,
} from 'idb';

let database: IDBPDatabase<GifGif>;

export type GifData = {
  rating: number;
  image: ArrayBuffer|string;
  preview: ArrayBuffer|string;
}

export type GifStore = {
  values: GifData[];
  keys: string[];
}

export type ConfigStore = {
  values: (boolean|string|number)[];
  keys: string[];
}

export interface GifGif extends DBSchema {
  gifdata: {
    key: string;
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

  async getGifData(key: string): Promise<GifData|undefined> {
    database = await this.openDatabase();
    return database.get('gifdata', key);
  },

  async setGifdata(rating: number, preview: ArrayBuffer|string, image: ArrayBuffer|string, key: string): Promise<string> {
    database = await this.openDatabase();
    return database.put('gifdata', { rating, preview, image }, key);
  },

  async removeGifData(key: string): Promise<void> {
    database = await this.openDatabase();
    return database.delete('gifdata', key);
  },

  async removeCompleteGifData(): Promise<void> {
    database = await this.openDatabase();
    return database.clear('gifdata');
  },

  async getCountOfGifs(): Promise<number> {
    database = await this.openDatabase();
    return database.count('gifdata');
  },

  async getAllData(): Promise<GifStore> {
    database = await this.openDatabase();
    const values: GifData[] = await database.getAll('gifdata');
    const keys = await database.getAllKeys('gifdata');
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
