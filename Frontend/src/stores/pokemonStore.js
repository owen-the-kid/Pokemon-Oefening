import { defineStore } from 'pinia'

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    pokemons: [],
    pokemon: {},
    totalPokemoncount: 0
  }),
  actions: {
    async fetchPokemons(limit, offset) {
      try {
        const response = await fetch(`http://localhost:3000/Pokemon?limit=${limit}&offset=${offset}`)
        const data = await response.json()
        this.pokemons = data
      } catch (error) {
        console.error(error)
      }
    },
    async fetchPokemon(id) {
      try {
        const response = await fetch(`http://localhost:3000/Pokemon/${id}`)
        const data = await response.json()
        this.pokemon = data
      } catch (error) {
        console.error(error)
      }
    },
    async fetchTotalPokemoncount() {
      try {
        const response = await fetch(`http://localhost:3000/Pokemon/count`)
        const data = await response.json()
        this.totalPokemoncount = data.count
      } catch (error) {
        console.error(error)
      }
    }
  },
})
