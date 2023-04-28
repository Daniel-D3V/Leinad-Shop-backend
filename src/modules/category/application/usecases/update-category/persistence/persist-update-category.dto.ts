
export type PersistUpdateCategoryInputDto = {
    categoryId: string
    data: {
        title?: string
        description?: string
    }
}

export type PersistUpdateCategoryOutputDto = null