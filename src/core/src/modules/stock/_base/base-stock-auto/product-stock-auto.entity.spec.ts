import { BaseStockAutoEntity } from "./product-stock-auto.entity"

class BaseStockAutoEntitySpy extends BaseStockAutoEntity<any> {
    
    constructor(props: BaseStockAutoEntity.Props, id?: string){
        super({ value: "any_value" }, id)
    }

    toJSON(): Record<string, unknown> {
        return {}
    }
}

describe("Test BaseStockAutoEntity", () => {

    let sut: BaseStockAutoEntity<any>
    let props: BaseStockAutoEntity.Props
    let id: string

    const makeSut = (input: BaseStockAutoEntity.Props): BaseStockAutoEntity<any> => {
        const entity = new BaseStockAutoEntitySpy(input, id)
        return entity
    }
    
    beforeEach(() => {
        id = "any_id"
        props = {
            value: "any_value",
        }
        sut = makeSut(props)
    })

    it("Should create a BaseStockAutoEntity", () => {
        const sut = makeSut(props)
        expect(sut.id).toBe(id)
        expect(sut.getValue()).toBe(props.value)
    })

    it("Should get the value", () => {
        expect(sut.getValue()).toBe("any_value")
    })

    it("Should change the value", () => {
        expect(sut.getValue()).toBe("any_value")
        sut.changeValue("new_value")
        expect(sut.getValue()).toBe("new_value")
    })


    it("Should call the validator with correct values when changeValue method is called", () => {
        const productStockAutoEntitySpy = jest.spyOn(BaseStockAutoEntity, "validateProps")
        const newValue = "new_value"
        sut.changeValue(newValue)
        expect(productStockAutoEntitySpy).toHaveBeenLastCalledWith({ value: newValue  })
    })
})