import { ConsultStockNormalAvailabilityByAnnounceIdUsecaseInterface } from "../../domain/usecases";
import { StockNormalFacadeInterface } from "../../facades/stock-normal.facade.interface";

export class StockNormalFacadeImp implements StockNormalFacadeInterface {

    constructor(
        private readonly consultStockNormalAvailabilityByAnnounceIdUsecase: ConsultStockNormalAvailabilityByAnnounceIdUsecaseInterface
    ){}

    async consultStock(announceId: string): Promise<number> {
        const result = await this.consultStockNormalAvailabilityByAnnounceIdUsecase.execute({
            announceId
        })
        if(result.isLeft()) return 0
        return result.value
    }

}