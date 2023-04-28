

import { mock } from "jest-mock-extended"
import { CommandEmitterInterface } from "@/modules/@shared/events"
import { DeactivateCategoryInputDto } from "./deactivate-category.dto"
import { DeactivateCategoryUsecase } from "./deactivate-category.usecase"
import { DeactivateCategoryCommand } from "./deactivate-category.command";

jest.mock("./deactivate-category.command")

describe("Test DeleteCategoryUsecase", () => {

    let props: DeactivateCategoryInputDto
    let sut: DeactivateCategoryUsecase
    let commandEmitter: CommandEmitterInterface

    beforeEach(() => {
        props = {
            categoryId: "any_category_id"
        }
        commandEmitter = mock<CommandEmitterInterface>()
        sut = new DeactivateCategoryUsecase(commandEmitter)
    })

    it("Should execute the usecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
    })

    it("Should call commandEmitter once", async () => {
        const commandEmitterSpy = jest.spyOn(commandEmitter, "emit")
        await sut.execute(props)
        expect(commandEmitterSpy).toHaveBeenCalledTimes(1)
    })

    it("Should create DeactivateCategoryCommand with correct values", async () => {
        await sut.execute(props)
        expect(DeactivateCategoryCommand).toHaveBeenCalledWith({ categoryId: props.categoryId })
    })

})