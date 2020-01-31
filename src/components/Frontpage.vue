<template>
  <v-container
    fill-height
    fluid
  >
    <v-row
      align="center"
      justify="center"
      class="grey lighten-5"
    >
      <v-col
        cols="12"
        sm="4"
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-img
            :src="trendingGif || require('../assets/placeholder-loading.gif')"
            contain
            max-width="640"
            max-height="480"
            @load.once="getGif"
            @click="getGif"
          />
        </v-row>
        <v-row
          align="center"
          justify="center"
        >
          <v-rating
            v-model="rating"
            length="5"
            empty-icon="mdi-heart-outline"
            full-icon="mdi-heart"
            half-icon="mdi-heart-half-full"
            half-increments
            hover
            size="32"
            color="red"
            background-color="grey lighten-1"
          />
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { getTrendingGif, getGifAsBuffer } from '../request';
import { base64ToGif } from '../request/imageHelper';

@Component
export default class Frontpage extends Vue {
  @Watch('rating')
  async ratingWatcher(): Promise<void> {
    let base64Image: string = '';
    const { rating, trendingGif } = this;
    if (trendingGif) {
      base64Image = await getGifAsBuffer(trendingGif);
    }
    await this.$store.dispatch('setGifData', { rating, base64Image });
  }

  testImg: string = '';

  trendingGif: string|null = null;

  rating: number = 0;

  trendingIndex: number = 0;

  trendingListSize: number = -1;

  async mounted(): Promise<void> {
    const { listSize } = await getTrendingGif();
    this.trendingListSize = listSize;
  }

  async getGif(): Promise<void> {
    if (this.trendingIndex === this.trendingListSize) { this.trendingIndex = 0; }
    const { originalUrl } = await getTrendingGif(this.trendingIndex);
    this.trendingGif = originalUrl;
    this.trendingIndex += 1;
    this.rating = 0;
  }
}
</script>
