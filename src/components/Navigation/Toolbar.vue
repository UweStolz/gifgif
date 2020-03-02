<template>
  <v-app-bar
    app
    color="red darken-3"
    flat
    clipped-left
    dark
  >
    <v-btn
      v-if="$vuetify.breakpoint.xsOnly"
      icon
      @click="toggleDrawer"
    >
      <v-icon>
        {{ icons.mdiMenu }}
      </v-icon>
    </v-btn>
    <v-btn :to="'/'">
      <div class="d-flex align-center">
        <h1>GIFGIF</h1>
      </div>
    </v-btn>
    <v-divider />

    <v-tooltip
      bottom
      nudge-bottom="5"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          :id="$store.state.gifMode === 'random' ? 'tb-active-button' : ''"
          @click="setGifMode('random')"
          v-on="on"
        >
          <v-icon :id="$store.state.gifMode === 'random' ? 'tb-active-icon' : ''">
            {{ icons.mdiShuffle }}
          </v-icon>
        </v-btn>
      </template>
      <span>Random</span>
    </v-tooltip>
    <v-tooltip
      bottom
      nudge-bottom="5"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          :id="$store.state.gifMode === 'trending' ? 'tb-active-button' : ''"
          @click="setGifMode('trending')"
          v-on="on"
        >
          <v-icon :id="$store.state.gifMode === 'trending' ? 'tb-active-icon' : ''">
            {{ icons.mdiTrendingUp }}
          </v-icon>
        </v-btn>
      </template>
      <span>Trending</span>
    </v-tooltip>
    <v-btn
      style="margin-left: 10px;"
      icon
      :to="'/configuration'"
    >
      <v-icon>{{ icons.mdiCogs }}</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import {
  mdiShuffle, mdiTrendingUp, mdiCogs, mdiMenu,
} from '@mdi/js';

@Component
export default class Toolbar extends Vue {
  setGifMode(mode: string) {
    this.$store.commit('setGifMode', mode);
  }

  toggleDrawer(): void {
    this.$store.commit('setIsMobile', !this.$store.state.isMobile);
  }

  icons = {
    mdiShuffle,
    mdiTrendingUp,
    mdiCogs,
    mdiMenu,
  }
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
