import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";
import { UpdateCategoryInputDto, UpdateCategoryOutputDto } from "./update-category.dto";
import { CategoryRepositoryInterface } from "@/modules/category/domain/repositories";
import { CommandEmitterInterface } from "@/modules/@shared/events";
import { CategoryNotFoundError } from "../../_errors";
import { CategoryTitleInUseError } from "../../_errors/category-title-in-use.error";
import { UpdateCategoryCommand } from "./update-category.command";

export class UpdateCategoryUsecase implements UsecaseInterface {

    constructor(
        private readonly categoryRepository: CategoryRepositoryInterface,
        private readonly commandEmitter: CommandEmitterInterface
    ){}

    async execute({ categoryId, data }: UpdateCategoryInputDto): Promise<Either<Error[], UpdateCategoryOutputDto>> {

        const categoryEntity = await this.categoryRepository.findById(categoryId)
        if(!categoryEntity) return left([ new CategoryNotFoundError() ])

        if(data.title){
            const titleChanged = categoryEntity.changeTitle(data.title)
            if(titleChanged.isLeft()) return left(titleChanged.value)

            const categoryFoundByTitle = await this.categoryRepository.findByTitle(data.title)
            if(!categoryFoundByTitle) return left([ new CategoryTitleInUseError() ])
        }
        if(data.description){
            const descriptionChanged = categoryEntity.changeDescription(data.description)
            if(descriptionChanged.isLeft()) return left(descriptionChanged.value)
        }

        const updateCategoryCommand = new UpdateCategoryCommand({
            categoryId,
            data
        })
        await this.commandEmitter.emit(updateCategoryCommand)

        return right(null)
    }
}