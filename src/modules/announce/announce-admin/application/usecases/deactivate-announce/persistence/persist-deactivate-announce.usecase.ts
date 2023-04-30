import { UsecaseInterface } from "@/modules/@shared/domain"
import { EventEmitterInterface } from "@/modules/@shared/events"
import { AnnounceRepositoryInterface } from "@/modules/announce/announce-admin/domain/repositories"
import { AnnounceNotFoundError } from "../../_errors"
import { Either, left, right } from "@/modules/@shared/logic"
import { PersistDeactivateAnnounceInputDto, PersistDeactivateAnnounceOutputDto } from "./persist-deactivate-announce.dto"
import { AnnounceDeactivatedEvent } from "./announce-deactivated.event"

export class PersistDeactivateAnnounceUsecase implements UsecaseInterface{

    constructor(
        private readonly announceRepository: AnnounceRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ announceId }: PersistDeactivateAnnounceInputDto): Promise<Either<Error[], PersistDeactivateAnnounceOutputDto>> {

        const announceEntity = await this.announceRepository.findById(announceId)
        if(!announceEntity) return left([ new AnnounceNotFoundError() ])

        announceEntity.deactivate()
        await this.announceRepository.update(announceEntity)

        const announceDeactivatedEvent = new AnnounceDeactivatedEvent({
            announceId
        })
        await this.eventEmitter.emit(announceDeactivatedEvent)

        return right(null)
    }
}