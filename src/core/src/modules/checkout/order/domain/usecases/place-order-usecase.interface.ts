import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface PlaceOrderUsecaseInterface extends UsecaseInterface {
    execute(input: PlaceOrderUsecaseInterface.InputDto): Promise<PlaceOrderUsecaseInterface.OutputDto>
}

export namespace PlaceOrderUsecaseInterface {
    export type InputDto = {
        customerId: string
        products: {
            id: string
            itemId?: string
            quantity: number
        }[]
    }

    export type OutputDto = Either<Error[], {
        id: string
    }>
}