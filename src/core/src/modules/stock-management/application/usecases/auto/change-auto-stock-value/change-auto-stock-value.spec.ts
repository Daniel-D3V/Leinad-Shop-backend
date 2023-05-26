import { ProductStockAutoRepositoryInterface } from "@/modules/product-stock/domain/repositories"
import { ChangeAutoStockValueUsecase } from "./change-auto-stock-value.usecase"
import { EventEmitterInterface } from "@/modules/@shared/events"
import { ProductStockAutoEntity } from "@/modules/product-stock/domain/entities"
import { mock } from "jest-mock-extended"
import { ProductStockAutoValueChangedEvent } from "./product-stock-auto-value-changed.event"
import { ChangeAutoStockValueUsecaseInterface } from "@/modules/product-stock/domain/usecases"

jest.mock("./product-stock-auto-value-changed.event")

describe("Test ChangeAutoStockValueUsecase", () => {

    let sut: ChangeAutoStockValueUsecase
    let props: ChangeAutoStockValueUsecaseInterface.InputDto
    let productStockAutoRepository: ProductStockAutoRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let productStockAutoEntity: ProductStockAutoEntity

    beforeEach(() => {
        props = {
            productStockAutoId: "any_id",
            value: "any_value"
        }
        productStockAutoEntity = mock<ProductStockAutoEntity>({
            id: props.productStockAutoId,
            getValue: () => props.value
        })
        productStockAutoRepository = mock<ProductStockAutoRepositoryInterface>()
        jest.spyOn(productStockAutoRepository, "findById").mockResolvedValue(productStockAutoEntity)
        eventEmitter = mock<EventEmitterInterface>()
        sut = new ChangeAutoStockValueUsecase(productStockAutoRepository, eventEmitter)
    })

    it("Should execute the usecaes properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
    })

    it("Should return ProductStockNotFoundError if the repository can not find the entity", async () => {
        jest.spyOn(productStockAutoRepository, "findById").mockResolvedValue(null)
        const output = await sut.execute(props)
        expect(output.value![0].name).toBe("ProductStockNotFoundError")
    })

    it("Should call changeValue from productStockAutoEntity once ", async () => {
        await sut.execute(props)
        expect(productStockAutoEntity.changeValue).toHaveBeenCalledTimes(1)
    })

    it("Should call productStockAutoRepository.update", async () => {
        await sut.execute(props)
        expect(productStockAutoRepository.update).toHaveBeenCalledTimes(1)
        expect(productStockAutoRepository.update).toHaveBeenCalledWith(productStockAutoEntity)
    })

    it("Should call eventEmitter once", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1)
    })

    it("Should create productStockAutoValueChangedEvent with correct value", async () => {
        await sut.execute(props)
        expect(ProductStockAutoValueChangedEvent).toHaveBeenCalledWith(props)
    })
})