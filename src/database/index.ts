import {
  openDB, DBSchema, IDBPDatabase,
} from 'idb';

let database: IDBPDatabase<GifGif>;

export interface GifGif extends DBSchema {
  gifdata: {
      key: string;
      value: number
    };
  }

export default {
  async createDatabase(): Promise<IDBPDatabase<GifGif>> {
    database = await openDB<GifGif>('gifgif', 1, {
      upgrade(db: IDBPDatabase<GifGif>) {
        db.createObjectStore('gifdata', { autoIncrement: true });
      },
    });
    return database;
  },

  async getGifData(key: string): Promise<number|undefined> {
    database = await this.createDatabase();
    return database.get('gifdata', key);
  },

  async setGifdata(value: number, key: string): Promise<string> {
    database = await this.createDatabase();
    return database.put('gifdata', value, key);
  },

  async removeGifData(key: string): Promise<void> {
    database = await this.createDatabase();
    return database.delete('gifdata', key);
  },
};
