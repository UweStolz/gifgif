<template>
  <v-app>
    <Toolbar />
    <v-content>
      <Frontpage />
    </v-content>
    <Footer />
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Toolbar from '@/components/Toolbar.vue';
import Frontpage from './components/Frontpage.vue';
import Footer from '@/components/Footer.vue';

@Component({
  components: {
    Toolbar,
    Frontpage,
    Footer,
  },
})
export default class App extends Vue {}
</script>
