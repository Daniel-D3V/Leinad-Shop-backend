import { EventEmitterInterface } from "@/modules/@shared/events"
import { PersistCreateAnnounceUsecase } from "./persist-create-announce.usecase"
import { PersistCreateAnnounceInputDto } from "./persist-create-announce.dto"
import { AnnounceEntity } from "@/modules/announce/announce-admin/domain/entities"
import { AnnounceRepositoryInterface } from "@/modules/announce/announce-admin/domain/repositories"
import { mock } from "jest-mock-extended"
import { AnnounceCreatedEvent } from "./announce-created.event"

jest.mock("./announce-created.event")

describe("Test PersistCreateAnnounce", () => {

    let sut: PersistCreateAnnounceUsecase
    let props: PersistCreateAnnounceInputDto
    let announceRepository: AnnounceRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let announceEntity: AnnounceEntity

    beforeEach(() => {
        announceRepository = mock<AnnounceRepositoryInterface>()
        eventEmitter = mock<EventEmitterInterface>()
        announceEntity = mock<AnnounceEntity>({ toJSON: () => ({ value: "announceEntityToJsonValue"}) as any })
        jest.spyOn(AnnounceEntity, "create").mockReturnValue({ 
            isLeft: () => false,
            value: announceEntity
        } as any)

        props = {
            title: "any_title",
            description: "any_description",
            price: 10,
            userId: "any_user_id",
            categoryId: "any_category_id",
        }
        sut = new PersistCreateAnnounceUsecase(announceRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
    })

    it("Should return an error if announceEntity returns left", async () => {
        const entityError =  new Error("EntityError")
        jest.spyOn(AnnounceEntity, "create").mockReturnValueOnce({ 
            isLeft: () => true,
            value: [ entityError ]
        } as any)
        const output = await sut.execute(props)
        expect(output.value![0]).toEqual(entityError)
    })

    it("Should call announceRepository.create once", async () => {
        await sut.execute(props)
        expect(announceRepository.create).toHaveBeenCalledTimes(1)
    })

    it("Should call eventEmitter once", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1)
    })

    it("Should create AnnounceCreatedEvent with correct values", async () => {
        await sut.execute(props)
        expect(AnnounceCreatedEvent).toHaveBeenCalledWith({ value: "announceEntityToJsonValue"})
    })

})