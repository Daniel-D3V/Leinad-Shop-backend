import { BaseEntity } from "@/modules/@shared/domain"
import { Either, left, right } from "@/modules/@shared/logic"
import { PaymentValidatorFactory } from "./validator"


export class PaymentEntity extends BaseEntity<PaymentEntity.Props> {
    
    constructor(props: PaymentEntity.Props, id?: string) {
        super(props, id)
    }
        
    static create(props: PaymentEntity.Input, id?: string): Either<Error[], PaymentEntity> {
        
        const paymentValidator = PaymentValidatorFactory.create()
        const validationResult = paymentValidator.validate(props)
        if(validationResult.isLeft()) return left(validationResult.value)
        
        const paymentEntity = new PaymentEntity({
            ...props,
            status: "PENDING"
        }, id)
        return right(paymentEntity)
    }

    cancel(): void {
        this.props.status = "CANCELLED"
    }

    pay(): void {
        this.props.status = "PAID"
    }

    toJSON(): PaymentEntity.PropsJSON {
        return {
            id: this.id,
            status: this.status,
            paymentMethod: this.paymentMethod
        }
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
        paymentMethod: PaymentMethod
    }
    export type Props = {
        status: Status
        paymentMethod: PaymentMethod
    }
    export type PropsJSON = Props & { id: string }
}