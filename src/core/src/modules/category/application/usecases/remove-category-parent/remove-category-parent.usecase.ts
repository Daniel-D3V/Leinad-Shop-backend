import { EventEmitterInterface } from "@/modules/@shared/events";
import { left, right } from "@/modules/@shared/logic";
import { CategoryRepositoryInterface } from "@/modules/category/domain/repositories";
import { RemoveCategoryParentUsecaseInterface } from "@/modules/category/domain/usecases";
import { CategoryNotFoundError } from "../_errors";
import { CategoryParentRemovedEvent } from "./category-parent-removed.event";

export class RemoveCategoryParentUsecase implements RemoveCategoryParentUsecaseInterface {

    constructor(
        private readonly categoryRepository: CategoryRepositoryInterface,
        private readonly EventEmitter: EventEmitterInterface
    ){}

    async execute(data: RemoveCategoryParentUsecaseInterface.InputDto): Promise<RemoveCategoryParentUsecaseInterface.OutputDto> {
        
        const category = await this.categoryRepository.findById(data.categoryId)
        if(!category) return left([ new CategoryNotFoundError() ])

        category.removeParentId()
        
        await this.categoryRepository.update(category)

        const categoryParentRemovedEvent = new CategoryParentRemovedEvent({
            categoryId: category.id
        })

        await this.EventEmitter.emit(categoryParentRemovedEvent)

        return right(null)
    }
}