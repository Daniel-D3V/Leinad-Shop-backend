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

    async execute({ categoryId, parrentId }: SetCategoryParentUsecaseInterface.InputDto): Promise<SetCategoryParentUsecaseInterface.OutputDto> {
        
        const category = await this.categoryRepository.findById(categoryId)
        if(!category) return left([ new CategoryNotFoundError() ])

        const parrentCategory = await this.categoryRepository.findById(parrentId)
        if(!parrentCategory) return left([ new ParentCategoryNotFoundError() ])

        if(parrentCategory.isSubCategory()) return left([ new SubCategoryProvidedError() ])

        await this.categoryRepository.update(category)

        const categoryParentSetEvent = new CategoryParentSetEvent({
            categoryId: category.id,
            parrentId: parrentCategory.id
        })
        await this.eventEmitter.emit(categoryParentSetEvent)

        return right(null)
    }
}