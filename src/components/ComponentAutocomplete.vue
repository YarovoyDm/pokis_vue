<script setup>
import { ref, defineProps } from 'vue'

defineProps({
    placeholder: {
        type: String,
    },
    handleSelect: {
        type: Function
    },
    options: {
        type: Function
    },
    reset: {
        type: Function
    },
    defaultValue: {
        type: String
    }
})

const inputValue = ref('');

</script>

<template>
    <el-autocomplete
        v-model="inputValue"
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