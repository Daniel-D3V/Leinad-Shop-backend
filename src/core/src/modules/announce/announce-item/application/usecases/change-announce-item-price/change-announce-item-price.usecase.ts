import { left, right } from "@/modules/@shared/logic";
import { AnnounceItemNotFoundError } from "../_errors";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { AnnounceItemRepositoryInterface } from "../../../domain/repositories";
import { ChangeAnnounceItemPriceUsecaseInterface } from "../../../domain/usecases";
import { AnnounceItemPriceChangedEvent } from "./announce-item-price-changed.event";

export class ChangeAnnounceItemPriceUsecase implements ChangeAnnounceItemPriceUsecaseInterface {

    constructor(
        private readonly announceItemRepository: AnnounceItemRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ price, announceItemId }: ChangeAnnounceItemPriceUsecaseInterface.InputDto): Promise<ChangeAnnounceItemPriceUsecaseInterface.OutputDto> {
        
        const announceItemEntity = await this.announceItemRepository.findById(announceItemId)
        if(!announceItemEntity) return left([ new AnnounceItemNotFoundError() ])

        const changeResult = announceItemEntity.changePrice(price)
        if(changeResult.isLeft()) return left(changeResult.value)

        await this.announceItemRepository.update(announceItemEntity)

        const announceItemPriceChangedEvent = new AnnounceItemPriceChangedEvent({
            announceItemId: announceItemEntity.id,
            price: announceItemEntity.price
        })

        await this.eventEmitter.emit(announceItemPriceChangedEvent)

        return right(null)
    }
}