import axios from 'axios';
import { DEFAULT_API_URL } from '@/constants/Pokemons';

export const getPokemonsByType = (typeName) => {
    return axios.get(`${DEFAULT_API_URL}type/${typeName}`);
};