import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either, right } from "@/modules/@shared/logic";
import { DeleteCategoryInputDto, DeleteCategoryOutputDto } from "./delete-category.dto";
import {  EventEmitterInterface } from "@/modules/@shared/events";
import { CategoryDeletedEvent } from "./category-deleted.event";
import { CategoryRepositoryInterface } from "@/modules/category/domain/repositories";

export class DeleteCategoryUsecase implements UsecaseInterface {

    constructor(
        private readonly categoryRepository: CategoryRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ categoryId }: DeleteCategoryInputDto): Promise<Either<Error[], DeleteCategoryOutputDto>> {

        await this.categoryRepository.delete(categoryId)

        const categoryDeletedEvent = new CategoryDeletedEvent({
            categoryId
        })
        await this.eventEmitter.emit(categoryDeletedEvent)

        return right(null)
    }
} 
