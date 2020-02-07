<template>
  <v-app>
    <Toolbar />
    <Drawer />
    <Footer />
    <v-content>
      <v-container
        fluid
        fill-height
      >
        <Frontpage />
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Toolbar from '@/components/Toolbar.vue';
import Drawer from '@/components/Drawer.vue';
import Footer from '@/components/Footer.vue';
import Frontpage from './components/Frontpage.vue';

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

<style>
@import "../node_modules/roboto-fontface/css/roboto/roboto-fontface.css";
@import "../node_modules/@mdi/font/css/materialdesignicons.min.css";
</style>
