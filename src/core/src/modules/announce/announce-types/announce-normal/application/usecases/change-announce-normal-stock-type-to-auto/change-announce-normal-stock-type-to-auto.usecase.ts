import { left, right } from "@/modules/@shared/logic";
import { EventEmitterInterface } from "@/modules/@shared/events";
import { ChangeAnnounceNormalStockTypeToAutoUsecaseInterface } from "../../../domain/usecases";
import { AnnounceNormalRepositoryInterface } from "../../../domain/repositories";
import { AnnounceNormalNotFoundError, AnnounceNormalStockIsAlreadyIsAutoError } from "../_errors";
import { AnnounceNormalStockTypeChangedToAutoEvent } from "./announce-normal-stock-type-changed-to-auto.event";

export class ChangeAnnounceNormalStockTypeToAutoUsecase implements ChangeAnnounceNormalStockTypeToAutoUsecaseInterface {

    constructor(
        private readonly announceNormalRepository: AnnounceNormalRepositoryInterface,
        private readonly eventEmitter: EventEmitterInterface
    ) { }

    async execute({ announceNormalId }: ChangeAnnounceNormalStockTypeToAutoUsecaseInterface.InputDto): Promise<ChangeAnnounceNormalStockTypeToAutoUsecaseInterface.OutputDto> {

        const announceNormalEntity = await this.announceNormalRepository.findById(announceNormalId)
        if (!announceNormalEntity) return left([new AnnounceNormalNotFoundError()])

        if (announceNormalEntity.isStockAuto()) return left([new AnnounceNormalStockIsAlreadyIsAutoError()])

        announceNormalEntity.toStockAuto()

        await this.announceNormalRepository.update(announceNormalEntity)

        const announceNormalStockTypeChangedToAutoEvent = new AnnounceNormalStockTypeChangedToAutoEvent({
            announceNormalId: announceNormalEntity.id
        })
        await this.eventEmitter.emit(announceNormalStockTypeChangedToAutoEvent)

        return right(null)
    }
}