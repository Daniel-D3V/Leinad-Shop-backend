import { CustomerEntity } from "../customer/customer.entity"
import { PaymentEntity } from "./payment.entity"


describe("Test PaymentEntity", () => {

    let sut: PaymentEntity
    let props: PaymentEntity.Input
    let customerEntity: CustomerEntity
    let id: string

    beforeEach(() => {
        id = "any_id"
        customerEntity = CustomerEntity.create({
            email: "any_email",
            name: "any_name"
        })
        props = {
            orderId: "any_order_id",
            paymentMethod: "MERCADOPAGO",
            customer: customerEntity
        }

        sut = PaymentEntity.create(props, id).value as PaymentEntity
    })

    it("Should create a new PaymentEntity", () => {
        sut = PaymentEntity.create(props, id).value as PaymentEntity
        expect(sut).toBeInstanceOf(PaymentEntity)
        expect(sut.toJSON()).toEqual({
            id,
            status: "PENDING",
            paymentMethod: "MERCADOPAGO",
            orderId: "any_order_id",
            customer: customerEntity.toJSON()
        })
    })
})