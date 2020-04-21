<template>
  <v-card-actions style="overflow-x: hidden;">
    <v-row justify="center">
      <v-item-group>
        <v-rating
          v-if="showRating"
          id="s-ca-rating"
          v-model="syncRrating"
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
          id="s-ca-download-btn"
          large
          icon
          @click="saveImage"
        >
          <v-icon
            id="downloadIcon"
            :large="$vuetify.breakpoint.xlOnly"
          >
            {{ icons.mdiDownload }}
          </v-icon>
        </v-btn>
        <v-btn
          id="s-ca-remove-btn"
          :disabled="syncRrating === 0"
          large
          icon
          @click="removeGif"
        >
          <v-icon
            id="trashIcon"
            :large="$vuetify.breakpoint.xlOnly"
          >
            {{ icons.mdiTrashCan }}
          </v-icon>
        </v-btn>
        <v-btn
          v-if="isFrontpage"
          large
          icon
          @click="syncFunction"
        >
          <v-icon :large="$vuetify.breakpoint.xlOnly">
            {{ icons.mdiSync }}
          </v-icon>
        </v-btn>
      </v-item-group>
    </v-row>
  </v-card-actions>
</template>

<script lang="ts">
import {
  Vue, Component, Prop, PropSync, Emit, Watch,
} from 'vue-property-decorator';
import {
  mdiClose, mdiDownload, mdiHeartOutline, mdiHeart, mdiHeartHalfFull, mdiTrashCan, mdiSync,
} from '@mdi/js';
import { getBlob } from '@/request';
import { saveAs } from 'file-saver';

@Component
export default class CardActions extends Vue {
  @PropSync('previewImageData') syncPreviewImageData!: Blob | string;

  @PropSync('imageData', { required: true }) syncImageData!: Blob | string;

  @PropSync('imageId', { required: true }) syncImageId!: string;

  @PropSync('rating', { default: -1, type: Number }) syncRrating!: number;

  @Prop({ default: false, type: Boolean }) showRating!: boolean;

  @Prop({ default: false, type: Boolean }) isFrontpage!: boolean;

  @Prop({ type: Function }) syncFunction!: Function;

  @Emit('delete')
  deleteGifData() {
    return this.propImageId;
  }

  @Watch('syncImageId', { immediate: true })
  setId() {
    if (this.syncImageId) {
      this.propImageId = this.syncImageId.startsWith('ggid') ? this.syncImageId : `ggid-${this.syncImageId}`;
    }
  }

  @Watch('syncImageData', { immediate: true })
  setImageData() {
    this.propImageData = this.syncImageData;
  }

  @Watch('syncPreviewImageData', { immediate: true })
  setPreviewImageData() {
    this.propPreviewImageData = this.syncPreviewImageData;
  }

  icons = {
    mdiClose,
    mdiDownload,
    mdiHeartOutline,
    mdiHeart,
    mdiHeartHalfFull,
    mdiTrashCan,
    mdiSync,
  }

  propImageId = '';

  propImageData = this.syncImageData;

  propPreviewImageData = this.syncPreviewImageData;

  saveImage(): void {
    saveAs(this.propImageData, this.propImageId);
  }

  async removeGif(): Promise<void> {
    await this.$store.dispatch('removeGifData', this.propImageId);
    this.syncRrating = 0;
    this.deleteGifData();
  }

  async updateGifRating(rating: number): Promise<void> {
    if (this.$store.state.fullImageMode) {
      await this.$store.dispatch('setGifData', {
        rating,
        key: this.propImageId,
        image: await getBlob(this.propImageData as string),
        preview: await getBlob(this.propPreviewImageData as string),
      });
    } else {
      await this.$store.dispatch('setGifData', {
        rating,
        key: this.propImageId,
        image: this.propImageData,
        preview: this.propPreviewImageData,
      });
    }
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
