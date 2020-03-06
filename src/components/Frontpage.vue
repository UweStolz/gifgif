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
        <v-card-actions style="margin-right: 35px;">
          <v-item-group>
            <v-rating
              v-model="rating"
              length="5"
              :empty-icon="icons.mdiHeartOutline"
              :full-icon="icons.mdiHeart"
              :half-icon="icons.mdiHeartHalfFull"
              hover
              x-large
              color="red"
              background-color="red"
              @input="updateGifRating"
            />
            <v-btn
              id="downloadIcon"
              icon
              large
              @click="saveImage"
            >
              <v-icon>{{ icons.mdiDownload }}</v-icon>
            </v-btn>
            <v-btn
              id="trashIcon"
              :disabled="!rating"
              icon
              large
              @click="removeGif"
            >
              <v-icon>{{ icons.mdiTrashCan }}</v-icon>
            </v-btn>
            <v-btn
              icon
              large
              @click="getGifList"
            >
              <v-icon>
                {{ icons.mdiSync }}
              </v-icon>
            </v-btn>
          </v-item-group>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import {
  mdiTrashCan, mdiHeart, mdiHeartOutline, mdiHeartHalfFull, mdiSync, mdiDownload,
} from '@mdi/js';
import { saveAs } from 'file-saver';
import {
  getTrendingGifsListFromGiphy,
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
    mdiTrashCan,
    mdiSync,
    mdiDownload,
  }

  rating: number = 0;

  currentImageBlob: Blob | null = null;

  gifsList: BuiltGifLists = [];

  carouselModel: number = 0;

  gifCount: number = 0;

  async saveImage(): Promise<void> {
    const imageData = this.currentImageBlob ? this.currentImageBlob : await getBlob(this.gifsList[this.carouselModel].url);
    saveAs(imageData, `ggid-${this.gifsList[this.carouselModel].id}`);
  }

  async getGifList(): Promise<void> {
    if (this.$store.state.gifMode === 'trending') {
      const listFromGiphy: Giphy.Response = await getTrendingGifsListFromGiphy();
      this.buildGifList(listFromGiphy);
      await this.getRating();
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
    }
    await this.updateCarouselModel(0);
  }

  async getBlobForPreviewGif(): Promise<Blob> {
    const currentPreviewGif = this.gifsList[this.carouselModel].previewUrl;
    const previewGifBlob = await getBlob(currentPreviewGif);
    return previewGifBlob;
  }

  async updateCarouselModel(payload: number): Promise<void> {
    this.carouselModel = payload;
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

  async mounted(): Promise<void> {
    this.$store.watch(
      () => this.$store.state.gifMode,
      async () => {
        await this.getGifList();
      },
    );
    this.gifCount = this.$store.state.gifCount;
    await this.getGifList();
  }

  async getRating() {
    const currentId = this.gifsList[this.carouselModel].id;
    if (this.$store.state.fullImageMode) {
      this.currentImageBlob = await getBlob(this.gifsList[this.carouselModel].url);
    }
    const gifData: Database.GifData | undefined = await this.$store.dispatch('getGifData', `ggid-${currentId}`);
    this.rating = gifData?.rating ? this.rating = gifData.rating : this.rating = 0;
  }

  async removeGif() {
    await this.$store.dispatch('removeGifData', `ggid-${this.gifsList[this.carouselModel].id}`);
    this.rating = 0;
    this.gifCount -= 1;
    this.$store.commit('setGifCount', this.$store.state.gifCount - 1);
  }
}
</script>

<style scoped>
#trashIcon:hover {
  color: red;
}
#downloadIcon:hover {
  color: green;
}
</style>
