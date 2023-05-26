import { YupProductStockAutoValidator } from "./yup-product-stock-auto-validator"

describe("Test YupProductStockAutoValidator", () => {

    let sut: YupProductStockAutoValidator
    let props: YupProductStockAutoValidator.ValidateFields

    beforeEach(() => {
        props = {
            value: "any_value"
        }
        sut = new YupProductStockAutoValidator()
    })

    describe("Test value", () => {
        it("Should return InvalidValueTypeError if an invalid value type is provided", () => {
            props.value = {} as any
            const output = sut.validate(props)
            expect(output.value![0].name).toBe("InvalidValueTypeError")
        })

        it("Should return ValueNotProvidedError if value is not provided", () => {
            props.value = undefined as any
            const output = sut.validate(props)
            expect(output.value![0].name).toBe("ValueNotProvidedError")
        })

        it("Should return InvalidValueLengthError if the length of the value provided is invalid", () => {
            props.value = "A".repeat(1001)
            const output = sut.validate(props)
            expect(output.value![0].name).toBe("InvalidValueLengthError")
        })
    })
})