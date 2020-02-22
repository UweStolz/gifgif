<template>
  <v-dialog
    v-model="syncedShowDialog"
    :full-image-data="syncedFullImageData"
    width="500"
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
        :src="imageBlob"
        height="100%"
        width="100%"
      />
      <v-card-actions>
        <v-btn
          :href="imageBlob"
          icon
        >
          <v-icon>{{ icons.mdiDownload }}</v-icon>
        </v-btn>
        <v-btn
          icon
          @click="deleteGifData"
        >
          <v-icon>{{ icons.mdiTrashCan }}</v-icon>
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
      this.imageBlob = arrayBufferToImage(this.syncedFullImageData);
    }
  }

@PropSync('showDialog', { type: Boolean, required: true }) syncedShowDialog!: boolean;

@PropSync('fullImageData', { required: true }) syncedFullImageData!: null|ArrayBuffer;

@Emit('delete')
deleteGifData() {
  return this.syncedFullImageData;
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

imageBlob: string = '';
}
</script>
