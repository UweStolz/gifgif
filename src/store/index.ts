import Vue from 'vue';
import Vuex from 'vuex';
import idb, { GifData, GifStore } from '../database';

type States = {
  gifCount: number;
  gifMode: string;
  fullImageMode: boolean;
}

Vue.use(Vuex);

export default new Vuex.Store<States>({
  state: {
    gifCount: -1,
    gifMode: 'trending',
    fullImageMode: false,
  },
  mutations: {
    setGifCount(state, payload) {
      state.gifCount = payload;
    },
    setGifMode(state, payload) {
      state.gifMode = payload;
    },
    setFullImageMode(state, payload) {
      state.fullImageMode = payload;
    },
  },
  actions: {
    async getGifData(context: any, key: ArrayBuffer): Promise<GifData | undefined> {
      return idb.getGifData(key);
    },
    async setGifData(context: any, gifdata: any): Promise<ArrayBuffer> {
      const { rating, preview, buffer } = gifdata;
      return idb.setGifdata(rating, preview, buffer);
    },
    async removeGifData(context: any, key: ArrayBuffer): Promise<void> {
      return idb.removeGifData(key);
    },
    async getGifCount(context: any): Promise<number> {
      return idb.getCountOfGifs();
    },
    async getAllData(): Promise<GifStore> {
      return idb.getAllData();
    },
    async getConfig(context: any, key: string): Promise<boolean|undefined> {
      return idb.getConfig(key);
    },
    async setConfig(context: any, configdata: any): Promise<string> {
      const { value, key } = configdata;
      return idb.setConfig(value, key);
    },
  },
  modules: {
  },
});
