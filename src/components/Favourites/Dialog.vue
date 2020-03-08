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
      >
        <template
          v-slot:placeholder
        >
          <linear-progress />
        </template>
      </v-img>
      <card-actions
        :image-id.sync="syncedImageId"
        :image-data.sync="syncedFullImageData"
        @delete="deleteHandler"
      />
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import {
  Vue, Component, PropSync, Watch,
} from 'vue-property-decorator';
import blobToImage from '@/util/imageHelper';
import { mdiClose } from '@mdi/js';
import CardActions from '@/components/shared/CardActions.vue';
import LinearProgress from '@/components/shared/LinearProgress.vue';

@Component({
  components: {
    CardActions,
    LinearProgress,
  },
})
export default class Dialog extends Vue {
  @Watch('syncedFullImageData')
  convertBlobToImage() {
    if (this.syncedFullImageData) {
      this.imageData = this.syncedFullImageData instanceof Blob
        ? blobToImage(this.syncedFullImageData as Blob)
        : this.syncedFullImageData as string;
    }
  }

  @PropSync('showDialog', { type: Boolean, required: true }) syncedShowDialog!: boolean;

  @PropSync('fullImageData', { required: true }) syncedFullImageData!: null | Blob | string;

  @PropSync('imageId', { required: true }) syncedImageId!: string;

  deleteHandler(payload: string): void {
    this.$emit('delete', payload);
    this.resetProps();
  }

  resetProps(): void {
    this.syncedShowDialog = false;
    this.syncedFullImageData = null;
  }

  icons = { mdiClose }

  imageData: string = '';

  maxWindowSize: number = window.innerHeight / 1.5;
}
</script>
