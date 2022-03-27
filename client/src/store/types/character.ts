export type characterStore = {
    characterList: characterList,
    currentCharacter: character
}
interface Icharacter {
    name: string,
    species: string,
    status: string,
    image: string
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

