import { Either, right } from "@/modules/@shared/logic";
import { PaymentEntity } from "../../../domain/entities";
import { PaymentGatewayInterface } from "../../../domain/gateways";


export class MercadopagoGateway implements PaymentGatewayInterface {

    

    async generatePayment(paymentEntity: PaymentEntity): Promise<Either<Error[], MercadopagoGateway.Output>> {
        
        

        return right({

        })
    }
}

export namespace MercadopagoGateway {
    export type Output = {

    }
}