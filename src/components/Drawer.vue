<template>
  <v-navigation-drawer
    color="red darken-3"
    mini-variant
    clipped
    nav
    app
  >
    <v-list>
      <v-list-item-group>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.link"
        >
          <v-list-item-icon>
            <v-badge
              :value="gifCount > 0"
              :content="gifCount"
              color="grey"
            >
              <v-icon
                color="white"
                v-text="item.icon"
              />
            </v-badge>
          </v-list-item-icon>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Drawer extends Vue {
    items = [
      {
        icon: 'mdi-heart', link: '/favourites',
      },
    ];

    gifCount: number = 0;

    async mounted() {
      this.gifCount = await this.$store.dispatch('getGifCount');
    }
}
</script>
