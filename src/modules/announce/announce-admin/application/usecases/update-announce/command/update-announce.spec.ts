import { AnnounceRepositoryInterface } from "@/modules/announce/announce-admin/domain/repositories"
import { UpdateAnnounceInputDto } from "./update-announce.dto"
import { UpdateAnnounceUsecase } from "./update-announce.usecase"
import { CommandEmitterInterface } from "@/modules/@shared/events"
import { mock } from "jest-mock-extended"
import { AnnounceEntity } from "@/modules/announce/announce-admin/domain/entities"
import { UpdateAnnounceCommand } from "./update-announce.command"

jest.mock("./update-announce.command")

describe("Test UpdateAnnounceUsecase", () => {
    let sut: UpdateAnnounceUsecase
    let props: UpdateAnnounceInputDto
    let announceRepository: AnnounceRepositoryInterface
    let commandEmitter: CommandEmitterInterface
    let announceEntity: AnnounceEntity

    beforeEach(() => {
        props = {
            announceId: "any_announce_id",
            data: {}
        }
        announceEntity = mock<AnnounceEntity>()
        announceRepository = mock<AnnounceRepositoryInterface>()
        jest.spyOn(announceRepository, "findById").mockResolvedValue(announceEntity)
        commandEmitter = mock<CommandEmitterInterface>()
        sut = new UpdateAnnounceUsecase(announceRepository, commandEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
    })

    it("Should return AnnounceNotFoundError if announceEntity is not found from the repository", async () => {
        jest.spyOn(announceRepository, "findById").mockResolvedValue(null)
        const output = await sut.execute(props)
        expect(output.value![0].name).toBe("AnnounceNotFoundError")
    })

    it("Should call commandEmitter once", async () => {
        await sut.execute(props)
        expect(commandEmitter.emit).toHaveBeenCalledTimes(1)
    })

    it("Should create UpdateAnnounceCommand with correct values", async () => {
        await sut.execute(props)
        expect(UpdateAnnounceCommand).toHaveBeenCalledWith(props)
    })

    describe("change title", () => {

        it("Should call changeTitle if title is provided ", async () => {
            jest.spyOn(announceEntity, "changeTitle").mockReturnValueOnce({ isLeft: () => false } as any)
            props.data.title = "any_title"
            await sut.execute(props)
            expect(announceEntity.changeTitle).toHaveBeenCalledTimes(1)
        })

        it("Should return a error if the title to change is invalid ", async () => {
            const titleValidationError = new Error("titleValidationError")
            jest.spyOn(announceEntity, "changeTitle").mockReturnValueOnce({
                isLeft: () =>true,
                value: [ titleValidationError ]
            } as any)
            props.data.title = "any_title"
            const output = await sut.execute(props)
            expect(output.value![0]).toEqual(titleValidationError)
        })

    })

    describe("change description", () => {

        it("Should call changeDescription if description is provided ", async () => {
            jest.spyOn(announceEntity, "changeDescription").mockReturnValueOnce({ isLeft: () => false } as any)
            props.data.description = "any_description"
            await sut.execute(props)
            expect(announceEntity.changeDescription).toHaveBeenCalledTimes(1)
        })

        it("Should return a error if the description to change is invalid ", async () => {
            const descriptionValidationError = new Error("descriptionValidationError")
            jest.spyOn(announceEntity, "changeDescription").mockReturnValueOnce({
                isLeft: () =>true,
                value: [ descriptionValidationError ]
            } as any)
            props.data.description = "any_description"
            const output = await sut.execute(props)
            expect(output.value![0]).toEqual(descriptionValidationError)
        })
    })

    describe("change price", () => {

        it("Should call changePrice if price is provided ", async () => {
            jest.spyOn(announceEntity, "changePrice").mockReturnValueOnce({ isLeft: () => false } as any)
            props.data.price = 20
            await sut.execute(props)
            expect(announceEntity.changePrice).toHaveBeenCalledTimes(1)
        })

        it("Should return a error if the price to change is invalid ", async () => {
            const priceValidationError = new Error("priceValidationError")
            jest.spyOn(announceEntity, "changePrice").mockReturnValueOnce({
                isLeft: () =>true,
                value: [ priceValidationError ]
            } as any)
            props.data.price = 20
            const output = await sut.execute(props)
            expect(output.value![0]).toEqual(priceValidationError)
        })
    })
})