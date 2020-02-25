<template>
  <div>
    <p>I am a Config Page</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mdiCogs } from '@mdi/js';

@Component
export default class Configuration extends Vue {
icons = { mdiCogs }
}
</script>
