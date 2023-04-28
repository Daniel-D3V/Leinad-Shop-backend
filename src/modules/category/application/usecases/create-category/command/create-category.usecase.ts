import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";
import { CreateCategoryDtoInput, CreateCategoryDtoOutput } from "./create-category.dto";
import { CommandEmitterInterface } from "@/modules/@shared/events";
import { CreateCategoryCommand } from "./create-category.command";
import { CategoryEntity } from "@/modules/category/domain/entities";
import { CategoryRepositoryInterface } from "@/modules/category/domain/repositories";
import { CategoryTitleInUseError } from "./errors";

export class CreateCategoryUsecase implements UsecaseInterface {

    constructor(
        private readonly categoryRepository: CategoryRepositoryInterface,
        private readonly commandEmitter: CommandEmitterInterface
    ){}

    async execute(input: CreateCategoryDtoInput): Promise<Either<Error[], CreateCategoryDtoOutput>> {
        
        const categoryEntityOrError = CategoryEntity.create({
            ...input,
        })
        if(categoryEntityOrError.isLeft()) return left(categoryEntityOrError.value)

        const categoryFoundByTitle = await this.categoryRepository.findByTitle(input.title)
        if(categoryFoundByTitle) return left([new CategoryTitleInUseError()])

        const createCategoryCommand = new CreateCategoryCommand({
            ...categoryEntityOrError.value.toJSON()
        })
        await this.commandEmitter.emit(createCategoryCommand)

        return right(null)
    }
    
}
