<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePokemonStore } from '@/stores/pokemonStore.js';

const route = useRoute();
const router = useRouter();
const pokemonStore = usePokemonStore();

const loading = ref(false);
const error = ref(null);



onMounted(async () => {
  loading.value = true;
  try {
    await pokemonStore.fetchPokemon(route.params.id);
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }
});

const goBack = () => {
  router.push({ name: 'PokemonList' });
};
</script>

<template>
  <div>
    <button @click="goBack">Back to list</button>

    <div v-if="loading">Loading…</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else-if="!pokemonStore.pokemon">No data</div>
    <div v-else>
      <h1>{{ pokemonStore.pokemon.name }}</h1>
      <p>ID: {{ pokemonStore.pokemon.id }}</p>
      <p>Type: {{ pokemonStore.pokemon.types }}</p>
      <p>Height: {{ pokemonStore.pokemon.height }}</p>
      <p>Weight: {{ pokemonStore.pokemon.weight }}</p>
      <p>HP: {{ pokemonStore.pokemon.hp }}</p>
      <p>Attack: {{ pokemonStore.pokemon.attack }}</p>
      <p>Defense: {{ pokemonStore.pokemon.defense }}</p>
      <p>Special Attack: {{ pokemonStore.pokemon.specialAttack }}</p>
      <p>Special Defense: {{ pokemonStore.pokemon.specialDefense }}</p>
      <p>Speed: {{ pokemonStore.pokemon.speed }}</p>
    </div>
  </div>
</template>
