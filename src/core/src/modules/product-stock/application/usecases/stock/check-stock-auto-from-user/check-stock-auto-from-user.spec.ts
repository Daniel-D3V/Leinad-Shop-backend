import { CheckStockAutoFromUserUsecaseInterface } from "@/modules/product-stock/domain/usecases"
import { CheckStockAutoFromUserUsecase } from "./check-stock-auto-from-user.usecase"
import { ProductStockAutoRepositoryInterface, ProductStockRepositoryInterface } from "@/modules/product-stock/domain/repositories"
import { GetUserIdByAnnounceIdFacadeFactory } from "@/modules/announce/announce-admin/factories";
import { mock } from "jest-mock-extended";

jest.mock("@/modules/announce/announce-admin/factories")

describe('Test CheckStockAutoFromUserUsecase', () => { 

    let sut: CheckStockAutoFromUserUsecase
    let props: CheckStockAutoFromUserUsecaseInterface.InputDto
    let productStockAutoRepository: ProductStockAutoRepositoryInterface
    let productStockId: string

    beforeEach(() => {
        props = {
            productStockAutoId: "any_product_stock_auto_id",
            userId: "any_user_id"
        }
        productStockId = "any_product_stock_id"
        productStockAutoRepository = mock<ProductStockAutoRepositoryInterface>({
            findById: async () => ({ productStockId }) as any
        })
        jest.spyOn(GetUserIdByAnnounceIdFacadeFactory, 'create').mockReturnValue({
            execute: async () => props.userId
         })
        sut = new CheckStockAutoFromUserUsecase(productStockAutoRepository)
    })

    it('Should execute the usecase properly',async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
    })

    it('Should return ProductStockAutoNotFoundError if productStockAuto not found',async () => {
        jest.spyOn(productStockAutoRepository, 'findById').mockResolvedValueOnce(null)
        const output = await sut.execute(props)
        if(output.isRight()) throw new Error('This test should return an error')
        expect(output.isLeft()).toBe(true)
        expect(output.value[0].name).toBe("ProductStockAutoNotFoundError")
    })

    it('Should return true if userId is equal to announceUserId',async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
        expect(output.value).toBe(true)
    })

    it('Should return false if userId is not equal to announceUserId',async () => {
        props.userId = "any_user_id"
        jest.spyOn(GetUserIdByAnnounceIdFacadeFactory, 'create').mockReturnValue({
            execute: async () => "any_announce_user_id"
         })
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
        expect(output.value).toBe(false)
    })

    it("Should call GetUserIdByAnnounceIdFacadeFactory.create once", async () => {
        await sut.execute(props)
        expect(GetUserIdByAnnounceIdFacadeFactory.create).toBeCalledTimes(1)
    })

})