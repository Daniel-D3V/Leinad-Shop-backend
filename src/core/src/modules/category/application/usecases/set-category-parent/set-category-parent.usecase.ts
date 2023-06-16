import { EventEmitterInterface } from "@/modules/@shared/events";
import { left, right } from "@/modules/@shared/logic";
import { CategoryRepositoryInterface } from "@/modules/category/domain/repositories";
import { SetCategoryParentUsecaseInterface } from "@/modules/category/domain/usecases";
import { CategoryNotFoundError, ParentCategoryNotFoundError, SubCategoryProvidedError } from "../_errors";
import { CategoryParentSetEvent } from "./category-parent-set.event";

export class SetCategoryParentUsecase implements SetCategoryParentUsecaseInterface {

    constructor(
        private readonly categoryRepository: CategoryRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ categoryId, parentId }: SetCategoryParentUsecaseInterface.InputDto): Promise<SetCategoryParentUsecaseInterface.OutputDto> {
        
        const category = await this.categoryRepository.findById(categoryId)
        if(!category) return left([ new CategoryNotFoundError() ])

        const parentCategory = await this.categoryRepository.findById(parentId)
        if(!parentCategory) return left([ new ParentCategoryNotFoundError() ])

        if(parentCategory.isSubCategory()) return left([ new SubCategoryProvidedError() ])

        category.setParentId(parentCategory.id)

        await this.categoryRepository.update(category)

        const categoryParentSetEvent = new CategoryParentSetEvent({
            categoryId: category.id,
            parentId: parentCategory.id
        })
        await this.eventEmitter.emit(categoryParentSetEvent)

        return right(null)
    }
}