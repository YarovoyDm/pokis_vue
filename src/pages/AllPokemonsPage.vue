<script setup lang="ts">
import { ref, onMounted, computed, watchEffect } from 'vue';
import { useStore }from 'vuex';
import { getPokemons, getTypes, getPokemonsByType } from '@/API';
import {
    Pokemon,
    PokemonType,
    AllTypes,
} from '@/types/Pokemon';
import ComponentAutocomplete from '@/components/ComponentAutocomplete.vue';
import ComponentAllPokemons from '@/components/ComponentAllPokemons.vue';
import {
    DEFAULT_ROW_PER_PAGE,
    AUTOCOMPLETE_NAMES,
    AUTOCOMPLETE_TYPES,
    LOCAL_STORAGE_PAGE_KEY,
} from '@/constants/Pokemons';
import { Mutations } from '@/constants/Mutations';
import router from '@/router';
import type { Ref } from 'vue';

const page: Ref<number> = ref(0);
const store = useStore();
const pageFromLocalStorage: string | null = window.localStorage.getItem(LOCAL_STORAGE_PAGE_KEY);

if(pageFromLocalStorage){
    page.value = JSON.parse(pageFromLocalStorage);
}

const selectedPokemonType = computed<PokemonType>(() => store.getters.getPokemonType);
const pokemonTypes = computed<Array<AllTypes>>(() => store.getters.getPokemonTypes);
const pokemonsByType = computed<Array<Pokemon>>(() => store.getters.getPokemonsByType);
const pokemons = computed<Array<Pokemon>>(() => store.getters.getPokemons);

const getData = computed<Array<Pokemon>>(() => selectedPokemonType.value.typeUrl ? pokemonsByType.value : pokemons.value);
const pagesQuantity = computed<number>(() => getData.value?.length / DEFAULT_ROW_PER_PAGE);
const getPokemonsPerPage = computed<Array<Pokemon>>(() => 
    selectedPokemonType.value.typeUrl
        ? getData.value
        : getData.value.slice(page.value * DEFAULT_ROW_PER_PAGE, page.value * DEFAULT_ROW_PER_PAGE + DEFAULT_ROW_PER_PAGE));

const updatePage = (newPage: number): void => {
    if( newPage >= 0 && newPage <= (pagesQuantity.value - 1)){
        page.value = newPage;
        window.localStorage.setItem(LOCAL_STORAGE_PAGE_KEY, newPage.toString());
    }
};

onMounted(() => {
    getPokemons(100).then(({ data: { results } }) => store.commit(Mutations.SAVE_POKEMONS_TO_STORE, results));
    getTypes().then(({ data: { results } }) => store.commit(Mutations.SAVE_TYPES_TO_STORE, results));
});

const options = (autocompleteType: string) => (query: string): string | Array<{[key: string]: string}> => {
    const prepareData = autocompleteType === AUTOCOMPLETE_NAMES ? pokemons.value : pokemonTypes.value;
    const options = prepareData.map((pokemon: Pokemon): {[key: string]: string} => ({ value: pokemon.name, url: pokemon.url }));
    const optionsByQuery = query && options.filter((option: {[key: string]: string}) => option.value.includes(query));
    const results = query ? optionsByQuery : options;
    
    return results;
};

watchEffect(() => {
    getPokemonsByType(selectedPokemonType.value.typeName).then(
        ({ data: { pokemon } }) =>
            store.commit(Mutations.SAVE_POKEMONS_BY_TYPE_TO_STORE, pokemon),
    );
});

const handleSelect = (isType: boolean) => (item: {[key: string]: string}): void => {
    isType ? store.commit(Mutations.SAVE_SELECTED_TYPE_TO_STORE, item) : router.push(`/${item.value}`);
};

const resetInputValue = (): void => {
    store.commit(Mutations.SAVE_SELECTED_TYPE_TO_STORE, null);
};

</script>

<template>
    <div :class="$style.pageWrapper">
        <div :class="$style.pokemonsMainBlock">
            <div :class="$style.selectsBlock">
                <ComponentAutocomplete
                    placeholder="Enter the pokemon's name..."
                    :handleSelect="handleSelect(false)"
                    :options="options(AUTOCOMPLETE_NAMES)"
                />
                <ComponentAutocomplete
                    placeholder="Enter the pokemon's type..."
                    :handleSelect="handleSelect(true)"
                    :options="options(AUTOCOMPLETE_TYPES)"
                    :reset="resetInputValue"
                    :defaultValue="selectedPokemonType.typeName"
                />
            </div>
            <ComponentAllPokemons
                :page="page"
                :updatePage="updatePage"
                :getPokemonsPerPage="getPokemonsPerPage"
                :pagesQuantity="pagesQuantity"
                :selectedPokemonType="selectedPokemonType"
            />
        </div>
    </div>
</template>

<style module lang="scss">
@import "@/scss/_variables.scss";
@import "@/scss/mixins.scss";

.pageWrapper{
    height: 100vh;
    @include flex-center;
    .pokemonsMainBlock{
        width: calc(550px - 40px);
        border-radius: 8px;
        height: 600px;
        background: $gray_nurse;
        padding: 20px;
        display: flex;
        flex-direction: column;
        .selectsBlock{
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }
}
</style>