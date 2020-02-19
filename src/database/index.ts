import {
  openDB, DBSchema, IDBPDatabase,
} from 'idb';

let database: IDBPDatabase<GifGif>;

export type GifData = { rating: number; preview: ArrayBuffer; }

export interface GifGif extends DBSchema {
  gifdata: {
    key: ArrayBuffer;
    value: GifData;
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

  async getRatedGifPreviews(): Promise<GifData[]> {
    database = await this.openDatabase();
    return database.getAll('gifdata');
  },
};
