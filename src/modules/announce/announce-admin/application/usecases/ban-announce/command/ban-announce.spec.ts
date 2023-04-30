import { CommandEmitterInterface } from "@/modules/@shared/events"
import { mock } from "jest-mock-extended"
import { BanAnnounceUsecase } from "./ban-announce.usecase"
import { BanAnnounceInputDto } from "./ban-announce.dto"
import { BanAnnounceCommand } from "./ban-announce.command"

jest.mock("./ban-announce.command")

describe("Test BanAnnounceUsecase", () => {

    let sut: BanAnnounceUsecase
    let props: BanAnnounceInputDto
    let commandEmitter: CommandEmitterInterface

    beforeEach(() => {
        props = {
            announceId: "any_announce_id",
        }
        commandEmitter = mock<CommandEmitterInterface>()
        sut = new BanAnnounceUsecase(commandEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
    })

    it("Should create ActivateAnnounceCommand with correct values", async () => {
        await sut.execute(props)
        expect(BanAnnounceCommand).toHaveBeenCalledWith({ ...props })
    })

    it("Should call commandEmitter once", async () => {
        await sut.execute(props)
        expect(commandEmitter.emit).toHaveBeenCalledTimes(1)
    })
})