

import { mock } from "jest-mock-extended"
import { CommandEmitterInterface } from "@/modules/@shared/events"
import { ActivateCategoryInputDto } from "./activate-category.dto"
import { ActivateCategoryUsecase } from "./activate-category.usecase"
import { ActivateCategoryCommand } from "./activate-category.command";

jest.mock("./activate-category.command")

describe("Test DeleteCategoryUsecase", () => {

    let props: ActivateCategoryInputDto
    let sut: ActivateCategoryUsecase
    let commandEmitter: CommandEmitterInterface

    beforeEach(() => {
        props = {
            categoryId: "any_category_id"
        }
        commandEmitter = mock<CommandEmitterInterface>()
        sut = new ActivateCategoryUsecase(commandEmitter)
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

    it("Should create ActivateCategoryCommand with correct values", async () => {
        await sut.execute(props)
        expect(ActivateCategoryCommand).toHaveBeenCalledWith({ categoryId: props.categoryId })
    })

})