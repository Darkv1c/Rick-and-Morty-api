<script setup lang="ts">
import { PropType } from 'vue'

const props = defineProps({
    /** An Object with the name and value of the fieds, being the property name the name of the field and the value
     * the name of the property from where to take the value of the field
     * @example {Name: 'name', City: 'city', Department: 'state' }
     */
    fields: {type: Object as PropType<{[key: string]: string}>, require: true, default: ()=>({})},
    /** An array of objects */
    list: {type: Array as PropType<Array<{[key: string]: any}>>, require: true, default: null},
    /** The name of the property that contains the url of the image to show in the card */
    imgProperty: {type: String, default: ''}
})

const emit = defineEmits(['onCardClick'])

/** Gets the object fields to pass by parameter to the card
 * @param {Object} element the element from where to obtain the info
 */
function getCardFieldsList(element:{[key: string]: string}) : Object { 
    let response: typeof props.fields = {}

    for (const prop in props.fields){
        response[prop] = element[props.fields[prop]]
    }

    return response
}
/** Gets the image url from an object
 * @param {any} element The object with the image
 * @param {string} propertyName The name of the property where is the url
 */
function getImgUrl(element:{[key: string]: string}, propertyName:string):string{
    return element[propertyName]
}
function onClick(element:{ [key: string]: string; }){
    emit('onCardClick', element)
}
</script>

<template>
    <div class="card-list-container d-flex">
        <Card
            v-for="(element, n) in list" :key="'card' + n"            
            :fields="getCardFieldsList(element)"
            :background="getImgUrl(element, imgProperty)"
            @click="onClick(element)"
        />
    </div>
</template>

<style lang="scss" scoped>
    .card-list-container{
        flex-direction: row !important;
        flex-wrap: wrap;
        width: 100%;
        box-sizing: border-box;
        overflow-y: scroll;
        justify-content: center;
    }
</style>