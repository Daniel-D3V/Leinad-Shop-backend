import { Either } from "@/modules/@shared/logic";
import { PaymentEntity } from "../entities";

export interface PaymentGatewayInterface {
    generatePayment(paymentEntity: PaymentEntity): Promise<Either<Error[], PaymentGatewayInterface.generatePaymentOuput>>
}

export namespace PaymentGatewayInterface {
    export type generatePaymentOuput = {
        redirectData: {
            url: string
            additionalData?: any
        }
        data?: any
    }
}