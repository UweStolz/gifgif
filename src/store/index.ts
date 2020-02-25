import Vue from 'vue';
import Vuex, { MutationPayload } from 'vuex';
import idb, { GifData, GifStore } from '../database';

type States = {
  gifCount: number;
  gifMode: string;
  fullImageMode: boolean;
}

Vue.use(Vuex);

const store = new Vuex.Store<States>({
  state: {
    gifCount: -1,
    gifMode: 'trending',
    fullImageMode: false,
  },
  mutations: {
    async initializeStore(state) {
      const configs = await idb.getAllConfigs();
      if (configs) {
        const initialStateFromDB: any = {};
        for (let index = 0; index < configs.keys.length; index += 1) {
          initialStateFromDB[configs.keys[index]] = configs.values[index];
        }
        this.replaceState(
          Object.assign(state, initialStateFromDB),
        );
      }
    },

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
    async getConfig(context: any, key: string): Promise<string|number|boolean|undefined> {
      return idb.getConfig(key);
    },
  },
  modules: {
  },
});

store.subscribe(async (mutation: MutationPayload, state: States) => {
  switch (mutation.type) {
    case 'setFullImageMode':
      await idb.setConfig(mutation.payload, 'fullImageMode');
      break;
    case 'setGifCount':
      await idb.setConfig(mutation.payload, 'gifCount');
      break;
    case 'setGifMode':
      await idb.setConfig(mutation.payload, 'gifMode');
      break;
    default:
      break;
  }
});

export default store;
