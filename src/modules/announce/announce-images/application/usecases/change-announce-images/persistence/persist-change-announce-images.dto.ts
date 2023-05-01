export type PersistChangeAnnounceImagesInputDto = {
    announceId: string,
    images: {
        weight: number
        url: string
    }[]
}

export type PersistChangeAnnounceImagesOutputDto = null