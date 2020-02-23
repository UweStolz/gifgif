<template>
  <div style="height: 100%;">
    <v-card-title
      v-if="!isEmpty"
      class="display-2 justify-center"
    >
      Favourites
    </v-card-title>
    <Empty
      v-if="isEmpty"
    />
    <v-expansion-panels
      v-else
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
    [key: number]: { images: ArrayBuffer[], previews: string[] };
    1: { images: ArrayBuffer[], previews: string[] };
    2: { images: ArrayBuffer[], previews: string[] };
    3: { images: ArrayBuffer[], previews: string[] };
    4: { images: ArrayBuffer[], previews: string[] };
    5: { images: ArrayBuffer[], previews: string[] };
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

  data: Data = {
    previewUrl: {
      1: { images: [], previews: [] },
      2: { images: [], previews: [] },
      3: { images: [], previews: [] },
      4: { images: [], previews: [] },
      5: { images: [], previews: [] },
    },
  };

  async mounted(): Promise<void> {
    const gifData: GifStore = await this.$store.dispatch('getAllData');
    this.isEmpty = gifData.keys.length === 0;
    if (!this.isEmpty) {
      gifData.values.forEach((value: GifData, index) => {
        const previewImageUrl: string = arrayBufferToImage(value.preview);
        if (value.rating > 0 && value.rating < 6) {
          this.data.previewUrl[value.rating].previews.push(previewImageUrl);
          this.data.previewUrl[value.rating].images.push(gifData.keys[index]);
        }
      });
    }
  }
}
</script>
