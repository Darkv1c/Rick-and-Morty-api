export interface characterStore {
    characterList: characterList,
    currentCharacter: character
}

export type character = {
    name: string,
    species: string,
    status: string,
    image: string
} | null

export type characterList = {
    info: {
        count: number,
        pages: number
    },
    results: Array<character>
} | null