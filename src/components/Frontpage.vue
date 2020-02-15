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
          height="500"
          width="500"
        >
          <v-container
            fluid
            fill-height
          >
            <v-img
              :src="currentGif || require('../assets/placeholder-loading.gif')"
              contain
              max-height="480"
              max-width="480"
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
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-rating
          v-model="rating"
          length="5"
          empty-icon="mdi-heart-outline"
          full-icon="mdi-heart"
          half-icon="mdi-heart-half-full"
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
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-btn
          icon
          large
          :disabled="isLastItem"
          @click="getGif('next')"
        >
          <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { getTrendingGifsListFromGiphy, getTrendingGifsListFromTenor } from '../request';
import imageToBase64Image from '../util/imageHelper';

@Component
export default class Frontpage extends Vue {
  @Watch('rating')
  async ratingWatcher(): Promise<void> {
    if (this.rating !== 0) {
      const { rating } = this;
      const currentImageElement = this.createImageElement();
      const base64Image = await imageToBase64Image(currentImageElement);
      await this.$store.dispatch('setGifData', { rating, base64Image });
    }
  }

  isFirstItem: boolean = true;

  isLastItem: boolean = false;

  currentGif: string|null = null;

  rating: number = 0;

  currentIndex: number = 0;

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
        url: item.media[0].webm.url,
        width: item.media[0].webm.dims[0],
        height: item.media[0].webm.dims[1],
      };
      mergedLists.push(itemObject);
    });
    this.trendingGifsList = mergedLists;
  }

  async mounted(): Promise<void> {
    const listFromGiphy: Giphy.Response = await getTrendingGifsListFromGiphy();
    const listFromTenor: Tenor.Response = await getTrendingGifsListFromTenor();
    this.mergeGifLists(listFromGiphy, listFromTenor);
    await this.getRating();
    this.currentGif = this.trendingGifsList ? this.trendingGifsList[0].url : null;
    this.trendingListSize = this.trendingGifsList ? this.trendingGifsList.length : -1;
  }

  async getRating() {
    if (this.currentGif) {
      const currentImageElement = this.createImageElement();
      const base64Image = await imageToBase64Image(currentImageElement);
      const savedRating: number = await this.$store.dispatch('getGifData', base64Image);
      this.rating = savedRating ? this.rating = savedRating : this.rating = 0;
    }
  }

  async removeGif() {
    if (this.currentGif) {
      const currentImageElement = this.createImageElement();
      const base64Image = await imageToBase64Image(currentImageElement);
      await this.$store.dispatch('removeGifData', base64Image);
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
