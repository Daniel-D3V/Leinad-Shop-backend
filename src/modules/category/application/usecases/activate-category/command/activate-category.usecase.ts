import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either, right } from "@/modules/@shared/logic";
import { ActivateCategoryInputDto, ActivateCategoryOutputDto } from "./activate-category.dto";
import { CommandEmitterInterface } from "@/modules/@shared/events";
import { ActivateCategoryCommand } from "./activate-category.command";


export class ActivateCategoryUsecase implements UsecaseInterface {
    
    constructor(
        private readonly commandEmitter: CommandEmitterInterface
    ){}

    async execute({ categoryId }: ActivateCategoryInputDto): Promise<Either<Error[], ActivateCategoryOutputDto>> {

        const activateCategoryCommand = new ActivateCategoryCommand({
            categoryId
        })
        await this.commandEmitter.emit(activateCategoryCommand)

        return right(null)
    }
}

