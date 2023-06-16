import { left, right } from "@/modules/@shared/logic";
import { BanAnnounceUsecaseInterface,  } from "../../../domain/usecases";
import { AnnounceManagementRepositoryInterface } from "../../../domain/repositories";
import { AnnounceManagementNotFoundError } from "../_errors";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { AnnounceAlreadyBannedError } from "./errors";
import { AnnounceBannedEvent } from "./announce-banned.event";


export class BanAnnounceUsecase implements BanAnnounceUsecaseInterface {

    constructor(
        private readonly announceManagementRepository: AnnounceManagementRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ announceId }: BanAnnounceUsecaseInterface.InputDto): Promise<BanAnnounceUsecaseInterface.OutputDto> {
        
        const announceManagementEntity = await this.announceManagementRepository.findById(announceId)
        if(!announceManagementEntity) return left([new AnnounceManagementNotFoundError() ])

        if(announceManagementEntity.isBanned()) return left([ new AnnounceAlreadyBannedError() ])

        announceManagementEntity.ban()

        await this.announceManagementRepository.update(announceManagementEntity)

        const announceBannedEvent = new AnnounceBannedEvent({
            announceId: announceManagementEntity.id
        })
        await this.eventEmitter.emit(announceBannedEvent)

        return right(null)
    }
}