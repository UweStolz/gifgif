import {
  createLocalVue, shallowMount, mount, VueClass, ThisTypedShallowMountOptions, ThisTypedMountOptions, RouterLinkStub,
} from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vue from 'vue';
import Vuetify from 'vuetify';
import routes from '@/router/routes';
import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';
import store from './vuexHelper';

jest.mock('idb');
enableFetchMocks();

Vue.use(Vuetify);
const localVue = createLocalVue();
const vuetify = new Vuetify({
  icons: {
    iconfont: 'mdiSvg',
  },
});
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

export function deepMount(component: VueClass<Vue>, ...args: (ThisTypedMountOptions<Vue> | undefined)[]) {
  const options: ThisTypedShallowMountOptions<Vue> | undefined = {
    localVue,
    vuetify,
    router,
    store,
    stubs: {
      RouterLink: RouterLinkStub,
    },
  };
  Object.assign(options, ...args);
  return mount(component, options);
}

export { fetchMock, Vue };
