import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either, right } from "@/modules/@shared/logic";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { AnnounceRepositoryInterface } from "@/modules/announce/announce-admin/domain/repositories";
import { DeleteAnnounceInputDto, DeleteAnnounceOutputDto } from "./delete-announce.dto";
import { AnnounceDeletedEvent } from "./announce-deleted.event";

export class DeleteAnnounceUsecase implements UsecaseInterface{

    constructor(
        private readonly announceRepository: AnnounceRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ announceId }: DeleteAnnounceInputDto): Promise<Either<Error[], DeleteAnnounceOutputDto>> {


        await this.announceRepository.delete(announceId)

        const announceDeletedEvent = new AnnounceDeletedEvent({
            announceId
        })
        await this.eventEmitter.emit(announceDeletedEvent)

        return right(null)
    }
}