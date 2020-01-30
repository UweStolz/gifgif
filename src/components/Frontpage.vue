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
import { Vue, Component } from 'vue-property-decorator';
import getTrendingGif from '../request';

@Component
export default class Frontpage extends Vue {
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
