import {
  openDB, DBSchema, IDBPDatabase,
} from 'idb';

let database: IDBPDatabase<GifGif>;

export interface GifGif extends DBSchema {
  gifdata: {
      key: ArrayBuffer;
      value: number
    };
  }

export default {
  async openDatabase(): Promise<IDBPDatabase<GifGif>> {
    database = await openDB<GifGif>('gifgif', 1, {
      upgrade(db: IDBPDatabase<GifGif>) {
        db.createObjectStore('gifdata', { autoIncrement: true });
      },
    });
    return database;
  },

  async getGifData(key: ArrayBuffer): Promise<number|undefined> {
    database = await this.openDatabase();
    return database.get('gifdata', key);
  },

  async setGifdata(value: number, key: ArrayBuffer): Promise<ArrayBuffer> {
    database = await this.openDatabase();
    return database.put('gifdata', value, key);
  },

  async removeGifData(key: ArrayBuffer): Promise<void> {
    database = await this.openDatabase();
    return database.delete('gifdata', key);
  },

  async getCountOfGifs(): Promise<number> {
    database = await this.openDatabase();
    return database.count('gifdata', undefined);
  },
};
