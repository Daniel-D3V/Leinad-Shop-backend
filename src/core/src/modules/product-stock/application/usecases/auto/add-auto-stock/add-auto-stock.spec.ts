import { ProductStockAutoRepositoryInterface } from "@/modules/product-stock/domain/repositories"
import { AddAutoStockUsecase } from "./add-auto-stock.usecase"
import { EventEmitterInterface } from "@/modules/@shared/events"
import { mock } from "jest-mock-extended"
import { ProductStockAutoEntity } from "@/modules/product-stock/domain/entities"
import { ProductStockAutoAddedEvent } from "./product-stock-auto-added.event"
import { AddAutoStockUsecaseInterface } from "@/modules/product-stock/domain/usecases"

jest.mock("./product-stock-auto-added.event")
jest.mock("@/modules/product-stock/domain/entities")

describe("test AddAutoStockUsecase", () => {

    let sut: AddAutoStockUsecase
    let props: AddAutoStockUsecaseInterface.InputDto
    let productStockAutoRepository: ProductStockAutoRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let productStockAutoEntity: ProductStockAutoEntity

    beforeEach(() => {
        props = { 
            value: "any_value",
            productStockId: "any_product_stock_Id"
        }
        productStockAutoEntity = mock<ProductStockAutoEntity>({
            id: "any_id",
            getValue: () => props.value
        })
        jest.spyOn(ProductStockAutoEntity, "create")
        .mockReturnValue({
            isLeft: () => false,
            value: productStockAutoEntity
        } as any)
        productStockAutoRepository = mock<ProductStockAutoRepositoryInterface>()
        eventEmitter = mock<EventEmitterInterface>()
        sut = new AddAutoStockUsecase(productStockAutoRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
    })

    it("Should return an error if productStockAutoEntity returns an error on its creation", async () => {
        const entityError = new Error("EntityError")
        jest.spyOn(ProductStockAutoEntity, "create")
        .mockReturnValue({
            isLeft: () => true,
            value: [ entityError ]
        } as any)
        const output = await sut.execute(props)
        if(output.isRight()) throw new Error("Should not return right")
        expect(output.value![0]).toEqual(entityError)
    })

    it("Should call productStockAutoRepository.create once", async () => {
        await sut.execute(props)
        expect(productStockAutoRepository.create).toHaveBeenCalledTimes(1)
    })

    it("Should create ProductStockAutoAddedEvent with correct values", async () => {
        await sut.execute(props)
        expect(ProductStockAutoAddedEvent).toHaveBeenCalledWith({
            productStockId: productStockAutoEntity.id,
            value: productStockAutoEntity.getValue()
        })
    })
})