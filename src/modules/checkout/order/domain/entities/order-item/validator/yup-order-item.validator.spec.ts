import { YupOrderItemValidator } from "./yup-order-item.validator"


describe("test YupOrderItemValidator", () => {

    let yupCategoryValidator: YupOrderItemValidator
    let props: YupOrderItemValidator.ValidateFields

    beforeAll(() => {
        yupCategoryValidator = new YupOrderItemValidator()
    })
    beforeEach(() => {
        props = {
            quantity: 4,
            unitPrice: 10
        }
    })

    describe("Test quantity", () => {
        it("Should return InvalidQuantityTypeError if an invalid quantity type is provided", () => {
            props.quantity = {} as any
            const result = yupCategoryValidator.validate(props)
            expect(result.value![0].name).toBe("InvalidQuantityTypeError")
        })

        it("Should return InvalidQuantityTypeError if quantity provided is a float type", () => {
            props.quantity = 1.2
            const result = yupCategoryValidator.validate(props)
            expect(result.value![0].name).toBe("InvalidQuantityTypeError")
        })

        it("Should return QuantityNotProvidedError if quantity is not provided", () => {
            props.quantity = undefined as any
            const result = yupCategoryValidator.validate(props)
            expect(result.value![0].name).toBe("QuantityNotProvidedError")
        })

        it("Should return NotPositiveQuantityValueError if a not positive quantity value is provided", () => {
            props.quantity = 0
            const result = yupCategoryValidator.validate(props)
            expect(result.value![0].name).toBe("NotPositiveQuantityValueError")
        })

        it("Should return InvalidQuantitySizeError if an invalid quantity size is provided", () => {
            props.quantity = 6
            const result = yupCategoryValidator.validate(props)
            expect(result.value![0].name).toBe("InvalidQuantitySizeError")
        })
    })

    describe("Test unitPrice", () => {
        it("Should return InvalidUnitPriceTypeError if an invalid unitPrice type is provided", () => {
            props.unitPrice = {} as any
            const result = yupCategoryValidator.validate(props)
            expect(result.value![0].name).toBe("InvalidUnitPriceTypeError")
        })

        it("Should return UnitPriceNotPositiveError if unitPrice is invalid", () => {
            props.unitPrice = 0
            const result = yupCategoryValidator.validate(props)
            expect(result.value![0].name).toBe("UnitPriceNotPositiveError")
        })
    })

})