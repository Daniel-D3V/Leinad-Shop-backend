import { left, right } from "@/modules/@shared/logic";
import { CreateAnnounceItemUsecaseInterface } from "../../../domain/usecases";
import { AnnounceItemRepositoryInterface } from "../../../domain/repositories";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { AnnounceItemEntity } from "../../../domain/entities";
import { AnnounceItemCreatedEvent } from "./announce-item-created.event";

export class CreateAnnounceItemUsecase implements CreateAnnounceItemUsecaseInterface {
    
    constructor(
        private readonly announceItemRepository: AnnounceItemRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ){}

    async execute({ announceId, price, title }: CreateAnnounceItemUsecaseInterface.InputDto): Promise<CreateAnnounceItemUsecaseInterface.OutputDto> {
        
        const announceItemEntity = AnnounceItemEntity.create({
            announceId,
            price,
            title
        })
        if(announceItemEntity.isLeft()) return left(announceItemEntity.value)

        await this.announceItemRepository.create(announceItemEntity.value)

        const announceItemCreatedEvent = new AnnounceItemCreatedEvent({
            ...announceItemEntity.value.toJSON()
        })
        await this.eventEmitter.emit(announceItemCreatedEvent)

        return right({
            id: announceItemEntity.value.id
        })
    }
}