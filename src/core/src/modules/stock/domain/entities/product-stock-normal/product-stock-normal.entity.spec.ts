import { mockDomainValidator } from "@/modules/@shared/tests"
import { ProductStockNormalEntity } from "./product-stock-normal.entity"
import { ProductStockNormalValidatorFactory } from "./validator"
import { DomainValidator } from "@/modules/@shared/domain/validator"

jest.mock("./validator")

describe("Test ProductStockNormalEntity", () => {
    
    let sut: ProductStockNormalEntity
    let props: ProductStockNormalEntity.Input
    let domainValidator: DomainValidator<any>
    let id: string

    const makeSut = (props: ProductStockNormalEntity.Input): ProductStockNormalEntity => {
        const entity = ProductStockNormalEntity.create(props, id)
        if(entity.isLeft()) throw entity.value[0]
        return entity.value
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

    it("Should create a ProductStockNormalEntity", () => {
        const sut = ProductStockNormalEntity.create(props, id)
        if(sut.isLeft()) throw sut.value[0]
        expect(sut.value).toBeInstanceOf(ProductStockNormalEntity)
        expect(sut.value.toJSON()).toMatchObject({
            id,
            stock: 10
        })
    })

    it("Should call domainValidator when creating the entity", () => {
       expect(domainValidator.validate).toHaveBeenCalledTimes(1)
    })

    it("Should return an error if domain validator returns left", () => {
        const validationError = new Error("validation error")
        jest.spyOn(domainValidator, "validate").mockReturnValue({
            isLeft: () => true,
            value: [validationError]
        } as any)
        const sut = ProductStockNormalEntity.create(props, id)
        expect(sut.value).toEqual([ validationError ])
     })


    it("Should get the current stock", () => {
        expect(sut.getCurrentStock()).toBe(10)
    })

    it("Should update the stock", () => {
        expect(sut.getCurrentStock()).toBe(10)
        sut.updateStock(20)
        expect(sut.getCurrentStock()).toBe(20)
    })

    it("Should call validateProps with correct values when updating the stock", () => {
        const ProductStockNormalEntitySpy = jest.spyOn(ProductStockNormalEntity, "validateProps")
        sut.updateStock(20)
        expect(ProductStockNormalEntitySpy).toHaveBeenLastCalledWith({
            stock: 20
        })
    })

    it("Should returns an error if an invalid stock is provided when updating the stock", () => {
        const validationStockError = new Error("validationStockError")
        jest.spyOn(ProductStockNormalEntity, "validateProps")
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