import axios from 'axios';
import { DEFAULT_API_URL } from '@/constants/Pokemons';

export const getPokemon = (pokemonName) => {
    return axios.get(`${DEFAULT_API_URL}pokemon/${pokemonName}/`);
};
