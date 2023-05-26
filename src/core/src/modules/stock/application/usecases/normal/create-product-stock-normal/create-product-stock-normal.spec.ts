import { CreateProductStockNormalUsecaseInterface } from "@/modules/stock/domain/usecases/normal"
import { CreateProductStockNormalUsecase } from "./create-product-stock-normal.usecase"
import { ProductStockNormalRepositoryInterface, ProductStockRepositoryInterface } from "@/modules/stock/domain/repositories"
import { EventEmitterInterface } from "@/modules/@shared/events"
import { mock } from "jest-mock-extended"
import { ProductStockNormalEntity } from "@/modules/stock/domain/entities"
import { ProductStockNormalCreatedEvent } from "./product-stock-normal-created.event"


jest.mock("./product-stock-normal-created.event")
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

        productStockNormalEntity = mock<ProductStockNormalEntity>({
            id: "any_id",
            getCurrentStock: () => 0
        })
        jest.spyOn(ProductStockNormalEntity, "create").mockReturnValue({
            isLeft: () => false,
            value: productStockNormalEntity
        } as any)
        sut = new CreateProductStockNormalUsecase(productStockRepository, productStockNormalRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBeTruthy()
    })

    it("Should return ProductStockNotFoundError if product stock does not exists", async () => {
        jest.spyOn(productStockRepository, "findById").mockResolvedValueOnce(null)
        const output = await sut.execute(props)
        if (output.isRight()) throw new Error("Should not be right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("ProductStockNotFoundError")
    })

    it("Should return ProductStockNormalAlreadyCreatedError if product stock normal already exists", async () => {
        jest.spyOn(productStockNormalRepository, "findById").mockResolvedValueOnce(true as any)
        const output = await sut.execute(props)
        if (output.isRight()) throw new Error("Should not be right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("ProductStockNormalAlreadyCreatedError")
    })

    it("Should call create from productStockNormalRepository", async () => {
        await sut.execute(props)
        expect(productStockNormalRepository.create).toBeCalledTimes(1)
    })

    it("Should call emit from eventEmitter once", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toBeCalledTimes(1)
    })

    it("Should call productStockNormalRepository.create once", async () => {
        await sut.execute(props)
        expect(productStockNormalRepository.create).toBeCalledTimes(1)
    })

    it("Should create a ProductStockNormalCreatedEvent with correct values", async () => {
        await sut.execute(props)
        expect(ProductStockNormalCreatedEvent).toHaveBeenCalledWith(expect.objectContaining({
            id: productStockNormalEntity.id,
            stock: productStockNormalEntity.getCurrentStock()
        }))
    })

})