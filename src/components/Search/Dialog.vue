<template>
  <v-dialog
    v-model="syncedShowDialog"
    :full-image-data="syncedFullImageData"
    :preview-image-data="syncedpreviewImageData"
    :image-id="syncedImageId"
    :width="$vuetify.breakpoint.xsOnly ? '100%' : '60%'"
    @click:outside="resetProps"
  >
    <v-card style="overflow: hidden;">
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
      >
        <template
          v-slot:placeholder
        >
          <linear-progress />
        </template>
      </v-img>
      <card-actions
        :rating.sync="rating"
        :show-rating="true"
        :image-id="syncedImageId"
        :image-data="syncedFullImageData"
        :preview-image-data="syncedpreviewImageData"
        @delete="resetProps"
      />
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import {
  Vue, Component, PropSync, Watch,
} from 'vue-property-decorator';
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
  @PropSync('showDialog', { type: Boolean, required: true }) syncedShowDialog!: boolean;

  @PropSync('fullImageData', { type: String, required: true }) syncedFullImageData!: string;

  @PropSync('previewImageData', { type: String, required: true }) syncedpreviewImageData!: string;

  @PropSync('imageId', { type: String, required: true }) syncedImageId!: string;

  @Watch('syncedShowDialog')
  async getRating() {
    if (this.syncedShowDialog) {
      const gifData = await this.$store.dispatch('getGifData', `ggid-${this.syncedImageId}`);
      this.rating = gifData ? this.rating = gifData.rating : 0;
    }
  }

  resetProps(): void {
    this.syncedShowDialog = false;
    this.syncedFullImageData = '';
    this.rating = 0;
  }

  rating: number = 0;

  icons = { mdiClose }

  maxWindowSize: number = window.innerHeight / 1.5;
}
</script>
