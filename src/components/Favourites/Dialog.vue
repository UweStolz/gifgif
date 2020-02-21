<template>
  <v-dialog
    v-model="showDialog"
    width="500"
  >
    <v-card>
      <v-card-title>Lorem ipsum dolor sit amet</v-card-title>
      <v-divider />
      <v-card-actions>
        <v-btn
          color="primary"
          @click="dialog = false"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Dialog extends Vue {
@Prop({ required: true }) showDialog: boolean = false;

dialog: boolean = this.showDialog;
}
</script>
