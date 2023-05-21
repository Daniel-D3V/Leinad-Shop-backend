import { Either, left, right } from "@/modules/@shared/logic";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { CategoryRepositoryInterface } from "@/modules/category/domain/repositories";
import { CategoryNotFoundError } from "../_errors";
import { CategoryDeactivatedEvent } from "./category-deactivated.event";
import { DeactivateCategoryUsecaseInterface } from "@/modules/category/domain/usecases";
import { CategoryAlreadyDeactivatedError } from "./errors";


export class DeactivateCategoryUsecase implements DeactivateCategoryUsecaseInterface {
    
    constructor(
        private readonly categoryRepository: CategoryRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}


    async execute({ categoryId }: DeactivateCategoryUsecaseInterface.InputDto): Promise<DeactivateCategoryUsecaseInterface.OutputDto> {

        const categoryEntity = await this.categoryRepository.findById(categoryId)
        if(!categoryEntity) return left([ new CategoryNotFoundError() ])

        if(!categoryEntity.isActivate()) return left([ new CategoryAlreadyDeactivatedError() ])

        categoryEntity.deactivate()
        await this.categoryRepository.update(categoryEntity)

        const categoryDeactivatedEvent = new CategoryDeactivatedEvent({
            categoryId
        })
        await this.eventEmitter.emit(categoryDeactivatedEvent)


        return right(null)
    }
}