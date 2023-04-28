import { CategoryEntity } from "@/modules/category/domain/entities";
import { CreateCategoryDtoInput } from "./create-category.dto"
import { CreateCategoryUsecase } from "./create-category.usecase";
import { mock } from 'jest-mock-extended';
import { CategoryRepositoryInterface } from "@/modules/category/domain/repositories";
import { CommandEmitterInterface } from "@/modules/@shared/events";
import { right } from "@/modules/@shared/logic";


jest.mock("@/modules/category/domain/entities")

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
                toJSON: () => "entityValue",
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

})
