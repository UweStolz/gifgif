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
        <v-form :value="isInputValid">
          <v-text-field
            v-model="inputValue"
            :error="hasError"
            :success="wasSuccessful"
            :error-messages="hasError ? 'Oh no, something went wrong!' : ''"
            :prepend-icon="icons.mdiMagnify"
            :prepend-inner-icon="$vuetify.breakpoint.xsOnly ? '' : icons.mdiEmoticonOutline"
            maxlength="25"
            color="black"
            clearable
            counter
            placeholder="Enter a search phrase"
            @input="getTranslatedGif(false)"
            @click:prepend-inner="openEmojiMart"
            @click:clear="clearTextField"
          />
        </v-form>
        <Picker
          v-if="showPicker"
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
        <card-actions
          v-if="translatedGif"
          :rating.sync="rating"
          :show-rating="true"
          :image-id.sync="translatedGifId"
          :image-data.sync="translatedGif"
          :preview-image-data.sync="translatedGifPreview"
        />
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import {
  mdiMagnify, mdiEmoticonOutline,
} from '@mdi/js';
import { getTranslateGifFromGiphy } from '@/request';
import VEmojiPicker from 'v-emoji-picker';
import CardActions from '@/components/shared/CardActions.vue';

@Component({
  components: {
    Picker: VEmojiPicker,
    CardActions,
  },
})
export default class Translate extends Vue {
  @Watch('inputValue')
  resetState() {
    if (this.inputValue?.length === 0) {
      this.hasError = false;
      this.wasSuccessful = false;
    }
  }

  icons = {
    mdiMagnify,
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

  async addEmoji(payload: any) {
    if (this.inputValue?.length < 24 || !this.inputValue) {
      this.inputValue = this.inputValue ? this.inputValue += payload.data : this.inputValue = payload.data;
      await this.getTranslatedGif(true);
    }
    this.showPicker = false;
  }

  openEmojiMart() {
    this.showPicker = !this.showPicker;
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

  async getTranslatedGif(fromEmojiPicker?: boolean) {
    if (this.inputValue?.length > 2 || fromEmojiPicker) {
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
