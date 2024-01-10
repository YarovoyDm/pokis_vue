import axios from 'axios';
import { DEFAULT_API_URL } from '@/constants/Pokemons';
import {
    DefaultType,
} from '@/types/Pokemon';

interface Response {
    [key: string]: DefaultType,
}

export const getPokemonsByType = (typeName: string) => {
    return axios.get<Response>(`${DEFAULT_API_URL}type/${typeName}`);
};