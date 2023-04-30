import { UsecaseInterface } from "@/modules/@shared/domain"
import { CommandEmitterInterface } from "@/modules/@shared/events"
import { BanAnnounceInputDto, BanAnnounceOutputDto } from "./ban-announce.dto"
import { Either, right } from "@/modules/@shared/logic"
import { BanAnnounceCommand } from "./ban-announce.command"

export class BanAnnounceUsecase implements UsecaseInterface{

    constructor(
        private readonly commandEmitter: CommandEmitterInterface
    ){}

    async execute(input: BanAnnounceInputDto): Promise<Either<Error[], BanAnnounceOutputDto>> {

        const banAnnounceCommand = new BanAnnounceCommand({
            announceId: input.announceId
        })
        await this.commandEmitter.emit(banAnnounceCommand)

        return right(null)
    }
}