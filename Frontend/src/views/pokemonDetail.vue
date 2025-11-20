<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const pokemon = ref(null);
const loading = ref(false);
const error = ref(null);

const fetchPokemon = async () => {
  loading.value = true;
  error.value = null;

  try {
    const id = route.params.id;
    const res = await fetch(`http://localhost:3000/Pokemon/${id}`);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    pokemon.value = await res.json();
  } catch (err) {
    error.value = err.message || 'Unknown error';
    pokemon.value = null;
  } finally {
    loading.value = false;
  }
};

onMounted(fetchPokemon);

const goBack = () => {
  router.push({ name: 'PokemonList' });
};
</script>

<template>
  <div>
    <button @click="goBack">Back to list</button>

    <div v-if="loading">Loading…</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else-if="!pokemon">No data</div>
    <div v-else>
      <h1>{{ pokemon.name }}</h1>
      <p>ID: {{ pokemon.id }}</p>
      <p>Type: {{ pokemon.types }}</p>
      <!-- add more fields that your API returns -->
    </div>
  </div>
</template>
