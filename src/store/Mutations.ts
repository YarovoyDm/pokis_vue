import { MutationTree } from 'vuex';
import { Mutations } from '@/constants/Mutations';
import { State } from './store';
import {
    Pokemon,
    PokemonInfo,
    AllTypes,
    DefaultType,
} from '@/types/Pokemon';

export type MutationsType<S = State> = {
    [Mutations.SAVE_POKEMONS_TO_STORE](state: S, payload: Array<Pokemon>): void,
    [Mutations.SAVE_TYPES_TO_STORE](state: S, payload: Array<AllTypes>): void,
    [Mutations.SAVE_POKEMON_INFO_TO_STORE](state: S, payload: PokemonInfo): void,
    [Mutations.SAVE_POKEMONS_BY_TYPE_TO_STORE](state: S, payload: Array<DefaultType>): void,
    [Mutations.SAVE_SELECTED_TYPE_TO_STORE](state: S, payload: {[key: string]: string}): void,
}

export const mutations: MutationTree<State> & MutationsType = {
    [Mutations.SAVE_POKEMONS_TO_STORE](state, payload: Array<Pokemon>){
        state.pokemons = payload;
    },
    [Mutations.SAVE_TYPES_TO_STORE](state, payload: Array<AllTypes>){
        state.pokemonTypes = payload;
    },
    [Mutations.SAVE_POKEMON_INFO_TO_STORE](state, payload: PokemonInfo){
        state.pokemonInfo = payload;
    },
    [Mutations.SAVE_POKEMONS_BY_TYPE_TO_STORE](state, payload: Array<DefaultType>){
        state.pokemonsByType = payload;
    },
    [Mutations.SAVE_SELECTED_TYPE_TO_STORE](state, payload: {value: string, url: string}){
        state.pokemonType.typeName = payload?.value || '';
        state.pokemonType.typeUrl = payload?.url || '';
    },
};