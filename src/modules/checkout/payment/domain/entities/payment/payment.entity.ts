import { BaseEntity } from "@/modules/@shared/domain"
import { Either, right } from "@/modules/@shared/logic"


export class PaymentEntity extends BaseEntity<PaymentEntity.Props> {
    
    constructor(props: PaymentEntity.Props, id?: string) {
        super(props, id)
    }

    toJSON(): PaymentEntity.PropsJSON {
        return {
            id: this.id,
            status: this.status,
            paymentMethod: this.paymentMethod
        }
    }
        
    static create(props: PaymentEntity.Props, id?: string): Either<Error[], PaymentEntity> {
        

        
        const paymentEntity = new PaymentEntity(props, id)
        return right(paymentEntity)
    }

    get status(): PaymentEntity.Status {
        return this.props.status
    }
    get paymentMethod(): PaymentEntity.PaymentMethod {
        return this.props.paymentMethod
    }
}

export namespace PaymentEntity {
    
    export type Status = "PENDING" | "CANCELLED" | "PAID" 
    export type PaymentMethod = "MERCADOPAGO" | "STRIPE"

    export type Input = {
        status: Status
        paymentMethod: PaymentMethod
    }
    export type Props = {
        status: Status
        paymentMethod: PaymentMethod
    }
    export type PropsJSON = Props & { id: string }
}