export type UpdateCategoryInfoInputDto = {
    categoryId: string
    data: {
        title?: string
        description?: string
    }
}

export type UpdateCategoryInfoOutputDto = null