<template>
  <v-dialog
    v-model="syncedShowDialog"
    width="500"
  >
    <v-card>
      <v-card-title>Lorem ipsum dolor sit amet</v-card-title>
      <v-divider />
      <v-card-actions>
        <v-btn
          color="primary"
          @click="syncedShowDialog = false"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import {
  Vue, Component, PropSync,
} from 'vue-property-decorator';

@Component
export default class Dialog extends Vue {
@PropSync('showDialog', { type: Boolean, required: true }) syncedShowDialog!: boolean;
}
</script>
