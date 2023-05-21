import { Either, left, right } from "@/modules/@shared/logic";
import {  EventEmitterInterface } from "@/modules/@shared/events";
import { CategoryDeletedEvent } from "./category-deleted.event";
import { CategoryRepositoryInterface } from "@/modules/category/domain/repositories";
import { DeleteCategoryUsecaseInterface } from "@/modules/category/domain/usecases";
import { CategoryNotFoundError } from "../_errors";

export class DeleteCategoryUsecase implements DeleteCategoryUsecaseInterface {

    constructor(
        private readonly categoryRepository: CategoryRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ categoryId }: DeleteCategoryUsecaseInterface.InputDto): Promise<DeleteCategoryUsecaseInterface.OutputDto> {

        const categoryEntity = await this.categoryRepository.findById(categoryId)
        if(!categoryEntity) return left([ new CategoryNotFoundError() ])

        await this.categoryRepository.delete(categoryId)

        const categoryDeletedEvent = new CategoryDeletedEvent({
            categoryId
        })
        await this.eventEmitter.emit(categoryDeletedEvent)

        return right(null)
    }
} 
