import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Empty from '@/components/Favourites/Empty.vue';

Vue.use(Vuetify);
const localVue = createLocalVue();

describe('Empty.vue', () => {
  let vuetify: any;
  let router: any;
  const routes = [{ path: '/favourites', name: 'favourites' }];
  beforeEach(() => {
    vuetify = new Vuetify();
    router = new VueRouter({ routes });
  });
  it('renders properly', () => {
    const wrapper = shallowMount(Empty, {
      localVue,
      vuetify,
      router,
    });
    expect(wrapper).toMatchSnapshot();
  });
});
