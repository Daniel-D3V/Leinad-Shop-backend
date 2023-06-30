import { MercadopagoGatewayInterface } from "../../domain/gateways";
import * as mercadopago from "mercadopago"
import { MercadopagoPaymentModel } from "../../domain/models";


mercadopago.configure({
    access_token: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

const getStatus = (status: string): MercadopagoPaymentModel.Status =>  {
    if(status === "approved"){
        return "APPROVED"
    }
    if(status === "pending"){
        return "PENDING"
    }
    if(status === "refunded"){
        return "REFUNDED"
    }
    if(status === "cancelled"){
        return "CANCELLED"
    }

    return "CANCELLED"
}

export class MercadopagoGatewayImp implements MercadopagoGatewayInterface {
    
    async generatePayment({ amount, customer, paymentMethod, orderPaymentId }: MercadopagoGatewayInterface.GeneratePaymentInput): Promise<MercadopagoGatewayInterface.GeneratePaymentOutput> {
        
        let paymentMethodChoosed = "pix"
        
        
        if(paymentMethod !== "PIX") {
            paymentMethodChoosed = "pix"
        }

        const minutes = 60  

        const mercadopagoExpirationDate = new Date()
        mercadopagoExpirationDate.setMinutes(mercadopagoExpirationDate.getMinutes() + minutes - 10)   
        
        const applicationExpirationDate = new Date()
        applicationExpirationDate.setMinutes(applicationExpirationDate.getMinutes() + minutes)

        const payment = await mercadopago.payment.create({
            date_of_expiration: mercadopagoExpirationDate.toISOString(),

            callback_url: process.env.MERCADOPAGO_REDIRECT_URL!,
            installments: 1,
            transaction_amount: amount,
            payment_method_id: paymentMethodChoosed,
            payer: {
                email: customer.email
            },
            metadata: {
                expirationDate: applicationExpirationDate,
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
            const expirationDate = new Date(payment.body.metadata.expiration_date)
            return {
                paymentId: `${payment.body.id}`,
                amount: payment.body.metadata.amount,
                orderPaymentId:  payment.body.metadata.order_payment_id,
                paymentMethod: payment.body.metadata.payment_method,
                status: getStatus(payment.body.status),
                expirationDate
            }
        }catch(err){
            return null
        }
    }

    async refund(paymentId: string): Promise<boolean> {

        try {
            await mercadopago.payment.refund( parseInt(paymentId) )
            return true
        }catch(err){
            console.log(err)
            return false
        }
    }

}