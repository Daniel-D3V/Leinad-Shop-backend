import { CategoryRepositoryInterface } from "@/modules/category/domain/repositories"
import { DeleteCategoryInputDto } from "./delete-category.dto"
import { DeleteCategoryUsecase } from "./delete-category.usecase"
import { mock } from "jest-mock-extended"
import { CommandEmitterInterface } from "@/modules/@shared/events"


describe("Test DeleteCategoryUsecase", () => {

    let props: DeleteCategoryInputDto
    let sut: DeleteCategoryUsecase
    let categoryRepository: CategoryRepositoryInterface
    let commandEmitter: CommandEmitterInterface

    beforeEach(() => {
        props = {
            categoryId: "any_category_id"
        }
        categoryRepository = mock<CategoryRepositoryInterface>()
        commandEmitter = mock<CommandEmitterInterface>()
        sut = new DeleteCategoryUsecase(categoryRepository, commandEmitter)
    })

})