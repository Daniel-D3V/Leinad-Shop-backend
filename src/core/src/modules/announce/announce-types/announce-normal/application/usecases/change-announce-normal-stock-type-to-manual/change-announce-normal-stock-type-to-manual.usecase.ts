import { left, right } from "@/modules/@shared/logic";
import { AnnounceNormalNotFoundError, AnnounceNormalStockIsAlreadyIsManualError } from "../_errors";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { AnnounceNormalRepositoryInterface } from "../../../domain/repositories";
import { ChangeAnnounceNormalStockTypeToManualUsecaseInterface } from "../../../domain/usecases";
import { AnnounceNormalStockTypeChangedToManualEvent } from "./announce-normal-stock-type-changed-to-manual.event";

export class ChangeAnnounceNormalStockTypeToManualUsecase implements ChangeAnnounceNormalStockTypeToManualUsecaseInterface {

    constructor(
        private readonly announceNormalRepository: AnnounceNormalRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ) { }

    async execute({ announceNormalId }: ChangeAnnounceNormalStockTypeToManualUsecaseInterface.InputDto): Promise<ChangeAnnounceNormalStockTypeToManualUsecaseInterface.OutputDto> {

        const announceNormalEntity = await this.announceNormalRepository.findById(announceNormalId)
        if (!announceNormalEntity) return left([new AnnounceNormalNotFoundError()])

        if (announceNormalEntity.isStockManual()) return left([new AnnounceNormalStockIsAlreadyIsManualError()])

        announceNormalEntity.toStockManual()

        await this.announceNormalRepository.update(announceNormalEntity)

        const announceNormalStockTypeChangedToManualEvent = new AnnounceNormalStockTypeChangedToManualEvent({
            announceNormalId: announceNormalEntity.id
        })
        await this.eventEmitter.emit(announceNormalStockTypeChangedToManualEvent)

        return right(null)
    }
}