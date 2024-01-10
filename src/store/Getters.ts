import { GetterTree } from 'vuex';
import { State } from './store';
import {
    Pokemon,
    PokemonInfo,
} from '@/types/Pokemon';

export type Getters = {
    getPokemons(state: State): Array<Pokemon>,
    getPokemonTypes(state: State): Array<{name: string, url: string}>,
    getPokemonInfo(state: State): PokemonInfo,
    getPokemonsByType(state: State): Array<{name: string, url: string}>,
    getPokemonType(state: State): {typeName: string, typeUrl: string}
}

export const getters: GetterTree<State, State> & Getters = {
    getPokemons(state: State){
        return state.pokemons;
    },
    getPokemonTypes(state: State){
        return state.pokemonTypes;
    },
    getPokemonInfo(state: State){
        return {
            name: state.pokemonInfo.name,
            types: state.pokemonInfo.types,
            moves: state.pokemonInfo.moves,
            sprites: state.pokemonInfo.sprites,
        };
    },
    getPokemonsByType(state: State){
        return state.pokemonsByType?.map((item) => ({ name: item.pokemon.name, url: item.pokemon.url }));
    },
    getPokemonType(state: State){
        return state.pokemonType;
    },
};