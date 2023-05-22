import {  EventEmitterInterface } from "@/modules/@shared/events";
import { Either, left, right } from "@/modules/@shared/logic";
import { AnnounceImagesRepositoryInterface } from "@/modules/announce/announce-images/domain/repositories";
import { AnnounceNotFoundError } from "../_errors";
import { AnnounceImagesChangedEvent } from "./announce-images-changed.event";
import { ChangeAnnounceImagesUsecaseInterface } from "../../../domain/usecases";

export class ChangeAnnouceImagesUsecase implements ChangeAnnounceImagesUsecaseInterface {
    
    constructor(
        private readonly announceImagesRepository: AnnounceImagesRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ announceId, images }: ChangeAnnounceImagesUsecaseInterface.InputDto): Promise<ChangeAnnounceImagesUsecaseInterface.OutputDto> {
        
        const announceImageEntity = await this.announceImagesRepository.findById(announceId)
        if(!announceImageEntity) return left([ new AnnounceNotFoundError() ])

        const isImagesValid = announceImageEntity.changeImages(images)
        if(isImagesValid.isLeft()) return left(isImagesValid.value)

        await this.announceImagesRepository.update(announceImageEntity)

        const changeAnnounceImagesCommand = new AnnounceImagesChangedEvent({
            announceId,
            images
        })
        await this.eventEmitter.emit(changeAnnounceImagesCommand)

        return right(null)
    }
}