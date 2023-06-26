import { BaseEntity } from "@/modules/@shared/domain";
import { Either, right } from "@/modules/@shared/logic";

export class MercadoPagoPaymentEntity extends BaseEntity<MercadoPagoPaymentEntity.Props> {

    constructor(props: MercadoPagoPaymentEntity.Props, id?: string){
        super(props, id);
    }

    static create(props: MercadoPagoPaymentEntity.Input, id?: string): Either<Error[], MercadoPagoPaymentEntity> {
        const mercadoPagoPaymentEntity = new MercadoPagoPaymentEntity({
            ...props,
        }, id)
        return right(mercadoPagoPaymentEntity)
    }

    toJSON(): MercadoPagoPaymentEntity.PropsJSON {
        return {
            id: this.id,
        }
    }
}

export namespace MercadoPagoPaymentEntity {

    export type Status =  "PENDING" | "CANCELLED" | "REFUNDED" |  "APPROVED" 
    export type PaymentMethods = "PIX"

    export type Input = {
        orderPaymentId: string
        mercadopagoPaymentId: string
        paymentMethod: PaymentMethods
    }
    export type Props = {
        orderPaymentId: string
        mercadopagoPaymentId: string
        paymentMethod: PaymentMethods
    }

    export type PropsJSON = { id: string }
}