import { EventEmitterInterface } from "@/modules/@shared/events";
import { AnnounceManagementRepositoryInterface } from "../../../domain/repositories";
import {  ChangeAnnounceTypeToNormalUsecaseInterface } from "../../../domain/usecases";
import { left, right } from "@/modules/@shared/logic";
import { AnnounceManagementNotFoundError } from "../_errors";
import { AnnounceTypeAlreadyIsNormalError } from "./errors";
import { AnnounceTypeChangedToNormalEvent } from "./announce-type-changed-to-normal.event";


export class ChangeAnnounceTypeToNormalUsecase implements ChangeAnnounceTypeToNormalUsecaseInterface {

    constructor(
        private readonly announceManagementRepository: AnnounceManagementRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ announceId }: ChangeAnnounceTypeToNormalUsecaseInterface.InputDto): Promise<ChangeAnnounceTypeToNormalUsecaseInterface.OutputDto> {
        
        const announceManagementEntity = await this.announceManagementRepository.findById(announceId)
        if(!announceManagementEntity) return left([new AnnounceManagementNotFoundError() ])

        if(announceManagementEntity.isTypeNormal()) return left([ new AnnounceTypeAlreadyIsNormalError() ])

        announceManagementEntity.changeTypeToNormal()

        await this.announceManagementRepository.update(announceManagementEntity)

        const announceTypeChangedToNormalEvent = new AnnounceTypeChangedToNormalEvent({
            announceId: announceManagementEntity.id
        })
        await this.eventEmitter.emit(announceTypeChangedToNormalEvent)

        return right(null)
        
    }
}