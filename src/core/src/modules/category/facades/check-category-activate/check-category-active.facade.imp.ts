import { PrismaCategoryRepository } from "../../infra/repositories";
import { CheckCategoryActiveFacadeInteface } from "./check-category-active.facade.interface";

export class CheckCategoryActiveFacadeImp implements CheckCategoryActiveFacadeInteface {

    async checkByCategoryId(categoryId: string): Promise<boolean> {
        const prismaCategoryRepository = new PrismaCategoryRepository()
        const categoryEntity = await prismaCategoryRepository.findById(categoryId)
        if(!categoryEntity) return false
        return categoryEntity.isActivate()
     }
}