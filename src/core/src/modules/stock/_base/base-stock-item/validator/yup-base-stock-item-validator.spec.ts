import { YupBaseStockItemValidatorFactory } from "./yup-base-stock-item-validator"

describe("Test YupBaseStockItemValidatorFactory", () => {

    let sut: YupBaseStockItemValidatorFactory
    let props: YupBaseStockItemValidatorFactory.ValidateFields

    beforeEach(() => {
        props = {
            price: 10
        }
        sut = new YupBaseStockItemValidatorFactory()
    })

    describe("Test Price", () => {
        it("Should return InvalidPriceTypeError if an invalid value type is provided", () => {
            props.price = {} as any
            const output = sut.validate(props)
            expect(output.value![0].name).toBe("InvalidPriceTypeError")
        })

        it("Should return PriceNotProvidedError if value is not provided", () => {
            props.price = undefined as any
            const output = sut.validate(props)
            expect(output.value![0].name).toBe("PriceNotProvidedError")
        })

        it("Should return InvalidPriceLengthError if the max length of the value provided is invalid", () => {
            props.price = 100000001
            const output = sut.validate(props)
            expect(output.value![0].name).toBe("InvalidPriceLengthError")
        })

        it("Should return InvalidPriceLengthError if the min length of the value provided is invalid", () => {
            props.price = 0.49
            const output = sut.validate(props)
            expect(output.value![0].name).toBe("InvalidPriceLengthError")
        })
    })
})