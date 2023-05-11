import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";
import { ActivateCategoryInputDto, ActivateCategoryOutputDto } from "./activate-category.dto";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { CategoryRepositoryInterface } from "@/modules/category/domain/repositories";
import { CategoryNotFoundError } from "../_errors";
import { CategoryActivatedEvent } from "./category-activated.event";


export class ActivateCategoryUsecase implements UsecaseInterface {
    
    constructor(
        private readonly categoryRepository: CategoryRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ categoryId }: ActivateCategoryInputDto): Promise<Either<Error[], ActivateCategoryOutputDto>> {

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

