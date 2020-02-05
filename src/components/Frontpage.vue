<template>
  <v-card
    class="mx-auto"
    height="90%"
    width="90%"
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-img
        :src="currentGif || require('../assets/placeholder-loading.gif')"
        contain
        max-width="640"
        max-height="480"
      />
    </v-row>
    <v-row
      align="center"
      justify="center"
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
      align="center"
      justify="center"
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
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import getTrendingGifsList from '../request';
import { imageToBase64Image, base64ImageToGif } from '../util/imageHelper';

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

  trendingGifsList: Giphy.Response|null = null;

  widthOfCurrentGif: number = 0;

  heightOfCurrentGif: number = 0;

  setResolutionOfCurrentGif() {
    if (this.trendingGifsList) {
      const { width } = this.trendingGifsList[this.currentIndex].images.original;
      this.widthOfCurrentGif = parseInt(width, 10);
      const { height } = this.trendingGifsList[this.currentIndex].images.original;
      this.heightOfCurrentGif = parseInt(height, 10);
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

  async mounted(): Promise<void> {
    this.trendingGifsList = await getTrendingGifsList();
    await this.getRating();
    this.currentGif = this.trendingGifsList[0].images.original.url;
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
      this.currentGif = this.trendingGifsList[index].images.original.url;
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
