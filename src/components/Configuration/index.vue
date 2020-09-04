<template>
  <v-container fluid>
    <Snackbar
      :visibility.sync="showSnackbar"
      :color="snackbarColor"
      :message="snackbarMessage"
      :show-close-button="true"
    />
    <v-row justify="center">
      <v-col cols="auto">
        <v-avatar
          size="100"
          color="#e3e3e3"
          style="border-radius: 60px;"
        >
          <v-icon size="80">
            {{ icons.mdiCogs }}
          </v-icon>
        </v-avatar>
      </v-col>
    </v-row>

    <v-row
      justify="center"
      align="start"
    >
      <v-card
        :width="$vuetify.breakpoint.xsOnly ? '100%' : '80%'"
        flat
        tile
      >
        <v-col cols="auto">
          <v-simple-table
            fixed-header
            height="100%"
          >
            <template v-slot:default>
              <thead />
              <tbody>
                <tr
                  v-for="(item, property) in configuration"
                  :key="item[property]"
                >
                  <td>
                    {{ item.name }}
                    <v-alert
                      dense
                      text
                      border="left"
                      type="warning"
                    >
                      <strong>Warning</strong> Very storage intensive
                    </v-alert>
                  </td>
                  <td>
                    <v-switch
                      v-model="item.status"
                      color="red darken-3"
                      @change="item.action"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    Currently saved GIFs: <strong>{{ $store.state.gifCount }}</strong>
                  </td>
                  <td>
                    <v-dialog
                      v-model="showDialog"
                      max-width="500"
                      width="70%"
                    >
                      <template v-slot:activator="{on}">
                        <v-btn
                          :disabled="$store.state.gifCount < 1"
                          color="error"
                          v-on="on"
                        >
                          DELETE
                        </v-btn>
                      </template>
                      <v-card>
                        <v-card-actions>
                          <v-spacer />
                          <v-btn
                            icon
                            @click="showDialog = false"
                          >
                            <v-icon>{{ icons.mdiClose }}</v-icon>
                          </v-btn>
                        </v-card-actions>
                        <v-alert
                          text
                          type="error"
                        >
                          Do you really want to delete your saved GIFs?
                        </v-alert>
                        <v-card-actions>
                          <v-spacer />
                          <v-btn
                            id="c-modal-del-btn"
                            color="error"
                            @click="deleteGifData"
                          >
                            DELETE
                          </v-btn>
                          <v-spacer />
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </td>
                </tr>
                <tr>
                  <td>
                    Export saved GIFs as ZIP
                  </td>
                  <td>
                    <v-btn
                      id="c-create-zip-btn"
                      icon
                      large
                      :loading="isLoading"
                      :disabled="wasZipBuilt || $store.state.gifCount < 1"
                      @click="generateZip"
                    >
                      <v-icon large>
                        {{ icons.mdiFolderZip }}
                      </v-icon>
                      <template v-slot:loader>
                        <v-progress-circular
                          :value="loaderValue"
                          size="100"
                          rotate="360"
                          color="red"
                        >
                          {{ loaderValue }}
                        </v-progress-circular>
                      </template>
                    </v-btn>
                    <v-btn
                      id="c-download-zip-btn"
                      icon
                      large
                      :disabled="!finishedZipGeneration"
                      @click="downloadZip"
                    >
                      <v-icon large>
                        {{ icons.mdiPackageDown }}
                      </v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import {
  mdiCogs, mdiClose, mdiPackageDown, mdiFolderZip,
} from '@mdi/js';
import Snackbar from '@/components/shared/Snackbar.vue';
import { getBlob } from '../../request';
import saveAs from './saveAs';
import zip from './zip';

@Component({
  components: {
    Snackbar,
  },
})
export default class Configuration extends Vue {
  icons = {
    mdiCogs, mdiClose, mdiPackageDown, mdiFolderZip,
  }

  showSnackbar = false;

  snackbarMessage = '';

  snackbarColor = 'info';

  showDialog = false;

  isLoading = false;

  loaderValue = '0';

  finishedZipGeneration = false;

  zipFile: null | Blob = null;

  wasZipBuilt = false;

  configuration = {
    fullImageMode: {
      name: 'Save full image',
      status: this.$store.state.fullImageMode,
      action: () => {
        this.configuration.fullImageMode.status = !this.$store.state.fullImageMode;
        this.$store.commit('setFullImageMode', this.configuration.fullImageMode.status);
      },
    },
  }

  async deleteGifData(): Promise<void> {
    await this.$store.dispatch('removeCompleteGifData');
    this.showDialog = false;
  }

  async generateZip(): Promise<void> {
    try {
      this.isLoading = true;
      this.finishedZipGeneration = false;
      const data: Database.GifStore = await this.$store.dispatch('getAllData');
      zip.createInstance();
      // eslint-disable-next-line no-restricted-syntax
      for (const [index, gifData] of data.values.entries()) {
        const blob = typeof gifData.image === 'string'
          // eslint-disable-next-line no-await-in-loop
          ? await getBlob(gifData.image as string)
          : gifData.image;
        const fileType = blob?.type.slice((Math.max(0, blob.type.lastIndexOf('/')) || Infinity) + 1);
        zip.addFileToZip(`rating-${gifData.rating}`, `gif-${index}.${fileType}`, blob);
      }

      this.zipFile = await zip.generateZip({ type: 'blob' }, (meta: any) => {
        this.loaderValue = meta.percent.toPrecision(2);
      });
      this.finishedZipGeneration = true;
      this.wasZipBuilt = true;
      this.snackbarMessage = 'ZIP successfully generated';
      this.snackbarColor = 'success';
      this.showSnackbar = true;
    } catch {
      this.snackbarMessage = 'There was an error during the ZIP generation!';
      this.snackbarColor = 'error';
      this.showSnackbar = true;
      this.wasZipBuilt = false;
    } finally {
      this.isLoading = false;
    }
  }

  downloadZip(): void {
    if (this.zipFile) {
      saveAs(this.zipFile, 'gifs.zip');
    }
  }
}
</script>

<style>
.v-data-table table {
  overflow: hidden;
}
</style>
