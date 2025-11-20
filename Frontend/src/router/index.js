import { createRouter, createWebHistory } from 'vue-router';
import FrontPage from '@/views/frontPage.vue';
import PokemonList from '@/views/pokemonList.vue';
import PokemonDetail from '@/views/pokemonDetail.vue';

const routes = [
  {
    path: '/',
    name: 'FrontPage',
    component: FrontPage,
  },
  {
    path: '/pokemon',
    name: 'PokemonList',
    component: PokemonList,
  },
  {
    path: '/pokemon/:id',
    name: 'PokemonDetail',
    component: PokemonDetail,
    props: true, // passes route params as props
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

