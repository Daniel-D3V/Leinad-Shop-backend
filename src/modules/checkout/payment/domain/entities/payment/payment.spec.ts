import { PaymentEntity } from "./payment.entity"


describe("Test PaymentEntity", () => {

    let sut: PaymentEntity
    let props: PaymentEntity.Input
    let id: string

    beforeEach(() => {
        id = "any_id"
        props = {
            paymentMethod: "MERCADOPAGO"
        }

        sut = PaymentEntity.create(props, id).value as PaymentEntity
    })

    it("Should create a new PaymentEntity", () => {
        sut = PaymentEntity.create(props, id).value as PaymentEntity
        expect(sut).toBeInstanceOf(PaymentEntity)
        expect(sut.toJSON()).toEqual({
            id,
            status: "PENDING",
            paymentMethod: "MERCADOPAGO"
        })
    })
})