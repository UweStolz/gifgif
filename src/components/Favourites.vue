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
        <v-expansion-panel-content
          v-for="z in 3"
          :key="z"
        >
          <v-img
            :if="data[z]"
            :src="data[z]"
            width="100"
            height="100"
          />
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
// eslint-disable-next-line no-unused-vars
import { GifData } from '../database';
import arrayBufferToImage from '../util/imageHelper';

@Component
export default class Favourites extends Vue {
icons = { mdiHeart }

ratedGifData: GifData[]|null = null;

data: string[] = [];

async mounted(): Promise<void> {
  this.ratedGifData = await this.$store.dispatch('getRatedGifPreviews');
  // eslint-disable-next-line no-unused-expressions
  this.ratedGifData?.forEach((value: GifData) => {
    const imageUrl = arrayBufferToImage(value.preview);
    this.data.push(imageUrl);
  });
}
}
</script>
