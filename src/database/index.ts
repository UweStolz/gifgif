import {
  openDB, DBSchema, IDBPDatabase,
} from 'idb';

let database: IDBPDatabase<GifGif>;

export interface GifGif extends DBSchema {
  gifdata: {
      key: string;
      value: number;
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

  async setGifdata(rating: number, imageData: string): Promise<string> {
    database = await this.createDatabase();
    return database.put('gifdata', rating, imageData);
  },
};
