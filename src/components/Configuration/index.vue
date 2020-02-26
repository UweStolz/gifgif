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
                    Currently estimated storage usage: <strong>{{ estimateUsage }}</strong>
                  </td>
                  <td>
                    <v-btn
                      color="error"
                    >
                      DELETE
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <!-- <v-alert
            text
            border="left"
            type="error"
          >
            <strong>Danger Zone</strong>
            <v-spacer />
          </v-alert> -->
        </v-col>
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mdiCogs } from '@mdi/js';
// @ts-ignore
import byteSize from 'byte-size';

@Component
export default class Configuration extends Vue {
icons = { mdiCogs }

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

estimateUsage: null|number = null;

async mounted() {
  if ('storage' in navigator && 'estimate' in navigator.storage) {
    const estimate = await navigator.storage.estimate();
    this.estimateUsage = byteSize(estimate.usage);
  }
}
}
</script>
