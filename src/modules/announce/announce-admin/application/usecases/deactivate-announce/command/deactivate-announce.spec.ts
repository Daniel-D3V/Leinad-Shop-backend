import { CommandEmitterInterface } from "@/modules/@shared/events"
import { mock } from "jest-mock-extended"
import { DeactivateAnnounceUsecase } from "./deactivate-announce.usecase"
import { DeactivateAnnounceInputDto } from "./deactivate-announce.dto"
import { DeactivateAnnounceCommand } from "./deactivate-announce.command"

jest.mock("./deactivate-announce.command")

describe("Test ActivateAnnounceUsecase", () => {

    let sut: DeactivateAnnounceUsecase
    let props: DeactivateAnnounceInputDto
    let commandEmitter: CommandEmitterInterface

    beforeEach(() => {
        props = {
            announceId: "any_announce_id",
        }
        commandEmitter = mock<CommandEmitterInterface>()
        sut = new DeactivateAnnounceUsecase(commandEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
    })

    it("Should create DeactivateAnnounceCommand with correct values", async () => {
        await sut.execute(props)
        expect(DeactivateAnnounceCommand).toHaveBeenCalledWith({ ...props })
    })

    it("Should call commandEmitter once", async () => {
        await sut.execute(props)
        expect(commandEmitter.emit).toHaveBeenCalledTimes(1)
    })
})