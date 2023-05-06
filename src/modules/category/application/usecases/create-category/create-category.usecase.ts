import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";
import { CreateCategoryDtoInput, CreateCategoryDtoOutput } from "./create-category.dto";
import {  EventEmitterInterface } from "@/modules/@shared/events";
import { CategoryEntity } from "@/modules/category/domain/entities";
import { CategoryRepositoryInterface } from "@/modules/category/domain/repositories";
import { CategoryTitleInUseError } from "../_errors/category-title-in-use.error";
import { CategoryCreatedEvent } from "./category-created.event";

export class CreateCategoryUsecase implements UsecaseInterface {

    constructor(
        private readonly categoryRepository: CategoryRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute(input: CreateCategoryDtoInput): Promise<Either<Error[], CreateCategoryDtoOutput>> {
        
        const categoryEntityOrError = CategoryEntity.create({
            ...input,
        })
        if(categoryEntityOrError.isLeft()) return left(categoryEntityOrError.value)

        const categoryFoundByTitle = await this.categoryRepository.findByTitle(input.title)
        if(categoryFoundByTitle) return left([new CategoryTitleInUseError()])

        await this.categoryRepository.create(categoryEntityOrError.value)

        const categoryCreatedEvent = new CategoryCreatedEvent({
            ...categoryEntityOrError.value.toJSON()
        })
        await this.eventEmitter.emit(categoryCreatedEvent)

    
        return right(null)
    }
    
}
