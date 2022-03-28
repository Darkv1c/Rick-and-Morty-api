export type characterStore = {
    characterList: characterList,
    currentCharacter: character
}
interface Icharacter {
    id: 2,
    name: string,
    status: string,
    species: string,
    type: string,
    gender: string,
    origin: {
        name: string,
        url: string
    },
    location: {
        name: string,
        url: string
    },
    image: string,
    episode: string[],
    url: string,
    created: string
}
interface IcharacterList {
    info: {
        count: number,
        pages: number
    },
    results: Array<Icharacter>
}

export type character = Icharacter | null
export type characterList = IcharacterList | null

