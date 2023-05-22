import {  EventEmitterInterface } from "@/modules/@shared/events"
import { Either, left, right } from "@/modules/@shared/logic"
import { AnnounceRepositoryInterface } from "../../../domain/repositories"
import { AnnounceNotFoundError } from "../_errors"
import { AnnounceActivatedEvent } from "./announce-activated.event"
import { ActivateAnnounceUsecaseInterface } from "../../../domain/usecases"

export class ActivateAnnounceUsecase implements ActivateAnnounceUsecaseInterface{

    constructor(
        private readonly announceRepository: AnnounceRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ announceId }: ActivateAnnounceUsecaseInterface.InputDto): Promise<ActivateAnnounceUsecaseInterface.OutputDto> {

        const announceEntity = await this.announceRepository.findById(announceId)
        if(!announceEntity) return left([ new AnnounceNotFoundError() ])

        announceEntity.activate()
        await this.announceRepository.update(announceEntity)

        const announceActivatedEvent = new AnnounceActivatedEvent({
            announceId
        })
        await this.eventEmitter.emit(announceActivatedEvent)

        return right(null)
    }
}