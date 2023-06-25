import { Either, right } from "@/modules/@shared/logic";
import { PaymentEntity } from "../../../domain/entities";
import { PaymentGatewayInterface } from "../../../domain/gateways";
import * as mercadopago from "mercadopago"

mercadopago.configure({
    access_token: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export class MercadopagoGateway implements PaymentGatewayInterface {

    constructor(){
    }

    async generatePayment(paymentEntity: PaymentEntity):  Promise<Either<Error[], PaymentGatewayInterface.generatePaymentOuput>> {

        
        const payment = await mercadopago.payment.create({
            installments: 1,
            transaction_amount: paymentEntity.amount,
            payment_method_id: "pix",
            payer: {
                email: paymentEntity.customer.email
            }
        })
        
        const paymentLink = payment.response.point_of_interaction.transaction_data.ticket_url
        
        return right({
            redirectData: {
                url: paymentLink,
                additionalData: {
                    qrCode: payment.response.point_of_interaction.transaction_data.qr_code_base64
                }
            }
        })
    }
}

export namespace MercadopagoGateway {
    export type Output = {

    }
}