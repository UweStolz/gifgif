import Vue from 'vue';
import Vuex, { MutationPayload } from 'vuex';
import idb from '../database';

type States = {
  gifCount: number;
  gifMode: string;
  fullImageMode: boolean;
}

Vue.use(Vuex);

const store = new Vuex.Store<States>({
  state: {
    gifCount: 0,
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
    async getGifData(context: any, key: string): Promise<Database.GifData | undefined> {
      return idb.getGifData(key);
    },
    async setGifData(context: any, gifdata: any): Promise<string> {
      const {
        rating, preview, image, key,
      } = gifdata;
      return idb.setGifdata(rating, preview, image, key);
    },
    async removeGifData(context: any, key: string): Promise<void> {
      return idb.removeGifData(key);
    },
    async removeCompleteGifData(): Promise<void> {
      return idb.removeCompleteGifData();
    },
    async getGifCount(context: any): Promise<number> {
      return idb.getCountOfGifs();
    },
    async getAllData(): Promise<Database.GifStore> {
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
