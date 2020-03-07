import Vue from 'vue';
import Vuetify, {
  VFooter,
  VCol,
  VContainer,
  VSheet,
  VProgressLinear,
} from 'vuetify/lib';

Vue.use(Vuetify, {
  components: {
    VFooter,
    VCol,
    VContainer,
    VSheet,
    VProgressLinear,
  },
});

export default new Vuetify({
  icons: {
    iconfont: 'mdiSvg',
  },
});
