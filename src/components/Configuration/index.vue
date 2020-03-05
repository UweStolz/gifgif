<template>
  <v-container fluid>
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
                      icon
                      large
                      :loading="isLoading"
                      :disabled="$store.state.gifCount < 1"
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
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { getBlob } from '../../request';

@Component
export default class Configuration extends Vue {
  icons = {
    mdiCogs, mdiClose, mdiPackageDown, mdiFolderZip,
  }

  showDialog: boolean = false;

  isLoading: boolean = false;

  loaderValue: number = 0;

  finishedZipGeneration: boolean = false;

  zipFile: null | Blob = null;

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

  async deleteGifData() {
    await this.$store.dispatch('removeCompleteGifData');
    this.$store.commit('setGifCount', 0);
    this.showDialog = false;
  }

  async generateZip() {
    this.isLoading = true;
    this.finishedZipGeneration = false;
    const data: Database.GifStore = await this.$store.dispatch('getAllData');
    const zip = new JSZip();

    // eslint-disable-next-line no-restricted-syntax
    for (const [index, gifData] of data.values.entries()) {
      const blob = typeof gifData.image === 'string'
        // eslint-disable-next-line no-await-in-loop
        ? await getBlob(gifData.image as string)
        : gifData.image;
      const fileType = blob?.type.slice((Math.max(0, blob.type.lastIndexOf('/')) || Infinity) + 1);
      zip.folder(`rating-${gifData.rating}`).file(`gif-${index}.${fileType}`, blob);
    }

    this.zipFile = await zip.generateAsync({ type: 'blob' }, (meta) => {
      this.loaderValue = parseInt(meta.percent.toPrecision(2), 10);
    });
    this.isLoading = false;
    this.finishedZipGeneration = true;
  }

  downloadZip() {
    if (this.zipFile) {
      saveAs(this.zipFile, 'gifs.zip');
    }
  }
}
</script>
