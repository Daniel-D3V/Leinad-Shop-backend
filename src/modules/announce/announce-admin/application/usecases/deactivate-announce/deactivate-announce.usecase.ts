import { UsecaseInterface } from "@/modules/@shared/domain"
import {  EventEmitterInterface } from "@/modules/@shared/events"
import { Either, left, right } from "@/modules/@shared/logic"
import { DeactivateAnnounceInputDto, DeactivateAnnounceOutputDto } from "./deactivate-announce.dto"
import { AnnounceRepositoryInterface } from "../../../domain/repositories"
import { AnnounceNotFoundError } from "../_errors"
import { AnnounceDeactivatedEvent } from "./announce-deactivated.event"

export class DeactivateAnnounceUsecase implements UsecaseInterface{

    constructor(
        private readonly announceRepository: AnnounceRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ announceId }: DeactivateAnnounceInputDto): Promise<Either<Error[], DeactivateAnnounceOutputDto>> {

        const announceEntity = await this.announceRepository.findById(announceId)
        if(!announceEntity) return left([ new AnnounceNotFoundError() ])

        announceEntity.deactivate()
        await this.announceRepository.update(announceEntity)

        const announceDeactivatedEvent = new AnnounceDeactivatedEvent({
            announceId
        })
        await this.eventEmitter.emit(announceDeactivatedEvent)

        return right(null)
    }
}