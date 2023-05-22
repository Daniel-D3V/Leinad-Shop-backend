import { CreateProductStockNormalUsecaseInterface } from "@/modules/product-stock/domain/usecases/normal"
import { CreateProductStockNormalUsecase } from "./create-product-stock-normal.usecase"
import { ProductStockNormalRepositoryInterface, ProductStockRepositoryInterface } from "@/modules/product-stock/domain/repositories"
import { EventEmitterInterface } from "@/modules/@shared/events"
import { mock } from "jest-mock-extended"
import { ProductStockNormalEntity } from "@/modules/product-stock/domain/entities"

jest.mock("@/modules/product-stock/domain/entities")

describe("Test CreateProductStockNormalUsecase", () => {

    let sut: CreateProductStockNormalUsecase
    let props: CreateProductStockNormalUsecaseInterface.InputDto
    let productStockRepository: ProductStockRepositoryInterface
    let productStockNormalRepository: ProductStockNormalRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let productStockNormalEntity: ProductStockNormalEntity

    beforeEach(() => {
        props = {
            productStockId: "any_product_stock_id"
        }
        productStockRepository = mock<ProductStockRepositoryInterface>()
        jest.spyOn(productStockRepository, "findById").mockResolvedValue(true as any)
        eventEmitter = mock<EventEmitterInterface>()
        productStockNormalRepository = mock<ProductStockNormalRepositoryInterface>()
        
        productStockNormalEntity = mock<ProductStockNormalEntity>()
        jest.spyOn(ProductStockNormalEntity, "create").mockReturnValue({
            isLeft: () => false,
            value: productStockNormalEntity
        } as any)
        sut = new CreateProductStockNormalUsecase(productStockRepository, productStockNormalRepository, eventEmitter)
    })

    it("Should execute the usecase properly",async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBeTruthy()
    })
})