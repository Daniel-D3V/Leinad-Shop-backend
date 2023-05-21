import { Either, right } from "@/modules/@shared/logic";
import {  EventEmitterInterface } from "@/modules/@shared/events";
import { CategoryDeletedEvent } from "./category-deleted.event";
import { CategoryRepositoryInterface } from "@/modules/category/domain/repositories";
import { DeleteCategoryUsecaseInterface } from "@/modules/category/domain/usecases";

export class DeleteCategoryUsecase implements DeleteCategoryUsecaseInterface {

    constructor(
        private readonly categoryRepository: CategoryRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ categoryId }: DeleteCategoryUsecaseInterface.InputDto): Promise<DeleteCategoryUsecaseInterface.OutputDto> {

        await this.categoryRepository.delete(categoryId)

        const categoryDeletedEvent = new CategoryDeletedEvent({
            categoryId
        })
        await this.eventEmitter.emit(categoryDeletedEvent)

        return right(null)
    }
} 
