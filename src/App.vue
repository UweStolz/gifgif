<template>
  <v-app>
    <Toolbar v-if="this.$route.path !== '/about'" />
    <Drawer v-if="this.$route.path !== '/about'" />
    <Footer v-if="this.$route.path !== '/about'" />
    <v-main>
      <transition
        name="fade"
        mode="out-in"
      >
        <router-view />
      </transition>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Toolbar from '@/components/Navigation/Toolbar.vue';
import Drawer from '@/components/Navigation/Drawer.vue';
import Footer from '@/components/Navigation/Footer.vue';

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
@import '../node_modules/roboto-fontface/css/roboto/roboto-fontface.css';
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}

html::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
}

html::-webkit-scrollbar {
  width: 6px;
  background-color: #f5f5f5;
}

html::-webkit-scrollbar-thumb {
  background-color: #000000;
}
</style>
