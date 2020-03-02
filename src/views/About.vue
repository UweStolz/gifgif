<template>
  <AboutView />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AboutView from '../components/About/index.vue';

@Component({
  components: {
    AboutView,
  },
})
export default class About extends Vue { }
</script>
