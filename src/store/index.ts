import Vue from 'vue';
import Vuex from 'vuex';
import idb from '../database';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    async getGifData(context: any, key: string): Promise<number|undefined> {
      return idb.getGifData(key);
    },
    async setGifData(context: any, gifdata: any): Promise<string> {
      const { rating, base64Image } = gifdata;
      return idb.setGifdata(rating, base64Image);
    },
    async removeGifData(context: any, key: string): Promise<void> {
      return idb.removeGifData(key);
    },
  },
  modules: {
  },
});
