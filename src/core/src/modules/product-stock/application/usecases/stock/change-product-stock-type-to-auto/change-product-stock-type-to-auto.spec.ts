import { EventEmitterInterface } from "@/modules/@shared/events"
import { ProductStockEntity } from "@/modules/product-stock/domain/entities"
import { ProductStockRepositoryInterface } from "@/modules/product-stock/domain/repositories"
import { ChangeProductStockTypeToAutoUsecaseInterface } from "@/modules/product-stock/domain/usecases"
import { mock } from "jest-mock-extended"
import { ChangeProductStockTypeToAutoUsecase } from "./change-product-stock-type-to-auto.usecase"
import { ProductStockTypeChangedToAutoEvent } from "./product-stock-type-changed-to-auto.event"

jest.mock("./product-stock-type-changed-to-auto.event")

describe("Test ChangeProductStockTypeToAutoUsecaseInterface", () => {


    let sut: ChangeProductStockTypeToAutoUsecaseInterface
    let props: ChangeProductStockTypeToAutoUsecaseInterface.InputDto
    let productStockRepository: ProductStockRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let productStockEntity: ProductStockEntity

    beforeEach(() => {

        props = {
            productStockId: "any_product_stock_id"
        }
        eventEmitter = mock<EventEmitterInterface>()
        productStockEntity = mock<ProductStockEntity>({
            id: props.productStockId,
            isStockAuto: () => false,
        })
        productStockRepository = mock<ProductStockRepositoryInterface>({
            findById: () => productStockEntity
        } as any)
        
        sut = new ChangeProductStockTypeToAutoUsecase(productStockRepository, eventEmitter)
    })

    it("Should execute the usecase properly",async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBeTruthy()
    })

    it("Should return ProductStockNotFoundError if product stock does not exists",async () => {
        jest.spyOn(productStockRepository, "findById").mockResolvedValueOnce(null)
        const output = await sut.execute(props)
        if(output.isRight()) throw new Error("Should not be right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("ProductStockNotFoundError")
    })

    it("Should return ProductStockAlreadyIsAutoError if product stock is already auto",async () => {
        jest.spyOn(productStockEntity, "isStockAuto").mockReturnValueOnce(true)
        const output = await sut.execute(props)
        if(output.isRight()) throw new Error("Should not be right")
        expect(output.isLeft()).toBeTruthy()
        expect(output.value[0].name).toBe("ProductStockAlreadyIsAutoError")
    })

    it("Should call toStockAuto from productStockEntity",async () => {
        await sut.execute(props)
        expect(productStockEntity.toStockAuto).toBeCalledTimes(1)
    })

    it("Should call productStockRepository.update once", async () => {
        await sut.execute(props)
        expect(productStockRepository.update).toBeCalledTimes(1)
    })

    it("Should call eventEmitter.emit once", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toBeCalledTimes(1)
    })

    it("Should create ProductStockTypeChangedToAutoEvent with correct values", async () => {
        await sut.execute(props)
        expect(ProductStockTypeChangedToAutoEvent).toBeCalledWith(props)
    })

})