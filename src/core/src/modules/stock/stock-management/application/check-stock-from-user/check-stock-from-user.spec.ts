import { GetUserIdByAnnounceIdFacadeFactory } from "@/modules/announce/announce-admin/factories";
import { CheckStockFromUserUsecase } from "./check-stock-from-user.usecase";
import { CheckStockFromUserUsecaseInterface } from "@/modules/stock/stock-management/domain/usecases";
import { mock } from "jest-mock-extended";
import { StockManagementRepositoryInterface } from "../../domain/repositories";

jest.mock("@/modules/announce/announce-admin/factories")


describe("Test CheckStockFromUserUsecase", () => {

    let sut: CheckStockFromUserUsecase
    let props: CheckStockFromUserUsecaseInterface.InputDto
    let stockManagementRepository: StockManagementRepositoryInterface

    beforeEach(() => {

        props = {
            productStockId: "any_product_stock_id",
            userId: "any_user_id"
        }
        stockManagementRepository = mock<StockManagementRepositoryInterface>({
            findById: async () => ({ id: "any_id" }) as any
        })
        jest.spyOn(GetUserIdByAnnounceIdFacadeFactory, 'create').mockReturnValue({
            execute: async () => props.userId
        })
        sut = new CheckStockFromUserUsecase(stockManagementRepository)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
    })

    it("Should return ProductStockNotFoundError if productStock not found", async () => {
        jest.spyOn(stockManagementRepository, 'findById').mockResolvedValueOnce(null)
        const output = await sut.execute(props)
        if (output.isRight()) throw new Error('This test should return an error')
        expect(output.isLeft()).toBe(true)
        expect(output.value[0].name).toBe("ProductStockNotFoundError")
    })

    it("Should call GetUserIdByAnnounceIdFacadeFactory.create once", async () => {
        await sut.execute(props)
        expect(GetUserIdByAnnounceIdFacadeFactory.create).toBeCalledTimes(1)
    })

    it("Should return ProductStockNotFromUserError if user is not the owner of the productStock", async () => {
        jest.spyOn(GetUserIdByAnnounceIdFacadeFactory, 'create').mockReturnValue({
            execute: async () => "another_user_id"
        })
        const output = await sut.execute(props)
        if (output.isRight()) throw new Error('This test should return an error')
        expect(output.isLeft()).toBe(true)
        expect(output.value[0].name).toBe("ProductStockNotFromUserError")
    })


})