import { ProductStockAutoEntity } from "./product-stock-auto.entity"



describe("Test ProductStockAutoEntity", () => {

    let sut: ProductStockAutoEntity
    let props: ProductStockAutoEntity.Input
    let id: string

    const makeSut = (input: ProductStockAutoEntity.Input): ProductStockAutoEntity => {
        jest.spyOn(ProductStockAutoEntity, "validateProps")
        .mockReturnValue({
            isLeft: () => false
        } as any)
        const entity = ProductStockAutoEntity.create(input, id)
        if(entity.isLeft()) throw entity.value[0]
        return entity.value
    }
    
    beforeEach(() => {
        id = "any_id"
        props = {
            value: "any_value"
        }
        sut = makeSut(props)
    })

    it("Should create a ProductStockAutoEntity", () => {
        const sut = makeSut(props)
        expect({...sut.toJSON()}).toMatchObject({
            id,
            value: props.value,
        })
    })

    it("Should get the value", () => {
        expect(sut.getValue()).toBe("any_value")
    })

    it("Should change the value", () => {
        expect(sut.getValue()).toBe("any_value")
        sut.changeValue("new_value")
        expect(sut.getValue()).toBe("new_value")
    })

    it("Should not change the value if the validator returns left", () => {
        const validatorError = new Error("ValidatorError")
        jest.spyOn(ProductStockAutoEntity, "validateProps")
        .mockReturnValueOnce({
            isLeft: () => true,
            value: [ validatorError ]
        } as any)
        const output = sut.changeValue("new_value")
        expect(output.value).toEqual([ validatorError ])
    })

    it("Should call the validator with correct values when changeValue method is called", () => {
        const productStockAutoEntitySpy = jest.spyOn(ProductStockAutoEntity, "validateProps")
        const newValue = "new_value"
        sut.changeValue(newValue)
        expect(productStockAutoEntitySpy).toHaveBeenLastCalledWith({ value: newValue  })
    })
})