import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface AllocateStockForOrderUsecaseInterface extends UsecaseInterface {
    execute(data: AllocateStockForOrderUsecaseInterface.InputDto): Promise<AllocateStockForOrderUsecaseInterface.OutputDto>;
}

export namespace AllocateStockForOrderUsecaseInterface {
    export type InputDto = {
        orderId: string
        products: {
            announceId: string
            announceTypeId: string
            quantity: number
        }[]

    }

    export type OutputDto = Either<Error[], null> 
}