import { UsecaseInterface } from "@/modules/@shared/domain"
import {  EventEmitterInterface } from "@/modules/@shared/events"
import { Either, left, right } from "@/modules/@shared/logic"
import { AnnounceRepositoryInterface } from "../../../domain/repositories"
import { AnnounceAlreadyDeactivatedError, AnnounceNotFoundError } from "../_errors"
import { AnnounceDeactivatedEvent } from "./announce-deactivated.event"
import { DeactivateAnnounceUsecaseInterface } from "../../../domain/usecases"

export class DeactivateAnnounceUsecase implements DeactivateAnnounceUsecaseInterface {

    constructor(
        private readonly announceRepository: AnnounceRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ announceId }: DeactivateAnnounceUsecaseInterface.InputDto): Promise<DeactivateAnnounceUsecaseInterface.OutputDto> {

        const announceEntity = await this.announceRepository.findById(announceId)
        if(!announceEntity) return left([ new AnnounceNotFoundError() ])

        if(announceEntity.isDeactivated()) return left([ new AnnounceAlreadyDeactivatedError() ])

        announceEntity.deactivate()
        await this.announceRepository.update(announceEntity)

        const announceDeactivatedEvent = new AnnounceDeactivatedEvent({
            announceId
        })
        await this.eventEmitter.emit(announceDeactivatedEvent)

        return right(null)
    }
}