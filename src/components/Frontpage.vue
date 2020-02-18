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
            <v-carousel
              hide-delimiters
              show-arrows-on-hover
              @change="updateCarouselModel"
            >
              <v-carousel-item
                v-for="(gif, i) in trendingGifsList"
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
                  v-if="!trendingGifsList.length"
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
          size="50"
          color="red"
          background-color="red"
        />
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import {
  mdiClose, mdiHeart, mdiHeartOutline, mdiHeartHalfFull,
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
    if (this.rating !== 0) {
      const { rating, currentImageBuffer } = this;
      await this.$store.dispatch('setGifData', { rating, buffer: currentImageBuffer });
      this.$store.commit('setGifCount', this.$store.state.gifCount += 1);
    }
  }

  icons = {
    mdiHeartHalfFull,
    mdiHeartOutline,
    mdiHeart,
    mdiClose,
  }

  rating: number = 0;

  currentImageBuffer: ArrayBuffer|null = null;

  trendingGifsList: MergedGifLists = [];

  carouselModel: number = 0;

  async updateCarouselModel(payload: number) {
    this.carouselModel = payload;
    await this.getRating();
  }

  createImageElement(): HTMLImageElement {
    const { width, height } = this.trendingGifsList[this.carouselModel];
    const currentImageElement: HTMLImageElement = new Image(width, height);
    currentImageElement.setAttribute('crossorigin', 'anonymous');
    currentImageElement.src = this.trendingGifsList[this.carouselModel].url;
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
    await this.getRating();
  }

  async getRating() {
    const currentGif = this.trendingGifsList[this.carouselModel].url;
    this.currentImageBuffer = await getArrayBuffer(currentGif);
    const savedRating: number = await this.$store.dispatch('getGifData', this.currentImageBuffer);
    this.rating = savedRating ? this.rating = savedRating : this.rating = 0;
  }

  async removeGif() {
    await this.$store.dispatch('removeGifData', this.currentImageBuffer);
    this.rating = 0;
    this.$store.commit('setGifCount', this.$store.state.gifCount -= 1);
  }
}
</script>
