import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";
import { PersistCategoryInputDto, PersistCategoryOutputDto } from "./persist-category.dto";
import { CategoryRepositoryInterface } from "@/modules/category/domain/repositories";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { CategoryEntity } from "@/modules/category/domain/entities";
import { CategoryCreatedEvent } from "./category-created.event";

export class PersistCategoryUsecase implements UsecaseInterface{

    constructor(
        private readonly categoryRepository: CategoryRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute(input: PersistCategoryInputDto): Promise<Either<Error[], PersistCategoryOutputDto>> {
        
        const categoryEntityOrError = CategoryEntity.create({
            ...input,
        })
        if(categoryEntityOrError.isLeft()) return left(categoryEntityOrError.value)

        await this.categoryRepository.create(categoryEntityOrError.value)

        const categoryCreatedEvent = new CategoryCreatedEvent({
            ...categoryEntityOrError.value.toJSON()
        })
        await this.eventEmitter.emit(categoryCreatedEvent)

        return right(null)
    }

}