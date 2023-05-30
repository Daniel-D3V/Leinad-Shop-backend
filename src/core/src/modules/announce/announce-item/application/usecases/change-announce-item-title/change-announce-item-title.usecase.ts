import { EventEmitterInterface } from "@/modules/@shared/events";
import { left, right } from "@/modules/@shared/logic";
import { AnnounceItemNotFoundError } from "../_errors";
import { AnnounceItemTitleChangedEvent } from "./announce-item-title-changed.event";
import { AnnounceItemRepositoryInterface } from "../../../domain/repositories";
import { ChangeAnnounceItemTitleUsecaseInterface } from "../../../domain/usecases";


export class ChangeAnnounceItemTitleUsecase implements ChangeAnnounceItemTitleUsecaseInterface {
    
    constructor(
        private readonly announceItemRepository: AnnounceItemRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ announceItemId, title }: ChangeAnnounceItemTitleUsecaseInterface.InputDto): Promise<ChangeAnnounceItemTitleUsecaseInterface.OutputDto> {
        
        const announceItemEntity = await this.announceItemRepository.findById(announceItemId)
        if(!announceItemEntity) return left([ new AnnounceItemNotFoundError() ])

        const changeResult = announceItemEntity.changeTitle(title)
        if(changeResult.isLeft()) return left(changeResult.value)

        await this.announceItemRepository.update(announceItemEntity)

        const announceItemTitleChangedEvent = new AnnounceItemTitleChangedEvent({
            announceItemId: announceItemEntity.id,
            title: announceItemEntity.title
        })

        await this.eventEmitter.emit(announceItemTitleChangedEvent)

        return right(null)
    }
}