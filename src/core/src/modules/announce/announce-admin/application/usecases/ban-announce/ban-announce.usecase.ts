import { UsecaseInterface } from "@/modules/@shared/domain"
import { CommandEmitterInterface, EventEmitterInterface } from "@/modules/@shared/events"
import { BanAnnounceInputDto, BanAnnounceOutputDto } from "./ban-announce.dto"
import { Either, left, right } from "@/modules/@shared/logic"
import { AnnounceRepositoryInterface } from "../../../domain/repositories"
import { AnnounceNotFoundError } from "../_errors"
import { AnnounceBannedEvent } from "./announce-banned.event"

export class BanAnnounceUsecase implements UsecaseInterface{

    constructor(
        private readonly announceRepository: AnnounceRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}
    async execute({ announceId }: BanAnnounceInputDto): Promise<Either<Error[], BanAnnounceOutputDto>> {

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