<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Frontpage from '@/components/Frontpage.vue';
import Footer from '@/components/Footer.vue';

 @Component({
   components: {
     Frontpage,
     Footer,
   },
 })
export default class Home extends Vue {}
</script>
