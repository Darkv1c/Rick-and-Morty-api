import axios from 'axios'
import { defineStore } from 'pinia'

axios.defaults.baseURL = "https://rickandmortyapi.com/api"

export const useCharacterStore = defineStore('character', {
    state: () => ({  
        characterList: [],
        currentCharacter: {}
    }),
    actions: {
        /**
         * Gets the characters from the api and sets characterList state with the response
         */
        async getCharacters(page:number) {
            await axios.get('/caracter', {params: {page}})
            .then(({data}) => this.characterList = data)
            .catch(error => {throw error})
        }
    }
})