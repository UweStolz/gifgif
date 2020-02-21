<template>
  <v-expansion-panel-content>
    <Dialog
      :show-dialog.sync="dialog"
    />
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
            <v-hover
              v-slot:default="{ hover }"
            >
              <v-img
                :src="contentData[index]"
                contain
                max-width="200"
                max-height="200"
                @click="dialog = true"
              >
                <div
                  v-if="hover"
                  class="d-flex"
                  style="height: 100%; background: rgba(244,67,54,0.3);"
                />
              </v-img>
            </v-hover>
          </v-item>
        </v-row>
      </v-container>
    </v-item-group>
  </v-expansion-panel-content>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Dialog from './Dialog.vue';

@Component({
  components: {
    Dialog,
  },
})
export default class PanelContent extends Vue {
@Prop({ required: true }) contentData: any

dialog: boolean = false;

indexValue: number = 0;
}
</script>
