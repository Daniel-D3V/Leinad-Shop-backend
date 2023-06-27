import { MercadopagoGatewayInterface } from "../../domain/gateways";
import * as mercadopago from "mercadopago"


mercadopago.configure({
    access_token: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});


export class MercadopagoGatewayImp implements MercadopagoGatewayInterface {

    async generatePayment(input: MercadopagoGatewayInterface.GeneratePaymentInput): Promise<MercadopagoGatewayInterface.GeneratePaymentOutput> {
        
        
        const payment = await mercadopago.payment.create({
            installments: 1,
            transaction_amount: input.amount,
            payment_method_id: "pix",
            payer: {
                email: input.email
            }
        })
        console.log(payment)

        return {
            paymentId: ""
        }
    }


}