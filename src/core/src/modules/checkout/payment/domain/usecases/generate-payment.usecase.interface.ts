import { UsecaseInterface } from "@/modules/@shared/domain";
import { Either } from "@/modules/@shared/logic";
import { PaymentEntity } from "../entities";

export interface GeneratePaymentUsecaseInterface extends UsecaseInterface {
    execute(input: GeneratePaymentUsecaseInterface.InputDto): Promise<GeneratePaymentUsecaseInterface.OutputDto>
}

export namespace GeneratePaymentUsecaseInterface {

    export type InputDto = {
        orderId: string
        paymentMethod: PaymentEntity.PaymentMethod
        customerId: string 
        amount: number
    }

    export type OutputDto = Either<Error[], { redirectUrl: string }>
}