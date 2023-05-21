import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";
import {  EventEmitterInterface } from "@/modules/@shared/events";
import { CategoryEntity } from "@/modules/category/domain/entities";
import { CategoryRepositoryInterface } from "@/modules/category/domain/repositories";
import { CategoryTitleInUseError } from "../_errors/category-title-in-use.error";
import { CategoryCreatedEvent } from "./category-created.event";
import { CreateCategoryUsecaseInterface } from "@/modules/category/domain/usecases";

export class CreateCategoryUsecase implements UsecaseInterface {

    constructor(
        private readonly categoryRepository: CategoryRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute(inputProvided: CreateCategoryUsecaseInterface.InputDto): Promise<CreateCategoryUsecaseInterface.OutputDto> {
        const { parrentId, ...input } = inputProvided as any
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

        return right({
            id: categoryEntityOrError.value.id
        })
    }
    
}
