<template>
  <TranslateView />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TranslateView from '../components/Translate/index.vue';

@Component({
  components: {
    TranslateView,
  },
})
export default class Translate extends Vue { }
</script>
