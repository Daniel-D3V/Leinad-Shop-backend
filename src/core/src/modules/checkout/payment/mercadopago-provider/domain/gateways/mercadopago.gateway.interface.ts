import { MercadopagoPaymentProviderEntity } from "../entities"

export interface MercadopagoGatewayInterface {
    generatePayment(input: MercadopagoGatewayInterface.GeneratePaymentInput): Promise<MercadopagoGatewayInterface.GeneratePaymentOutput>
}

export namespace MercadopagoGatewayInterface {
    
    export type GeneratePaymentInput = {
        amount: number
        paymentMethod: MercadopagoPaymentProviderEntity.PaymentMethods
        customer: {
            email: string
        }
    }

    export type GeneratePaymentOutput = {
        paymentId: string
        data?: {
            [key: string]: any
        }
    }
}