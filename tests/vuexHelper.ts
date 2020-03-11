import Vuex from 'vuex';
import Vue from 'vue';
import { States } from '@/store/states';
import { vuexPlugin } from 'jest-matcher-vue-test-utils';

Vue.use(Vuex);

const state: States = {
  gifCount: 0,
  gifMode: 'trending',
  showMobileDrawer: false,
  fullImageMode: false,
  pwaUpdated: false,
};

const mutations = {
  initializeStore: jest.fn(),
  setGifCount: jest.fn(),
  setGifMode: jest.fn(),
  setFullImageMode: jest.fn(),
  setShowMobileDrawer: jest.fn(),
};

const actions = {
  getGifData: jest.fn(),
  setGifData: jest.fn(),
  removeGifData: jest.fn(),
  removeCompleteGifData: jest.fn(),
  getGifCount: jest.fn(),
  getAllData: jest.fn(),
  getConfig: jest.fn(),
};

const store = new Vuex.Store<States>({
  state,
  mutations,
  actions,
  plugins: [vuexPlugin()],
});

export default store;

export { mutations, actions };
