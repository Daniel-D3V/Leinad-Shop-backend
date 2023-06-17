import { left, right } from "@/modules/@shared/logic";
import { ChangeAnnounceNormalPriceUsecaseInterface } from "../../../domain/usecases";
import { AnnounceNormalRepositoryInterface } from "../../../domain/repositories";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { AnnounceNormalNotFoundError } from "../_errors";
import { AnnounceNormalPriceChangedEvent } from "./announce-normal-price-changed.event";


export class ChangeAnnounceNormalPriceUsecase implements ChangeAnnounceNormalPriceUsecaseInterface {

    constructor(
        private readonly announceNormalRepository: AnnounceNormalRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ announceNormalId, price }: ChangeAnnounceNormalPriceUsecaseInterface.InputDto): Promise<ChangeAnnounceNormalPriceUsecaseInterface.OutputDto> {
        
        const announceNormalEntity = await this.announceNormalRepository.findById(announceNormalId)
        if(!announceNormalEntity) return left([ new AnnounceNormalNotFoundError() ])

        const changePriceResult = announceNormalEntity.changePrice(price)
        if(changePriceResult.isLeft()) return left(changePriceResult.value)

        await this.announceNormalRepository.update(announceNormalEntity)

        const announceNormalPriceChangedEvent = new AnnounceNormalPriceChangedEvent({
            announceNormalId: announceNormalEntity.id,
            price: announceNormalEntity.getPrice()
        })
        await this.eventEmitter.emit(announceNormalPriceChangedEvent)

        return right(null)
    }
}