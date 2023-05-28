import { mock } from "jest-mock-extended"
import { StockNormalRepositoryInterface } from "../../../domain/repositories"
import { ConsultStockNormalAvailabilityByAnnounceIdUsecaseInterface } from "../../../domain/usecases"
import { ConsultStockNormalAvailabilityByAnnounceIdUsecase } from "./consult-stock-normal-availability-by-announce-id.usecase"
import { StockNormalEntity } from "../../../domain/entities"


describe('Test ConsultStockAvailabilityByAnnounceIdUsecase', () => { 

    let sut: ConsultStockNormalAvailabilityByAnnounceIdUsecase
    let props: ConsultStockNormalAvailabilityByAnnounceIdUsecaseInterface.InputDto
    let stockNormalRepository: StockNormalRepositoryInterface
    let stockNormalEntity: StockNormalEntity

    beforeEach(() => {
        props = {
            announceId: "any_announce_id"
        }
        stockNormalEntity = mock<StockNormalEntity>()
        stockNormalRepository = mock<StockNormalRepositoryInterface>({
            findByAnnounceId: async () => stockNormalEntity
        })
        sut = new ConsultStockNormalAvailabilityByAnnounceIdUsecase(stockNormalRepository)
    })

    it("Should execute the usecase properly",async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
    })

    it("Should return StockNormalNotFoundError if stockNormalEntity could not be found", async() => {
        jest.spyOn(stockNormalRepository, "findByAnnounceId")
        .mockResolvedValueOnce(null)
        const output = await sut.execute(props)
        if(output.isRight()) return fail("Should not be right")
        expect(output.value[0].name).toBe("StockNormalNotFoundError")
    })

    it("Should call getCurrentStock once",async () => {
        const output = await sut.execute(props)
        expect(stockNormalEntity.getCurrentStock).toHaveBeenCalledTimes(1)
    })

})