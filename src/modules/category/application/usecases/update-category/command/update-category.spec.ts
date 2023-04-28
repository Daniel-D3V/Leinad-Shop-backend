import { UpdateCategoryUsecase } from "./update-category.usecase"
import { UpdateCategoryInputDto } from "./update-category.dto";
import { CategoryRepositoryInterface } from "@/modules/category/domain/repositories";
import { CommandEmitterInterface } from "@/modules/@shared/events";
import { mock } from "jest-mock-extended";
import { CategoryEntity } from "@/modules/category/domain/entities";
import { UpdateCategoryCommand } from "./update-category.command";

jest.mock("./update-category.command")

describe("Test UpdateCategoryUsecase", () => {

    let sut: UpdateCategoryUsecase
    let props: UpdateCategoryInputDto
    let categoryRepository: CategoryRepositoryInterface
    let commandEmitter: CommandEmitterInterface
    let categoryEntity: CategoryEntity

    beforeEach(() => {
        categoryEntity = mock<CategoryEntity>()
        jest.spyOn(categoryEntity, "changeTitle").mockReturnValue({ isLeft: () => false } as any)
        jest.spyOn(categoryEntity, "changeDescription").mockReturnValue({ isLeft: () => false } as any)
        props = {
            categoryId: "any_category_id",
            data: {}
        }
        categoryRepository = mock<CategoryRepositoryInterface>()
        jest.spyOn(categoryRepository, "findById")
        .mockResolvedValue(categoryEntity)
        commandEmitter = mock<CommandEmitterInterface>()
        sut = new UpdateCategoryUsecase(categoryRepository, commandEmitter)
    })

    it("Should execute the update properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
    })

    it("Should create UpdateCategoryCommand with correct values ", async () => {
        await sut.execute(props)
        expect(UpdateCategoryCommand).toHaveBeenCalledTimes(1)
    })

    it("Should call commandEmitter once ", async () => {
        await sut.execute(props)
        expect(commandEmitter.emit).toHaveBeenCalledTimes(1)
    })


    describe("Title", () => {
        it("Should call changeTitle from categoryEntity if a title is provided", async () => {
            props.data.title = "any_title"
            await sut.execute(props)
            expect(categoryEntity.changeTitle).toHaveBeenCalledTimes(1)
        })

        it("Should return an error if changeTitle returns an error", async () => {
            props.data.title = "any_title"
            jest.spyOn(categoryEntity, "changeTitle").mockReturnValue({ isLeft: () => true, value: [new Error("entityError")] } as any)
            const output = await sut.execute(props)

            expect(output.value![0]).toEqual(new Error("entityError"))
        })

        it("Should return CategoryTitleInUseError if an category with the same title is found", async () => {
            props.data.title = "any_title"
            jest.spyOn(categoryRepository, "findByTitle").mockResolvedValueOnce(true as any)
            const output = await sut.execute(props)
            expect(output.value![0].name).toBe("CategoryTitleInUseError")
        })
    })

    describe("Description", () => {
        it("Should call changeDescription from categoryEntity if a description is provided", async () => {
            props.data.description = "any_description"
            await sut.execute(props)
            expect(categoryEntity.changeDescription).toHaveBeenCalledTimes(1)
        })

        it("Should return an error if changeDescription returns an error", async () => {
            props.data.description = "any_description"
            jest.spyOn(categoryEntity, "changeDescription").mockReturnValue({ isLeft: () => true, value: [new Error("entityError")] } as any)
            const output = await sut.execute(props)

            expect(output.value![0]).toEqual(new Error("entityError"))
        })
    })
})