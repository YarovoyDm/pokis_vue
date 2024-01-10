import { createStore } from 'vuex';
import {
    Pokemon,
    PokemonInfo,
    AllTypes,
    DefaultType,
    PokemonType,
} from '@/types/Pokemon';

import { mutations } from './Mutations';
import { getters } from './Getters';

export interface State {
  pokemons: Array<Pokemon>,
  pokemonInfo: PokemonInfo,
  pokemonTypes: Array<AllTypes>,
  pokemonsByType: Array<DefaultType>,
  pokemonType: PokemonType,
}

export const store = createStore<State>({
    state () {
        return {
            pokemons: [],
            pokemonInfo: {
                name: '',
                types: [],
                moves: [],
                sprites: {},
            },
            pokemonTypes: [],
            pokemonsByType: [],
            pokemonType: {
                typeName: '',
                typeUrl: '',
            },
        };
    },
    mutations,
    getters,
});

export default store;