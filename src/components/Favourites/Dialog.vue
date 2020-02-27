<template>
  <v-dialog
    v-model="syncedShowDialog"
    :full-image-data="syncedFullImageData"
    :image-id="syncedImageId"
    width="600"
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
        max-height="700"
        height="100%"
        width="100%"
      />
      <v-card-actions>
        <v-btn
          :href="imageData"
          large
          icon
        >
          <v-icon
            id="downloadIcon"
          >
            {{ icons.mdiDownload }}
          </v-icon>
        </v-btn>
        <v-btn
          icon
          large
          @click="deleteGifData"
        >
          <v-icon
            id="trashIcon"
          >
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
import arrayBufferToImage from '@/util/imageHelper';
import {
  mdiClose, mdiDownload, mdiTrashCan,
} from '@mdi/js';

@Component
export default class Dialog extends Vue {
@Watch('syncedFullImageData')
  convertBufferToImage() {
    if (this.syncedFullImageData) {
      this.imageData = this.syncedFullImageData instanceof ArrayBuffer
        ? arrayBufferToImage(this.syncedFullImageData as ArrayBuffer)
        : this.syncedFullImageData as string;
    }
  }

@PropSync('showDialog', { type: Boolean, required: true }) syncedShowDialog!: boolean;

@PropSync('fullImageData', { required: true }) syncedFullImageData!: null|ArrayBuffer|string;

@PropSync('imageId', { required: true }) syncedImageId!: string;

@Emit('delete')
deleteGifData() {
  this.syncedShowDialog = false;
  return this.syncedImageId;
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
}
</script>

<style scoped>
#trashIcon:hover{
  color: red;
}
#downloadIcon:hover{
  color:green;
}
</style>
