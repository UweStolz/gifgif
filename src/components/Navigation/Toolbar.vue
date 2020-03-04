<template>
  <v-app-bar
    app
    color="red darken-3"
    flat
    clipped-left
    :absolute="$vuetify.breakpoint.xsOnly"
    dark
  >
    <v-app-bar-nav-icon
      v-if="$vuetify.breakpoint.xsOnly"
      @click="toggleDrawer"
    />
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
  mdiShuffle, mdiTrendingUp, mdiCogs,
} from '@mdi/js';

@Component
export default class Toolbar extends Vue {
  setGifMode(mode: string) {
    this.$store.commit('setGifMode', mode);
  }

  toggleDrawer(): void {
    this.$store.commit('setShowMobileDrawer', !this.$store.state.showMobileDrawer);
  }

  icons = {
    mdiShuffle,
    mdiTrendingUp,
    mdiCogs,
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
