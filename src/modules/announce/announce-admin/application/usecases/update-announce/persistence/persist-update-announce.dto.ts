export type PersistUpdateAnnounceInputDto = {
    announceId: string
    data: {
        title?: string
        description?: string
        price?: number
    }
}

export type PersistUpdateAnnounceOutputDto = null