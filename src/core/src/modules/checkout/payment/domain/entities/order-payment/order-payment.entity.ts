import { BaseEntity } from "@/modules/@shared/domain";
import { OrderPaymentCustomerEntity } from "../order-payment-customer/order-payment-customer.entity"
import { Either, right } from "@/modules/@shared/logic";


export class OrderPaymentEntity extends BaseEntity<OrderPaymentEntity.Props> {

    constructor(props: OrderPaymentEntity.Props, id?: string) {
        super(props, id);
    }

    static create(props: OrderPaymentEntity.Input, id?: string): Either<Error[], OrderPaymentEntity> {
        const orderPaymentEntity = new OrderPaymentEntity({
            ...props,
            status: "NOPAYMENTSELECTED",
            dateTimeCreated: props.dateTimeCreated || new Date()
        }, id)
        return right(orderPaymentEntity)
    }

    toJSON(): OrderPaymentEntity.PropsJSON {
        return {
            id: this.id,
            amount: this.amount,
            orderPaymentCustomer: this.orderPaymentCustomer.toJSON(),
            orderId: this.orderId,
            status: this.status,
            dateTimeCreated: this.dateTimeCreated
        }
    }

    get amount(): number {
        return this.props.amount
    }
    get orderPaymentCustomer(): OrderPaymentCustomerEntity {
        return this.props.orderPaymentCustomer
    }
    get orderId(): string {
        return this.props.orderId
    }
    get status(): OrderPaymentEntity.Status {
        return this.props.status
    }
    get dateTimeCreated(): Date {
        return this.props.dateTimeCreated
    }
}

export namespace OrderPaymentEntity {

    export type Status = "NOPAYMENTSELECTED" | "PENDING" | "CANCELLED" | "REFUNDED" |  "APPROVED" 

    export type Input = {
        amount: number
        orderPaymentCustomer: OrderPaymentCustomerEntity
        orderId: string
        dateTimeCreated?: Date
    }

    export type Props = {
        amount: number
        orderPaymentCustomer: OrderPaymentCustomerEntity
        orderId: string
        status: Status
        dateTimeCreated: Date
    }

    export type PropsJSON = Omit<Props, "orderPaymentCustomer"> & { id: string, orderPaymentCustomer: OrderPaymentCustomerEntity.PropsJSON }
}