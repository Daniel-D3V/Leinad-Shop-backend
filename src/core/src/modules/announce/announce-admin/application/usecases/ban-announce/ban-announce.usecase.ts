import { UsecaseInterface } from "@/modules/@shared/domain"
import { CommandEmitterInterface, EventEmitterInterface } from "@/modules/@shared/events"
import { Either, left, right } from "@/modules/@shared/logic"
import { AnnounceRepositoryInterface } from "../../../domain/repositories"
import { AnnounceAlreadyBannedError, AnnounceNotFoundError } from "../_errors"
import { AnnounceBannedEvent } from "./announce-banned.event"
import { BanAnnounceUsecaseInterface } from "../../../domain/usecases/ban-announce-usecase.interface"

export class BanAnnounceUsecase implements BanAnnounceUsecaseInterface{

    constructor(
        private readonly announceRepository: AnnounceRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}
    async execute({ announceId }: BanAnnounceUsecaseInterface.InputDto): Promise<BanAnnounceUsecaseInterface.OutputDto> {

        const announceEntity = await this.announceRepository.findById(announceId)
        if(!announceEntity) return left([ new AnnounceNotFoundError() ])

        if(announceEntity.isBanned()) return left([ new AnnounceAlreadyBannedError() ])

        announceEntity.ban()
        await this.announceRepository.update(announceEntity)

        const announceBannedEvent = new AnnounceBannedEvent({
            announceId
        })
        await this.eventEmitter.emit(announceBannedEvent)

        return right(null)
    }
}