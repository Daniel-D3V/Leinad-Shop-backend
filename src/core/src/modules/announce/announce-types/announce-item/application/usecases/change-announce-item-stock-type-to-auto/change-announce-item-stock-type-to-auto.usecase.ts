import { left, right } from "@/modules/@shared/logic";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { ChangeAnnounceItemStockTypeToAutoUsecaseInterface } from "../../../domain/usecases";
import { AnnounceItemRepositoryInterface } from "../../../domain/repositories";
import { AnnounceItemNotFoundError, AnnounceItemStockIsAlreadyIsAutoError } from "../_errors";
import { AnnounceItemStockTypeChangedToAutoEvent } from "./announce-item-stock-type-changed-to-auto.event";

export class ChangeAnnounceItemStockTypeToAutoUsecase implements ChangeAnnounceItemStockTypeToAutoUsecaseInterface {

    constructor(
        private readonly announceItemRepository: AnnounceItemRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ) { }

    async execute({ announceItemId }: ChangeAnnounceItemStockTypeToAutoUsecaseInterface.InputDto): Promise<ChangeAnnounceItemStockTypeToAutoUsecaseInterface.OutputDto> {

        const announceItemEntity = await this.announceItemRepository.findById(announceItemId)
        if (!announceItemEntity) return left([new AnnounceItemNotFoundError()])

        if (announceItemEntity.isStockAuto()) return left([new AnnounceItemStockIsAlreadyIsAutoError()])

        announceItemEntity.toStockAuto()

        await this.announceItemRepository.update(announceItemEntity)

        const announceItemStockTypeChangedToAutoEvent = new AnnounceItemStockTypeChangedToAutoEvent({
            announceItemId: announceItemEntity.id
        })
        await this.eventEmitter.emit(announceItemStockTypeChangedToAutoEvent)

        return right(null)
    }
}