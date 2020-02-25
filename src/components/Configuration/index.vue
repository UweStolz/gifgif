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
              <thead>
                <tr>
                  <th class="text-left">
                    Setting
                  </th>
                  <th class="text-left">
                    Status
                  </th>
                </tr>
              </thead>
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
                      <strong>Warning!</strong> Very storage intensive
                    </v-alert>
                  </td>
                  <td>
                    <v-switch
                      v-model="item.status"
                      color="red darken-3"
                      @click="item.action"
                    />
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
import { mdiCogs } from '@mdi/js';

@Component
export default class Configuration extends Vue {
  mounted() {
    this.configuration.fullImageMode.status = this.$store.state.fullImageMode;
  }

icons = { mdiCogs }

configuration = {
  fullImageMode: {
    name: 'Save full image',
    status: false,
    action: async () => { await this.$store.dispatch('setConfig', { value: this.configuration.fullImageMode.status, key: 'fullImageMode' }); },
  },
}
}
</script>
