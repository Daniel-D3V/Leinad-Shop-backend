import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";

export interface CreateOrderPaymentUsecaseInterface extends UsecaseInterface {
    execute(input: CreateOrderPaymentUsecaseInterface.InputDto): Promise<CreateOrderPaymentUsecaseInterface.OutputDto>
}

export namespace CreateOrderPaymentUsecaseInterface {

    export type InputDto = {
        orderId: string
        userId: string
    }

    export type OutputDto = Either<Error[], { id: string }>
}