import { Either, right } from "@/modules/@shared/logic";
import { BasePaymentProviderEntity } from "@/modules/checkout/payment/_base";


export class MercadopagoPaymentProviderEntity extends BasePaymentProviderEntity<MercadopagoPaymentProviderEntity.Props> {

    private constructor(props: MercadopagoPaymentProviderEntity.Props, id?: string){
        super(props, id)
    }

    static create(input: MercadopagoPaymentProviderEntity.Input, id?: string): MercadopagoPaymentProviderEntity {        

        const mercadopagoPaymentProviderEntity = new MercadopagoPaymentProviderEntity({
            ...input,
            status: "PENDING"
        }, id)
        return mercadopagoPaymentProviderEntity
    }

    isExpired(): boolean {
        if(!this.isPeding()) return false
        return this.props.expirationDate.getTime() < new Date().getTime()
    }

    toJSON(): MercadopagoPaymentProviderEntity.PropsJSON {
        return {
            id: this.id,
            orderPaymentId: this.orderPaymentId,
            status: this.status,
            mercadopagoPaymentId: this.mercadopagoPaymentId,
            amount: this.amount,
            paymentMethod: this.paymentMethod,
            expirationDate: this.expirationDate
        }
    }

    get mercadopagoPaymentId(): string {
        return this.props.mercadopagoPaymentId
    }
    get paymentMethod(): MercadopagoPaymentProviderEntity.PaymentMethods {
        return this.props.paymentMethod
    }
    get expirationDate(): Date {
        return this.props.expirationDate
    }

}

export namespace MercadopagoPaymentProviderEntity {

    export type PaymentMethods = "PIX" 

    export type Input = {
        expirationDate: Date
        orderPaymentId: string
        mercadopagoPaymentId: string
        paymentMethod: PaymentMethods
        amount: number
    }

    export type Props = BasePaymentProviderEntity.Props & {
        mercadopagoPaymentId: string
        paymentMethod: PaymentMethods
        expirationDate: Date
    }

    export type PropsJSON = Props & {
        id: string

    }
}