<template functional>
  <v-app-bar
    app
    color="red darken-3"
    flat
    clipped-left
    dark
  >
    <v-btn
      :to="'/'"
    >
      <div
        class="d-flex align-center"
      >
        <h1>GIFGIF</h1>
      </div>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Toolbar',
  functional: true,
});
</script>
