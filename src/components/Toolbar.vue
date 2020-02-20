<template>
  <v-app-bar
    app
    color="red darken-3"
    flat
    clipped-left
    dark
  >
    <v-btn
      :to="'/'"
    >
      <div
        class="d-flex align-center"
      >
        <h1>GIFGIF</h1>
      </div>
    </v-btn>
    <v-divider />

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          @click="setGifMode('random')"
          v-on="on"
        >
          <v-icon>{{ icons.mdiShuffle }}</v-icon>
        </v-btn>
      </template>
      <span>Random</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          @click="setGifMode('trending')"
          v-on="on"
        >
          <v-icon>{{ icons.mdiTrendingUp }}</v-icon>
        </v-btn>
      </template>
      <span>Trending</span>
    </v-tooltip>
  </v-app-bar>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mdiShuffle, mdiTrendingUp } from '@mdi/js';

@Component
export default class Toolbar extends Vue {
  async setGifMode(mode: string) {
    this.$store.commit('setGifMode', mode);
  }

  icons = {
    mdiShuffle,
    mdiTrendingUp,
  }
}
</script>
