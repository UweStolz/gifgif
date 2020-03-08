import { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/favourites',
    name: 'favourites',
    component: () => import(/* webpackChunkName: "favourites" */ '@/views/Favourites.vue'),
  },
  {
    path: '/search',
    name: 'search',
    component: () => import(/* webpackChunkName: "search" */ '@/views/Search.vue'),
  },
  {
    path: '/configuration',
    name: 'configuration',
    component: () => import(/* webpackChunkName: "configuration" */ '@/views/Configuration.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
  },
  {
    path: '/translate',
    name: 'translate',
    component: () => import(/* webpackChunkName: "translate" */ '@/views/Translate.vue'),
  },
];

export default routes;
