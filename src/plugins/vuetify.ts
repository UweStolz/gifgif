import Vue from 'vue';
import Vuetify, {
  VFooter,
  VCol,
  VAppBar,
  VBtn,
} from 'vuetify/lib';

Vue.use(Vuetify, {
  components: {
    VFooter,
    VCol,
    VAppBar,
    VBtn,
  },
});

export default new Vuetify({
  icons: {
    iconfont: 'mdiSvg',
  },
});
