import { ConsultStockAvailabilityByAnnounceIdUsecaseInterface } from "../../domain/usecases";
import { StockNormalFacadeInterface } from "../../facades/stock-normal.facade.interface";

export class StockNormalFacadeImp implements StockNormalFacadeInterface {

    constructor(
        private readonly consultStockAvailabilityByAnnounceIdUsecase: ConsultStockAvailabilityByAnnounceIdUsecaseInterface
    ){}

    async consultStock(announceId: string): Promise<number> {
        const result = await this.consultStockAvailabilityByAnnounceIdUsecase.execute({
            announceId
        })
        if(result.isLeft()) return 0
        return result.value
    }

}