export interface DefaultType {
    [key: string]: {
        name: string,
        url: string,
    }
}

interface Sprites {
    [key: string]: string | null,
}

export interface Pokemon {
    name: string,
    url: string,
}

export interface PokemonInfo {
    name: string,
    moves: Array<DefaultType>,
    sprites: Sprites,
    types: Array<DefaultType>,
}

export interface AllTypes {
    name: string,
    url: string,
}

export interface PokemonType {
    typeName: string,
    typeUrl: string,
}

