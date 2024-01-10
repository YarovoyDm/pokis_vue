import axios from 'axios';
import { DEFAULT_API_URL } from '@/constants/Pokemons';
import {
    PokemonInfo,
} from '@/types/Pokemon';

interface Response {
    [key: string]: PokemonInfo,
}

export const getPokemon = (pokemonName: string | string[]) => {
    return axios.get<Response>(`${DEFAULT_API_URL}pokemon/${pokemonName}/`);
};
