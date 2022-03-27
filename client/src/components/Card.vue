<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { ref } from 'vue'

let showTextFunction:ReturnType<typeof setTimeout>

let showText = ref(false)

const props = defineProps({
    /** Info to show in the cart */
    fields: Object,
    /** Indicates number of the card */
    identifier: Number,
    /** the background of the card, it has to be passad like a background-image css property */
    background: String
})

/** A list with the props of the object
 * @example [{name: 'Jhon'}, {'last-name': 'Doe'}]
 */
const cardFields = computed(() => {
    let propsArray = []

    for (let prop in props.fields){
        propsArray.push({[prop]: props.fields[prop]})
    }

    return propsArray
})

function setShowText(show:boolean) {
    clearTimeout(showTextFunction)
    showTextFunction = setTimeout(() => { showText.value = show }, 230);    
}
</script>

<template>
    <div :class="'card-container c-pointer card-container'"
        @mouseover="()=>setShowText(true)" @mouseleave="()=>setShowText(false)">
        <div :class="'card-sub-container neon-text card-sub-container'">
            <div v-show="showText" class="card-text-container d-flex">
                <span v-for="(prop, n) in cardFields" :key="'cardField' + n">
                    {{Object.keys(prop)[0]}}: {{prop[Object.keys(prop)[0]]}}
                </span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .card-container{
        background-image: v-bind(background);
        max-width: 250px;
        max-height: 250px;
        min-width: 150px;
        min-height: 150px;
        border-radius: 40px;
        margin: 12px;
        aspect-ratio: 1/1;
        flex: 0 1 25%;
        .card-sub-container{
            background-size: cover;
            transition: all .5s ease-in-out 0s;
            min-width: 100%;
            min-height: 100%;
            border-radius: 40px;
            position: relative  ;
            .card-text-container{
                background: linear-gradient(to bottom, rgba(var(--clr-black), .8), rgba(var(--clr-black), .5), rgba(var(--clr-black), .8), 
                rgba(var(--clr-black), .5), rgba(var(--clr-black), .8), rgba(var(--clr-black), .5));
                min-width: 100%;
                min-height: 100%;
                border-radius: 40px;
                position: absolute;
                transform: rotatey(180deg);
                box-sizing: border-box;
                padding: 10%;
                animation: gradientChange;
                animation-delay: 0;
                animation-duration: .25s;
                animation-iteration-count: infinite;
                animation-direction: alternate;
            }
        }
        @for $i from 0 to 10 {
            &:hover > .card-sub-container {
                transform: rotatey(180deg);
                transition: all .5s ease-in-out 0s;                
            }
        }
    }

    @keyframes gradientChange {
        $i: 0;
        $base: 0.6;
        $range: 0.3;
        
        @while $i <= 1  {
            #{$i*100 + "%"} {
                background: repeating-linear-gradient(to bottom, rgba(var(--clr-black), $base + ($range * $i)), 
                rgba(var(--clr-black), $base + ($range -  $range * $i)), rgba(var(--clr-black), $base + ($range * $i)), 
                rgba(var(--clr-black), $base + ($range -  $range * $i)) 5%);
            }
            $i: $i + 0.01
        }
    }

    @media screen and (max-width: $phone) {
        .card-container{
            display: flex;
            min-width: 100%;
            margin: 0;
            background: rgba(var(--clr-black), 0.5);
            max-height: 30px;
            border-radius: 0;
            position: relative;
            .card-sub-container{
                border-radius: 0;
                max-height: 100%;
                min-width: 0%;
                aspect-ratio: 1/1;
                position: static;
                &:hover{
                    transform: none;
                }
                .card-text-container{
                    position: absolute;
                    max-height: 100%;
                    display: flex !important;
                    justify-content: center;
                    left: 0;
                    transform: rotateY(0deg);
                    border-radius: 0;
                    animation: none;
                    background: transparent;
                    span{
                        max-width: 50%;
                    }
                }
            }
        }
        @for $i from 0 to 10 {
            .card-container {
                @if ($i%2==1) {
                    flex-direction: row-reverse;
                } @else {
                    background: rgba(white, 0.3);
                    text-align: end;
                    .card-text-container{
                        align-items: flex-end;
                    }
                }          
            }
        }
    }
</style>