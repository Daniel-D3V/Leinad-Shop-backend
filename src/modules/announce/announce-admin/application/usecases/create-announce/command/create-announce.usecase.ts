import { CheckCategoryActiveFacadeFactory } from "@/modules/category/facades";
import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";
import { CreateAnnounceInputDto, CreateAnnounceOutputDto } from "./create-announce.dto";
import { AnnounceEntity } from "@/modules/announce/announce-admin/domain/entities";
import { CommandEmitterInterface } from "@/modules/@shared/events";
import { CreateAnnounceCommand } from "./create-announce.command";
import { CategoryNotActiveError } from "../../_errors";

export class CreateAnnounceUsecase implements UsecaseInterface{

    constructor(
        private readonly commandEmitter: CommandEmitterInterface
    ){}

    async execute(input: CreateAnnounceInputDto): Promise<Either<Error[], CreateAnnounceOutputDto>> {

        const announceEntity = AnnounceEntity.create({
            ...input
        })
        if(announceEntity.isLeft()) return left(announceEntity.value)

        const checkCategoryActiveFacade = CheckCategoryActiveFacadeFactory.create()
        const isCategoryActive = await checkCategoryActiveFacade.checkByCategoryId(input.categoryId)
        if(!isCategoryActive) return left([new CategoryNotActiveError()])

        const createAnnounceCommand = new CreateAnnounceCommand({
            ...announceEntity.value.toJSON()
        })
        await this.commandEmitter.emit(createAnnounceCommand)

        return right(null)
    }
}