import { BaseEntity } from "@/modules/@shared/domain"
import { Either, left, right } from "@/modules/@shared/logic"
import { PaymentValidatorFactory } from "./validator"
import { CustomerEntity } from "../customer/customer.entity"


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
            status: "PENDING",
            dateTimeCreated: props.dateTimeCreated ?? new Date()
        }, id)
        return right(paymentEntity)
    }

    cancel(): void {
        this.props.status = "CANCELLED"
    }

    approve(): void {
        this.props.status = "APPROVED"
    }

    toJSON(): PaymentEntity.PropsJSON {
        return {
            id: this.id,
            status: this.status,
            paymentMethod: this.paymentMethod,
            orderId: this.orderId,
            customer: this.customer.toJSON(),
            dateTimeCreated: this.dateTimeCreated,
            amount: this.amount
        }
    }

    get status(): PaymentEntity.Status {
        return this.props.status
    }
    get paymentMethod(): PaymentEntity.PaymentMethod {
        return this.props.paymentMethod
    }
    get orderId(): string {
        return this.props.orderId
    }
    get customer(): CustomerEntity {
        return this.props.customer
    }
    get dateTimeCreated(): Date {
        return this.props.dateTimeCreated
    }
    get amount(): number {
        return this.props.amount
    }
}

export namespace PaymentEntity {
    
    export type Status = "PENDING" | "CANCELLED" | "REFUNDED" |  "APPROVED" 
    export type PaymentMethod = "MERCADOPAGO" | "STRIPE"

    export type Input = {
        amount: number
        customer: CustomerEntity
        orderId: string
        paymentMethod: PaymentMethod
        dateTimeCreated?: Date
    }
    export type Props = {
        amount: number
        customer: CustomerEntity
        orderId: string
        status: Status
        paymentMethod: PaymentMethod
        dateTimeCreated: Date
    }
    export type PropsJSON = Omit<Props, "customer"> & { id: string, customer: CustomerEntity.PropsJSON }
}