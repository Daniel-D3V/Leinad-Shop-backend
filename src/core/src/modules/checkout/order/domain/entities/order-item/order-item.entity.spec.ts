import { DomainValidator } from "@/modules/@shared/domain/validator"
import { OrderItemEntity } from "./order-item.entity"
import { OrderItemValidatorFactory } from "./validator"
import { mockDomainValidator } from "@/modules/@shared/tests"

jest.mock("./validator")

describe("Test OrderItemEntity", () => {

    let sut: OrderItemEntity
    let props: OrderItemEntity.Input
    let domainValidator: DomainValidator<any>
    let id: string

    beforeEach(() => {
        id = "any_id"
        props = {
            productId: "any_product_id",
            quantity: 1,
            unitPrice: 1,
            productType: "NORMAL"
        }
        domainValidator = mockDomainValidator()
        jest.spyOn(OrderItemValidatorFactory, "create").mockReturnValue(domainValidator)
        sut = OrderItemEntity.create(props, id).value as OrderItemEntity
    })

    it("Should create OrderItemEntity with correct values", () => {
        expect(sut.toJSON()).toEqual({
            id,
            ...props
        })
    })

    it("Should not create if domain validator returns an error", () => {
        const validatorError = new Error("validatorError")
        jest.spyOn(domainValidator, "validate").mockReturnValue({ isLeft: () => true, value: [ validatorError ] } as any)
        const sut = OrderItemEntity.create(props, id)
        expect(sut.value).toEqual([ validatorError ])
    })

    it("Should get total price", () => {
        props.quantity = 4
        props.unitPrice = 15
        const sut = OrderItemEntity.create(props, id).value as OrderItemEntity
        expect(sut.getTotal()).toBe(60)
    })
})
