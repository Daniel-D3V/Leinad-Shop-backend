export interface MercadopagoGatewayInterface {
    generatePayment(input: MercadopagoGatewayFactoryInterface.GeneratePaymentInput): Promise<MercadopagoGatewayFactoryInterface.GeneratePaymentOutput>
}

export namespace MercadopagoGatewayFactoryInterface {
    
    export type GeneratePaymentInput = {
        amount: number
        email: string
    }

    export type GeneratePaymentOutput = {
        paymentId: string
        data?: {
            [key: string]: any
        }
    }
}