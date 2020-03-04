<template>
  <v-dialog
    v-model="syncedShowDialog"
    :full-image-data="syncedFullImageData"
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
        :src="imageData"
        :lazy-src="imageData"
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
        <v-btn
          icon
          large
          @click="deleteGifData"
        >
          <v-icon id="trashIcon">
            {{ icons.mdiTrashCan }}
          </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import {
  Vue, Component, PropSync, Watch, Emit,
} from 'vue-property-decorator';
import blobToImage from '@/util/imageHelper';
import {
  mdiClose, mdiDownload, mdiTrashCan,
} from '@mdi/js';
import { saveAs } from 'file-saver';

@Component
export default class Dialog extends Vue {
  @Watch('syncedFullImageData')
  convertBufferToImage() {
    if (this.syncedFullImageData) {
      this.imageData = this.syncedFullImageData instanceof Blob
        ? blobToImage(this.syncedFullImageData as Blob)
        : this.syncedFullImageData as string;
    }
  }

  @PropSync('showDialog', { type: Boolean, required: true }) syncedShowDialog!: boolean;

  @PropSync('fullImageData', { required: true }) syncedFullImageData!: null | ArrayBuffer | string;

  @PropSync('imageId', { required: true }) syncedImageId!: string;

  @Emit('delete')
  deleteGifData() {
    this.syncedShowDialog = false;
    return this.syncedImageId;
  }

  saveImage(): void {
    saveAs(this.imageData, `ggid-${this.syncedImageId}`);
  }

  resetProps(): void {
    this.syncedShowDialog = false;
    this.syncedFullImageData = null;
  }

  icons = {
    mdiClose,
    mdiTrashCan,
    mdiDownload,
  }

  imageData: string = '';

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
