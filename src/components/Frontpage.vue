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
      <v-col cols="auto">
        <v-card-actions style="margin-right: 35px;">
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
            @input="updateGifRating"
          />
        </v-card-actions>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import {
  mdiClose, mdiHeart, mdiHeartOutline, mdiHeartHalfFull, mdiSync,
} from '@mdi/js';
import {
  getTrendingGifsListFromGiphy,
  getTrendingGifsListFromTenor,
  getRandomGifFromGiphy,
  getBlob,
} from '../request';

@Component
export default class Frontpage extends Vue {
  async updateGifRating() {
    const {
      rating, gifsList, carouselModel,
    } = this;
    if (this.$store.state.fullImageMode) {
      const { currentImageBlob } = this;
      await this.$store.dispatch('setGifData', {
        rating,
        key: `ggid-${gifsList[carouselModel].id}`,
        image: currentImageBlob,
        preview: await this.getBlobForPreviewGif(),
      });
    } else {
      await this.$store.dispatch('setGifData', {
        rating,
        key: `ggid-${gifsList[carouselModel].id}`,
        image: gifsList[carouselModel].url,
        preview: gifsList[carouselModel].url,
      });
    }
    const currentCount = await this.$store.dispatch('getGifCount');
    if (this.gifCount !== currentCount) { this.$store.commit('setGifCount', currentCount); }
  }

  icons = {
    mdiHeartHalfFull,
    mdiHeartOutline,
    mdiHeart,
    mdiClose,
    mdiSync,
  }

  rating: number = 0;

  currentImageBlob: Blob | null = null;

  gifsList: MergedGifLists = [];

  carouselModel: number = 0;

  gifCount: number = 0;

  async setRandomGif() {
    const randomGifObject: Giphy.GIFObject = await getRandomGifFromGiphy();
    const itemObject = [
      {
        id: randomGifObject.id,
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

  async getBlobForPreviewGif() {
    const currentPreviewGif = this.gifsList[this.carouselModel].previewUrl;
    const previewGifBlob = await getBlob(currentPreviewGif);
    return previewGifBlob;
  }

  async updateCarouselModel(payload: number) {
    this.carouselModel = payload;
    await this.getRating();
  }

  mergeGifLists(listFromGiphy: Giphy.Response, listFromTenor: Tenor.Response): void {
    const mergedLists: MergedGifLists = [];
    listFromGiphy.forEach((item) => {
      const itemObject: MergedGifListObject = {
        id: item.id,
        url: item.images.original.webp.length ? item.images.original.webp : item.images.original.url,
        previewUrl: item.images.fixed_width.webp,
      };
      mergedLists.push(itemObject);
    });
    listFromTenor.forEach((item) => {
      const itemObject: MergedGifListObject = {
        id: item.id,
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
    this.gifCount = this.$store.state.gifCount;
    await this.getGifLists(this.$store.state.gifMode);
  }

  async getRating() {
    let gifData: Database.GifData | undefined;
    const currentId = this.gifsList[this.carouselModel].id;
    if (this.$store.state.fullImageMode) {
      this.currentImageBlob = await getBlob(this.gifsList[this.carouselModel].url);
      gifData = await this.$store.dispatch('getGifData', `ggid-${currentId}`);
    }
    gifData = await this.$store.dispatch('getGifData', `ggid-${currentId}`);
    this.rating = gifData?.rating ? this.rating = gifData.rating : this.rating = 0;
  }

  async removeGif() {
    if (this.$store.state.fullImageMode) {
      await this.$store.dispatch('removeGifData', `ggid-${this.gifsList[this.carouselModel].id}`);
    }
    await this.$store.dispatch('removeGifData', `ggid-${this.gifsList[this.carouselModel].id}`);
    this.rating = 0;
    this.gifCount -= 1;
    this.$store.commit('setGifCount', this.$store.state.gifCount - 1);
  }
}
</script>
