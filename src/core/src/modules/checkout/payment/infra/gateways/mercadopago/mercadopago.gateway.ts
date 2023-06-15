import { Either, right } from "@/modules/@shared/logic";
import { PaymentEntity } from "../../../domain/entities";
import { PaymentGatewayInterface } from "../../../domain/gateways";
import axios from "axios"

export class MercadopagoGateway implements PaymentGatewayInterface {

    private readonly mercadolivreUrl: string

    constructor(){
        this.mercadolivreUrl = "https://api.mercadopago.com/v1/payments"
    }

    async generatePayment(paymentEntity: PaymentEntity): Promise<Either<Error[], MercadopagoGateway.Output>> {


        const response = await axios.post(`${this.mercadolivreUrl}`, {
            
        }, { validateStatus: () => true })

        console.log(response.data)

        return right({

        })
    }
}

export namespace MercadopagoGateway {
    export type Output = {

    }
}