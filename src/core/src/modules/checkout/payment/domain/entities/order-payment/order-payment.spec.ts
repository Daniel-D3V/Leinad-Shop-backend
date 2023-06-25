import { OrderPaymentCustomerEntity } from "../order-payment-customer/order-payment-customer.entity"
import { OrderPaymentEntity } from "./order-payment.entity"


describe("Test OrderPayment", () => { 

    let sut: OrderPaymentEntity
    let orderPaymentCustomerEntity: OrderPaymentCustomerEntity
    let props: OrderPaymentEntity.Input
    let id: string

    beforeEach(() => {
        id = "any_id"
        orderPaymentCustomerEntity = OrderPaymentCustomerEntity.create({
            name: "any_name",
            email: "any_email"
        }, "any_customer_id")
        props = {
            amount: 100,
            orderId: "any_order_id",
            orderPaymentCustomer: orderPaymentCustomerEntity,
            dateTimeCreated: new Date()
        }
        sut = OrderPaymentEntity.create(props, id).value as OrderPaymentEntity
    })

    it("Should create a OrderPayment", () => {
        expect(sut).toBeInstanceOf(OrderPaymentEntity)
        expect(sut.toJSON()).toEqual({
            id,
            status: "NOPAYMENTSELECTED",
            ...props,
            orderPaymentCustomer: orderPaymentCustomerEntity.toJSON(),
        })
    })
})