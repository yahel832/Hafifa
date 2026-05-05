export type Product = {
    _id: string,
    name: string,
    description: string,
    weekday: string[],
    category: string,
    creator: string,
    launch_date: string,
    last_updated: string,
    voteCount: number
}

export type updateProduct = {
    name: string,
    description: string,
    weekday: string[],
    category: string,
    creator: string
}

export type createProduct = {
    name: string | null,
    description: string | null,
    weekday: string[] | null,
    category: string | null,
    creator: string | null
}

