import { left, right } from "@/modules/@shared/logic";
import { DeactivateAnnounceUsecaseInterface } from "../../../domain/usecases";
import { AnnounceManagementRepositoryInterface } from "../../../domain/repositories";
import { AnnounceManagementNotFoundError } from "../_errors";
import { AnnounceDeactivatedEvent } from "./announce-deactivated.event";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { AnnounceAlreadyDeactivatedError } from "./errors";


export class DeactivateAnnounceUsecase implements DeactivateAnnounceUsecaseInterface {

    constructor(
        private readonly announceManagementRepository: AnnounceManagementRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ announceId }: DeactivateAnnounceUsecaseInterface.InputDto): Promise<DeactivateAnnounceUsecaseInterface.OutputDto> {
        
        const announceManagementEntity = await this.announceManagementRepository.findById(announceId)
        if(!announceManagementEntity) return left([new AnnounceManagementNotFoundError() ])

        if(announceManagementEntity.isDeactivated()) return left([ new AnnounceAlreadyDeactivatedError() ])

        announceManagementEntity.deactivate()

        await this.announceManagementRepository.update(announceManagementEntity)

        const announceDeactivatedEvent = new AnnounceDeactivatedEvent({
            announceId: announceManagementEntity.id
        })
        await this.eventEmitter.emit(announceDeactivatedEvent)

        return right(null)
    }
}