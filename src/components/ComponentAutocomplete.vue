<script setup lang="ts">
import { ref, defineProps } from 'vue';
import type { Ref } from 'vue';

type Props = {
    placeholder?: string,
    handleSelect: (item: {value: string, url: string}) => void,
    options: (query: string) => Array<{ value: string, url: string }>,
    reset?: () => void,
    defaultValue?: string,
}

defineProps<Props>();

const inputValue: Ref<string> = ref('');

</script>

<template>
    <el-autocomplete
        :model-value="defaultValue || inputValue"
        :fetch-suggestions="options"
        clearable
        :placeholder="placeholder || 'Type something...'"
        @select="handleSelect"
        @change="reset"
    />
</template>

<style lang="scss">
@import "@/scss/_variables.scss";

.el-autocomplete{
    width: 45%;
    height: 37px;
    .el-input{
        height: 37px;
        &:focus{
            border: none;
        }
        .el-input__wrapper{
            outline: none;
            background: $heavy_metal;
            border-radius: 8px;
            box-shadow: none;
            &:hover{
                box-shadow: none;
            }
            .el-input__inner{
            &::placeholder{
                font-size: 12px;
                color: $gray_nurse;
                opacity: 0.5;
            }
        }
        }
    }
}

</style>