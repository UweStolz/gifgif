import Vue from 'vue';
import Vuex from 'vuex';
import idb, { GifData, GifStore } from '../database';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    gifCount: -1,
    gifMode: 'trending',
  },
  mutations: {
    setGifCount(state, payload) {
      state.gifCount = payload;
    },
    setGifMode(state, payload) {
      state.gifMode = payload;
    },
  },
  actions: {
    async getGifData(context: any, key: ArrayBuffer): Promise<GifData|undefined> {
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
  },
  modules: {
  },
});
