<script setup lang="ts">import { defineStore, storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useCharacterStore } from '../../store'

const route = useRoute()
const characterStore = useCharacterStore()
const { currentCharacter } = storeToRefs(characterStore)

console.log('character', currentCharacter.value)

if (!currentCharacter){
    characterStore.getCharacter(Number(route.params.id))
    .then(response => console.log(response))
}
</script>

<template>
    <div class="d-flex">
        <Header :onGoBack="`/`" />
        <div v-if="currentCharacter" class="container">
            <img id="main-picture" :src="currentCharacter.image"/>
            <div class="neon-text details-text">
                <span>Name: {{currentCharacter.name || " - "}}</span>
                <span>Status: {{currentCharacter.status || " - "}}</span>
                <span>Type: {{currentCharacter.type || " - "}}</span>
                <span>Gender: {{currentCharacter.gender || " - "}}</span>
                <span>Origin: {{currentCharacter.origin.name || " - "}}</span>
                <span>Location: {{currentCharacter.location.name || " - "}}</span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .container{
        display: grid;
        grid-template-columns: 1fr 2fr;
        grid-column-gap: 25px;
        background: linear-gradient(to bottom, transparent, rgb(var(--clr-black)));
        min-height: 100vh;
    }
    img{
        width: 30%;
        min-width: 500px;
    }
    .details-text {
        display: flex;
        flex-direction: column;
        font-size: 25px;
    }
    #main-picture{
        max-width: 100%;
        min-width: 100%;
    }

    @media screen and (max-width: $phone) {
        .container{
            display: flex;
            flex-direction: column;
        }
        .details-text{
           margin-top: 60px
        }
    }
</style>