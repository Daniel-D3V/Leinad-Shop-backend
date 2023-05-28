import { left, right } from "@/modules/@shared/logic";
import { StockNormalRepositoryInterface } from "../../../domain/repositories";
import { ConsultStockAvailabilityByAnnounceIdUsecaseInterface } from "../../../domain/usecases";
import { StockNormalNotFoundError } from "../_errors";

export class ConsultStockAvailabilityByAnnounceIdUsecase implements ConsultStockAvailabilityByAnnounceIdUsecaseInterface {

    constructor(
        private readonly stockNormalRepository: StockNormalRepositoryInterface
    ){}

    async execute({ announceId }: ConsultStockAvailabilityByAnnounceIdUsecaseInterface.InputDto): Promise<ConsultStockAvailabilityByAnnounceIdUsecaseInterface.OutputDto> {

        const stockNormalEntity = await this.stockNormalRepository.findByAnnounceId(announceId)
        if(!stockNormalEntity) return left([ new StockNormalNotFoundError() ])
        return right(stockNormalEntity.getCurrentStock())
    }
}