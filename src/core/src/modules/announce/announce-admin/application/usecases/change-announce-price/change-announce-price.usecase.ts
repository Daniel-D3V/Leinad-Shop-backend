import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";
import { AnnounceRepositoryInterface } from "../../../domain/repositories";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { AnnounceNotFoundError } from "../_errors";
import { AnnouncePriceChangedEvent } from "./announce-price-changed.event";
import { ChangeAnnouncePriceUsecaseInterface } from "../../../domain/usecases";

export class ChangeAnnouncePriceUsecase implements ChangeAnnouncePriceUsecaseInterface {

    constructor(
        private readonly announceRepository: AnnounceRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}


    async execute({ announceId, price }: ChangeAnnouncePriceUsecaseInterface.InputDto): Promise<ChangeAnnouncePriceUsecaseInterface.OutputDto> {
        
        const announceEntity = await this.announceRepository.findById(announceId)
        if(!announceEntity) return left([ new AnnounceNotFoundError() ])

        const changePriceResult =announceEntity.changePrice(price)
        if(changePriceResult.isLeft()) return left(changePriceResult.value)
        await this.announceRepository.update(announceEntity)

        const announcePriceChangedEvent = new AnnouncePriceChangedEvent({
            announceId: announceEntity.id,
            price: announceEntity.price
        })
        await this.eventEmitter.emit(announcePriceChangedEvent)
        
        return right(null)
    }
}