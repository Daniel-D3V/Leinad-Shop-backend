import { right } from "@/modules/@shared/logic";
import { StockAutoGatewayInterface } from "../../../domain/gateways";
import { ConsultStockAutoAvailabilityUsecaseInterface } from "../../../domain/usecases";

export class ConsultStockAutoAvailabilityUsecase implements ConsultStockAutoAvailabilityUsecaseInterface {

    constructor(
        private readonly stockAutoGateway: StockAutoGatewayInterface
    ){}

    async execute({ announceId }: ConsultStockAutoAvailabilityUsecaseInterface.InputDto): Promise<ConsultStockAutoAvailabilityUsecaseInterface.OutputDto> {
        return right(await this.stockAutoGateway.getStockAutoCount(announceId))
    }
}