<script setup lang="ts">

const props = defineProps({
    /** Indicates what to do on "go back" button click, if a route (string) is passed by parameter
     it will redirect to that route, if it's a function it will run it
    */
    onGoBack: [String, Function],
    /** Text to show in the header */
    title: String
})

/**
 * It manage what to do on "go back" button click
 * @returns {string} the value of "onGoBack" prop
 */
function onGoBackClick():string|Function {
    if (typeof props.onGoBack === "function"){
        return props.onGoBack()
    }

    return window.location.hash = props.onGoBack || '/'
} 
</script>

<template >
    <div class="header-container neon-text">
        <div>
            <span v-if="onGoBack" @click="onGoBackClick" class="c-pointer go-back">
                <span class="material-icons-outlined" style="font-size: 40px">
                    chevron_left
                </span>
                Go back
            </span>
        </div>
        <div class="header-title">
            <span v-if="title">
                {{title}}
            </span>
        </div>
    </div>
</template>

<style lang="scss" scoped> 
    .header-container {
        background: rgba($clr-black, 0.8);
        height: 150px;
        min-width: 100%;
        flex-direction: row !important;
        align-items: center;
        font-size: $font-size-sm;
        font-weight: 800;
        display: grid;
        grid-template-columns: 1fr 2fr 1fr;
        position: relative;
        .header-title{
            pointer-events: none;
            margin: auto;
            font-size: 50px;
            font-weight: 800;
            max-height: 100%;
        }
        span{
            display: flex;
            align-items: center;
        }
        &::after{
            content: '';
            display: block;
            min-width: 100%;
            min-height: 5px;
            animation: loading 3s alternate infinite forwards;
            position: absolute;
            bottom: 0;
        }
    }
    //animations
    @keyframes loading {
        $i: 0;
        $step: .01;

        @while ($i * 100) <= 100 {
            #{$i*100 + "%"} {
                background: linear-gradient(to right, rgba($clr-green, 1 - $i), rgba($clr-green, $i), rgba($clr-green, 1 - $i))
            }
            $i: $i + $step
        }
    }

    //media querys
    @media screen and (max-width: $phone) {
        .header-container{
            grid-template-columns: 1fr 0fr 1fr;
            max-height: 60px;
            position: sticky;
        }
    }
</style>