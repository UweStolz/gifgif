import Vue from 'vue';
import Vuetify, {
  VFooter,
  VCol,
  VContainer,
  VSheet,
} from 'vuetify/lib';

Vue.use(Vuetify, {
  components: {
    VFooter,
    VCol,
    VContainer,
    VSheet,
  },
});

export default new Vuetify({
  icons: {
    iconfont: 'mdiSvg',
  },
});
