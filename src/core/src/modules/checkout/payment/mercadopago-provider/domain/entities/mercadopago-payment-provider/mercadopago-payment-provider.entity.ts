import { Either, right } from "@/modules/@shared/logic";
import { BasePaymentProviderEntity } from "@/modules/checkout/payment/_base";


export class MercadopagoPaymentProviderEntity extends BasePaymentProviderEntity<MercadopagoPaymentProviderEntity.Props> {

    private constructor(props: MercadopagoPaymentProviderEntity.Props, id?: string){
        super(props, id)
    }

    static create(input: MercadopagoPaymentProviderEntity.Input, id?: string): Either<Error[], MercadopagoPaymentProviderEntity> {

        const mercadopagoPaymentProviderEntity = new MercadopagoPaymentProviderEntity({
            ...input,
            status: "PENDING"
        }, id)
        return right(mercadopagoPaymentProviderEntity)
    }

    toJSON(): MercadopagoPaymentProviderEntity.PropsJSON {
        return {
            id: this.id,
            orderPaymentId: this.orderPaymentId,
            status: this.status,
            mercadopagoPaymentId: this.mercadopagoPaymentId,
            amount: this.amount
        }
    }

    get mercadopagoPaymentId(): string {
        return this.props.mercadopagoPaymentId
    }

}

export namespace MercadopagoPaymentProviderEntity {

    export type Input = {
        orderPaymentId: string
        mercadopagoPaymentId: string
        amount: number
    }

    export type Props = BasePaymentProviderEntity.Props & {
        mercadopagoPaymentId: string
    }

    export type PropsJSON = Props & {
        id: string

    }
}