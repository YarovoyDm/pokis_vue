import axios from 'axios';
import { DEFAULT_API_URL } from '@/constants/Pokemons';
import {
    AllTypes,
} from '@/types/Pokemon';

interface Response {
    results: Array<AllTypes>,
}

export const getTypes = () => {
    return axios.get<Response>(`${DEFAULT_API_URL}type`);
};