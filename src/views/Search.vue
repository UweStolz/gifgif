<template>
  <SearchView />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SearchView from '../components/Search/index.vue';

 @Component({
   components: {
     SearchView,
   },
 })
export default class Search extends Vue {}
</script>
