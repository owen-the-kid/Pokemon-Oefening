<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';


const currentPage = ref(1);
const pokemons = ref([]);
const totalPokemons = ref(0);

const fetchPokemons = async (limit: number, offset: number) => {
  try {
    console.log('fetching pokemons');
    const response = await fetch(`http://localhost:3000/Pokemon?limit=${limit}&offset=${offset}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const handlePageChange = async (page: number) => {
  currentPage.value = page;
  const limit = 10;  // Number of items per page
  const offset = (page - 1) * limit;  // Calculate the offset
  try {
    const data = await fetchPokemons(limit, offset);
    pokemons.value = Array.isArray(data) ? data : [];  // Check if data is an array and set pokemons.value accordingly
  } catch (error) {
    console.error(error);
    pokemons.value = [];  // Set pokemons.value to an empty array if there's an error
  }
};

const paginatedPokemons = computed(() => {
  if (!Array.isArray(pokemons.value)) {
    return [];
  }
  const start = (currentPage.value - 1) * 10;
  const end = start + 10;
  return pokemons.value.slice(start, end);
});

onMounted(async () => {
  const data = await fetchPokemons(10, 0);
  pokemons.value = Array.isArray(data) ? data : [];  // Check if data is an array and set pokemons.value accordingly
  totalPokemons.value = pokemons.value.length;
});
</script>

<template>
  <div>
    <h1>Pokemon List</h1>
    <ul>
      <li v-for="pokemon in paginatedPokemons" :key="`pokemon-list-${pokemon.id}`">
        <router-link :to="{ name: 'PokemonDetail', params: { id: pokemon.id } }">
          {{ pokemon.name }}
        </router-link>
      </li>
    </ul>
    <vue-awesome-paginate
      :total-items="totalPokemons"
      :items-per-page="10"
      :page-range="3"
      v-model="currentPage"
      @page-change="handlePageChange"
    />
  </div>
</template>


