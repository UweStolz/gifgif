<template>
  <v-container fluid>
    <v-row
      align="start"
      justify="center"
    >
      <v-card
        flat
        tile
        :width="$vuetify.breakpoint.xsOnly ? '90%' : '80%'"
      >
        <v-slider
          v-model="weirdnessSlider"
          label="Weirdness factor"
          style="margin-top: 30px;"
          track-fill-color="red darken-3"
          track-color="black"
          thumb-color="red"
          min="1"
          max="10"
          thumb-label="always"
          ticks="always"
        />
        <v-form
          :value="isInputValid"
          @submit="getTranslatedGif"
        >
          <v-text-field
            v-model="inputValue"
            :error="hasError"
            :success="wasSuccessful"
            :error-messages="hasError ? 'Oh no, something went wrong!' : ''"
            :prepend-icon="icons.mdiMagnify"
            :prepend-inner-icon="icons.mdiEmoticonOutline"
            maxlength="25"
            color="black"
            clearable
            counter
            placeholder="Enter a search phrase"
            @click:prepend-inner="openEmojiMart"
            @click:clear="clearTextField"
          />
        </v-form>
        <Picker
          v-if="showPicker && !$vuetify.breakpoint.xsOnly"
          :style="{ position: 'absolute', bottom: '-345px', right: '362px' }"
          set="emojione"
          emoji=""
          :show-preview="false"
          :show-skin-tones="false"
          :sheet-size="32"
          title="Pick your emoji…"
          @select="addEmoji"
        />
        <v-row
          align="start"
          justify="center"
        >
          <v-img
            v-if="translatedGif"
            :src="translatedGif"
            :lazy-src="translatedGif"
            contain
            max-height="500"
            max-width="600"
            height="100%"
            width="100%"
          >
            <template v-slot:placeholder>
              <v-progress-linear
                indeterminate
                color="red"
              />
            </template>
          </v-img>
        </v-row>
        <v-card-actions>
          <v-row justify="center">
            <v-item-group v-if="translatedGif">
              <v-btn
                :disabled="rating === 0"
                large
                icon
                @click="removeGif"
              >
                <v-icon
                  id="trashIcon"
                  large
                >
                  {{ icons.mdiTrashCan }}
                </v-icon>
              </v-btn>
              <v-btn
                large
                icon
                @click="saveImage"
              >
                <v-icon
                  id="downloadIcon"
                  large
                >
                  {{ icons.mdiDownload }}
                </v-icon>
              </v-btn>
              <v-rating
                v-model="rating"
                length="5"
                :empty-icon="icons.mdiHeartOutline"
                :full-icon="icons.mdiHeart"
                :half-icon="icons.mdiHeartHalfFull"
                hover
                x-large
                color="red"
                background-color="red"
                @input="updateGifRating"
              />
            </v-item-group>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import {
  mdiMagnify, mdiTrashCan, mdiDownload, mdiHeartOutline, mdiHeart, mdiHeartHalfFull, mdiEmoticonOutline,
} from '@mdi/js';
import { getTranslateGifFromGiphy, getBlob } from '@/request';
import { saveAs } from 'file-saver';
// @ts-ignore
import { Picker } from 'emoji-mart-vue';

@Component({
  components: {
    Picker,
  },
})
export default class Translate extends Vue {
  icons = {
    mdiMagnify,
    mdiTrashCan,
    mdiDownload,
    mdiHeartOutline,
    mdiHeart,
    mdiHeartHalfFull,
    mdiEmoticonOutline,
  }

  rating: number = 0;

  hasError: boolean = false

  wasSuccessful: boolean = false

  weirdnessSlider: number = 5;

  translatedGif: string = '';

  translatedGifPreview: string = '';

  translatedGifId: string = '';

  isInputValid: boolean = false;

  inputValue: string = '';

  showPicker: boolean = false;

  addEmoji(payload: any) {
    if (this.inputValue.length < 24) { this.inputValue += `${payload.native}`; }
  }

  openEmojiMart() {
    this.showPicker = true;
  }

  clearTextField() {
    this.translatedGif = '';
    this.translatedGifId = '';
    this.hasError = false;
    this.wasSuccessful = false;
    this.rating = 0;
  }

  async getRating() {
    const gifData = await this.$store.dispatch('getGifData', `ggid-${this.translatedGifId}`);
    this.rating = gifData ? this.rating = gifData.rating : 0;
  }

  async getTranslatedGif() {
    try {
      const result = await getTranslateGifFromGiphy(this.inputValue, this.weirdnessSlider);
      this.translatedGifId = result.id;
      this.translatedGifPreview = result.images.fixed_width.webp;
      this.translatedGif = result.images.original.webp || result.images.original.url;
      await this.getRating();
      this.hasError = false;
      this.wasSuccessful = true;
    } catch {
      this.hasError = true;
      this.wasSuccessful = false;
    }
  }

  async removeGif() {
    this.rating = 0;
    await this.$store.dispatch('removeGifData', `ggid-${this.translatedGifId}`);
    this.$store.commit('setGifCount', this.$store.state.gifCount - 1);
  }

  // eslint-disable-next-line class-methods-use-this
  async getBlobForGif(imageData: string) {
    const previewGifBlob = await getBlob(imageData);
    return previewGifBlob;
  }

  async updateGifRating(rating: number) {
    if (this.$store.state.fullImageMode) {
      await this.$store.dispatch('setGifData', {
        rating,
        key: `ggid-${this.translatedGifId}`,
        image: await this.getBlobForGif(this.translatedGif),
        preview: await this.getBlobForGif(this.translatedGifPreview),
      });
    } else {
      await this.$store.dispatch('setGifData', {
        rating,
        key: `ggid-${this.translatedGifId}`,
        image: this.translatedGif,
        preview: this.translatedGifPreview,
      });
    }
    const currentCount = await this.$store.dispatch('getGifCount');
    this.$store.commit('setGifCount', currentCount);
  }

  saveImage(): void {
    saveAs(this.translatedGif, `ggid-${this.translatedGifId}`);
  }
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
