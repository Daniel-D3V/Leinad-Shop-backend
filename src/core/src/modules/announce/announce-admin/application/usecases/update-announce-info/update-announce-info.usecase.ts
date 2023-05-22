import {  EventEmitterInterface } from "@/modules/@shared/events"
import { Either, left, right } from "@/modules/@shared/logic"
import { AnnounceRepositoryInterface } from "@/modules/announce/announce-admin/domain/repositories"
import { AnnounceNotFoundError } from "../_errors"
import { AnnounceInfoUpdatedEvent } from "./announce-info-updated.event"
import { UpdateAnnounceInfoUsecaseInterface } from "../../../domain/usecases"

export class UpdateAnnounceUsecase implements UpdateAnnounceInfoUsecaseInterface{

    constructor(
        private readonly announceRepository: AnnounceRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ announceId, data }: UpdateAnnounceInfoUsecaseInterface.InputDto): Promise<UpdateAnnounceInfoUsecaseInterface.OutputDto> {

        const announceEntity = await this.announceRepository.findById(announceId)
        if(!announceEntity) return left([ new AnnounceNotFoundError() ])

        const errors: Error[] = [] 

        if(data.title){
            const isTitleValid = announceEntity.changeTitle(data.title)
            if(isTitleValid.isLeft()) errors.push(...isTitleValid.value)
        }
        if(data.description){
            const isDescriptionValid = announceEntity.changeDescription(data.description)
            if(isDescriptionValid.isLeft()) errors.push(...isDescriptionValid.value)
        }

        if(errors.length > 0) return left(errors)

        await this.announceRepository.update(announceEntity)

        const announceInfoUpdatedEvent = new AnnounceInfoUpdatedEvent({
            announceId,
            data
        })
        await this.eventEmitter.emit(announceInfoUpdatedEvent)

        return right(null)
    }
}