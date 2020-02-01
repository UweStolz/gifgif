<template>
  <v-navigation-drawer
    color="red darken-3"
    mini-variant
    clipped
    app
    expand-on-hover
  >
    <v-list>
      <v-subheader>
        <v-icon color="white">
          mdi-heart
        </v-icon>
      </v-subheader>
      <v-list-item>
        <v-list-item-icon />
        <v-list-item-content>
          <v-list-item-title />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Drawer extends Vue {}
</script>
