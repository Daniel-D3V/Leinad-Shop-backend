import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";
import { PersistUpdateCategoryInputDto, PersistUpdateCategoryOutputDto } from "./persist-update-category.dto";
import { CategoryRepositoryInterface } from "@/modules/category/domain/repositories";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { CategoryNotFoundError } from "../../_errors";
import { CategoryUpdatedEvent } from "./category-updated.event";

export class PersistUpdateCategoryUsecase implements UsecaseInterface {

    constructor(
        private readonly categoryRepository: CategoryRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ categoryId, data }: PersistUpdateCategoryInputDto): Promise<Either<Error[], PersistUpdateCategoryOutputDto>> {

        const categoryEntity = await this.categoryRepository.findById(categoryId)
        if (!categoryEntity) return left([ new CategoryNotFoundError() ])

        if(data.title){
            categoryEntity.changeTitle(data.title)
        }
        if(data.description){
            categoryEntity.changeDescription(data.description)
        }

        await this.categoryRepository.update(categoryEntity)

        const categoryUpdatedEvent = new CategoryUpdatedEvent({
            categoryId,
            data
        })
        await this.eventEmitter.emit(categoryUpdatedEvent)

        return right(null)
    }
}