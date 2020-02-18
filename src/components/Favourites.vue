<template>
  <div>
    <v-card-title class="display-2 justify-center">
      Favourites
    </v-card-title>

    <v-expansion-panels
      popout
      hover
    >
      <v-expansion-panel
        v-for="x in 5"
        :key="x"
      >
        <v-expansion-panel-header>
          <v-row justify="center">
            <v-icon
              v-for="y in x++"
              :key="y"
              x-large
              color="red"
            >
              {{ icons.mdiHeart }}
            </v-icon>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import {
  mdiHeart,
} from '@mdi/js';

@Component
export default class Favourites extends Vue {
icons = { mdiHeart }
}
</script>
