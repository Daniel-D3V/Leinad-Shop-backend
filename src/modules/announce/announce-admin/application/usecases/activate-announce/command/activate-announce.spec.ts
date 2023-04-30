import { CommandEmitterInterface } from "@/modules/@shared/events"
import { ActivateAnnounceInputDto } from "./activate-announce.dto"
import { ActivateAnnounceUsecase } from "./activate-announce.usecase"
import { mock } from "jest-mock-extended"
import { ActivateAnnounceCommand } from "./activate-announce.command"

jest.mock("./activate-announce.command")

describe("Test ActivateAnnounceUsecase", () => {

    let sut: ActivateAnnounceUsecase
    let props: ActivateAnnounceInputDto
    let commandEmitter: CommandEmitterInterface

    beforeEach(() => {
        props = {
            announceId: "any_announce_id",
        }
        commandEmitter = mock<CommandEmitterInterface>()
        sut = new ActivateAnnounceUsecase(commandEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
    })

    it("Should create ActivateAnnounceCommand with correct values", async () => {
        await sut.execute(props)
        expect(ActivateAnnounceCommand).toHaveBeenCalledWith({ ...props })
    })

    it("Should call commandEmitter once", async () => {
        await sut.execute(props)
        expect(commandEmitter.emit).toHaveBeenCalledTimes(1)
    })
})