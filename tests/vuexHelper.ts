import Vuex from 'vuex';
import Vue from 'vue';
import { States } from '@/store/states';

Vue.use(Vuex);

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
  actions,
});

export default store;
