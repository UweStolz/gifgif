<template>
  <v-footer
    color="red darken-3"
    app
    fixed
  >
    <v-col
      class="text-center"
      cols="12"
    >
      <div style="color: white;">
        {{ new Date().getFullYear() }} -
        <v-btn
          text
          tile
          color="white"
          :to="'/about'"
        >
          About
        </v-btn>
        - <strong>GIFGIF</strong>
      </div>
    </v-col>
  </v-footer>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Footer extends Vue { }
</script>
