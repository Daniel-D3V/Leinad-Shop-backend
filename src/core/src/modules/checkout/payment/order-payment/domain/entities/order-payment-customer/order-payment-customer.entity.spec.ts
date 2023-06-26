import { OrderPaymentCustomerEntity } from "./order-payment-customer.entity"



describe('Test OrderPaymentCustomerEntity', () => { 

    let sut: OrderPaymentCustomerEntity 
    let props: OrderPaymentCustomerEntity.Input
    let id: string

    beforeEach(() => {
        id = "any_id"
        props = {
            name: "any_name",
            email: "any_email"
        }
        sut = OrderPaymentCustomerEntity.create(props, id)
    })

    it("Should create a OrderPaymentCustomerEntity instance", () => {
        sut = OrderPaymentCustomerEntity.create(props, id)
        expect(sut.toJSON()).toEqual({
            id,
            ...props
        })
    })

})