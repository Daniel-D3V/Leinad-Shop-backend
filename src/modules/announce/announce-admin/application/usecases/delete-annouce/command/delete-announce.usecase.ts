import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either, right } from "@/modules/@shared/logic";
import { CommandEmitterInterface } from "@/modules/@shared/events";
import { AnnounceRepositoryInterface } from "@/modules/announce/announce-admin/domain/repositories";
import { DeleteAnnounceInputDto, DeleteAnnounceOutputDto } from "./delete-announce.dto";
import { DeleteAnnounceCommand } from "./delete-announce.command";

export class DeleteAnnounceUsecase implements UsecaseInterface{

    constructor(
        private readonly announceRepository: AnnounceRepositoryInterface,
        private readonly commandEmitter: CommandEmitterInterface
    ){}

    async execute(input: DeleteAnnounceInputDto): Promise<Either<Error[], DeleteAnnounceOutputDto>> {


        const deleteAnnounceCommand = new DeleteAnnounceCommand({
            announceId: input.announceId
        })
        await this.commandEmitter.emit(deleteAnnounceCommand)

        return right(null)
    }
}