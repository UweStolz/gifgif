import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/favourites',
    name: 'favourites',
    component: () => import(/* webpackChunkName: "favourites" */ '../views/Favourites.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
