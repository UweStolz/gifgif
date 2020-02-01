<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Toolbar from '@/components/Toolbar.vue';
import Frontpage from '@/components/Frontpage.vue';
import Footer from '@/components/Footer.vue';

 @Component({
   components: {
     Toolbar,
     Frontpage,
     Footer,
   },
 })
export default class Home extends Vue {}
</script>
