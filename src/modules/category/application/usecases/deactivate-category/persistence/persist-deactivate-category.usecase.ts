import { UsecaseInterface } from "@/modules/@shared/domain";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { Either, left, right } from "@/modules/@shared/logic";
import { CategoryRepositoryInterface } from "@/modules/category/domain/repositories";
import { CategoryNotFoundError } from "../../_errors";
import { CategoryDeactivatedEvent } from "./category-deactivated.event";
import { PersistDeactivateCategoryInputDto, PersistDeactivateCategoryOutputDto } from "./persist-deactivate-category.dto";

export class PersistDeactivateCategoryUsecase implements UsecaseInterface {
    
    constructor(
        private readonly categoryRepository: CategoryRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ categoryId }: PersistDeactivateCategoryInputDto): Promise<Either<Error[], PersistDeactivateCategoryOutputDto>> {

        const categoryEntity = await this.categoryRepository.findById(categoryId)
        if(!categoryEntity) return left([ new CategoryNotFoundError() ])

        categoryEntity.deactivate()
        await this.categoryRepository.update(categoryEntity)

        const categoryDeactivatedEvent = new CategoryDeactivatedEvent({
            categoryId
        })
        await this.eventEmitter.emit(categoryDeactivatedEvent)

        return right(null)   
    }
}