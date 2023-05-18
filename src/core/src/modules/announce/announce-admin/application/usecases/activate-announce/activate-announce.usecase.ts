import { UsecaseInterface } from "@/modules/@shared/domain"
import {  EventEmitterInterface } from "@/modules/@shared/events"
import { ActivateAnnounceInputDto, ActivateAnnounceOutputDto } from "./activate-announce.dto"
import { Either, left, right } from "@/modules/@shared/logic"
import { AnnounceRepositoryInterface } from "../../../domain/repositories"
import { AnnounceNotFoundError } from "../_errors"
import { AnnounceActivatedEvent } from "./announce-activated.event"

export class ActivateAnnounceUsecase implements UsecaseInterface{

    constructor(
        private readonly announceRepository: AnnounceRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ announceId }: ActivateAnnounceInputDto): Promise<Either<Error[], ActivateAnnounceOutputDto>> {

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