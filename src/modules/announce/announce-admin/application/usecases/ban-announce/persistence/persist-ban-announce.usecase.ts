import { UsecaseInterface } from "@/modules/@shared/domain"
import { EventEmitterInterface } from "@/modules/@shared/events"
import { Either, left, right } from "@/modules/@shared/logic"
import { AnnounceRepositoryInterface } from "@/modules/announce/announce-admin/domain/repositories"
import { AnnounceNotFoundError } from "../../_errors"
import { PersistBanAnnounceInputDto, PersistBanAnnounceOutputDto } from "./persist-ban-annouce.dto"
import { AnnounceBannedEvent } from "./announce-banned.event"

export class PersistBanAnnounceUsecase implements UsecaseInterface{

    constructor(
        private readonly announceRepository: AnnounceRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ announceId }: PersistBanAnnounceInputDto): Promise<Either<Error[], PersistBanAnnounceOutputDto>> {

        const announceEntity = await this.announceRepository.findById(announceId)
        if(!announceEntity) return left([ new AnnounceNotFoundError() ])

        announceEntity.ban()
        await this.announceRepository.update(announceEntity)

        const announceBannedEvent = new AnnounceBannedEvent({
            announceId
        })
        await this.eventEmitter.emit(announceBannedEvent)

        return right(null)
    }
}