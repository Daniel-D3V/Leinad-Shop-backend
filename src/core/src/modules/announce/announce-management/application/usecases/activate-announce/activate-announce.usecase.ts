import { left, right } from "@/modules/@shared/logic";
import { ActivateAnnounceUsecaseInterface } from "../../../domain/usecases";
import { AnnounceManagementRepositoryInterface } from "../../../domain/repositories";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { AnnounceManagementNotFoundError } from "../_errors";
import { AnnounceAlreadyActivatedError, AnnounceInfoNotCreatedError } from "./errors";
import { AnnounceActivatedEvent } from "./announce-activated.event";
import { announceInfoFacadeInterface } from "@/modules/announce/announce-info/facades";


export class ActivateAnnounceUsecase implements ActivateAnnounceUsecaseInterface {

    constructor(
        private readonly announceManagementRepository: AnnounceManagementRepositoryInterface,
        private readonly announceInfoFacade: announceInfoFacadeInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ announceId }: ActivateAnnounceUsecaseInterface.InputDto): Promise<ActivateAnnounceUsecaseInterface.OutputDto> {
        
        const announceManagementEntity = await this.announceManagementRepository.findById(announceId)
        if(!announceManagementEntity) return left([new AnnounceManagementNotFoundError() ])

        if(announceManagementEntity.isActivated()) return left([ new AnnounceAlreadyActivatedError() ])

        const announceInfoExists = await this.announceInfoFacade.checkExistsByAnnounceId(announceId)
        if(!announceInfoExists) return left([ new AnnounceInfoNotCreatedError() ])

        announceManagementEntity.activate()

        await this.announceManagementRepository.update(announceManagementEntity)

        const announceActivatedEvent = new AnnounceActivatedEvent({
            announceId: announceManagementEntity.id
        })
        await this.eventEmitter.emit(announceActivatedEvent)

        return right(null)
    }
}