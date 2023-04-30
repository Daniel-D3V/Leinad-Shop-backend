import { UsecaseInterface } from "@/modules/@shared/domain"
import { EventEmitterInterface } from "@/modules/@shared/events"
import { Either, left, right } from "@/modules/@shared/logic"
import { AnnounceRepositoryInterface } from "@/modules/announce/announce-admin/domain/repositories"
import { PersistUpdateAnnounceInputDto, PersistUpdateAnnounceOutputDto } from "./persist-update-announce.dto"
import { AnnounceNotFoundError } from "../../_errors"
import { AnnounceUpdatedEvent } from "./announce-updated.event"

export class PersistUpdateAnnounceUsecase implements UsecaseInterface {

    constructor(
        private readonly announceRepository: AnnounceRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ announceId, data }: PersistUpdateAnnounceInputDto): Promise<Either<Error[], PersistUpdateAnnounceOutputDto>> {

        const announceEntity = await this.announceRepository.findById(announceId)
        if(!announceEntity) return left([ new AnnounceNotFoundError() ])
        
        if(data.title) announceEntity.changeTitle(data.title)
        if(data.description) announceEntity.changeDescription(data.description)
        if(data.price) announceEntity.changePrice(data.price)

        await this.announceRepository.update(announceEntity)

        const announceUpdatedEvent = new AnnounceUpdatedEvent({
            announceId,
            data
        })
        await this.eventEmitter.emit(announceUpdatedEvent)

        return right(null)
    }
}