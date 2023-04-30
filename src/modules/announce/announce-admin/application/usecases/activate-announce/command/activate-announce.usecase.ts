import { UsecaseInterface } from "@/modules/@shared/domain"
import { CommandEmitterInterface } from "@/modules/@shared/events"
import { ActivateAnnounceInputDto, ActivateAnnounceOutputDto } from "./activate-announce.dto"
import { Either, right } from "@/modules/@shared/logic"
import { ActivateAnnounceCommand } from "./activate-announce.command"

export class ActivateAnnounceUsecase implements UsecaseInterface{

    constructor(
        private readonly commandEmitter: CommandEmitterInterface
    ){}

    async execute(input: ActivateAnnounceInputDto): Promise<Either<Error[], ActivateAnnounceOutputDto>> {

        const createAnnounceCommand = new ActivateAnnounceCommand({
            announceId: input.announceId
        })
        await this.commandEmitter.emit(createAnnounceCommand)

        return right(null)
    }
}