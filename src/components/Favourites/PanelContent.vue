<template>
  <v-expansion-panel-content>
    <v-item-group>
      <v-container>
        <v-row
          justify="start"
          align="start"
        >
          <Dialog
            :show-dialog.sync="dialog"
            :full-image-data.sync="fullImageBuffer"
          />
          <v-item
            v-for="(z, index) in previewImages.length"
            :key="z"
          >
            <v-hover
              v-slot:default="{ hover }"
            >
              <v-img
                :src="previewImages[index]"
                contain
                max-width="200"
                max-height="200"
                @click="openDialog(index)"
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
@Prop({ required: true }) previewImages!: string[];

@Prop({ required: true }) fullImages!: ArrayBuffer[];

fullImageBuffer: null|ArrayBuffer = null;

dialog: boolean = false;

indexValue: number = 0;

openDialog(index: number) {
  this.dialog = true;
  this.fullImageBuffer = this.fullImages[index];
}
}
</script>
