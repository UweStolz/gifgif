<template functional>
  <v-container
    fluid
    fill-height
  >
    <v-col
      class="text-center "
      cols="12"
    >
      <v-sheet
        class="display-2"
        tile
        width="100%"
        height="100%"
      >
        Nothing to show here ☹️
      </v-sheet>
    </v-col>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Empty',
  functional: true,
});
</script>
