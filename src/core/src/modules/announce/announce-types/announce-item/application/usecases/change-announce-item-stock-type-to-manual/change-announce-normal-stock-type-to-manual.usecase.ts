import { left, right } from "@/modules/@shared/logic";
import { AnnounceItemNotFoundError, AnnounceItemStockIsAlreadyIsManualError } from "../_errors";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { AnnounceItemRepositoryInterface } from "../../../domain/repositories";
import { ChangeAnnounceItemStockTypeToManualUsecaseInterface } from "../../../domain/usecases";
import { AnnounceItemStockTypeChangedToManualEvent } from "./announce-normal-stock-type-changed-to-manual.event";

export class ChangeAnnounceItemStockTypeToManualUsecase implements ChangeAnnounceItemStockTypeToManualUsecaseInterface {

    constructor(
        private readonly announceItemRepository: AnnounceItemRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ) { }

    async execute({ announceItemId }: ChangeAnnounceItemStockTypeToManualUsecaseInterface.InputDto): Promise<ChangeAnnounceItemStockTypeToManualUsecaseInterface.OutputDto> {

        const announceItemEntity = await this.announceItemRepository.findById(announceItemId)
        if (!announceItemEntity) return left([new AnnounceItemNotFoundError()])

        if (announceItemEntity.isStockManual()) return left([new AnnounceItemStockIsAlreadyIsManualError()])

        announceItemEntity.toStockManual()

        await this.announceItemRepository.update(announceItemEntity)

        const announceItemStockTypeChangedToManualEvent = new AnnounceItemStockTypeChangedToManualEvent({
            announceItemId: announceItemEntity.id
        })
        await this.eventEmitter.emit(announceItemStockTypeChangedToManualEvent)

        return right(null)
    }
}