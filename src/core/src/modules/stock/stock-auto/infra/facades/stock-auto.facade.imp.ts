import { ConsultStockAutoAvailabilityUsecaseInterface } from "../../domain/usecases";
import { StockAutoFacadeInterface } from "../../facades";

export class StockAutoFacadeImp implements StockAutoFacadeInterface {
    
    constructor(
        private readonly consultStockAutoAvailabilityUsecase: ConsultStockAutoAvailabilityUsecaseInterface
    ){}

    async consultStockByAnnounceId(announceId: string): Promise<number> {
        const consultResult = await this.consultStockAutoAvailabilityUsecase.execute({
            announceId
        })
        if(consultResult.isLeft()) return 0
        return consultResult.value
    }


}