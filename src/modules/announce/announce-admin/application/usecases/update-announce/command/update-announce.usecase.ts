import { UsecaseInterface } from "@/modules/@shared/domain"
import { CommandEmitterInterface } from "@/modules/@shared/events"
import { Either, right } from "@/modules/@shared/logic"
import { AnnounceRepositoryInterface } from "@/modules/announce/announce-admin/domain/repositories"
import { UpdateAnnounceInputDto, UpdateAnnounceOutputDto } from "./update-announce.dto"
import { UpdateAnnounceCommand } from "./update-announce.command"

export class UpdateAnnounceUsecase implements UsecaseInterface{

    constructor(
        private readonly announceRepository: AnnounceRepositoryInterface,
        private readonly commandEmitter: CommandEmitterInterface
    ){}

    async execute({ announceId, data }: UpdateAnnounceInputDto): Promise<Either<Error[], UpdateAnnounceOutputDto>> {


        const apdateAnnounceCommand = new UpdateAnnounceCommand({
            announceId,
            data: {
                
            }
        })
        await this.commandEmitter.emit(apdateAnnounceCommand)

        return right(null)
    }
}