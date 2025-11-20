<script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  const router = useRouter()
  const query = ref('')
  const search = () => {
    query.value = query.value.replace(/[^0-9]/g, '')
    router.push({ name: 'PokemonDetail', params: { id: query.value } })
  }
  onMounted(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') search()
    })
  })
</script>

<template>
  <input type="text" placeholder="Search" v-model="query">
  <button @click="search">Search</button>
</template>

