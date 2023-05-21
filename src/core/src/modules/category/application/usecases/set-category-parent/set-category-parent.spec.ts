import { SetCategoryParentUsecaseInterface } from "@/modules/category/domain/usecases"
import { SetCategoryParentUsecase } from "./set-category-parent.usecase"
import { CategoryRepositoryInterface } from "@/modules/category/domain/repositories"
import { EventEmitterInterface } from "@/modules/@shared/events"
import { CategoryEntity } from "@/modules/category/domain/entities"
import { mock } from "jest-mock-extended"


describe("Test SetCategoryParentUsecase", () => {

    let sut: SetCategoryParentUsecase
    let props: SetCategoryParentUsecaseInterface.InputDto
    let categoryRepository: CategoryRepositoryInterface
    let eventEmitter: EventEmitterInterface
    let categoryEntity: CategoryEntity

    beforeEach(() => {

        props = {
            categoryId: "any_category_id",
            parrentId: "any_parrent_id"
        }
        eventEmitter = mock<EventEmitterInterface>();
        categoryEntity = mock<CategoryEntity>()
        categoryRepository = mock<CategoryRepositoryInterface>()
        jest.spyOn(categoryRepository, "findById").mockResolvedValue(categoryEntity)
        sut = new SetCategoryParentUsecase(categoryRepository, eventEmitter)
    })

    it("Should execute the usecase Properly", async () => {
        const result = await sut.execute(props)
        expect(result.isRight()).toBe(true)
    })
})