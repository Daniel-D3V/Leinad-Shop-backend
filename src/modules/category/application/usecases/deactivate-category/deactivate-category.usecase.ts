import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { DeactivateCategoryInputDto, DeactivateCategoryOutputDto } from "./deactivate-category.dto";
import { CategoryRepositoryInterface } from "@/modules/category/domain/repositories";
import { CategoryNotFoundError } from "../_errors";
import { CategoryDeactivatedEvent } from "./category-deactivated.event";


export class DeactivateCategoryUsecase implements UsecaseInterface {
    
    constructor(
        private readonly categoryRepository: CategoryRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}


    async execute({ categoryId }: DeactivateCategoryInputDto): Promise<Either<Error[], DeactivateCategoryOutputDto>> {

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