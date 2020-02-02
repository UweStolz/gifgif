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
        @load.once="getGif"
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
import { getTrendingGif, getGifAsBuffer } from '../request';
import { base64ToGif } from '../util/imageHelper';

@Component
export default class Frontpage extends Vue {
  @Watch('rating')
  async ratingWatcher(): Promise<void> {
    if (this.rating !== 0) {
      let base64Image: string = '';
      const { rating, currentGif } = this;
      if (currentGif) {
        base64Image = await getGifAsBuffer(currentGif);
      }
      await this.$store.dispatch('setGifData', { rating, base64Image });
    }
  }

  isFirstItem: boolean = true;

  isLastItem: boolean = false;

  currentGif: string|null = null;

  rating: number = 0;

  currentIndex: number = 0;

  trendingListSize: number = -1;

  async mounted(): Promise<void> {
    const { listSize } = await getTrendingGif();
    this.trendingListSize = listSize;
  }

  async getRating() {
    let keyForGifRating: string = '';
    if (this.currentGif) {
      keyForGifRating = await getGifAsBuffer(this.currentGif);
    }
    const savedRating: number = await this.$store.dispatch('getGifData', keyForGifRating);
    this.rating = savedRating ? this.rating = savedRating : this.rating = 0;
  }

  async removeGif() {
    let keyForDeletionCandidate: string = '';
    if (this.currentGif) {
      keyForDeletionCandidate = await getGifAsBuffer(this.currentGif);
    }
    await await this.$store.dispatch('removeGifData', keyForDeletionCandidate);
    this.rating = 0;
  }

  async loadGif(index: number) {
    const { originalUrl } = await getTrendingGif(index);
    this.currentGif = originalUrl;
  }

  async getGif(direction?: string): Promise<void> {
    switch (direction) {
      case 'next':
        this.currentIndex += 1;
        await this.loadGif(this.currentIndex);
        await this.getRating();
        if (this.currentIndex === this.trendingListSize - 1) {
          this.isLastItem = true;
          this.isFirstItem = false;
        }
        this.isFirstItem = false;
        break;
      case 'previous':
        this.currentIndex -= 1;
        await this.loadGif(this.currentIndex);
        await this.getRating();
        if (this.currentIndex === 0) {
          this.isLastItem = false;
          this.isFirstItem = true;
        }
        this.isLastItem = false;
        break;
      default:
        await this.loadGif(0);
        await this.getRating();
        break;
    }
  }
}
</script>
