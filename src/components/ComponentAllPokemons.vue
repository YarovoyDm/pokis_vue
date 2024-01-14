<script setup lang="ts">
import { defineProps } from 'vue';
import ComponentPagination from '@/components/ComponentPagination.vue';
import { Pokemon } from '@/types/Pokemon';

interface Props {
    page: number,
    getPokemonsPerPage: Array<Pokemon>,
    updatePage: (page: number) => void,
    pagesQuantity: number,
    selectedPokemonType: {typeName: string, typeUrl: string},
}

defineProps<Props>();

</script>

<template>
    <div :class="[$style.pokemonWrapper, {[$style.pokemonWraperByType]: selectedPokemonType?.typeName}]">
        <div
            v-if="selectedPokemonType?.typeName"
            :class="$style.selectedType"
        >
            Result for: <div :class="$style.typeName">{{ selectedPokemonType.typeName }}</div>
        </div>
        <router-link
            :to="'/' + pokemon.name"
            :class="[$style.pokemon, {[$style.pokemonByType]: selectedPokemonType?.typeName}]"
            :key="pokemon.name"
            v-for="pokemon in getPokemonsPerPage"
        >
            {{ pokemon.name }}
        </router-link>
    </div>
    <ComponentPagination
        v-if="!selectedPokemonType?.typeName"
        :changePage="updatePage" 
        :page="page"
        :pagesQuantity="pagesQuantity"
    />
</template>

<style module lang="scss">
@import "@/scss/_variables.scss";
@import "@/scss/mixins.scss";

.pokemonWrapper{
    @include flex-center;
    flex-wrap: wrap;
    height: 60%;
    margin-top: 50px;
    column-gap: 20px;
    .pokemon{
        @include pokemon
    }
}
.pokemonWraperByType{
    height: 80%;
    margin-top: 0;
    align-items: flex-start;
    justify-content: unset;
    padding-left: 20px;
    max-height: 80%;
    overflow: auto;
    .selectedType{
        margin-bottom: 20px;
        margin-top: 20px;
        font-size: 25px;
        width: 100%;
        position: sticky;
        top: 0;
        background: $gray_nurse;
        @include flex-center;
        padding: 5px 0;
        .typeName{
            margin-left: 10px;
            text-transform: capitalize;
            text-decoration: underline;
        }
    }
    .pokemonByType{
        margin-bottom: 20px;
    }
}

</style>