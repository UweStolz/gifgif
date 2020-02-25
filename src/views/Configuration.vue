<template>
  <ConfigView />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ConfigView from '../components/Configuration/index.vue';

 @Component({
   components: {
     ConfigView,
   },
 })
export default class Configuration extends Vue {}
</script>
