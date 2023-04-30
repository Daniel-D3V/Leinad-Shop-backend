import { UsecaseInterface } from "@/modules/@shared/domain"
import { CommandEmitterInterface } from "@/modules/@shared/events"
import { Either, right } from "@/modules/@shared/logic"
import { DeactivateAnnounceInputDto } from "./deactivate-announce.dto"
import { ActivateAnnounceOutputDto } from "../../activate-announce/command/activate-announce.dto"
import { DeactivateAnnounceCommand } from "./deactivate-announce.command"

export class DeactivateAnnounceUsecase implements UsecaseInterface{

    constructor(
        private readonly commandEmitter: CommandEmitterInterface
    ){}

    async execute(input: DeactivateAnnounceInputDto): Promise<Either<Error[], ActivateAnnounceOutputDto>> {

        const deactivateAnnounceCommand = new DeactivateAnnounceCommand({
            announceId: input.announceId
        })
        await this.commandEmitter.emit(deactivateAnnounceCommand)

        return right(null)
    }
}