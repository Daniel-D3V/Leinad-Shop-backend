import { mock } from "jest-mock-extended"
import { StockAutoGatewayInterface } from "../../../domain/gateways"
import { ConsultStockAutoAvailabilityUsecase } from "./consult-stock-auto-availability.usecase"
import { ConsultStockAutoAvailabilityUsecaseInterface } from "../../../domain/usecases"

describe("Test ConsultStockAutoAvailabilityUsecase", () => {

    let sut: ConsultStockAutoAvailabilityUsecase
    let props: ConsultStockAutoAvailabilityUsecaseInterface.InputDto
    let stockAutoGateway: StockAutoGatewayInterface
    

    beforeEach(() => {
        props = {
            announceId: "any_announce_id"
        }
        stockAutoGateway = mock<StockAutoGatewayInterface>()
        sut = new ConsultStockAutoAvailabilityUsecase(stockAutoGateway)
    })

    it("Should call stockAutoGateway.getStockAutoCount once", async () => {
        await sut.execute(props)
        expect(stockAutoGateway.getStockAutoCount).toHaveBeenCalledTimes(1)
    })
})