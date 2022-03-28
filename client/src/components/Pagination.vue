<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const emit = defineEmits(['onClick'])
const route = useRoute()
const router = useRouter()

let block = ref(0)
let page = Number(route.query.page) || 1

const props = defineProps({
    /** Range of visible pages in the paginator */
    maxPerView: { type: Number, default: 5 },
    /** Last page avaliable */
    lastIndex: { type: Number, default: 100 }
})

/** It makes an array with a length equal to maxPerView */
const paginationArray = computed(() => {
    let array: number[] = []
    array.length = props.maxPerView
    return array
})
const isLastBlock = computed(() => {
    return block.value === Math.trunc(props.lastIndex / props.maxPerView)
})

/** It passes by query the page to go */
function goToPage(page: number) {
    emit('onClick')
    router.push({
        query: { ...route.query, page}
    })
}
/** It shows previous indexes */
function goToPreviousBlock() {
    block.value -= 1
}
/** It shows next indexes */
function goToNextBlock() {
    block.value += 1
}

block.value = Math.trunc(page / props.maxPerView)
</script>

<template >
    <div class="pagination-container neon-text">
        <span v-if="block" @click="goToPreviousBlock" class="pag-index c-pointer">Prev</span>
        <span
            v-for="(page, n) of paginationArray"
            v-bind:key="'pagination' + (maxPerView * block + n + 1)"
            @click="() => goToPage(maxPerView * block + n + 1)"
            class="c-pointer pag-index"
        >
            <span v-if="(maxPerView * block + n + 1) <= lastIndex">{{ maxPerView * block + n + 1 }}</span>
        </span>
        <span v-if="!isLastBlock" @click="goToNextBlock" class="pag-index c-pointer">Next</span>
    </div>
</template>

<style lang="scss" scoped>
.pagination-container {
    background: rgba($clr-black, 0.8);
    font-family: "Courier New", Courier, monospace;
    font-weight: 800;
    font-size: $font-size-m;
    height: 100px;
    min-height: 50px;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    padding: 10px;
    max-width: 100vw;
    position: relative;
    overflow-x: hidden;
    .pag-index {
        padding: 3px;
        margin: 5px 3px;
        animation: distortion 0.1s 0s forwards;
    }
    &::before {
        content: "";
        background: beige;
        position: absolute;
        top: 0;
        min-width: 100%;
        min-height: 5px;
        animation: loading 3s alternate infinite forwards;
    }
}

@keyframes loading {
    $i: 0;
    $step: 0.01;

    @while ($i * 100) <= 100 {
        #{$i*100 + "%"} {
            background: linear-gradient(
                to right,
                rgba($clr-green, 1 - $i),
                rgba($clr-green, $i),
                rgba($clr-green, 1 - $i)
            );
        }
        $i: $i + $step;
    }
}
</style>