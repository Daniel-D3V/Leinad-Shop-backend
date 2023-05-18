export type UpdateAnnounceInputDto = {
    announceId: string
    data: {
        title?: string
        description?: string
    }
}

export type UpdateAnnounceOutputDto = null