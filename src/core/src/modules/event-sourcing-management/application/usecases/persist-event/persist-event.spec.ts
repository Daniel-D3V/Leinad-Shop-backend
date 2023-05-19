import { mock } from "jest-mock-extended"
import { PersistEventUsecase } from "./persist-event.usecase"
import { EventRepositoryInterface } from "@/modules/event-sourcing-management/domain/repositories"
import { PersistEventUsecaseInterface } from "@/modules/event-sourcing-management/domain/usecases"

describe("Test PersistEvent", () => {

    let sut: PersistEventUsecase
    let props: any
    let eventRepository: EventRepositoryInterface

    beforeEach(() => {
        props = {

        }
    eventRepository = mock<EventRepositoryInterface>()
        sut = new PersistEventUsecase(eventRepository)
    })

    it("Should execute the usecase", async () => {
        const result = await sut.execute(props)
        expect(result.isRight()).toBe(true)
    })

    it("Should call the repository with correct value", async () => {
        await sut.execute(props)
        expect(eventRepository.persitEvent).toBeCalledTimes(1)
        expect(eventRepository.persitEvent).toBeCalledWith(props)
    })
})