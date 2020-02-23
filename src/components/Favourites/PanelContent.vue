<template>
  <v-expansion-panel-content id="pa-exp-con">
    <v-item-group>
      <v-container>
        <v-row
          justify="start"
          align="start"
        >
          <Dialog
            :show-dialog.sync="dialog"
            :full-image-data.sync="fullImageBuffer"
            @delete="deleteGif"
          />
          <v-item
            v-for="(z, index) in previewImages.length"
            :key="z"
          >
            <v-lazy min-height="50">
              <v-img
                id="imageHover"
                :src="previewImages[index]"
                :lazy-src="previewImages[index]"
                contain
                max-width="250"
                max-height="200"
                @click="openDialog(index)"
              />
            </v-lazy>
          </v-item>
        </v-row>
      </v-container>
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

@Prop({ required: true }) fullImages!: ArrayBuffer[];

fullImageBuffer: null|ArrayBuffer = null;

dialog: boolean = false;

selectedIndex: number = -1;

openDialog(index: number) {
  this.dialog = true;
  this.fullImageBuffer = this.fullImages[index];
  this.selectedIndex = index;
}

async deleteGif(payload: ArrayBuffer): Promise<void> {
  this.previewImages.splice(this.selectedIndex, 1);
  this.fullImages.splice(this.selectedIndex, 1);
  await this.$store.dispatch('removeGifData', payload);
  this.$store.commit('setGifCount', this.$store.state.gifCount -= 1);
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
