export type HeaderProps = {
    author: string,
    link: string,
}

export type Messages = {
    count: number | string,
    channelId: string | string,
    timeBucket?: string | number,
}[]

export type series_type = {
    name?: string,
    data?: {x: string | number, y: number}[]
}[]