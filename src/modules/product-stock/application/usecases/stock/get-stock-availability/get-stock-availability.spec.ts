import { ProductStockRepositoryInterface } from "@/modules/product-stock/domain/repositories"
import { GetStokAvailabilityInputDto } from "./get-stock-availability.dto"
import { GetStockAvailabilityUsecase } from "./get-stock-availability.usecase"
import { mock } from "jest-mock-extended"
import { ProductStockEntity } from "@/modules/product-stock/domain/entities"
import { ProductStockGatewayInterface } from "@/modules/product-stock/domain/gateway"


describe("Test GetStockAvailabilityUsecase", () => {

    let sut: GetStockAvailabilityUsecase
    let props: GetStokAvailabilityInputDto
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
})