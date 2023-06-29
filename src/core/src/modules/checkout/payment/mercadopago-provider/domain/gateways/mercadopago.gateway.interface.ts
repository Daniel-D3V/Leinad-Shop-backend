import { MercadopagoPaymentProviderEntity } from "../entities"
import { MercadopagoPaymentModel } from "../models"

export interface MercadopagoGatewayInterface {
    generatePayment(input: MercadopagoGatewayInterface.GeneratePaymentInput): Promise<MercadopagoGatewayInterface.GeneratePaymentOutput>
    findById(id: string): Promise<MercadopagoPaymentModel | null>
}

export namespace MercadopagoGatewayInterface {
    
    export type GeneratePaymentInput = {
        amount: number
        orderPaymentId: string
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