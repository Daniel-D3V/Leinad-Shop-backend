import { YupProductStockNormalValidator } from "./yup-product-stock-normal.validator"

describe("Test YupProductStockNormalValidator", () => {

    let sut: YupProductStockNormalValidator
    let props: YupProductStockNormalValidator.ValidateFields

    beforeEach(() => {
        props = {
            stock: 10
        }
        sut = new YupProductStockNormalValidator()
    })

    describe("test stock", () => {
        it("Should return InvalidStockTypeError if stock type is not a number", () => {
            props.stock = {} as any
            const output = sut.validate(props)
            expect(output.value![0].name).toBe("InvalidStockTypeError")
        })

        it("Should return StockNotProvidedError if stock is provided", () => {
            props.stock = undefined as any
            const output = sut.validate(props)
            expect(output.value![0].name).toBe("StockNotProvidedError")
        })

        it("Should return NegativeStockValueError if stock is provided with a negative value", () => {
            props.stock = -1
            const output = sut.validate(props)
            expect(output.value![0].name).toBe("NegativeStockValueError")
        })

        it("Should return InvalidStockSizeError if stock is provided with a size greater than allowed", () => {
            props.stock = 100000001
            const output = sut.validate(props)
            expect(output.value![0].name).toBe("InvalidStockSizeError")
        })
    })

})