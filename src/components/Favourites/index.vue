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
        <PanelContent :content-data="data.previewUrl[x-1]" />
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
import { GifData } from '@/database';
import arrayBufferToImage from '@/util/imageHelper';
import PanelContent from './PanelContent.vue';

interface Data {
  previewUrl: {
    [key: number]: string[];
    1: string[];
    2: string[];
    3: string[];
    4: string[];
    5: string[];
  }
}

@Component({
  components: {
    PanelContent,
  },
})
export default class Favourites extends Vue {
  icons = { mdiHeart }

  data: Data = {
    previewUrl: {
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
    },
  };

  async mounted(): Promise<void> {
    const ratedGifData: GifData[] = await this.$store.dispatch('getRatedGifPreviews');
    if (ratedGifData.length > 0) {
      ratedGifData.forEach((value: GifData) => {
        const previewImageUrl: string = arrayBufferToImage(value.preview);
        if (value.rating > 0 && value.rating < 6) {
          this.data.previewUrl[value.rating].push(previewImageUrl);
        }
      });
    }
  }
}
</script>
