import {
  createLocalVue, shallowMount, VueClass, ThisTypedShallowMountOptions,
} from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vue from 'vue';
import Vuetify from 'vuetify';
import routes from '@/router/routes';

Vue.use(Vuetify);
const localVue = createLocalVue();
const vuetify = new Vuetify();
const router = new VueRouter({ routes });

export default function shallow(component: VueClass<Vue>, ...args: (ThisTypedShallowMountOptions<Vue> | undefined)[]) {
  return shallowMount(component, {
    localVue,
    vuetify,
    router,
    ...args,
  });
}
