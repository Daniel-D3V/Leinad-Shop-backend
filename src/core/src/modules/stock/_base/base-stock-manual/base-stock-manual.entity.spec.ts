import { mockDomainValidator } from "@/modules/@shared/tests"
import { ProductStockNormalValidatorFactory } from "./validator"
import { DomainValidator } from "@/modules/@shared/domain/validator"
import { BaseStockManualEntity } from "./base-stock-manual.entity"

jest.mock("./validator")

class BaseStockNormalEntitySpy extends BaseStockManualEntity<any> {
    toJSON(): Record<string, unknown> {
        return {}
    }
}

describe("Test BaseStockNormalEntity", () => {
    
    let sut: BaseStockManualEntity<any>
    let props: BaseStockManualEntity.Input
    let domainValidator: DomainValidator<any>
    let id: string

    const makeSut = (props: BaseStockManualEntity.Input): BaseStockManualEntity<any> => {
        const entity = new BaseStockNormalEntitySpy(props, id)
        return entity         
    }                                                                

    beforeEach(() => {
        domainValidator = mockDomainValidator()
        jest.spyOn(ProductStockNormalValidatorFactory, "create").mockReturnValue(domainValidator)
        id = "any_id"
        props = {
            stock: 10
        }
        sut = makeSut(props)
    })

    it("Should create a BaseStockNormalEntity", () => {
        const sut = new BaseStockNormalEntitySpy(props, id)
        expect(sut).toBeInstanceOf(BaseStockManualEntity)
        expect(sut.id).toBe(id)
        expect(sut.getCurrentStock()).toBe(10)
    })

    // it("Should call domainValidator when creating the entity", () => {
    //    expect(domainValidator.validate).toHaveBeenCalledTimes(1)
    // })

    // it("Should return an error if domain validator returns left", () => {
    //     const validationError = new Error("validation error")
    //     jest.spyOn(domainValidator, "validate").mockReturnValue({
    //         isLeft: () => true,
    //         value: [validationError]
    //     } as any)
    //     const sut = new BaseStockNormalEntity(props, id)
    //     expect(sut).toEqual([ validationError ])
    //  })


    it("Should get the current stock", () => {
        expect(sut.getCurrentStock()).toBe(10)
    })

    it("Should update the stock", () => {
        expect(sut.getCurrentStock()).toBe(10)
        sut.updateStock(20)
        expect(sut.getCurrentStock()).toBe(20)
    })

    it("Should call validateProps with correct values when updating the stock", () => {
        const ProductStockNormalEntitySpy = jest.spyOn(BaseStockManualEntity, "validateProps")
        sut.updateStock(20)
        expect(ProductStockNormalEntitySpy).toHaveBeenLastCalledWith({
            stock: 20
        })
    })

    it("Should returns an error if an invalid stock is provided when updating the stock", () => {
        const validationStockError = new Error("validationStockError")
        jest.spyOn(BaseStockManualEntity, "validateProps")
        .mockReturnValueOnce({ isLeft: () => true, value: [ validationStockError ] } as any)
        const output = sut.updateStock(20)
        expect(output.value).toEqual([ validationStockError ])
    })

    it("Should decrease the stock", () => {
        expect(sut.getCurrentStock()).toBe(10)
        sut.decreaseOne()
        expect(sut.getCurrentStock()).toBe(9)
        sut.decreaseOne()
        expect(sut.getCurrentStock()).toBe(8)
    })
})