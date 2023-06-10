import { Either, left, right } from "@/modules/@shared/logic";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { CategoryRepositoryInterface } from "@/modules/category/domain/repositories";
import { CategoryNotFoundError } from "../_errors";
import { CategoryActivatedEvent } from "./category-activated.event";
import { ActivateCategoryUsecaseInterface } from "@/modules/category/domain/usecases";
import { CategoryAlreadyActivatedError } from "./errors";

export class ActivateCategoryUsecase implements ActivateCategoryUsecaseInterface {

    constructor(
        private readonly categoryRepository: CategoryRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ) { }

    async execute({ categoryId }: ActivateCategoryUsecaseInterface.InputDto): Promise<ActivateCategoryUsecaseInterface.OutputDto> {

        const categoryEntity = await this.categoryRepository.findById(categoryId)
        if (!categoryEntity) return left([new CategoryNotFoundError()])

        if (categoryEntity.isActivate()) return left([new CategoryAlreadyActivatedError()])

        categoryEntity.activate()
        await this.categoryRepository.update(categoryEntity)

        const categoryActivatedEvent = new CategoryActivatedEvent({
            categoryId
        })

        await this.eventEmitter.emit(categoryActivatedEvent)
        return right(null)
    }
}

