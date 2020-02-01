<template>
  <v-app>
    <v-app-bar
      app
      color="red darken-3"
      flat
      dark
    >
      <div class="d-flex align-center">
        <h1>GIFGIF</h1>
      </div>
    </v-app-bar>
    <v-content>
      <Frontpage />
    </v-content>
    <Footer />
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Frontpage from './components/Frontpage.vue';
import Footer from '@/components/Footer.vue';

@Component({
  components: {
    Frontpage,
    Footer,
  },
})
export default class App extends Vue {}
</script>
