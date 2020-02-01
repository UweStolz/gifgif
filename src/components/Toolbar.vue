<template>
  <v-app-bar
    app
    color="red darken-3"
    flat
    clipped-left
    dark
  >
    <div class="d-flex align-center">
      <h1>GIFGIF</h1>
    </div>
  </v-app-bar>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Toolbar extends Vue {}
</script>
