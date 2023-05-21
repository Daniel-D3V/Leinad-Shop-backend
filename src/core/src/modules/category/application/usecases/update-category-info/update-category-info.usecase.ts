import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";
import { CategoryRepositoryInterface } from "@/modules/category/domain/repositories";
import { CommandEmitterInterface, EventEmitterInterface } from "@/modules/@shared/events";
import { CategoryNotFoundError } from "../_errors";
import { CategoryTitleInUseError } from "../_errors/category-title-in-use.error";
import { CategoryInfoUpdatedEvent } from "./category-info-updated.event";
import { UpdateCategoryInfoUsecaseInterface } from "@/modules/category/domain/usecases";

export class UpdateCategoryInfoUsecase implements UsecaseInterface {

    constructor(
        private readonly categoryRepository: CategoryRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ categoryId, data }: UpdateCategoryInfoUsecaseInterface.InputDto): Promise<UpdateCategoryInfoUsecaseInterface.OutputDto> {

        const categoryEntity = await this.categoryRepository.findById(categoryId)
        if(!categoryEntity) return left([ new CategoryNotFoundError() ])

        if(data.title){
            const titleChanged = categoryEntity.changeTitle(data.title)
            if(titleChanged.isLeft()) return left(titleChanged.value)

            const categoryFoundByTitle = await this.categoryRepository.findByTitle(data.title)
            if(categoryFoundByTitle) return left([ new CategoryTitleInUseError() ])
        }
        if(data.description){
            const descriptionChanged = categoryEntity.changeDescription(data.description)
            if(descriptionChanged.isLeft()) return left(descriptionChanged.value)
        }

        await this.categoryRepository.update(categoryEntity)

        const categoryUpdatedEvent = new CategoryInfoUpdatedEvent({
            categoryId,
            data
        })
        await this.eventEmitter.emit(categoryUpdatedEvent)
        
        return right(null)
    }
}