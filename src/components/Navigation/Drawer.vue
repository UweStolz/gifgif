<template>
  <v-navigation-drawer
    v-model="$store.state.showMobileDrawer"
    color="red darken-3"
    mobile-break-point="600px"
    mini-variant-width="8vh"
    mini-variant
    :permanent="!$vuetify.breakpoint.xsOnly"
    clipped
    app
  >
    <v-list>
      <v-list-item-group>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          link
          :to="item.link"
        >
          <v-list-item-icon>
            <v-badge
              v-if="item.link === '/favourites'"
              :value="gifCount > 0"
              :content="gifCount"
              color="grey"
            >
              <v-icon
                color="white"
                large
                v-text="item.icon"
              />
            </v-badge>
            <v-icon
              v-else
              color="white"
              large
              v-text="item.icon"
            />
          </v-list-item-icon>
          <!-- Empty component for jumping list item on click -->
          <v-list-item-content />
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mdiHeart, mdiMagnify, mdiTranslate } from '@mdi/js';

@Component
export default class Drawer extends Vue {
  items = [
    {
      icon: mdiHeart, link: '/favourites',
    },
    {
      icon: mdiMagnify, link: '/search',
    },
    {
      icon: mdiTranslate, link: '/translate',
    },
  ];

  gifCount: number = 0;

  async mounted() {
    this.gifCount = this.$store.state.gifCount;
    this.$store.watch(
      () => this.$store.state.gifCount,
      (value: number) => {
        this.gifCount = value;
      },
    );
  }
}
</script>

<style>
span.v-badge__badge.grey {
  left: calc(100% - 15px) !important;
}
</style>
