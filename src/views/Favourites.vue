<template>
  <FavouritesView />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FavouritesView from '@/components/Favourites.vue';

 @Component({
   components: {
     FavouritesView,
   },
 })
export default class Favourites extends Vue {}
</script>
