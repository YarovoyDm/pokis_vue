import axios from 'axios';
import { DEFAULT_API_URL } from '@/constants/Pokemons';
import {
    Pokemon,
} from '@/types/Pokemon';

interface Response {
    results: Array<Pokemon>,
}

export const getPokemons = (quantity: number) => {
    return axios.get<Response>(`${DEFAULT_API_URL}pokemon?limit=${quantity}`);
};