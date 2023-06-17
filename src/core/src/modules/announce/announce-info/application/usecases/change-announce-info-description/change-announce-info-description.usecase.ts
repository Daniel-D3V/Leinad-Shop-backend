import { left, right } from "@/modules/@shared/logic";
import { ChangeAnnounceInfoDescriptionUsecaseInterface } from "../../../domain/usecases";
import { AnnounceInfoRepositoryInterface } from "../../../domain/repositories";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { AnnounceInfoNotFoundError } from "../_errors";
import { AnnounceInfoDescriptionChangedEvent } from "./announce-info-description-changed.event";


export class ChangeAnnounceInfoDescriptionUsecase implements ChangeAnnounceInfoDescriptionUsecaseInterface {

    constructor(
        private readonly announceInfoRepository: AnnounceInfoRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ announceInfoId, description }: ChangeAnnounceInfoDescriptionUsecaseInterface.InputDto): Promise<ChangeAnnounceInfoDescriptionUsecaseInterface.OutputDto> {
        
        const announceInfoEntity = await this.announceInfoRepository.findById(announceInfoId)
        if(!announceInfoEntity) return left([ new AnnounceInfoNotFoundError() ])

        const changeDescriptionResult = announceInfoEntity.changeDescription(description)
        if(changeDescriptionResult.isLeft()) return left(changeDescriptionResult.value)

        await this.announceInfoRepository.update(announceInfoEntity)

        const announceInfoDescriptionChangedEvent = new AnnounceInfoDescriptionChangedEvent({
            announceInfoId: announceInfoEntity.id,
            description: announceInfoEntity.description
        })

        await this.eventEmitter.emit(announceInfoDescriptionChangedEvent)

        return right(null)
    }
}