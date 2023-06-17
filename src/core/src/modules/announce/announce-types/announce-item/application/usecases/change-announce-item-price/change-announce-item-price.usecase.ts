import { left, right } from "@/modules/@shared/logic";
import { ChangeAnnounceItemPriceUsecaseInterface } from "../../../domain/usecases";
import { AnnounceItemRepositoryInterface } from "../../../domain/repositories";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { AnnounceItemNotFoundError } from "../_errors";
import { AnnounceItemPriceChangedEvent } from "./announce-item-price-changed.event";


export class ChangeAnnounceItemPriceUsecase implements ChangeAnnounceItemPriceUsecaseInterface {

    constructor(
        private readonly announceItemRepository: AnnounceItemRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ announceItemId, price }: ChangeAnnounceItemPriceUsecaseInterface.InputDto): Promise<ChangeAnnounceItemPriceUsecaseInterface.OutputDto> {
        
        const announceItemEntity = await this.announceItemRepository.findById(announceItemId)
        if(!announceItemEntity) return left([ new AnnounceItemNotFoundError() ])

        const changePriceResult = announceItemEntity.changePrice(price)
        if(changePriceResult.isLeft()) return left(changePriceResult.value)

        await this.announceItemRepository.update(announceItemEntity)

        const announceItemPriceChangedEvent = new AnnounceItemPriceChangedEvent({
            announceItemId: announceItemEntity.id,
            price: announceItemEntity.getPrice()
        })

        this.eventEmitter.emit(announceItemPriceChangedEvent)

        return right(null)
    }
}