import { left, right } from "@/modules/@shared/logic";
import { ChangeAnnounceItemTitleUsecaseInterface } from "../../../domain/usecases";
import { AnnounceItemRepositoryInterface } from "../../../domain/repositories";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { AnnounceItemNotFoundError } from "../_errors";
import { AnnounceItemTitleChangedEvent } from "./announce-item-title-changed.event";

export class ChangeAnnounceItemTitleUsecase implements ChangeAnnounceItemTitleUsecaseInterface {

    constructor(
        private readonly announceItemRepository: AnnounceItemRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ announceItemId, title }: ChangeAnnounceItemTitleUsecaseInterface.InputDto): Promise<ChangeAnnounceItemTitleUsecaseInterface.OutputDto> {
        
        const announceItemEntity = await this.announceItemRepository.findById(announceItemId)
        if(!announceItemEntity) return left([ new AnnounceItemNotFoundError() ])

        const changeTitleResult = announceItemEntity.changeTitle(title)
        if(changeTitleResult.isLeft()) return left(changeTitleResult.value)

        await this.announceItemRepository.update(announceItemEntity)

        const announceItemTitleChangedEvent = new AnnounceItemTitleChangedEvent({
            announceItemId: announceItemEntity.id,
            title: announceItemEntity.title
        })

        this.eventEmitter.emit(announceItemTitleChangedEvent)

        return right(null)
    }
}