export type ChangeAnnounceImagesInputDto = {
    announceId: string,
    images: {
        weight: number
        url: string
    }[]
}

export type ChangeAnnounceImagesOutputDto = null