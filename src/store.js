import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      pokemons: [],
      pokemonInfo: [],
      pokemonTypes: [],
      pokemonsByType: [],
      pokemonType: {
        typeName: '',
        typeUrl: '',
    },
    }
  },
  mutations: {
    savePokemonsToStore(state, payload) {
      state.pokemons = payload
    },
    saveTypesToStore(state, payload){
      state.pokemonTypes = payload
    },
    savePokemonInfoToStore(state, payload) {
      state.pokemonInfo = payload
    },
    savePokemonByTypeToStore(state, payload){
      state.pokemonsByType = payload;
    },
    savePokemonTypeToStore(state, payload) {
      state.pokemonType.typeName = payload?.value || '';
      state.pokemonType.typeUrl = payload?.url || '';
    }
  },
  getters: {
    getPokemons(state) {
        return state.pokemons
    },
    getPokemonTypes(state){
      return state.pokemonTypes
    },
    getPokemonInfo(state) {
      return {
        name: state.pokemonInfo.name,
        types: state.pokemonInfo.types,
        moves: state.pokemonInfo.moves,
        sprites: state.pokemonInfo.sprites,
      }
    },
    getPokemonsByType(state){
      return state.pokemonsByType?.map((item) => ({ name: item.pokemon.name, url: item.pokemon.url }))
    },
    getPokemonType(state) {
      return state.pokemonType
    }
  }
})

export default store