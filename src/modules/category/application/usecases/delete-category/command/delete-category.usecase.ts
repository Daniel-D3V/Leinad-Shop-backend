import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";
import { DeleteCategoryInputDto, DeleteCategoryOutputDto } from "./delete-category.dto";
import { CategoryRepositoryInterface } from "@/modules/category/domain/repositories";
import { CommandEmitterInterface } from "@/modules/@shared/events";
import { CategoryNotFoundError } from "../../_errors";
import { DeleteCategoryCommand } from "./delete-category.command";

export class DeleteCategoryUsecase implements UsecaseInterface {

    constructor(
        private readonly commandEmitter: CommandEmitterInterface
    ){}

    async execute({ categoryId }: DeleteCategoryInputDto): Promise<Either<Error[], DeleteCategoryOutputDto>> {

        const deleteCategoryCommand = new DeleteCategoryCommand({
            categoryId
        })
        await this.commandEmitter.emit(deleteCategoryCommand)

        return right(null)
    }
} 