import { AnnounceRepositoryInterface } from "@/modules/announce/announce-admin/domain/repositories"
import { EventEmitterInterface } from "@/modules/@shared/events"
import { mock } from "jest-mock-extended"
import { PersistUpdateAnnounceUsecase } from "./persist-update-announce.usecase"
import { PersistUpdateAnnounceInputDto } from "./persist-update-announce.dto"
import { AnnounceEntity } from "@/modules/announce/announce-admin/domain/entities"
import { AnnounceUpdatedEvent } from "./announce-updated.event"

jest.mock("./announce-updated.event")

describe("Test PersistUpdateAnnounceUsecase", () => {

    let sut: PersistUpdateAnnounceUsecase
    let props: PersistUpdateAnnounceInputDto
    let announceRepository: AnnounceRepositoryInterface 
    let eventEmitter: EventEmitterInterface
    let announceEntity: AnnounceEntity

    beforeEach(() => {

        props = {
            announceId: "any_announce_id",
            data: {
                
            }
        }
        announceEntity = mock<AnnounceEntity>()
        announceRepository = mock<AnnounceRepositoryInterface>()
        jest.spyOn(announceRepository, "findById").mockResolvedValue(announceEntity)
        eventEmitter = mock<EventEmitterInterface>()
        sut = new PersistUpdateAnnounceUsecase(announceRepository, eventEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
    })

    it("Should return AnnounceNotFoundError if announceEntity could not be found on the repository", async () => {
        jest.spyOn(announceRepository, "findById").mockResolvedValue(null)
        const output = await sut.execute(props)
        expect(output.value![0].name).toBe("AnnounceNotFoundError")
    })

    it("Should call eventEmitter once", async () => {
        await sut.execute(props)
        expect(eventEmitter.emit).toHaveBeenCalledTimes(1)
    })

    it("Should call announceRepository.update once", async () => {
        await sut.execute(props)
        expect(announceRepository.update).toHaveBeenCalledTimes(1)
    })

    it("Should create AnnounceUpdatedEvent with correct values", async () => {
        await sut.execute(props)
        expect(AnnounceUpdatedEvent).toHaveBeenCalledWith(props)
    })

    it("Should call changeTitle if title is provided", async () => {
        props.data.title = "any_title"
        await sut.execute(props)
        expect(announceEntity.changeTitle).toHaveBeenCalledTimes(1)
    })

    it("Should call changeDescription if description is provided", async () => {
        props.data.description = "any_description"
        await sut.execute(props)
        expect(announceEntity.changeDescription).toHaveBeenCalledTimes(1)
    })

    it("Should call changePrice if title is provided", async () => {
        props.data.price = 20
        await sut.execute(props)
        expect(announceEntity.changePrice).toHaveBeenCalledTimes(1)
    })
})