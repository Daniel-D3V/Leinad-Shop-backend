// import { CustomerEntity } from "../order-payment-customer/order-payment-customer.entity"
// import { PaymentEntity } from "./payment.entity"

it("", () => {})
// describe("Test PaymentEntity", () => {

//     let sut: PaymentEntity
//     let props: PaymentEntity.Input
//     let customerEntity: CustomerEntity
//     let id: string

//     beforeEach(() => {
//         id = "any_id"
//         customerEntity = CustomerEntity.create({
//             email: "any_email",
//             name: "any_name"
//         })
//         props = {
//             dateTimeCreated: new Date(),
//             orderId: "any_order_id",
//             paymentMethod: "MERCADOPAGO",
//             customer: customerEntity,
//             amount: 100
//         }

//         sut = PaymentEntity.create(props, id).value as PaymentEntity
//     })

//     it("Should create a new PaymentEntity", () => {
//         sut = PaymentEntity.create(props, id).value as PaymentEntity
//         expect(sut).toBeInstanceOf(PaymentEntity)
//         expect(sut.toJSON()).toEqual({
//             id,
//             status: "PENDING",
//             ...props,
//             customer: customerEntity.toJSON()
//         })
//     })

//     it("Should cancel a PaymentEntity", () => {
//         expect(sut.status).toBe("PENDING")
//         sut.cancel()
//         expect(sut.status).toBe("CANCELLED")
//     })

//     it("Should pay a PaymentEntity", () => {
//         expect(sut.status).toBe("PENDING")
//         sut.approve()
//         expect(sut.status).toBe("APPROVED")
//     })
// })