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
    async getGifData(context: any, key: ArrayBuffer): Promise<number|undefined> {
      return idb.getGifData(key);
    },
    async setGifData(context: any, gifdata: any): Promise<ArrayBuffer> {
      const { rating, buffer } = gifdata;
      return idb.setGifdata(rating, buffer);
    },
    async removeGifData(context: any, key: ArrayBuffer): Promise<void> {
      return idb.removeGifData(key);
    },
  },
  modules: {
  },
});
