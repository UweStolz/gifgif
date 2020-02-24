<template>
  <v-container
    fluid
  >
    <v-row
      align="start"
      justify="center"
    >
      <v-card
        width="50%"
        flat
        tile
      >
        <v-autocomplete
          v-model="selectedTerms"
          :search-input.sync="searchQuery"
          :loading="isLoading"
          :prepend-icon="icons.mdiImageSearch"
          :items="trendingTerms"
          label="GIF search"
          placeholder="Enter or select search tags"
          cache-items
          autofocus
          hide-no-data
          deletable-chips
          chips
          multiple
          clearable
        />
        <v-card-text>{{ searchResults }}</v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { mdiImageSearch } from '@mdi/js';
import { getSearchGifsFromGiphy, getTrendingSearchTermsFromTenor } from '@/request';

@Component
export default class Search extends Vue {
  @Watch('searchQuery')
  async searchWithQuery(query: string) {
    await this.getSearchResults(query);
  }

    @Watch('selectedTerms')
  async searchWithTerms(term: string) {
    await this.getSearchResults(term);
  }

    async getSearchResults(query: string) {
      this.isLoading = true;
      const response = await getSearchGifsFromGiphy(query);
      this.searchResults = response;
      this.isLoading = false;
    }

    async mounted() {
      this.trendingTerms = await getTrendingSearchTermsFromTenor();
    }

  icons = {
    mdiImageSearch,
  }

  trendingTerms: string[] = [];

  searchResults: null|any = null;

  searchQuery: null|string = null;

  isLoading: boolean = false;

  selectedTerms: null|any = null;
}
</script>
