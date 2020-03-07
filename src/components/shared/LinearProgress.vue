<template
  functional
>
  <v-progress-linear
    indeterminate
    color="red"
  />
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'LinearProgress',
  functional: true,
});
</script>
