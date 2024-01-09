import { createRouter, createWebHistory } from 'vue-router';
import AllPokemonsPage from './pages/AllPokemonsPage.vue'
import PokemonPage from './pages/PokemonPage.vue'

const routes = [
  {
    path: '/',
    component: AllPokemonsPage
  },
  {
    path: '/:pokemonName',
    component: PokemonPage
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router