export type PlayerCount = {
    id: number,
    count: number,
    text: string
}

export type PlayerClass = {
    name: string,
    imgUrl: string,
    skill: string
}

export type Player = {
    id: number,
    name: string,
    points: number,
    class: PlayerClass,
    counters: PlayerCount[]
}