<template>
  <v-container
    fluid
  >
    <v-row
      align="start"
      justify="center"
    >
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
        width="80%"
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
import { mdiCogs, mdiClose } from '@mdi/js';

@Component
export default class Configuration extends Vue {
icons = { mdiCogs, mdiClose }

showDialog: boolean = false;

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
}
</script>
