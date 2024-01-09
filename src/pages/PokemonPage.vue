<script setup>
import { getPokemon} from '@/API';
import router from '@/router';
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

const route = useRoute();
const store = useStore();
const { pokemonName } = route.params;
const isLoading = ref(true);
const pokemonInfo = computed(() => store.getters.getPokemonInfo);
const pokemonAvatar = computed(() => 'url(' + pokemonInfo.value.sprites.front_default + ')');

onMounted(() => {
    getPokemon(pokemonName)
        .then(res => {
            store.commit('savePokemonInfoToStore', res.data);
            isLoading.value = false;
        })
})

const onTypeClick = (data) => {
    store.commit('savePokemonTypeToStore', data);
    router.push('/');
}

</script>

<template>
    <div :class="$style.loading" v-if="isLoading">Loading...</div>
    <div :class="$style.pageWrapper" v-if="!isLoading">
        <button :class="$style.backButton" @click="$router.go(-1)">Go back</button>
        <div :class="$style.pokemonDescription">
            <div :class="$style.pokemonInformation">
                <div :class="$style.pokemonAvatar" :style="{ backgroundImage: pokemonAvatar}"></div>
                <div :class="$style.pokemonName">
                    {{ pokemonInfo.name }}
                </div>
            </div>
            <div :class="$style.pokemonMoves">
                <div :class="$style.title">Moves</div>
                <div :class="$style.content">
                    <div
                        :class="$style.move"
                        v-for="item in pokemonInfo.moves"
                        :key="item.url"
                    >
                        {{ item.move.name }}
                    </div>
                </div>
            </div>
            <div :class="$style.pokemonTypes">
                <div :class="$style.title">Types</div>
                <div :class="$style.content">
                    <div
                        :class="$style.pokemonType"
                        v-for="item in pokemonInfo.types"
                        :key="item.type.url"
                        @click="() => onTypeClick({value: item.type.name, url: item.type.url})"
                    >
                        {{ item.type.name }}
                    </div></div>
            </div>
        </div>
    </div>
    
</template>

<style module lang="scss">
@import "@/scss/_variables.scss";
@import "@/scss/mixins.scss";

.pageWrapper{
    position: relative;
    @include flex-center;
    height: 100vh;
    .backButton{
        position: absolute;
        top: 30px;
        left: 30px;
        cursor: pointer;
        background: $gray_nurse;
        border-radius: $system_border_radius;
        border: solid 1px $heavy_metal;
        padding: 5px;
        &:hover{
            background: $silver;
        }
    }
    .pokemonDescription{
        padding: 20px;
        width: fit-content;
        height: fit-content;
        max-width: 80%;
        background: $gray_nurse;
        border-radius: $system_border_radius;
        .pokemonTypes,
        .pokemonMoves{
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            flex-wrap: wrap;
            margin-bottom: 20px;
        }
        .pokemonInformation{
            @include flex-center;
            .pokemonName{
                font-size: 35px;
                text-transform: capitalize;
            }
            .pokemonAvatar{
                width: 120px;
                height: 120px;
                background-repeat: no-repeat;
                background-size: contain;
            }
        }
        .move,
        .pokemonType{
            border-radius: $system_border_radius;
            padding: 5px;
            width: fit-content;
            text-align: center;
            height: 20px;
            line-height: 20px;
        }
        .move{
            background: $silver;
            text-transform: capitalize;
        }
        .pokemonType{
            border: solid 1px $heavy_metal;
            cursor: pointer;
            background: $gray_nurse;
            color: $heavy_metal;
            text-transform: capitalize;
            &:hover{
                background: $heavy_metal;
                color: $gray_nurse;
            }
            &:not(:first-child) {
                margin: 0 10px;
            }
        }
    }
}
.content{
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
}
.title{
    font-size: 30px;
    margin-bottom: 20px;
}
.loading{
    text-align: center;
    width: 100%;
    height: 100vh;
    line-height: 100vh;
    font-size: 35px;
    color: white;
}
</style>