import axios from 'axios';
import { DEFAULT_API_URL } from '@/constants/Pokemons';
import { DefaultType } from '@/types/Pokemon';

type Response = {
    [key: string]: DefaultType,
}

export const getPokemonsByType = (typeName: string) => {
    return axios.get<Response>(`${DEFAULT_API_URL}type/${typeName}`);
};