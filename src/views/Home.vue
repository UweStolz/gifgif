<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Frontpage from '@/components/Frontpage.vue';

 @Component({
   components: {
     Frontpage,
   },
 })
export default class Home extends Vue {}
</script>
