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
        <v-text-field
          v-model="inputValue"
          :error="hasError"
          :success="wasSuccessful"
          :error-messages="hasError ? 'Oh no, something went wrong!' : ''"
          :prepend-icon="icons.mdiMagnify"
          :prepend-inner-icon="$vuetify.breakpoint.xsOnly ? '' : emoticonToShow"
          maxlength="25"
          color="black"
          clearable
          counter
          placeholder="Enter a search phrase"
          @input="getTranslatedGif"
          @click:prepend-inner="openEmojiMart"
          @click:clear="clearTextField"
        />
        <Picker
          v-if="showPicker"
          id="t-emoji-picker"
          v-click-outside="onClickOutside"
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
              <linear-progress />
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
  mdiMagnify, mdiEmoticonOutline, mdiEmoticonFrownOutline, mdiEmoticonExcitedOutline,
} from '@mdi/js';
import { getTranslateGifFromGiphy } from '@/request';
import { VEmojiPicker } from 'v-emoji-picker';
import CardActions from '@/components/shared/CardActions.vue';
import LinearProgress from '@/components/shared/LinearProgress.vue';

@Component({
  components: {
    Picker: VEmojiPicker,
    CardActions,
    LinearProgress,
  },
})
export default class Translate extends Vue {
  @Watch('inputValue')
  resetState() {
    const shouldResetInputField = this.inputValue?.length === 0;
    if (shouldResetInputField) {
      this.hasError = false;
      this.wasSuccessful = false;
      this.emoticonToShow = this.icons.mdiEmoticonOutline;
      this.inputIsEmoji = false;
    }
  }

  @Watch('weirdnessSlider')
  async getGif(): Promise<void> {
    await this.getTranslatedGif();
  }

  icons = {
    mdiMagnify,
    mdiEmoticonOutline,
    mdiEmoticonFrownOutline,
    mdiEmoticonExcitedOutline,
  }

  rating = 0;

  hasError = false

  wasSuccessful = false

  weirdnessSlider = 5;

  translatedGif = '';

  translatedGifPreview = '';

  translatedGifId = '';

  inputValue = '';

  showPicker = false;

  inputIsEmoji = false;

  emoticonToShow: string = mdiEmoticonOutline;

  onClickOutside(): void {
    this.showPicker = false;
  }

  async addEmoji(payload: any) {
    if (this.inputValue?.length < 24 || !this.inputValue) {
      this.inputValue = this.inputValue ? this.inputValue += payload.data : this.inputValue = payload.data;
      this.inputIsEmoji = true;
      await this.getTranslatedGif();
    }
    this.showPicker = false;
  }

  openEmojiMart() {
    this.clearTextField();
    this.showPicker = !this.showPicker;
  }

  clearTextField() {
    this.translatedGif = '';
    this.translatedGifId = '';
    this.hasError = false;
    this.wasSuccessful = false;
    this.rating = 0;
    this.emoticonToShow = this.icons.mdiEmoticonOutline;
    this.inputIsEmoji = false;
  }

  async getRating() {
    const gifData = await this.$store.dispatch('getGifData', `ggid-${this.translatedGifId}`);
    this.rating = gifData ? this.rating = gifData.rating : 0;
  }

  async getTranslatedGif() {
    const inputLengthIsSufficient = this.inputValue?.length > 2;
    if (inputLengthIsSufficient || (this.inputIsEmoji && this.inputValue?.length > 0)) {
      try {
        const result = await getTranslateGifFromGiphy(this.inputValue, this.weirdnessSlider);
        this.translatedGifId = result.id;
        this.translatedGifPreview = result.images.fixed_width.webp;
        this.translatedGif = result.images.original.webp || result.images.original.url;
        await this.getRating();
        this.hasError = false;
        this.wasSuccessful = true;
        this.emoticonToShow = this.icons.mdiEmoticonExcitedOutline;
      } catch {
        this.emoticonToShow = this.icons.mdiEmoticonFrownOutline;
        this.hasError = true;
        this.wasSuccessful = false;
      }
    }
  }
}
</script>
