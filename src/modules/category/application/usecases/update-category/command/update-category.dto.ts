export type UpdateCategoryInputDto = {
    categoryId: string
    data: {
        title: string
        description: string
    }
}

export type UpdateCategoryOutputDto = null