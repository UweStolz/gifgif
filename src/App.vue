<template>
  <v-app>
    <Toolbar />
    <Drawer />
    <Footer />
    <v-content>
      <Frontpage />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Toolbar from '@/components/Toolbar.vue';
import Drawer from '@/components/Drawer.vue';
import Frontpage from './components/Frontpage.vue';
import Footer from '@/components/Footer.vue';

@Component({
  components: {
    Toolbar,
    Drawer,
    Frontpage,
    Footer,
  },
})
export default class App extends Vue {}
</script>
