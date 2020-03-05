<template>
  <v-expansion-panel-content id="pa-exp-con">
    <v-item-group>
      <v-row
        justify="start"
        align="start"
      >
        <Dialog
          :show-dialog.sync="dialog"
          :full-image-data.sync="fullImage"
          :image-id.sync="imageId"
          @delete="deleteGif"
        />
        <v-item
          v-for="(z, index) in previewImages.length"
          :key="z"
          class="mx-auto"
        >
          <v-lazy min-height="50">
            <v-img
              id="imageHover"
              :src="previewImages[index]"
              :lazy-src="previewImages[index]"

              max-width="230"
              max-height="200"
              @click="openDialog(index)"
            />
          </v-lazy>
        </v-item>
      </v-row>
    </v-item-group>
  </v-expansion-panel-content>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Dialog from './Dialog.vue';

@Component({
  components: {
    Dialog,
  },
})
export default class PanelContent extends Vue {
  @Prop({ required: true }) previewImages!: string[];

  @Prop({ required: true }) fullImages!: (Blob | string)[];

  @Prop({ required: true }) imageId!: string[];

  fullImage: null | Blob | string = null;

  dialog: boolean = false;

  selectedIndex: number = -1;

  openDialog(index: number) {
    this.dialog = true;
    this.fullImage = this.fullImages[index];
    this.selectedIndex = index;
  }

  async deleteGif(payload: string): Promise<void> {
    await this.$store.dispatch('removeGifData', payload[this.selectedIndex]);
    this.$store.commit('setGifCount', this.$store.state.gifCount - 1);
    this.previewImages.splice(this.selectedIndex, 1);
    this.fullImages.splice(this.selectedIndex, 1);
    this.imageId.splice(this.selectedIndex, 1);
    this.selectedIndex = -1;
  }
}
</script>

<style scoped>
#pa-exp-con {
  overflow: hidden;
}
#imageHover:hover {
  transform: scale(1.3);
  overflow-x: hidden;
  z-index: 999;
}
</style>
