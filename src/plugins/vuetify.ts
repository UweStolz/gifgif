import Vue from 'vue';
import Vuetify, {
  VFooter,
  VCol,
  VAppBar,
} from 'vuetify/lib';

Vue.use(Vuetify, {
  components: {
    VFooter,
    VCol,
    VAppBar,
  },
});

export default new Vuetify({
  icons: {
    iconfont: 'mdiSvg',
  },
});
