import { ProductStockAutoRepositoryInterface } from "@/modules/product-stock/domain/repositories"
import { DeleteAutoStockInputDto } from "./delete-auto-stock.dto"
import { DeleteAutoStockUsecase } from "./delete-auto-stock.usecase"
import { EventEmitterInterface } from "@/modules/@shared/events"
import { mock } from "jest-mock-extended"
import { ProductStockAutoDeletedEvent } from "./product-stock-auto-deleted.event"

jest.mock("./product-stock-auto-deleted.event")

describe("Test DeleteAutoStockUsecase", () => {

    let sut: DeleteAutoStockUsecase
    let props: DeleteAutoStockInputDto
    let productStockAutoRepository: ProductStockAutoRepositoryInterface
    let eventEmitter: EventEmitterInterface

    beforeEach(() => {
        props = {
            productStockId: "any_id"
        }
        productStockAutoRepository = mock<ProductStockAutoRepositoryInterface>()
        eventEmitter = mock<EventEmitterInterface>()
        sut = new DeleteAutoStockUsecase(productStockAutoRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
    })

    it("Should call productStockAutoRepository.delete once", async () => {
        await sut.execute(props)
        expect(productStockAutoRepository.delete).toHaveBeenCalledTimes(1)
    })

    it("Should call eventEmitter once", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1)
    })

    it("Should create productStockAutoDeletedEvent with correct values", async () => {
        await sut.execute(props)
        expect(ProductStockAutoDeletedEvent).toHaveBeenCalledWith(props)
    })
})