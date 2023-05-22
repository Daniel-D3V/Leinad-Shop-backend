import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";
import { ProductStockEntity } from "../../entities";

export interface GetStockAvailabilityUsecaseInterface extends UsecaseInterface {
    execute(input: GetStockAvailabilityUsecaseInterface.InputDto): Promise<GetStockAvailabilityUsecaseInterface.OutputDto>
}

export namespace GetStockAvailabilityUsecaseInterface {
    export type InputDto = {
        productStockId: string
    }

    export type OutputDto = Either<Error[], {
        stockCount: number
        stockType: ProductStockEntity.StockType
    }>
}