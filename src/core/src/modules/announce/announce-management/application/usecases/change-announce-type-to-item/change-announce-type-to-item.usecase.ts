import { EventEmitterInterface } from "@/modules/@shared/events";
import { AnnounceManagementRepositoryInterface } from "../../../domain/repositories";
import { ChangeAnnounceTypeToItemUsecaseInterface } from "../../../domain/usecases";
import { left, right } from "@/modules/@shared/logic";
import { AnnounceManagementNotFoundError } from "../_errors";
import { AnnounceTypeChangedToItemEvent } from "./announce-type-changed-to-item.event";
import { AnnounceTypeAlreadyIsItemError } from "./errors";


export class ChangeAnnounceTypeToItemUsecase implements ChangeAnnounceTypeToItemUsecaseInterface {

    constructor(
        private readonly announceManagementRepository: AnnounceManagementRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ announceId }: ChangeAnnounceTypeToItemUsecaseInterface.InputDto): Promise<ChangeAnnounceTypeToItemUsecaseInterface.OutputDto> {
        
        const announceManagementEntity = await this.announceManagementRepository.findById(announceId)
        if(!announceManagementEntity) return left([new AnnounceManagementNotFoundError() ])

        if(announceManagementEntity.isTypeItem()) return left([ new AnnounceTypeAlreadyIsItemError() ])

        announceManagementEntity.changeTypeToItem()

        await this.announceManagementRepository.update(announceManagementEntity)

        const announceTypeChangedToItemEvent = new AnnounceTypeChangedToItemEvent({
            announceId: announceManagementEntity.id
        })
        await this.eventEmitter.emit(announceTypeChangedToItemEvent)

        return right(null)
        
    }
}