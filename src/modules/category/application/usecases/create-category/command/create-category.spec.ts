import { CategoryEntity } from "@/modules/category/domain/entities";
import { CreateCategoryDtoInput } from "./create-category.dto"
import { CreateCategoryUsecase } from "./create-category.usecase";
import { mock } from 'jest-mock-extended';
import { CategoryRepositoryInterface } from "@/modules/category/domain/repositories";
import { CommandEmitterInterface } from "@/modules/@shared/events";
import { CreateCategoryCommand } from "./create-category.command";


jest.mock("@/modules/category/domain/entities")
jest.mock("./create-category.command")

describe("Test CreateCategoryUsecase", () => {

    let props: CreateCategoryDtoInput
    let categoryEntity: jest.Mocked<typeof CategoryEntity>
    let categoryRepository: CategoryRepositoryInterface
    let commandEmitter: CommandEmitterInterface
    let sut: CreateCategoryUsecase

    beforeEach(() => {
        categoryEntity = CategoryEntity as jest.Mocked<typeof CategoryEntity>
        categoryEntity.create.mockReturnValue({
            isLeft: () => false,
            value: {
                toJSON: () => ({ anyEntityToJSONValue: "any" }),
            }
        } as any)

        props = {
            description: "any_description",
            title: "any_title"
        }
        categoryRepository = mock<CategoryRepositoryInterface>()
        commandEmitter = mock<CommandEmitterInterface>()
        sut = new CreateCategoryUsecase(categoryRepository, commandEmitter)
    })

    it("Should execute CreateCategoryUsecase properly", async () => {
        const output = await sut.execute(props)
        expect(output.isRight()).toBe(true)
    })

    it("Should return left if the categoryEntity is invalid", async () => {
        categoryEntity.create.mockReturnValueOnce({
            isLeft: () => true,
            value: [ new Error("EntityError") ]
        } as any)
        const output = await sut.execute(props)
        if(output.isRight()) throw new Error("usecase should not return right")

        expect(output.isLeft()).toBe(true)
        expect(output.value[0]).toEqual(new Error("EntityError"))
    })

    it("Should return CategoryTitleInUseError if categoryRepository finds a category using a title", async () => {
        const categoryRepositorySpy = jest.spyOn(categoryRepository, "findByTitle")
        .mockReturnValueOnce(true as any)

        const output = await sut.execute(props)
        if(output.isRight()) throw new Error("usecase should not return right")

        expect(output.value[0].name).toBe("CategoryTitleInUseError")
        expect(categoryRepositorySpy).toHaveBeenCalledTimes(1)
    })

    it("Should call commandEmitter once", async () => {
        const commandEmitterSpy = jest.spyOn(commandEmitter, "emit")
        await sut.execute(props)
        expect(commandEmitterSpy).toHaveBeenCalledTimes(1)
    })

    it("Should create CreateCategoryCommand with correct values", async () => {
        
        await sut.execute(props)
        expect(CreateCategoryCommand).toHaveBeenCalledWith({ anyEntityToJSONValue: "any" })
        expect(CreateCategoryCommand).toHaveBeenCalledTimes(1)
    })
})
