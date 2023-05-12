import { YupOrderValidator } from "./yup-order.validator"


describe("test YupOrderItemValidator", () => {

    let yupCategoryValidator: YupOrderValidator
    let props: YupOrderValidator.ValidateFields

    beforeAll(() => {
        yupCategoryValidator = new YupOrderValidator()
    })
    beforeEach(() => {
        props = {
            quantity: 4,
            unitPrice: 10
        }
    })

    it("SHOULD", () => {})
})