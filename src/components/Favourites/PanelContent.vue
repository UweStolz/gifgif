<template>
  <v-expansion-panel-content>
    <v-item-group>
      <v-container>
        <v-row
          justify="start"
          align="start"
        >
          <v-item
            v-for="(z, index) in contentData.length"
            :key="z"
          >
            <v-img
              :src="contentData[index]"
              contain
              max-width="200"
              max-height="200"
            />
          </v-item>
        </v-row>
      </v-container>
    </v-item-group>
  </v-expansion-panel-content>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class PanelContent extends Vue {
@Prop({ required: true }) contentData: any

indexValue: number = 0;
}
</script>
