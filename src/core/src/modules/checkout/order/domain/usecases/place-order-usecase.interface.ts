import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface PlaceOrderUsecaseInterface extends UsecaseInterface {
    execute(input: PlaceOrderUsecaseInterface.InputDto): Promise<PlaceOrderUsecaseInterface.OutputDto>
}

export namespace PlaceOrderUsecaseInterface {
    
    export type Product = {
        announceId: string
        announceTypeId: string
        quantity: number
    }

    export type InputDto = {
        customerId: string
        products: Product[]
    }

    export type OutputDto = Either<Error[], {
        id: string
    }>
}