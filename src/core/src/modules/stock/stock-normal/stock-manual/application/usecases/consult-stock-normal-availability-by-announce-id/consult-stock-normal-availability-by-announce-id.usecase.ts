import { left, right } from "@/modules/@shared/logic";
import { StockNormalRepositoryInterface } from "../../../domain/repositories";
import { ConsultStockNormalAvailabilityByAnnounceIdUsecaseInterface } from "../../../domain/usecases";
import { StockNormalNotFoundError } from "../_errors";

export class ConsultStockNormalAvailabilityByAnnounceIdUsecase implements ConsultStockNormalAvailabilityByAnnounceIdUsecaseInterface {

    constructor(
        private readonly stockNormalRepository: StockNormalRepositoryInterface
    ){}

    async execute({ announceId }: ConsultStockNormalAvailabilityByAnnounceIdUsecaseInterface.InputDto): Promise<ConsultStockNormalAvailabilityByAnnounceIdUsecaseInterface.OutputDto> {

        const stockNormalEntity = await this.stockNormalRepository.findByAnnounceId(announceId)
        if(!stockNormalEntity) return left([ new StockNormalNotFoundError() ])
        return right(stockNormalEntity.getCurrentStock())
    }
}