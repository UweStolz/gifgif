import {
  openDB, DBSchema, IDBPDatabase,
} from 'idb';

let database: IDBPDatabase<GifGif>;

export type GifData = {
  rating: number;
  preview: ArrayBuffer;
}

export type GifStore = {
  values: GifData[];
  keys: ArrayBuffer[];
}

export interface GifGif extends DBSchema {
  gifdata: {
    key: ArrayBuffer;
    value: GifData;
  };
  configs: {
    key: string;
    value: boolean;
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

  async getGifData(key: ArrayBuffer): Promise<GifData|undefined> {
    database = await this.openDatabase();
    return database.get('gifdata', key);
  },

  async setGifdata(rating: number, preview: ArrayBuffer, key: ArrayBuffer): Promise<ArrayBuffer> {
    database = await this.openDatabase();
    return database.put('gifdata', { rating, preview }, key);
  },

  async removeGifData(key: ArrayBuffer): Promise<void> {
    database = await this.openDatabase();
    return database.delete('gifdata', key);
  },

  async getCountOfGifs(): Promise<number> {
    database = await this.openDatabase();
    return database.count('gifdata', undefined);
  },

  async getAllData(): Promise<GifStore> {
    database = await this.openDatabase();
    const values: GifData[] = await database.getAll('gifdata');
    const keys: ArrayBuffer[] = await database.getAllKeys('gifdata');
    const gifstore: GifStore = { values, keys };
    return gifstore;
  },

  async getConfig(key: string): Promise<boolean|undefined> {
    database = await this.openDatabase();
    return database.get('configs', key);
  },

  async setConfig(value: boolean, key: string): Promise<string> {
    database = await this.openDatabase();
    return database.put('configs', value, key);
  },
};
