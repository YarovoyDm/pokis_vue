<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useStore }from 'vuex';
import { getPokemons, getTypes, getPokemonsByType } from '@/API';

import ComponentAutocomplete from '@/components/ComponentAutocomplete.vue';
import ComponentAllPokemons from '@/components/ComponentAllPokemons.vue';
import { DEFAULT_ROW_PER_PAGE, AUTOCOMPLETE_NAMES, AUTOCOMPLETE_TYPES } from '@/constants/Pokemons';
import router from '@/router';

const page = ref(0);

const pageFromLocalStorage = window.localStorage.getItem('page');

if(pageFromLocalStorage){
    page.value = JSON.parse(pageFromLocalStorage);
}

const store = useStore();

const selectedPokemonType = computed(() => store.getters.getPokemonType);
const pokemonTypes = computed(() => store.getters.getPokemonTypes);
const pokemonsByType = computed(() => store.getters.getPokemonsByType);
const pokemons = computed(() => store.getters.getPokemons);

const getData = computed(() => selectedPokemonType.value.typeUrl ? pokemonsByType.value : pokemons.value);
const pagesQuantity = computed(() => getData.value?.length / DEFAULT_ROW_PER_PAGE);
const getPokemonsPerPage = computed(() => 
    selectedPokemonType.value.typeUrl
    ? getData.value
    : getData.value.slice(page.value * DEFAULT_ROW_PER_PAGE, page.value * DEFAULT_ROW_PER_PAGE + DEFAULT_ROW_PER_PAGE));

const updatePage = (newPage) => {
    if( newPage >= 0 && newPage <= (pagesQuantity.value - 1)){
        page.value = newPage;
        window.localStorage.setItem('page', newPage);
    }
};

onMounted(() => {
    getPokemons(100).then(({ data: { results }}) => store.commit('savePokemonsToStore', results));
    getTypes().then(({ data: { results }}) => store.commit('saveTypesToStore', results));
    
});

const options = (autocompleteType) => (query) => {
    const prepareData = autocompleteType === AUTOCOMPLETE_NAMES ? pokemons.value : pokemonTypes.value;
    const options = prepareData.map(pokemon => ({value: pokemon.name, url: pokemon.url}));
    const optionsByQuery = query && options.filter(option => option.value.includes(query));
    const results = query ? optionsByQuery : options;
    
    return results;
};

watch(selectedPokemonType.value, () => {
        getPokemonsByType(selectedPokemonType.value.typeName).then(({ data: { pokemon }}) => (
            store.commit('savePokemonByTypeToStore', pokemon)),
        )
      }
    );

const handleSelect = (isType) => (item) => {
    if(isType) {
        store.commit('savePokemonTypeToStore', item);
    }else {
        router.push(`/${item.value}`);
    }
};

const resetInputValue = () => {
    store.commit('savePokemonTypeToStore', null);
}

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