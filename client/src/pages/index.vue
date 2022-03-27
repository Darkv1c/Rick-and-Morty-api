<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia';
import { useCharacterStore } from '../store'
import { character } from '../store/types'
import CardList from '../components/CardList.vue';

const characterStore = useCharacterStore()
const { characterList } = storeToRefs(characterStore)

onBeforeMount(async () => {
	await characterStore.getCharacters(0)
})

/** Gets the necessary properties of the character object to show inthe fields
 * @param {character} character the character object with the info
 */
function getFields(character: character) {
	if (!character) return {}
	return {
		Name: character.name,
		Species: character.species,
		Status: character.status
	}
}
</script>

<template>
	<div class="d-flex index-container">
		<Header title="Rick & Morty" class="index-header" />
		<CardList
			v-if="characterList"
			:fields="{Name: 'name', Species: 'species', Status: 'status'}"
			:list="characterList.results"
		/>
	</div>
</template>

<style lang="scss" scoped>
.index-container {
	height: 100vh;
}
.index-card-list {
	min-height: 70vh;
	margin: auto;
	box-sizing: border-box;
	padding: 2% 5% 2% 5%;
}

@media screen and (max-width: $phone) {
	.index-card-list {
		padding: 0;
		margin: 0;
		max-height: calc(100vh - 60px);
	}
	.index-header {
		display: none;
	}
}
</style>
