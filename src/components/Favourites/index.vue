<template>
  <div style="height: 100%;">
    <v-card-title
      v-if="!isEmpty && evaluatedKey !== 0"
      class="display-2 justify-center"
    >
      Favourites
    </v-card-title>
    <Empty
      v-if="isEmpty && evaluatedKey !== 0"
    />
    <v-expansion-panels
      v-if="!isEmpty && evaluatedKey !== 0"
      popout
      hover
    >
      <v-expansion-panel
        v-for="x in 5"
        :key="x"
        :readonly="data.previewUrl[x].previews.length === 0 ? true : false"
      >
        <v-expansion-panel-header>
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
import { Vue, Component } from 'vue-property-decorator';
import {
  mdiHeart,
} from '@mdi/js';
// eslint-disable-next-line no-unused-vars
import { GifData, GifStore } from '@/database';
import arrayBufferToImage from '@/util/imageHelper';
import Empty from './Empty.vue';
import PanelContent from './PanelContent.vue';


interface Data {
  previewUrl: {
    [key: number]: { id: string[], images: (ArrayBuffer|string)[], previews: string[] };
    1: { id: string[], images: (ArrayBuffer|string)[], previews: string[] };
    2: { id: string[], images: (ArrayBuffer|string)[], previews: string[] };
    3: { id: string[], images: (ArrayBuffer|string)[], previews: string[] };
    4: { id: string[], images: (ArrayBuffer|string)[], previews: string[] };
    5: { id: string[], images: (ArrayBuffer|string)[], previews: string[] };
  }
}

@Component({
  components: {
    PanelContent,
    Empty,
  },
})
export default class Favourites extends Vue {
  icons = { mdiHeart }

  isEmpty: boolean = false;

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
    const gifData: GifStore = await this.$store.dispatch('getAllData');
    this.isEmpty = gifData.keys.length === 0;
    this.evaluatedKey += 1;
    if (!this.isEmpty) {
      gifData.values.forEach((value: GifData, index) => {
        if (value.rating > 0 && value.rating < 6) {
          let previewImageUrl = value.preview;
          if (value.preview instanceof ArrayBuffer) {
            previewImageUrl = arrayBufferToImage(value.preview as ArrayBuffer);
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
