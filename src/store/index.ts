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
    async setGifData(context: any, gifdata: any) {
      const { rating, base64Image } = gifdata;
      await idb.setGifdata(rating, base64Image);
    },
  },
  modules: {
  },
});
