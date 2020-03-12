<template>
  <v-container fluid>
    <Dialog
      :show-dialog.sync="dialog"
      :full-image-data.sync="fullImage"
      :preview-image-data.sync="previewImage"
      :image-id.sync="imageId"
    />
    <v-row
      align="start"
      justify="center"
    >
      <v-card
        :width="$vuetify.breakpoint.xsOnly ? '90%' : '80%'"
        flat
        tile
      >
        <v-slide-y-transition mode="out-in">
          <v-card
            v-show="showFilterMenu"
            id="s-filterCard"
            flat
            tile
          >
            <v-overflow-btn
              v-model="selectedRating"
              clearable
              target="#s-filterCard"
              :items="ratings"
              label="Rating"
            />
          </v-card>
        </v-slide-y-transition>
        <v-combobox
          v-model="selectedTerm"
          :search-input.sync="searchQuery"
          :loading="isLoading"
          :prepend-icon="icons.mdiImageSearch"
          :items="trendingTerms"
          color="red darken-3"
          persistent-hint
          hint="A minimum of 3 characters is required"
          label="GIF search"
          placeholder="Enter or select a search tag"
          cache-items
          hide-no-data
          deletable-chips
          chips
          clearable
          @click:clear="searchResults = null"
        >
          <template v-slot:append-outer>
            <v-icon @click="showFilter">
              {{ icons.mdiFilterVariant }}
            </v-icon>
          </template>
        </v-combobox>
        <v-divider />
        <v-expand-transition>
          <v-item-group v-if="showMenu() === true">
            <v-row
              align="start"
              justify="start"
            >
              <v-item
                v-for="(url, i) in (searchResults)"
                :key="i"
              >
                <v-img
                  id="imageHover"
                  :src="searchResults[i].images.fixed_width.webp"
                  :lazy-src="searchResults[i].images.fixed_width.webp"
                  contain
                  height="100px"
                  width="100px"
                  @click="openDialog(i)"
                />
              </v-item>
            </v-row>
          </v-item-group>
        </v-expand-transition>
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { mdiImageSearch, mdiFilterVariant } from '@mdi/js';
import { getSearchGifsFromGiphy, getTrendingSearchTermsFromTenor } from '@/request';
import Dialog from '@/components/Search/Dialog.vue';

@Component({
  components: {
    Dialog,
  },
})
export default class Search extends Vue {
  @Watch('searchQuery')
  async searchWithQuery(query: string) {
    if (this.searchQuery?.length > 2) {
      await this.getSearchResults(query);
    }
  }

  @Watch('selectedRating')
  async searchWithRating() {
    const q: string = this.selectedTerm ? this.selectedTerm : this.searchQuery;
    if (q) { await this.getSearchResults(q); }
  }

  @Watch('selectedTerm')
  async searchWithTerm(term: string) {
    if (term) {
      await this.getSearchResults(term);
    }
  }

  async mounted() {
    this.trendingTerms = await getTrendingSearchTermsFromTenor();
  }

  showFilter(): void {
    this.showFilterMenu = !this.showFilterMenu;
  }

  showMenu(): boolean {
    return (this.selectedTerm?.length > 0 || this.searchQuery?.length > 0);
  }

  async getSearchResults(query: string) {
    this.isLoading = true;
    const response = await getSearchGifsFromGiphy(query, this.selectedRating);
    this.searchResults = response;
    this.isLoading = false;
  }


  openDialog(index: number) {
    this.dialog = true;
    this.fullImage = this.searchResults[index].images.original.webp
      ? this.searchResults[index].images.original.webp
      : this.searchResults[index].images.original.url;
    this.imageId = this.searchResults[index].id;
    this.previewImage = this.searchResults[index].images.fixed_width.webp;
  }

  icons = {
    mdiImageSearch,
    mdiFilterVariant,
  }

  imageId: string = '';

  previewImage: string = '';

  fullImage: string = '';

  dialog: boolean = false;

  selectedRating: string = '';

  showFilterMenu: boolean = false;

  trendingTerms: string[] = [];

  searchResults: null | any = null;

  searchQuery: string = '';

  isLoading: boolean = false;

  selectedTerm: null | any = null;

  ratings = [
    {
      text: 'G - For all ages and people',
      value: 'G',
    },
    {
      text: 'PG - May require parental preview for children',
      value: 'PG',
    },
    {
      text: 'PG-13 - Mild sexual innuendos, mild substance use, mild profanity, or threatening images',
      value: 'PG-13',
    },
    {
      text: 'R - Not suitable for teens or younger',
      value: 'R',
    },
  ]
}
</script>

<style scoped>
#pa-exp-con {
  overflow: hidden;
}
#imageHover:hover {
  transform: scale(1.3);
  overflow-x: hidden;
  z-index: 9;
}
</style>
