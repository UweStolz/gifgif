<template>
  <v-container
    fluid
    fill-height
  >
    <v-row
      justify="center"
    >
      <v-card
        flat
        height="620"
        width="820"
      >
        <v-container
          fluid
          fill-height
        >
          <v-carousel
            hide-delimiters
            :show-arrows="this.$store.state.gifMode === 'trending'"
            :show-arrows-on-hover="this.$store.state.gifMode === 'trending'"
            @change="updateCarouselModel"
          >
            <v-carousel-item
              v-for="(gif, i) in gifsList"
              :key="i"
            >
              <v-img
                :src="gif.url"
                contain
                height="100%"
                width="100%"
              />
            </v-carousel-item>
            <v-row
              class="fill-height ma-0"
              align="center"
              justify="center"
            >
              <v-progress-circular
                v-if="!gifsList.length"
                indeterminate
                color="red"
              />
            </v-row>
          </v-carousel>
        </v-container>
      </v-card>
    </v-row>
    <v-row
      align="end"
      justify="center"
      no-gutters
    >
      <v-btn
        :style="{visibility: this.$store.state.gifMode === 'random' ? 'visible' : 'hidden'}"
        icon
        @click="setRandomGif"
      >
        <v-icon>
          {{ icons.mdiSync }}
        </v-icon>
      </v-btn>
    </v-row>
    <v-row
      align="end"
      justify="center"
      no-gutters
    >
      <v-btn

        :style="{visibility: rating ? 'visible' : 'hidden'}"
        icon
        large
        @click="removeGif"
      >
        <v-icon>{{ icons.mdiClose }}</v-icon>
      </v-btn>
      <v-rating
        v-model="rating"
        length="5"
        :empty-icon="icons.mdiHeartOutline"
        :full-icon="icons.mdiHeart"
        :half-icon="icons.mdiHeartHalfFull"
        hover
        size="50"
        color="red"
        background-color="red"
      />
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import {
  mdiClose, mdiHeart, mdiHeartOutline, mdiHeartHalfFull, mdiSync,
} from '@mdi/js';
import {
  getTrendingGifsListFromGiphy,
  getTrendingGifsListFromTenor,
  getRandomGifFromGiphy,
  getArrayBuffer,
} from '../request';
// eslint-disable-next-line no-unused-vars
import { GifData } from '../database';

@Component
export default class Frontpage extends Vue {
  @Watch('rating')
  async ratingWatcher(): Promise<void> {
    if (this.rating !== 0) {
      const preview = await this.getBufferForPreviewGif();
      const { rating, currentImageBuffer } = this;
      await this.$store.dispatch('setGifData', {
        rating,
        buffer: currentImageBuffer,
        preview,
      });
      const gifCount = await this.$store.dispatch('getGifCount');
      this.$store.commit('setGifCount', gifCount);
    }
  }

  icons = {
    mdiHeartHalfFull,
    mdiHeartOutline,
    mdiHeart,
    mdiClose,
    mdiSync,
  }

  rating: number = 0;

  currentImageBuffer: ArrayBuffer|null = null;

  gifsList: MergedGifLists = [];

  carouselModel: number = 0;

  async setRandomGif() {
    const randomGifObject: Giphy.GIFObject = await getRandomGifFromGiphy();
    const itemObject = [
      {
        url: randomGifObject.images.original.webp,
        previewUrl: randomGifObject.images.fixed_width.webp,
      },
    ];
    this.gifsList = itemObject;
  }

  async getGifLists(mode: string) {
    if (mode === 'trending') {
      const listFromGiphy: Giphy.Response = await getTrendingGifsListFromGiphy();
      const listFromTenor: Tenor.Response = await getTrendingGifsListFromTenor();
      this.mergeGifLists(listFromGiphy, listFromTenor);
    } else {
      await this.setRandomGif();
    }
    await this.getRating();
  }

  async getBufferForPreviewGif() {
    const currentPreviewGif = this.gifsList[this.carouselModel].previewUrl;
    const previewGifBuffer = await getArrayBuffer(currentPreviewGif);
    return previewGifBuffer;
  }

  async updateCarouselModel(payload: number) {
    this.carouselModel = payload;
    await this.getRating();
  }

  mergeGifLists(listFromGiphy: Giphy.Response, listFromTenor: Tenor.Response): void {
    const mergedLists: MergedGifLists = [];
    listFromGiphy.forEach((item) => {
      const itemObject: MergedGifListObject = {
        url: item.images.original.webp,
        previewUrl: item.images.fixed_width.webp,
      };
      mergedLists.push(itemObject);
    });
    listFromTenor.forEach((item) => {
      const itemObject: MergedGifListObject = {
        url: item.media[0].gif.url,
        previewUrl: item.media[0].tinygif.url,
      };
      mergedLists.push(itemObject);
    });
    this.gifsList = mergedLists;
  }

  async mounted(): Promise<void> {
    this.$store.watch(
      () => this.$store.state.gifMode,
      async (mode: string) => {
        await this.getGifLists(mode);
      },
    );
    await this.getGifLists(this.$store.state.gifMode);
  }

  async getRating() {
    const currentGif = this.gifsList[this.carouselModel].url;
    this.currentImageBuffer = await getArrayBuffer(currentGif);
    const gifData: GifData|undefined = await this.$store.dispatch('getGifData', this.currentImageBuffer);
    this.rating = gifData?.rating ? this.rating = gifData.rating : this.rating = 0;
  }

  async removeGif() {
    await this.$store.dispatch('removeGifData', this.currentImageBuffer);
    this.rating = 0;
    this.$store.commit('setGifCount', this.$store.state.gifCount -= 1);
  }
}
</script>
