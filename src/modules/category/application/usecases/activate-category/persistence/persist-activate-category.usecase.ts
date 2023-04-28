import { UsecaseInterface } from "@/modules/@shared/domain";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { Either, left, right } from "@/modules/@shared/logic";
import { CategoryRepositoryInterface } from "@/modules/category/domain/repositories";
import { PersistActivateCategoryInputDto, PersistActivateCategoryOutputDto } from "./persist-activate-category.dto";
import { CategoryNotFoundError } from "../../_errors";
import { CategoryActivatedEvent } from "./category-activated.event";

export class PersistActivateCategoryUsecase implements UsecaseInterface {
    
    constructor(
        private readonly categoryRepository: CategoryRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ categoryId }: PersistActivateCategoryInputDto): Promise<Either<Error[], PersistActivateCategoryOutputDto>> {

        const categoryEntity = await this.categoryRepository.findById(categoryId)
        if(!categoryEntity) return left([ new CategoryNotFoundError() ])

        categoryEntity.activate()
        await this.categoryRepository.update(categoryEntity)

        const categoryActivatedEvent = new CategoryActivatedEvent({
            categoryId
        })
        await this.eventEmitter.emit(categoryActivatedEvent)

        return right(null)   
    }
}