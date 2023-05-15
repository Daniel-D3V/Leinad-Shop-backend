import { Either } from "@/modules/@shared/logic";
import { PaymentEntity } from "../entities";

export interface PaymentGatewayInterface {
    generatePayment(paymentEntity: PaymentEntity): Promise<Either<Error[], any>>
}
