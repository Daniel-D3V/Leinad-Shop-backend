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
            paymentProvider: "MERCADOPAGO",
            paymentProviderId: undefined,
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
            dateTimeCreated: this.dateTimeCreated,
            paymentProvider: this.paymentProvider
        }
    }

    hasPaymentProvider(): boolean {
        return !!this.props.paymentProviderId
    }

    setMercadopagoPaymentProvider(): void {
        this.props.paymentProvider = "MERCADOPAGO"
    }
    setStripePaymentProvider(): void {
        this.props.paymentProvider = "STRIPE"
    }

    setPaymentProviderId(paymentProviderId: string): void {
        this.props.paymentProviderId = paymentProviderId
    }
    unsetPaymentProviderId(): void {
        this.props.paymentProviderId = undefined
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
    get dateTimeCreated(): Date {
        return this.props.dateTimeCreated
    }
    get paymentProvider(): OrderPaymentEntity.PaymentProvider  {
        return this.props.paymentProvider
    }
    get paymentProviderId(): string | undefined {
        return this.props.paymentProviderId
    }
}


export namespace OrderPaymentEntity {

    export type PaymentProvider = "MERCADOPAGO" | "STRIPE"                                          

    export type Input = {
        amount: number
        orderPaymentCustomer: OrderPaymentCustomerEntity
        orderId: string
        dateTimeCreated?: Date
        paymentProvider: PaymentProvider
        paymentProviderId?: string
    }

    export type Props = {
        amount: number
        orderPaymentCustomer: OrderPaymentCustomerEntity
        orderId: string
        dateTimeCreated: Date
        paymentProvider: PaymentProvider
        paymentProviderId?: string
    }

    export type PropsJSON = Omit<Props, "orderPaymentCustomer"> & { id: string, orderPaymentCustomer: OrderPaymentCustomerEntity.PropsJSON }
}