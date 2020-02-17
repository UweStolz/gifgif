<template>
  <v-card
    class="mx-auto"
    height="90%"
    width="90%"
  >
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
            <v-img
              :src="currentGif || require('../assets/placeholder-loading.gif')"
              contain
              max-height="600"
              max-width="800"
            />
          </v-container>
        </v-card>
      </v-row>
      <v-row
        align="end"
        justify="center"
        no-gutters
      >
        <v-btn
          v-if="rating !== 0"
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
          size="32"
          color="red"
          background-color="red"
        />
      </v-row>
      <v-row
        align="end"
        justify="center"
        no-gutters
      >
        <v-btn
          icon
          large
          :disabled="isFirstItem"
          @click="getGif('previous')"
        >
          <v-icon>{{ icons.mdiArrowLeft }}</v-icon>
        </v-btn>
        <v-btn
          icon
          large
          :disabled="isLastItem"
          @click="getGif('next')"
        >
          <v-icon>{{ icons.mdiArrowRight }}</v-icon>
        </v-btn>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import {
  mdiArrowRight, mdiArrowLeft, mdiClose, mdiHeart, mdiHeartOutline, mdiHeartHalfFull,
} from '@mdi/js';
import {
  getTrendingGifsListFromGiphy,
  getTrendingGifsListFromTenor,
  getArrayBuffer,
} from '../request';

@Component
export default class Frontpage extends Vue {
  @Watch('rating')
  async ratingWatcher(): Promise<void> {
    if (this.rating !== 0 && this.currentGif) {
      const { rating, currentImageBuffer } = this;
      await this.$store.dispatch('setGifData', { rating, buffer: currentImageBuffer });
    }
  }

  icons = {
    mdiHeartHalfFull,
    mdiHeartOutline,
    mdiHeart,
    mdiClose,
    mdiArrowRight,
    mdiArrowLeft,
  }

  isFirstItem: boolean = true;

  isLastItem: boolean = false;

  currentGif: string|null = null;

  rating: number = 0;

  currentIndex: number = 0;

  currentImageBuffer: ArrayBuffer|null = null;

  trendingListSize: number = -1;

  trendingGifsList: MergedGifLists|null = null;

  widthOfCurrentGif: number = 0;

  heightOfCurrentGif: number = 0;

  setResolutionOfCurrentGif() {
    if (this.trendingGifsList && this.currentGif) {
      const { width, height } = this.trendingGifsList[this.currentIndex];
      this.widthOfCurrentGif = width;
      this.heightOfCurrentGif = height;
    }
  }

  createImageElement(): HTMLImageElement {
    this.setResolutionOfCurrentGif();
    const { widthOfCurrentGif, heightOfCurrentGif } = this;
    const currentImageElement: HTMLImageElement = new Image(widthOfCurrentGif, heightOfCurrentGif);
    if (this.currentGif) {
      currentImageElement.setAttribute('crossorigin', 'anonymous');
      currentImageElement.src = this.currentGif;
    }
    return currentImageElement;
  }

  mergeGifLists(listFromGiphy: Giphy.Response, listFromTenor: Tenor.Response): void {
    const mergedLists: MergedGifLists = [];
    listFromGiphy.forEach((item) => {
      const itemObject: MergedGifListObject = {
        url: item.images.original.webp,
        width: parseInt(item.images.original.width, 10),
        height: parseInt(item.images.original.height, 10),
      };
      mergedLists.push(itemObject);
    });
    listFromTenor.forEach((item) => {
      const itemObject: MergedGifListObject = {
        url: item.media[0].gif.url,
        width: item.media[0].gif.dims[0],
        height: item.media[0].gif.dims[1],
      };
      mergedLists.push(itemObject);
    });
    this.trendingGifsList = mergedLists;
  }

  async mounted(): Promise<void> {
    const listFromGiphy: Giphy.Response = await getTrendingGifsListFromGiphy();
    const listFromTenor: Tenor.Response = await getTrendingGifsListFromTenor();
    this.mergeGifLists(listFromGiphy, listFromTenor);
    this.currentGif = this.trendingGifsList ? this.trendingGifsList[0].url : null;
    this.trendingListSize = this.trendingGifsList ? this.trendingGifsList.length : -1;
    await this.getRating();
  }

  async getRating() {
    if (this.currentGif) {
      this.currentImageBuffer = await getArrayBuffer(this.currentGif);
      const savedRating: number = await this.$store.dispatch('getGifData', this.currentImageBuffer);
      this.rating = savedRating ? this.rating = savedRating : this.rating = 0;
    }
  }

  async removeGif() {
    if (this.currentGif) {
      await this.$store.dispatch('removeGifData', this.currentImageBuffer);
      this.rating = 0;
    }
  }

  async loadGif(index: number) {
    if (this.trendingGifsList) {
      this.currentGif = this.trendingGifsList[index].url;
    }
  }


  async getGif(direction: string): Promise<void> {
    if (direction === 'next') {
      this.currentIndex += 1;
      await this.loadGif(this.currentIndex);
      await this.getRating();
      if (this.currentIndex === this.trendingListSize - 1) {
        this.isLastItem = true;
        this.isFirstItem = false;
      }
      this.isFirstItem = false;
    }
    if (direction === 'previous') {
      this.currentIndex -= 1;
      await this.loadGif(this.currentIndex);
      await this.getRating();
      if (this.currentIndex === 0) {
        this.isLastItem = false;
        this.isFirstItem = true;
      }
      this.isLastItem = false;
    }
  }
}
</script>
