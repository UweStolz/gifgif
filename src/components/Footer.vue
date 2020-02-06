<template functional>
  <v-footer
    color="red darken-3"
    app
    padless
  >
    <v-col
      class="text-center"
      cols="12"
    >
      <div
        style="color: white;"
      >
        {{ new Date().getFullYear() }} - <strong>GIFGIF</strong>
      </div>
    </v-col>
  </v-footer>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Footer',
  functional: true,
});
</script>
