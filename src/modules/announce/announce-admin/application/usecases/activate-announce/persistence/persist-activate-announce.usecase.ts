import { UsecaseInterface } from "@/modules/@shared/domain"
import { EventEmitterInterface } from "@/modules/@shared/events"
import { Either, left, right } from "@/modules/@shared/logic"
import { AnnounceRepositoryInterface } from "@/modules/announce/announce-admin/domain/repositories"
import { PersistActivateAnnounceInputDto, PersistActivateAnnounceOutputDto } from "./persist-activate-announce.dto"
import { AnnounceNotFoundError } from "../../_errors"
import { AnnounceActivatedEvent } from "./announce-activated.event"

export class PersistActivateAnnounceUsecase implements UsecaseInterface{

    constructor(
        private readonly announceRepository: AnnounceRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ announceId }: PersistActivateAnnounceInputDto): Promise<Either<Error[], PersistActivateAnnounceOutputDto>> {

        const announceEntity = await this.announceRepository.findById(announceId)
        if(!announceEntity) return left([ new AnnounceNotFoundError() ])

        announceEntity.activate()
        await this.announceRepository.update(announceEntity)

        const announceActivatedEvent = new AnnounceActivatedEvent({
            announceId
        })
        await this.eventEmitter.emit(announceActivatedEvent)

        return right(null)
    }
}