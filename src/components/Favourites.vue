<template>
  <v-card
    class="mx-auto"
    height="90%"
    width="90%"
  >
    <v-container
      fluid
      fill-height
    >
      <v-row
        justify="center"
      />
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Favourites extends Vue {}
</script>
