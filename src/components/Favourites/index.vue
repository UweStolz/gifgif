<template>
  <div style="height: 100%;">
    <v-card-title
      v-if="!isDataEmpty && evaluatedKey !== 0"
      class="display-2 justify-center"
    >
      Favourites
    </v-card-title>
    <Empty v-if="isDataEmpty && evaluatedKey !== 0" />
    <v-expansion-panels
      v-if="!isDataEmpty && evaluatedKey !== 0"
      popout
      hover
    >
      <v-expansion-panel
        v-for="x in 5"
        v-show="data.previewUrl[x].previews.length === 0 ? false : true"
        :key="x"
      >
        <v-expansion-panel-header>
          <v-col cols="1">
            <v-avatar
              color="grey"
              size="32"
              v-text="data.previewUrl[x].previews.length"
            />
          </v-col>
          <v-row justify="center">
            <v-icon
              v-for="y in x++"
              :key="y"
              x-large
              color="red"
            >
              {{ icons.mdiHeart }}
            </v-icon>
          </v-row>
        </v-expansion-panel-header>
        <PanelContent
          :preview-images="data.previewUrl[x-1].previews"
          :full-images="data.previewUrl[x-1].images"
          :image-id="data.previewUrl[x-1].id"
        />
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import {
  mdiHeart,
} from '@mdi/js';
import blobToImage from '@/util/imageHelper';
import Empty from './Empty.vue';
import PanelContent from './PanelContent.vue';


interface Data {
  previewUrl: {
    [key: number]: { id: string[], images: (Blob | string)[], previews: string[] };
  }
}

@Component({
  components: {
    PanelContent,
    Empty,
  },
})
export default class Favourites extends Vue {
  @Watch('data', { deep: true })
  watchData() {
    let counter = 0;
    for (let index = 1; index <= 5; index += 1) {
      if (this.data.previewUrl[index].id.length === 0) { counter += 1; }
    }
    this.isDataEmpty = counter === 5;
  }

  icons = { mdiHeart }

  isDataEmpty: null | boolean = null;

  evaluatedKey: number = 0;

  data: Data = {
    previewUrl: {
      1: { id: [], images: [], previews: [] },
      2: { id: [], images: [], previews: [] },
      3: { id: [], images: [], previews: [] },
      4: { id: [], images: [], previews: [] },
      5: { id: [], images: [], previews: [] },
    },
  };

  async mounted(): Promise<void> {
    const gifData: Database.GifStore = await this.$store.dispatch('getAllData');
    this.isDataEmpty = gifData.keys.length === 0;
    this.evaluatedKey += 1;
    if (!this.isDataEmpty) {
      gifData.values.forEach((value: Database.GifData, index) => {
        if (value.rating > 0 && value.rating < 6) {
          let previewImageUrl = value.preview;
          if (value.preview instanceof Blob) {
            previewImageUrl = blobToImage(value.preview as Blob);
          }
          this.data.previewUrl[value.rating].previews.push(previewImageUrl as string);
          this.data.previewUrl[value.rating].images.push(gifData.values[index].image as any);
          this.data.previewUrl[value.rating].id.push(gifData.keys[index]);
        }
      });
    }
  }
}
</script>
