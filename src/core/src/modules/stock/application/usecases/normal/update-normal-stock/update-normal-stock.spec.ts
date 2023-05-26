import { ProductStockNormalRepositoryInterface } from "@/modules/stock/domain/repositories"
import { UpdateNormalStockUsecase } from "./update-normal-stock.usecase"
import { EventEmitterInterface } from "@/modules/@shared/events"
import { mock } from "jest-mock-extended"
import { ProductStockNormalEntity } from "@/modules/stock/domain/entities"
import { left } from "@/modules/@shared/logic"
import { ProductStockNormalUpdatedEvent } from "./product-stock-normal-updated.event"
import { UpdateNormalStockUsecaseInterface } from "@/modules/stock/domain/usecases/normal"

jest.mock("./product-stock-normal-updated.event")

describe("Test updateNormalStockUsecase", () => {

    let sut: UpdateNormalStockUsecase
    let props: UpdateNormalStockUsecaseInterface.InputDto
    let productStockNormalRepository: ProductStockNormalRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let productStockNormalEntity: ProductStockNormalEntity

    beforeEach(() => {

        props = {
            productStockId: "any_product_stock_id",
            newStock: 10
        }
        productStockNormalEntity = mock<ProductStockNormalEntity>({
            updateStock: () => ({
                isLeft: () => false
            }),
            id: props.productStockId,
            getCurrentStock: () => props.newStock
        } as any)
        productStockNormalRepository = mock<ProductStockNormalRepositoryInterface>()
        jest.spyOn(productStockNormalRepository, "findById")
            .mockResolvedValue(productStockNormalEntity)
        eventEmitter = mock<EventEmitterInterface>()
        sut = new UpdateNormalStockUsecase(productStockNormalRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
    })

    it("Should return ProductStockNotFoundError if productStock could not be found by the repository", async () => {
        jest.spyOn(productStockNormalRepository, "findById").mockResolvedValue(null)
        const output = await sut.execute(props)
        expect(output.value![0].name).toBe("ProductStockNotFoundError")
    })

    it("Should return an error if productStockNormalEntity updateStock returns an error", async () => {
        const productUpdateError = new Error("ProductUpdateError")
        jest.spyOn(productStockNormalEntity, "updateStock").mockReturnValueOnce(left([productUpdateError]))
        const output = await sut.execute(props)
        expect(output.value![0]).toEqual(productUpdateError)
    })

    it("Should call productStockNormalEntity.updateStock with correct values", async () => {
        const productStockNormalEntitySpy = jest.spyOn(productStockNormalEntity, "updateStock")
        await sut.execute(props)
        expect(productStockNormalEntitySpy).toHaveBeenCalledWith(props.newStock)
    })

    it("Should call productStockNormalRepository.update once", async () => {
        await sut.execute(props)
        expect(productStockNormalRepository.findById).toHaveBeenCalledTimes(1)
    })

    it("Should call eventEmitter once", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1)
    })

    it("Should create productStockNormalUpdatedEvent with correct values", async () => {
        await sut.execute(props)
        expect(ProductStockNormalUpdatedEvent).toHaveBeenCalledWith(props)
    })


})