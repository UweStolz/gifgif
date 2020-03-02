<template>
  <v-dialog
    v-model="syncedShowDialog"
    :full-image-data="syncedFullImageData"
    :preview-image-data="syncedpreviewImageData"
    :image-id="syncedImageId"
    :width="$vuetify.breakpoint.xsOnly ? '100%' : '60%'"
    @click:outside="resetProps"
  >
    <v-card>
      <v-card-title>
        <v-spacer />
        <v-btn
          icon
          @click="resetProps"
        >
          <v-icon>{{ icons.mdiClose }}</v-icon>
        </v-btn>
      </v-card-title>
      <v-img
        :src="syncedFullImageData"
        :lazy-src="syncedFullImageData"
        :max-height="maxWindowSize"
        contain
        height="100%"
        width="100%"
      />
      <v-card-actions>
        <v-btn
          large
          icon
          @click="saveImage"
        >
          <v-icon id="downloadIcon">
            {{ icons.mdiDownload }}
          </v-icon>
        </v-btn>
        <v-spacer />

        <v-btn
          v-if="rating !== 0"
          large
          icon
          @click="removeGif"
        >
          <v-icon>
            {{ icons.mdiTrashCan }}
          </v-icon>
        </v-btn>
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
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import {
  Vue, Component, PropSync, Watch,
} from 'vue-property-decorator';
import {
  mdiClose, mdiDownload, mdiHeartOutline, mdiHeart, mdiHeartHalfFull, mdiTrashCan,
} from '@mdi/js';
import { getBlob } from '@/request';
import { saveAs } from 'file-saver';

@Component
export default class Dialog extends Vue {
  @PropSync('showDialog', { type: Boolean, required: true }) syncedShowDialog!: boolean;

  @PropSync('fullImageData', { type: String, required: true }) syncedFullImageData!: string;

  @PropSync('previewImageData', { type: String, required: true }) syncedpreviewImageData!: string;

  @PropSync('imageId', { type: String, required: true }) syncedImageId!: string;

  @Watch('syncedShowDialog')
  async getRating() {
    const gifData = await this.$store.dispatch('getGifData', `ggid-${this.syncedImageId}`);
    if (gifData) { this.rating = gifData.rating || 0; }
  }

  saveImage(): void {
    saveAs(this.syncedFullImageData, `ggid-${this.syncedImageId}`);
  }

  resetProps(): void {
    this.syncedShowDialog = false;
    this.syncedFullImageData = '';
    this.rating = 0;
  }

  // eslint-disable-next-line class-methods-use-this
  async getBlobForGif(imageData: string) {
    const previewGifBlob = await getBlob(imageData);
    return previewGifBlob;
  }

  async updateGifRating(rating: number) {
    if (this.$store.state.fullImageMode) {
      await this.$store.dispatch('setGifData', {
        rating,
        key: `ggid-${this.syncedImageId}`,
        image: await this.getBlobForGif(this.syncedFullImageData),
        preview: await this.getBlobForGif(this.syncedpreviewImageData),
      });
    } else {
      await this.$store.dispatch('setGifData', {
        rating,
        key: `ggid-${this.syncedImageId}`,
        image: this.syncedFullImageData,
        preview: this.syncedpreviewImageData,
      });
    }
    const currentCount = await this.$store.dispatch('getGifCount');
    if (this.gifCount !== currentCount) { this.$store.commit('setGifCount', currentCount); }
  }


  async removeGif() {
    await this.$store.dispatch('removeGifData', `ggid-${this.syncedImageId}`);
    this.rating = 0;
    this.gifCount -= 1;
    this.$store.commit('setGifCount', this.$store.state.gifCount - 1);
  }

  icons = {
    mdiClose,
    mdiDownload,
    mdiHeartOutline,
    mdiHeart,
    mdiHeartHalfFull,
    mdiTrashCan,
  }

  gifCount: number = 0;

  rating: number = 0;

  maxWindowSize: number = window.innerHeight / 1.5;
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
