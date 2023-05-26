import { ProductStockRepositoryInterface } from "@/modules/product-stock/domain/repositories"
import { GetStockAvailabilityUsecase } from "./get-stock-availability.usecase"
import { mock } from "jest-mock-extended"
import { ProductStockEntity } from "@/modules/product-stock/domain/entities"
import { ProductStockGatewayInterface } from "@/modules/product-stock/domain/gateway"
import { GetStockAvailabilityUsecaseInterface } from "@/modules/product-stock/domain/usecases"


describe("Test GetStockAvailabilityUsecase", () => {

    let sut: GetStockAvailabilityUsecase
    let props: GetStockAvailabilityUsecaseInterface.InputDto
    let productStockRepository: ProductStockRepositoryInterface
    let productStockGateway: ProductStockGatewayInterface
    let productStockEntity: ProductStockEntity

    beforeEach(() => {
        props = {
            productStockId: "any_id"
        }
        productStockEntity = mock<ProductStockEntity>()
        productStockRepository = mock<ProductStockRepositoryInterface>()
        jest.spyOn(productStockRepository, "findById").mockResolvedValue(productStockEntity)
        productStockGateway = mock<ProductStockGatewayInterface>()
        sut = new GetStockAvailabilityUsecase(productStockRepository, productStockGateway)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
    })

    it("Should return ProductStockNotFoundError if the repository does not find a productStockEntity", async () => {
        jest.spyOn(productStockRepository, "findById").mockResolvedValue(null)
        const output = await sut.execute(props)
        if(output.isRight()) throw new Error("Should not be right")
        expect(output.value[0].name).toBe("ProductStockNotFoundError")
    })

    it("Should call productStockGateway.getProductStockNormalCount if the stockType is normal", async () => {
        jest.spyOn(productStockEntity, "isStockNormal").mockReturnValue(true)
        await sut.execute(props)
        expect(productStockGateway.getProductStockNormalCount).toHaveBeenCalledTimes(1)
    })

    it("Should return the right values is stockType is normal", async () => {
        jest.spyOn(productStockEntity, "isStockNormal").mockReturnValue(true)
        jest.spyOn(productStockGateway, "getProductStockNormalCount").mockResolvedValue(10)
        const output = await sut.execute(props)
        if(output.isLeft()) throw output.value[0]
        expect(output.value.stockCount).toBe(10)
    })

    it("Should return the right values is stockType is normal", async () => {
        jest.spyOn(productStockEntity, "isStockAuto").mockReturnValue(true)
        jest.spyOn(productStockGateway, "getProductStockAutoCount").mockResolvedValue(10)
        const output = await sut.execute(props)
        if(output.isLeft()) throw output.value[0]
        expect(output.value.stockCount).toBe(10)
    })


    it("Should call productStockGateway.getProductStockAutoCount if the stockType is auto", async () => {
        jest.spyOn(productStockEntity, "isStockAuto").mockReturnValue(true)
        await sut.execute(props)
        expect(productStockGateway.getProductStockAutoCount).toHaveBeenCalledTimes(1)
    })
})