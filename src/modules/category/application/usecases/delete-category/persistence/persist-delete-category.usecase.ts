import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either, right } from "@/modules/@shared/logic";
import { PersistDeleteCategoryInputDto, PersistDeleteCategoryOutputDto } from "./persist-delete-category.dto";
import { CategoryRepositoryInterface } from "@/modules/category/domain/repositories";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { CategoryDeletedEvent } from "./category-deleted.event";

export class PersistDeleteCategoryUsecase implements UsecaseInterface {

    constructor(
        private readonly categoryRepository: CategoryRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ categoryId }: PersistDeleteCategoryInputDto): Promise<Either<Error[], PersistDeleteCategoryOutputDto>> {
        
        await this.categoryRepository.delete(categoryId)

        const categoryDeletedEvent = new CategoryDeletedEvent({
            categoryId
        })
        await this.eventEmitter.emit(categoryDeletedEvent)

        return right(null)
    }
}