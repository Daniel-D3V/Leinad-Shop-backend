import { UsecaseInterface } from "@/modules/@shared/domain"
import { EventEmitterInterface } from "@/modules/@shared/events"
import { Either, right } from "@/modules/@shared/logic"
import { AnnounceRepositoryInterface } from "@/modules/announce/announce-admin/domain/repositories"
import { PersistDeleteAnnounceInputDto, PersistDeleteAnnounceOutputDto } from "./persist-delete-announce.dto"
import { AnnounceDeletedEvent } from "./announce-deleted.event"

export class PersistDeleteAnnounceUsecase implements UsecaseInterface{

    constructor(
        private readonly announceRepository: AnnounceRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute(input: PersistDeleteAnnounceInputDto): Promise<Either<Error[], PersistDeleteAnnounceOutputDto>> {

        await this.announceRepository.delete(input.announceId)

        const announceDeletedEvent = new AnnounceDeletedEvent({
            ...input
        })
        await this.eventEmitter.emit(announceDeletedEvent)

        return right(null)
    }
}