import { DeleteCategoryInputDto } from "./delete-category.dto"
import { DeleteCategoryUsecase } from "./delete-category.usecase"
import { mock } from "jest-mock-extended"
import { CommandEmitterInterface } from "@/modules/@shared/events"
import { DeleteCategoryCommand } from "./delete-category.command"

jest.mock("./delete-category.command")

describe("Test DeleteCategoryUsecase", () => {

    let props: DeleteCategoryInputDto
    let sut: DeleteCategoryUsecase
    let commandEmitter: CommandEmitterInterface

    beforeEach(() => {
        props = {
            categoryId: "any_category_id"
        }
        commandEmitter = mock<CommandEmitterInterface>()
        sut = new DeleteCategoryUsecase(commandEmitter)
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

    it("Should create deleteCategoryCommand with correct values", async () => {
        await sut.execute(props)
        expect(DeleteCategoryCommand).toHaveBeenCalledWith({ categoryId: props.categoryId })
    })

})