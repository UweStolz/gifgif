<template>
  <v-container
    fluid
    fill-height
  >
    <v-row
      align="start"
      justify="center"
      no-gutters
    >
      <v-card
        flat
        tile
        height="70%"
        width="80%"
      >
        <v-col cols="auto">
          <v-carousel
            height="55vh"
            hide-delimiters
            :show-arrows="gifsList.length > 1"
            :show-arrows-on-hover="gifsList.length > 1"
            @change="updateCarouselModel"
          >
            <v-carousel-item
              v-for="(gif, i) in gifsList"
              :key="i"
            >
              <v-img
                :src="gif.url"
                :lazy-src="gif.url"
                contain
                height="100%"
                width="100%"
              >
                <template v-slot:placeholder>
                  <v-progress-linear
                    indeterminate
                    color="red"
                  />
                </template>
              </v-img>
            </v-carousel-item>
          </v-carousel>
        </v-col>
      </v-card>
    </v-row>

    <v-row
      align="start"
      justify="center"
      no-gutters
    >
      <v-col cols="auto">
        <v-card-actions>
          <v-btn
            :style="{visibility: this.$store.state.gifMode === 'random' ? 'visible' : 'hidden'}"
            icon
            x-large
            @click="setRandomGif"
          >
            <v-icon>
              {{ icons.mdiSync }}
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-col>
    </v-row>

    <v-row
      align="start"
      justify="center"
      no-gutters
    >
      <v-col
        cols="auto"
      >
        <v-card-actions
          style="margin-right: 35px;"
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
        </v-card-actions>
      </v-col>
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
      const {
        rating, currentImageBuffer, gifsList, carouselModel,
      } = this;

      await this.$store.dispatch('setGifData', {
        rating,
        key: this.fullImageMode ? currentImageBuffer : gifsList[carouselModel].url,
        preview: this.fullImageMode ? await this.getBufferForPreviewGif() : gifsList[carouselModel].url,
      });
      this.$store.commit('setGifCount', this.gifCount + 1);
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

  fullImageMode: boolean = false;

  gifCount: number = 0;

  async setRandomGif() {
    const randomGifObject: Giphy.GIFObject = await getRandomGifFromGiphy();
    const itemObject = [
      {
        url: randomGifObject.images.original.webp,
        previewUrl: randomGifObject.images.fixed_width.webp,
      },
    ];
    this.gifsList = itemObject;
    await this.updateCarouselModel(0);
  }

  async getGifLists(mode: string) {
    if (mode === 'trending') {
      const listFromGiphy: Giphy.Response = await getTrendingGifsListFromGiphy();
      const listFromTenor: Tenor.Response = await getTrendingGifsListFromTenor();
      this.mergeGifLists(listFromGiphy, listFromTenor);
      await this.getRating();
    } else {
      await this.setRandomGif();
    }
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
    this.fullImageMode = this.$store.state.fullImageMode;
    this.gifCount = this.$store.state.gifCount;
    await this.getGifLists(this.$store.state.gifMode);
  }

  async getRating() {
    let gifData: GifData|undefined;
    const currentGif = this.gifsList[this.carouselModel].url;
    if (this.fullImageMode) {
      this.currentImageBuffer = await getArrayBuffer(currentGif);
      gifData = await this.$store.dispatch('getGifData', this.currentImageBuffer);
    }
    gifData = await this.$store.dispatch('getGifData', currentGif);
    this.rating = gifData?.rating ? this.rating = gifData.rating : this.rating = 0;
  }

  async removeGif() {
    if (this.fullImageMode) {
      await this.$store.dispatch('removeGifData', this.currentImageBuffer);
    }
    await this.$store.dispatch('removeGifData', this.gifsList[this.carouselModel].url);
    this.rating = 0;
    this.$store.commit('setGifCount', this.gifCount -= 1);
  }
}
</script>
