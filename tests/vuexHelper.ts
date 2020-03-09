import Vuex, { MutationTree, ActionTree } from 'vuex';
import Vue from 'vue';
import { States } from '@/store/states';

Vue.use(Vuex);

const state: States = {
  gifCount: 0,
  gifMode: 'trending',
  showMobileDrawer: false,
  fullImageMode: false,
};

const mutations: MutationTree<States> = {
  initializeStore: jest.fn(),
  setGifCount: jest.fn(),
  setGifMode: jest.fn(),
  setFullImageMode: jest.fn(),
  setShowMobileDrawer: jest.fn(),
};

const actions: ActionTree<States, States> = {
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
});

export default store;
