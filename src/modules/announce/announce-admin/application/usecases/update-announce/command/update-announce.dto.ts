export type UpdateAnnounceInputDto = {
    announceId: string
    data: {
        title?: string
        description?: string
        price?: number
    }
}

export type UpdateAnnounceOutputDto = null