<template>
  <v-snackbar
    :value="syncVisibility"
    :timeout="timeout"
    :color="color"
    top
  >
    {{ message }}
    <v-btn
      v-if="showCloseButton"
      dark
      text
      icon
      @click="syncVisibility = false"
    >
      <v-icon>
        {{ icons.mdiClose }}<v-icon />
      </v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script lang="ts">
import {
  Component, Vue, Prop, PropSync,
} from 'vue-property-decorator';
import { mdiClose } from '@mdi/js';

@Component
export default class Snackbar extends Vue {
@PropSync('visibility', { default: false }) syncVisibility!: boolean

@Prop({ default: 'info' }) color!: string

@Prop({ default: false }) showCloseButton!: boolean;

@Prop({ default: 'Whoops something went wrong' }) message!: string

@Prop({ default: 3000 }) timeout: number = 3000;

icons = { mdiClose }
}
</script>
