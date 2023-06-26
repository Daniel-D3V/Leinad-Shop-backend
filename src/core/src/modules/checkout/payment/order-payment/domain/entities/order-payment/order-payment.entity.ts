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
            paymentProvider: undefined,
            paymentProviderId: undefined,
            dateTimeCreated: props.dateTimeCreated || new Date()
        }, id)
        return right(orderPaymentEntity)
    }

    toJSON(): OrderPaymentEntity.PropsJSON {
        return {
            id: this.id,
            orderPaymentCustomer: this.orderPaymentCustomer.toJSON(),
            orderId: this.orderId,
            dateTimeCreated: this.dateTimeCreated,
            paymentProvider: this.paymentProvider
        }
    }

    hasPaymentProvider(): boolean {
        return !!this.props.paymentProviderId
    }

    setMercadopagoPaymentProvider(paymentProviderId: string): void {
        this.props.paymentProviderId = paymentProviderId
        this.props.paymentProvider = "MERCADOPAGO"
    }
    setStripePaymentProvider(paymentProviderId: string): void {
        this.props.paymentProviderId = paymentProviderId
        this.props.paymentProvider = "STRIPE"
    }

    unsetPaymentProvider(): void {
        this.props.paymentProvider = undefined
        this.props.paymentProviderId = undefined
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
    get paymentProvider(): OrderPaymentEntity.PaymentProvider | undefined  {
        return this.props.paymentProvider
    }
    get paymentProviderId(): string | undefined {
        return this.props.paymentProviderId
    }
}


export namespace OrderPaymentEntity {

    export type PaymentProvider = "MERCADOPAGO" | "STRIPE"

    export type Input = {
        orderPaymentCustomer: OrderPaymentCustomerEntity
        orderId: string
        dateTimeCreated?: Date
        paymentProvider?: PaymentProvider
        paymentProviderId?: string
    }

    export type Props = {
        orderPaymentCustomer: OrderPaymentCustomerEntity
        orderId: string
        dateTimeCreated: Date
        paymentProvider?: PaymentProvider
        paymentProviderId?: string
    }

    export type PropsJSON = Omit<Props, "orderPaymentCustomer"> & { id: string, orderPaymentCustomer: OrderPaymentCustomerEntity.PropsJSON }
}