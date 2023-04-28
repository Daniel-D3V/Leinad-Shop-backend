import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either, right } from "@/modules/@shared/logic";
import { CommandEmitterInterface } from "@/modules/@shared/events";
import { DeactivateCategoryCommand } from "./deactivate-category.command";
import { DeactivateCategoryInputDto, DeactivateCategoryOutputDto } from "./deactivate-category.dto";


export class DeactivateCategoryUsecase implements UsecaseInterface {
    
    constructor(
        private readonly commandEmitter: CommandEmitterInterface
    ){}

    async execute({ categoryId }: DeactivateCategoryInputDto): Promise<Either<Error[], DeactivateCategoryOutputDto>> {

        const deactivateCategoryCommand = new DeactivateCategoryCommand({
            categoryId
        })
        await this.commandEmitter.emit(deactivateCategoryCommand)

        return right(null)
    }
}