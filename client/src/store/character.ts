import axios from 'axios'
import { defineStore } from 'pinia'
import { characterStore } from './types'

axios.defaults.baseURL = "https://rickandmortyapi.com/api"

export const useCharacterStore = defineStore('character', {
    state: ():characterStore => ({
        characterList: null,
        currentCharacter: null
    }),
    actions: {
        /**Gets the characters from the api and sets characterList state with the response
         * @param page the number of the page to bring         
         */
        async getCharacters(page:number) {
            await axios.get('/character', {params: {page}})
            .then(({data}) => this.characterList = data)
            .catch(error => {throw error})
        }
    }
})