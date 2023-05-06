import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";
import { UpdateCategoryInfoInputDto, UpdateCategoryInfoOutputDto } from "./update-category-info.dto";
import { CategoryRepositoryInterface } from "@/modules/category/domain/repositories";
import { CommandEmitterInterface, EventEmitterInterface } from "@/modules/@shared/events";
import { CategoryNotFoundError } from "../_errors";
import { CategoryTitleInUseError } from "../_errors/category-title-in-use.error";
import { CategoryInfoUpdatedEvent } from "./category-info-updated.event";

export class UpdateCategoryInfoUsecase implements UsecaseInterface {

    constructor(
        private readonly categoryRepository: CategoryRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ categoryId, data }: UpdateCategoryInfoInputDto): Promise<Either<Error[], UpdateCategoryInfoOutputDto>> {

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