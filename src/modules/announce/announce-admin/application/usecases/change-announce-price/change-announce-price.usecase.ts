import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either, left, right } from "@/modules/@shared/logic";
import { AnnounceRepositoryInterface } from "../../../domain/repositories";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { AnnounceNotFoundError } from "../_errors";
import { ChangeAnnouncePriceInputDto, ChangeAnnouncePriceOutputDto } from "./change-announce-price.dto";
import { AnnouncePriceChangedEvent } from "./announce-price-changed.event";

export class ChangeAnnouncePriceUsecase implements UsecaseInterface {

    constructor(
        private readonly announceRepository: AnnounceRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}


    async execute({ announceId, price }: ChangeAnnouncePriceInputDto): Promise<Either<Error[], ChangeAnnouncePriceOutputDto>> {
        
        const announceEntity = await this.announceRepository.findById(announceId)
        if(!announceEntity) return left([ new AnnounceNotFoundError() ])

        announceEntity.changePrice(price)
        await this.announceRepository.update(announceEntity)

        const announcePriceChangedEvent = new AnnouncePriceChangedEvent({
            announceId: announceEntity.id,
            price: announceEntity.price
        })
        await this.eventEmitter.emit(announcePriceChangedEvent)
        
        return right(null)
    }
}