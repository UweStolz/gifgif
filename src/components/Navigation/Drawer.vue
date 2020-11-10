<template>
  <v-navigation-drawer
    v-model="$store.state.showMobileDrawer"
    color="red darken-3"
    mobile-breapoint="600px"
    mini-variant-width="9vh"
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
              <v-tooltip
                :open-on-hover="$vuetify.breakpoint.xsOnly ? false : true"
                nudge-right="16"
                open-delay="500"
                right
              >
                <template v-slot:activator="{ on }">
                  <v-icon
                    color="white"
                    large
                    v-on="on"
                    v-text="item.icon"
                  />
                </template>
                <span>{{ item.tooltip }}</span>
              </v-tooltip>
            </v-badge>
            <v-tooltip
              v-else
              :open-on-hover="$vuetify.breakpoint.xsOnly ? false : true"
              open-delay="500"
              nudge-right="16"
              right
            >
              <template v-slot:activator="{ on }">
                <v-icon
                  color="white"
                  large
                  v-on="on"
                  v-text="item.icon"
                />
              </template>
              <span>{{ item.tooltip }}</span>
            </v-tooltip>
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
import { mdiHeart, mdiMagnify, mdiTag } from '@mdi/js';

@Component
export default class Drawer extends Vue {
  items = [
    {
      icon: mdiHeart, link: '/favourites', tooltip: 'Favourites',
    },
    {
      icon: mdiTag, link: '/search', tooltip: 'Tag search',
    },
    {
      icon: mdiMagnify, link: '/translate', tooltip: 'Translate',
    },
  ];

  gifCount = 0;

  async mounted(): Promise<void> {
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
