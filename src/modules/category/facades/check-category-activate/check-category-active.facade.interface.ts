
export interface CheckCategoryActiveFacadeInteface {

    checkByCategoryId(categoryId: string): Promise<boolean>

}