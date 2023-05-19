import { RegisterEventConsumptionUsecaseInterface } from "@/modules/event-sourcing-management/domain/usecases"
import { RegisterEventConsumptionUsecase } from "./register-event-consumption.usecase"
import { EventConsumerRepoitoryInterface } from "@/modules/event-sourcing-management/domain/repositories"
import { mock } from "jest-mock-extended"

describe('Test RegisterEventConsumptionUsecase', () => { 

    let sut: RegisterEventConsumptionUsecase
    let props: RegisterEventConsumptionUsecaseInterface.InputDto
    let consumerRepository: EventConsumerRepoitoryInterface

    beforeEach(() => {
        props = {
            consumerName: 'consumerName',
            eventId: 'eventId'
        }
        consumerRepository = mock<EventConsumerRepoitoryInterface>()
        jest.spyOn(consumerRepository, "findConsumption").mockResolvedValue(null)
        sut = new RegisterEventConsumptionUsecase(consumerRepository)
    })

    it('should return right with null when consumption is registered', async () => {
        const result = await sut.execute(props)
        expect(result.isRight()).toBe(true)
        expect(result.value).toBeNull()
    })

    it('should return left with ConsumptionAlreadyRegisteredError when consumption already exists', async () => {
        jest.spyOn(consumerRepository, "findConsumption").mockResolvedValueOnce(true as any)
        const result = await sut.execute(props)
        expect(result.isLeft()).toBe(true)
        expect(result.value![0].name).toEqual("ConsumptionAlreadyRegisteredError")
    })

    it('should call consumerRepository.findConsumption with correct params', async () => {
        await sut.execute(props)
        expect(consumerRepository.findConsumption).toBeCalledWith(props.consumerName, props.eventId)
    })

    it('should call consumerRepository.registerConsumption with correct params', async () => {
        await sut.execute(props)
        expect(consumerRepository.registerConsumption).toHaveBeenCalledTimes(1)
        expect(consumerRepository.registerConsumption).toBeCalledWith(props.consumerName, props.eventId)
    })


})