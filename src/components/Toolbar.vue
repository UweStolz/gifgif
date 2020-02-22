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
          :id="mode === 'random' ? 'tb-active-button' : ''"
          @click="setGifMode('random')"
          v-on="on"
        >
          <v-icon
            :id="mode === 'random' ? 'tb-active-icon' : ''"
          >
            {{ icons.mdiShuffle }}
          </v-icon>
        </v-btn>
      </template>
      <span>Random</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          :id="mode === 'trending' ? 'tb-active-button' : ''"
          @click="setGifMode('trending')"
          v-on="on"
        >
          <v-icon
            :id="mode === 'trending' ? 'tb-active-icon' : ''"
          >
            {{ icons.mdiTrendingUp }}
          </v-icon>
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
  setGifMode(mode: string) {
    this.$store.commit('setGifMode', mode);
    this.mode = mode;
  }

  icons = {
    mdiShuffle,
    mdiTrendingUp,
  }

  mode = this.$store.state.gifMode;
}
</script>

<style scoped>
#tb-active-button {
  background-color: white;
}
#tb-active-icon {
  color: red;
}
</style>
