<template lang="">
    <div class="d-flex">
        <Header :onGoBack="`/`" />
        <div v-if="!isLoading" class="container">
            <img id="main-picture" :src="this.currentCharacter.image"/>
            <div class="neon-text details-text">
                <span>Name: {{this.currentCharacter.name || " - "}}</span>
                <span>Status: {{this.currentCharacter.status || " - "}}</span>
                <span>Type: {{this.currentCharacter.type || " - "}}</span>
                <span>Gender: {{this.currentCharacter.gender || " - "}}</span>
                <span>Origin: {{this.currentCharacter.origin.name || " - "}}</span>
                <span>Location: {{this.currentCharacter.location.name || " - "}}</span>
                <span>
                    Episodes: 
                        <ul v-if="episodeList.length">
                            <li v-for="episode in episodeList" :key="'episode' + episode.id">
                                {{episode.name}}
                            </li>
                        </ul>
                        <span v-else> - </span>                  
                </span>
            </div>
        </div>
        <Loading v-else />
    </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { Loading, Header } from '@/components'

export default {
    components: { Loading, Header },
    computed: {
        ...mapState('character', ['currentCharacter']),
        ...mapState('episode', ['episodeList']),
        ...mapState(['isLoading'])
    },
    methods: {
        ...mapActions('character', ['getCharacter', 'characterList']),
        ...mapActions('episode', ['getEpisodeList']),
        ...mapMutations(['setIsLoading'])
    },
    async created() {
        let episodeNumberList = []
        this.setIsLoading(true)
        if (!this.currentCharacter.id){
            await this.getCharacter(this.$route.params.id)
        }
        episodeNumberList = this.currentCharacter.episode.map(e => e.split("/").pop())
        await this.getEpisodeList(episodeNumberList)
        this.setIsLoading(false)
    }
}
</script>
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