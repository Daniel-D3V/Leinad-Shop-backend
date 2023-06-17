import { left, right } from "@/modules/@shared/logic";
import { ChangeAnnounceInfoTitleUsecaseInterface } from "../../../domain/usecases";
import { AnnounceInfoRepositoryInterface } from "../../../domain/repositories";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { AnnounceInfoNotFoundError } from "../_errors";
import { AnnounceInfoTitleChangedEvent } from "./announce-info-title-changed.event";


export class ChangeAnnounceInfoTitleUsecase implements ChangeAnnounceInfoTitleUsecaseInterface {

    constructor(
        private readonly announceInfoRepository: AnnounceInfoRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ announceInfoId, title }: ChangeAnnounceInfoTitleUsecaseInterface.InputDto): Promise<ChangeAnnounceInfoTitleUsecaseInterface.OutputDto> {
        
        const announceInfoEntity = await this.announceInfoRepository.findById(announceInfoId)
        if(!announceInfoEntity) return left([ new AnnounceInfoNotFoundError() ])

        const changeTitleResult = announceInfoEntity.changeTitle(title)
        if(changeTitleResult.isLeft()) return left(changeTitleResult.value)

        await this.announceInfoRepository.update(announceInfoEntity)

        const announceInfoTitleChangedEvent = new AnnounceInfoTitleChangedEvent({
            announceInfoId: announceInfoEntity.id,
            title: announceInfoEntity.title
        })

        await this.eventEmitter.emit(announceInfoTitleChangedEvent)

        return right(null)
    }
}