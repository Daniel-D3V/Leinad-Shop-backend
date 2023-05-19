import { mock } from "jest-mock-extended"
import { EventRepositoryInterface } from "../../domain/repositories"
import { PersistEventUsecase } from "./persist-event.usecase"

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