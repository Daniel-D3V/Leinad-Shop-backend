import { mock } from "jest-mock-extended"
import { StockNormalRepositoryInterface } from "../../../domain/repositories"
import { ConsultStockAvailabilityByAnnounceIdUsecaseInterface } from "../../../domain/usecases"
import { ConsultStockAvailabilityByAnnounceIdUsecase } from "./consult-stock-availability-by-announce-id.usecase"
import { StockNormalEntity } from "../../../domain/entities"


describe('Test ConsultStockAvailabilityByAnnounceIdUsecase', () => { 

    let sut: ConsultStockAvailabilityByAnnounceIdUsecase
    let props: ConsultStockAvailabilityByAnnounceIdUsecaseInterface.InputDto
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
        sut = new ConsultStockAvailabilityByAnnounceIdUsecase(stockNormalRepository)
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