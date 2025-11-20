<script setup>
import SearchBar from '../components/SearchBar.vue';
</script>

<template>
  <nav>
    <ul>
      <li><router-link :to="{ name: 'FrontPage' }">Home</router-link></li>
      <li><router-link :to="{ name: 'PokemonList' }">Pokemon List</router-link></li>
      <li><SearchBar /></li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

ul {
  display: flex;
  list-style-type: none;
  padding: 0;
}

li {
  margin: 0 10px;
}

a {
  color: black;
  text-decoration: none;
}
</style>
