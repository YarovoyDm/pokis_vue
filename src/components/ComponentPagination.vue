<script setup>
import { defineProps } from 'vue';

defineProps({
    page: Number,
    changePage: Function,
    pagesQuantity: {
        type: Number,
        required: true,
    },
})

</script>

<template>
    <div :class="$style.wrapper">
        <div
            :class="[$style.pagination_button, { [$style.disabled]: page <= 0 }]"
            @click="$emit('changePage', changePage(page - 1))"
        >
            <v-icon icon="chevron_left" />
        </div>
        <div :class="$style.page_count">
            <div :class="$style.pageTitle">Page </div>
            <div :class="$style.pageNumber">{{ page + 1 }}</div>
        </div>
        <div
            :class="[$style.pagination_button, { [$style.disabled]: page >= pagesQuantity -1 }]"
            @click="$emit('changePage', changePage(page + 1))"
        >
            <v-icon icon="chevron_right" />
        </div>
    </div>
</template>

<style module lang="scss">
@import "@/scss/_variables.scss";
@import "@/scss/_mixins.scss";

.wrapper{
    @include flex-center;
    width: fit-content;
    height: 40px;
    user-select: none;
    margin: auto;
    .pagination_button{
        width: 50px;
        height: 38px;
        background: $gray_nurse;
        @include flex-center;
        cursor: pointer;
        border: solid 1px $heavy_metal;
        transition: 0.5s;
        &:hover{
            background: $heavy_metal;
            i{
                color: $gray_nurse;
            }
        }
        &:active{
            transition: 0s;
            opacity: 0.5;
        }
        i{
            width: 20px;
            height: 20px;
        }
        &:first-child{
            border-bottom-left-radius: 30px;
            border-top-left-radius: 30px;
        }
        &:last-child{
            border-top-right-radius: 30px;
            border-bottom-right-radius: 30px;
        }
    }
    .disabled{
        opacity: 0.5;
        cursor: default;
        i {
            color: $boulder
        }
        &:hover{
            background: $gray_nurse;
            i{
                color: $boulder
            }
        }
    }
    .page_count{
        background: $gray_nurse;
        height: 38px;
        border-top: solid 1px $heavy_metal;
        border-bottom: solid 1px $heavy_metal;
        color: $heavy_metal;
        width: 140px;
        @include flex-center;
        .pageNumber,
        .pageTitle{
            font-size: 18px;
            font-weight: 500;
        }
        .pageTitle{
            margin-right: 10px;
        }
        .pageNumber{
            height: 100%;
            width: fit-content;
            @include flex-center;
        }
    }
}
</style>