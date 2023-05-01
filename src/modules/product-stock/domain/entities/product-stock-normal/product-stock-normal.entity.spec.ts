import { ProductStockNormalEntity } from "./product-stock-normal.entity"


describe("Test ProductStockNormalEntity", () => {
    
    let sut: ProductStockNormalEntity
    let props: ProductStockNormalEntity.Input
    let id: string

    const makeSut = (props: ProductStockNormalEntity.Input): ProductStockNormalEntity => {
        const entity = ProductStockNormalEntity.create(props, id)
        if(entity.isLeft()) throw entity.value[0]
        return entity.value
    }

    beforeEach(() => {
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
})