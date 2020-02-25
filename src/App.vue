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
          flat
          tile
          class="mx-auto"
          height="100%"
          width="100%"
        >
          <transition
            name="fade"
            mode="out-in"
          >
            <router-view />
          </transition>
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
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0
}

html::-webkit-scrollbar-track
{
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    background-color: #F5F5F5;
}

html::-webkit-scrollbar
{
    width: 6px;
    background-color: #F5F5F5;
}

html::-webkit-scrollbar-thumb
{
    background-color: #000000;
}
</style>
