<script setup lang="ts">
import { computed } from '@vue/reactivity';

const props = defineProps({
    /** An Object with the name and value of the fieds, being the property name the name of the field and the value
     * the name of the property from where take the value of the field
     * @example {Name: 'name', City: 'city', Department: 'state' }
     */
    fields: {type: Object, require: true},
    /** An array of objects */
    list: {type: Array, require: true}
})

const cardFieldsList = computed(() => { 
    let response = []
    let auxObject = {}

    if (props.list){
        for (const element of props.list) {
            if (typeof element === 'object'){
                for (const prop in element) {
                    auxObject = {
                        ...auxObject,
                        [prop]: element[prop as keyof {}]
                    }
                }
            }
            response.push({
                auxObject
            })
        }
    }
    return auxObject
})
</script>

<template>
    <div class="card-list-container d-flex">
        <Card
            v-for="(element, n) in list" :key="'card' + n"            
            :fields="element"
            background="url('https://lenguajejs.com/vuejs/componentes/composition-api/options-api-composition-api.png')"
        />
    </div>
</template>

<style lang="scss" scoped>
    .card-list-container{
        flex-direction: row !important;
        flex-wrap: wrap;
        width: 100%;
        box-sizing: border-box;
        max-height: 40vh;
        overflow-y: scroll;
        justify-content: center;
    }
</style>