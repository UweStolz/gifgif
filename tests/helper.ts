import {
  createLocalVue, shallowMount, VueClass, ThisTypedShallowMountOptions,
} from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vue from 'vue';
import Vuetify from 'vuetify';
import routes from '@/router/routes';
import { enableFetchMocks } from 'jest-fetch-mock';
import store from './vuexHelper';

enableFetchMocks();

Vue.use(Vuetify);
const localVue = createLocalVue();
const vuetify = new Vuetify();
const router = new VueRouter({ routes });

export default function shallow(component: VueClass<Vue>, ...args: (ThisTypedShallowMountOptions<Vue> | undefined)[]) {
  const options: ThisTypedShallowMountOptions<Vue> | undefined = {
    localVue,
    vuetify,
    router,
    store,
  };
  Object.assign(options, ...args);
  return shallowMount(component, options);
}
