import { MercadopagoGatewayInterface } from "../../domain/gateways";
import * as mercadopago from "mercadopago"
import { MercadopagoPaymentModel } from "../../domain/models";


mercadopago.configure({
    access_token: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});


export class MercadopagoGatewayImp implements MercadopagoGatewayInterface {

    async generatePayment({ amount, customer, paymentMethod, orderPaymentId }: MercadopagoGatewayInterface.GeneratePaymentInput): Promise<MercadopagoGatewayInterface.GeneratePaymentOutput> {
        
        let paymentMethodChoosed = "pix"

        if(paymentMethod === "BOLETO") {
            paymentMethodChoosed = "ticket"
        } else {
            paymentMethodChoosed = "pix"
        }
        
        const payment = await mercadopago.payment.create({
            callback_url: process.env.MERCADOPAGO_REDIRECT_URL!,
            installments: 1,
            transaction_amount: amount,
            payment_method_id: paymentMethodChoosed,
            payer: {
                email: customer.email
            },
            metadata: {
                orderPaymentId,
                amount: amount,
                paymentMethod: paymentMethod
            }
        })
        const qrCode = payment.body.point_of_interaction.transaction_data.qr_code_base64
        const pixCode = payment.body.point_of_interaction.transaction_data.qr_code
        const paymentLink = payment.body.point_of_interaction.transaction_data.ticket_url
        return {
            paymentId: `${payment.body.id}`,
            data: {
                qrCode,
                pixCode,
                paymentLink
            }
        }
    }

    async findById(id: string): Promise<MercadopagoPaymentModel | null> {

        try{
            const payment = await mercadopago.payment.findById(parseInt(id))
            console.log(payment)
            return {
                paymentId: `${payment.body.id}`,
                amount: 100,
                orderPaymentId: "",
                paymentMethod: "PIX",
                status: "PENDING"
            }
        }catch(err){
            return null
        }
        return null
    }


}