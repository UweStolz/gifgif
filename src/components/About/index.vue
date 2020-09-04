<template>
  <v-container fluid>
    <v-row justify="center">
      <v-card
        tile
        flat
        :width="$vuetify.breakpoint.xsOnly ? '90%' : '50%'"
      >
        <v-card-title class="display-2 justify-center">
          <router-link
            style="color: black;"
            to="/"
          >
            GIFGIF
          </router-link>
        </v-card-title>
        <vue-markdown :source="cardText" />
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
// @ts-ignore - No types available
import VueMarkdown from 'vue-markdown';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const vueLogo = require('@/assets/vue.svg');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const vuetifyLogo = require('@/assets/vuetify.svg');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const githubLogo = require('@/assets/github.svg');

@Component({
  components: {
    'vue-markdown': VueMarkdown,
  },
})
export default class About extends Vue {
  cardText = `
  ---
  
  ## Privacy Policy
  No Personal Data will be Collected!

  ### Browser Storage
  Application information will be saved in the IndexedDB of your Browser, via the [IndexedDB API.](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
  This information is **only** available to **you**.

  ## Copyright
  This project is licensed under the [MIT license](https://github.com/UweStolz/gifgif/blob/master/LICENSE.md)

  ## References

  ### Technologies
  This project was build with:  
  <table>
  <tr>
  <td><a href="https://vuejs.org/"><img src="${vueLogo}" width="64"></a></td>
  <td>Vue</td>
  </tr>
  <tr>
  <td><a href="https://vuetifyjs.com/"><img src="${vuetifyLogo}" width="64"></a></td>
  <td>Vuetify</td>
  </tr>
  </table>

  ### APIs
  [Giphy](https://developers.giphy.com/docs/api/)
  [Tenor](https://tenor.com/gifapi/documentation)

  ### Repository:
  <a href="https://github.com/UweStolz/gifgif"><img src="${githubLogo}" width="64"></a> Available under GitHub
  `;
}
</script>
