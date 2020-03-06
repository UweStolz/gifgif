import Vue from 'vue';
import Vuex, { MutationPayload } from 'vuex';
import idb from '../database';

type States = {
  gifCount: number;
  gifMode: string;
  showMobileDrawer: boolean;
  fullImageMode: boolean;
}

Vue.use(Vuex);

const store = new Vuex.Store<States>({
  state: {
    gifCount: 0,
    gifMode: 'trending',
    showMobileDrawer: false,
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
    setShowMobileDrawer(state, payload) {
      state.showMobileDrawer = payload;
    },
  },
  actions: {
    async getGifData(context: any, key: string): Promise<Database.GifData | undefined> {
      return idb.getGifData(key);
    },
    async setGifData(context: any, gifdata: any): Promise<void> {
      const {
        rating, preview, image, key,
      } = gifdata;
      await idb.setGifdata(rating, preview, image, key);
      const countFromDB = await idb.getCountOfGifs();
      if (this.state.gifCount < countFromDB) {
        this.commit('setGifCount', countFromDB);
      }
    },
    async removeGifData(context: any, key: string): Promise<void> {
      this.commit('setGifCount', this.state.gifCount - 1);
      return idb.removeGifData(key);
    },
    async removeCompleteGifData(): Promise<void> {
      this.commit('setGifCount', 0);
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
