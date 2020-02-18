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
        <v-card
          class="mx-auto"
          height="90%"
          width="90%"
        >
          <router-view />
        </v-card>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Toolbar from '@/components/Toolbar.vue';
import Drawer from '@/components/Drawer.vue';
import Footer from '@/components/Footer.vue';

@Component({
  components: {
    Toolbar,
    Drawer,
    Footer,
  },
})
export default class App extends Vue {}
</script>

<style>
@import "../node_modules/roboto-fontface/css/roboto/roboto-fontface.css";
</style>
