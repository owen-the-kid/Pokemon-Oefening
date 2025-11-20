<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { usePokemonStore } from '@/stores/pokemonStore.js';

const currentPage = ref(1);

const pokemonStore = usePokemonStore();


const handlePageChange = async () => {
  const limit = 10;  // Number of items per page
  const offset = (currentPage.value - 1) * limit;  // Calculate the offset
  await pokemonStore.fetchPokemons(limit, offset);
};

// const paginatedPokemons = computed(() => {
//   if (!Array.isArray(pokemons.value)) {
//     return [];
//   }
//   const start = (currentPage.value - 1) * 10;
//   const end = start + 10;
//   return pokemons.value.slice(start, end);
// });

onMounted(async () => {
  await pokemonStore.fetchTotalPokemoncount();
  await pokemonStore.fetchPokemons(10, 0);
});
</script>

<template>
  <div>
    <h1>Pokemon List</h1>
    <ul>
      <li v-for="pokemon in pokemonStore.pokemons" :key="`pokemon-list-${pokemon.id}`">
        <router-link :to="{ name: 'PokemonDetail', params: { id: pokemon.id } }">
          {{ pokemon.name }}
        </router-link>
      </li>
    </ul>
    <vue-awesome-paginate
      :total-items="pokemonStore.totalPokemoncount"
      :items-per-page="10"
      :page-range="3"
      v-model="currentPage"
      @click="handlePageChange"
    />
  </div>
</template>


