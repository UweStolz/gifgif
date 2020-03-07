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
            v-model="carouselModel"
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
                <template
                  v-slot:placeholder
                >
                  <linear-progress />
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
        <card-actions
          :rating.sync="rating"
          :show-rating="true"
          :is-frontpage="true"
          :sync-function="getGifList"
          :image-id.sync="currentId"
          :image-data.sync="imageData"
          :preview-image-data.sync="previewData"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import CardActions from '@/components/shared/CardActions.vue';
import LinearProgress from '@/components/shared/LinearProgress.vue';
import {
  getTrendingGifsListFromGiphy,
  getRandomGifFromGiphy,
  getBlob,
} from '../request';

@Component({
  components: {
    CardActions,
    LinearProgress,
  },
})

export default class Frontpage extends Vue {
  async getGifList(): Promise<void> {
    if (this.$store.state.gifMode === 'trending') {
      const listFromGiphy: Giphy.Response = await getTrendingGifsListFromGiphy();
      this.buildGifList(listFromGiphy);
      await this.updateCarouselModel();
    } else {
      const randomGifObject: Giphy.GIFObject = await getRandomGifFromGiphy();
      const itemObject = [
        {
          id: randomGifObject.id,
          url: randomGifObject.images.original.webp,
          previewUrl: randomGifObject.images.fixed_width.webp,
        },
      ];
      this.gifsList = itemObject;
      await this.updateCarouselModel();
    }
  }

  imageKey: number = 0

  rating: number = 0;

  imageData: Blob|string = '';

  previewData: Blob|string = '';

  gifsList: BuiltGifLists = [];

  carouselModel: number = 0;

  currentId: string = '';

  async mounted(): Promise<void> {
    this.$store.watch(
      () => this.$store.state.gifMode,
      async () => {
        await this.getGifList();
      },
    );
    await this.getGifList();
  }

  async updateCarouselModel(index: number = 0): Promise<void> {
    this.carouselModel = index;
    await this.getRating();
  }

  buildGifList(listFromGiphy: Giphy.Response): void {
    const builtGifList: BuiltGifLists = [];
    listFromGiphy.forEach((item) => {
      const itemObject: BuiltGifListObject = {
        id: item.id,
        url: item.images.original.webp.length ? item.images.original.webp : item.images.original.url,
        previewUrl: item.images.fixed_width.webp,
      };
      builtGifList.push(itemObject);
    });
    this.gifsList = builtGifList;
  }

  async getRating() {
    this.currentId = this.gifsList[this.carouselModel].id;
    if (this.$store.state.fullImageMode) {
      this.imageData = await getBlob(this.gifsList[this.carouselModel].url);
      this.previewData = await getBlob(this.gifsList[this.carouselModel].previewUrl);
    } else {
      this.imageData = this.gifsList[this.carouselModel].url;
      this.previewData = this.gifsList[this.carouselModel].previewUrl;
    }
    const gifData: Database.GifData | undefined = await this.$store.dispatch('getGifData', `ggid-${this.currentId}`);
    this.rating = gifData?.rating ? this.rating = gifData.rating : this.rating = 0;
  }
}
</script>
