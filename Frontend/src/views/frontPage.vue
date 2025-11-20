<template>
  <div class="front-page">
    <h1>Welcome to Pokemon Finder</h1>
    <p>
      This is a simple web application that allows you to search for a pokemon by its name or id.
    </p>
    <router-link to="/pokemon">Go to Pokemon List</router-link>
  </div>
</template>

<style scoped>
.front-page {
  text-align: center;
  padding: 20px;
}

.front-page h1 {
  font-size: 2em;
}

.front-page p {
  font-size: 1.2em;
}
</style>
