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
            maxlength="25"
            color="black"
            clearable
            counter
            placeholder="Enter a search phrase"
            @click:clear="clearTextField"
          />
        </v-form>
        <v-row
          align="start"
          justify="center"
        >
          <v-img
            v-if="translatedGif"
            :src="translatedGif"
            :lazy-src="translatedGif"
            contain
            max-height="400"
            max-width="300"
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
          <v-item-group v-if="translatedGif">
            <v-btn
              large
              icon
            >
              <v-icon large>
                {{ icons.mdiTrashCan }}
              </v-icon>
            </v-btn>
            <v-btn
              large
              icon
            >
              <v-icon large>
                {{ icons.mdiDownload }}
              </v-icon>
            </v-btn>
          </v-item-group>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mdiMagnify, mdiTrashCan, mdiDownload } from '@mdi/js';
import { getTranslateGifFromGiphy } from '@/request';

@Component
export default class Translate extends Vue {
  icons = {
    mdiMagnify, mdiTrashCan, mdiDownload,
  }

  hasError: boolean = false

  wasSuccessful: boolean = false

  weirdnessSlider: number = 5;

  translatedGif: string = '';

  isInputValid: boolean = false;

  inputValue: string = '';

  clearTextField() {
    this.translatedGif = '';
    this.hasError = false;
    this.wasSuccessful = false;
  }

  async getTranslatedGif() {
    try {
      const result = await getTranslateGifFromGiphy(this.inputValue, this.weirdnessSlider);
      this.hasError = false;
      this.wasSuccessful = true;
      this.translatedGif = result.images.original.webp;
    } catch {
      this.hasError = true;
      this.wasSuccessful = false;
    }
  }
}
</script>
