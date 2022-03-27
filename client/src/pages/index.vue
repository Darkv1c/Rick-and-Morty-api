<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia';
import { useCharacterStore } from '../store'
import CardList from '../components/CardList.vue';
import { computed } from '@vue/reactivity';

const characterStore = useCharacterStore()
const { characterList } = storeToRefs(characterStore)

onBeforeMount(async () => {
	await characterStore.getCharacters(0)
})

/** Sets the fields to show in the card */
const getFields = computed(() => {
	return {
		Name: 'name',
		Species: 'species',
		Status: 'status'
	}
})
</script>

<template>
	<div class="d-flex index-container">
		<Header title="Rick & Morty" class="index-header" />
		<CardList
			v-if="characterList"
			:fields="getFields"
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
