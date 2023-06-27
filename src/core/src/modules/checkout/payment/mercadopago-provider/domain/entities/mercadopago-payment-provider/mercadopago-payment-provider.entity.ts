import { Either, right } from "@/modules/@shared/logic";
import { BasePaymentProviderEntity } from "@/modules/checkout/payment/_base";


export class MercadopagoPaymentProviderEntity extends BasePaymentProviderEntity<MercadopagoPaymentProviderEntity.Props> {

    private constructor(props: MercadopagoPaymentProviderEntity.Props, id?: string){
        super(props, id)
    }

    static create(input: MercadopagoPaymentProviderEntity.Input, id?: string): MercadopagoPaymentProviderEntity {
        const paymentMethods: MercadopagoPaymentProviderEntity.PaymentMethods[]  = [ "PIX", "BOLETO" ]
        if(!paymentMethods.includes(input.paymentMethod)) {
            input.paymentMethod = "PIX"
        }

        const mercadopagoPaymentProviderEntity = new MercadopagoPaymentProviderEntity({
            ...input,
            status: "PENDING"
        }, id)
        return mercadopagoPaymentProviderEntity
    }

    toJSON(): MercadopagoPaymentProviderEntity.PropsJSON {
        return {
            id: this.id,
            orderPaymentId: this.orderPaymentId,
            status: this.status,
            mercadopagoPaymentId: this.mercadopagoPaymentId,
            amount: this.amount,
            paymentMethod: this.paymentMethod
        }
    }

    get mercadopagoPaymentId(): string {
        return this.props.mercadopagoPaymentId
    }
    get paymentMethod(): MercadopagoPaymentProviderEntity.PaymentMethods {
        return this.props.paymentMethod
    }

}

export namespace MercadopagoPaymentProviderEntity {

    export type PaymentMethods = "PIX" | "BOLETO"

    export type Input = {
        orderPaymentId: string
        mercadopagoPaymentId: string
        paymentMethod: PaymentMethods
        amount: number
    }

    export type Props = BasePaymentProviderEntity.Props & {
        mercadopagoPaymentId: string
        paymentMethod: PaymentMethods
    }

    export type PropsJSON = Props & {
        id: string

    }
}